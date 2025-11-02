import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "../styles/Header.css";
const Header = () => {
  const {session,signOut,firstName}=UserAuth();
  const navigate=useNavigate();
  const handleSignOut=(e)=>{
     e.preventDefault()
     try {
        signOut()
        navigate('/')

     } catch (error) {
       console.error('Error occured in signing out')
     }
  }
  return (
    <div className="header">
      <div className="left-placeholder"></div>
      <header className="center-heading">Blood Sugar Tracking</header>
      <div className="right-items">
        <h3>{firstName}</h3>
        <button onClick={handleSignOut}>Signout</button>
      </div>
    </div>
  );
};
export default Header;
