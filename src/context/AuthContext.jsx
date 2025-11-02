import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../supabaseClient";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [bloodSugarLog, setBloodSugarLog] = useState([]);
  //signup
  const signupNewUser = async (firstName, lastName, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log("there was an error in signing up", error);
      return { success: false, error };
    }
    if (data.user) {
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
        },
      ]);

      if (insertError) {
        console.error("Failed to save profile:", insertError.message);
      } else {
        setFirstName(firstName);
        setLastName(lastName);
        console.log("Signup successful and profile saved!");
      }
    }

    return { success: true, data };
  };
  const signOut = async () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.log("There was an error ", error);
    } else {
      setFirstName(undefined);
      setLastName(undefined);
    }
  };
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("Sign in error occured ", error);
        return { success: false, error: error.message };
      }
      console.log("Successfully Signed in  :", data);
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError.message);
        } else {
          setFirstName(profile.first_name);
          setLastName(profile.last_name);
          return {
            success: true,
            data,
            firstName: profile.first_name,
            lastName: profile.last_name,
          };
        }
      }

      return { success: true, data };
    } catch (error) {
      console.log("An error occured:- ", error);
    }
  };
  
  async function saveBloodSugarReading(date, readingType, value) {
    const validKeys = [
      "fasting",
      "pre_breakfast",
      "post_breakfast",
      "pre_lunch",
      "post_lunch",
      "pre_dinner",
      "post_dinner",
    ];
    if (!validKeys.includes(readingType)) {
      throw new Error(`Invalid reading type: ${readingType}`);
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const dataToUpsert = {
      user_id: user.id,
      date: date,
      [readingType]: value,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("blood_sugar_logs")
      .upsert(dataToUpsert, {
        onConflict: ["user_id", "date"],
      });

    if (error) {
      throw new Error("Failed to save reading: " + error.message);
    }

    return true;
  }

  async function fetchAllBloodSugarLogs() {
    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    // Query the logs table for the user's data
    const { data, error } = await supabase
      .from("blood_sugar_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (error) {
      throw new Error("Failed to fetch logs: " + error.message);
    }
    setBloodSugarLog(data);
    // return data; // array of blood sugar log objects
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  useEffect(() => {
    fetchAllBloodSugarLogs();
  }, [saveBloodSugarReading]);
  return (
    <AuthContext.Provider
      value={{
        session,
        signupNewUser,
        signOut,
        signInUser,
        firstName,
        lastName,
        saveBloodSugarReading,
        fetchAllBloodSugarLogs,
        bloodSugarLog
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
