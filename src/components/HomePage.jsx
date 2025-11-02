import { UserAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import HomePgBody from "./HomePgBody";

const HomePage=()=>{
    const {session}=UserAuth()

   return (
    <>
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}> 
           <Header></Header>
        <HomePgBody></HomePgBody>
        <Footer></Footer>
      </div>
       
    </>
    
     
   )
}
export default HomePage;