import '../styles/Signup.css'
import { Link, useNavigate } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';

const Signup=()=>{
    
    const {session,signupNewUser}=UserAuth();
    
    const navigate=useNavigate();
    console.log('Our session is ',session);
    const handleSignUp=async(firstName,lastName,email,password)=>{
      
      try {
        const result=await signupNewUser(firstName,lastName,email,password)
        if(result.success)
        {
           navigate('/homepage')
        }
      } catch (error) {
        console.error('Error occured while signing up',error);
      }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let firstName=e.target.elements.firstName.value;
        let lastName=e.target.elements.lastName.value;
        let email=e.target.elements.email.value;
        let password=e.target.elements.password.value;
        handleSignUp(firstName,lastName,email,password)
       
    }
   return (
      <div className="signup-container">

        <form className='signup-form' onSubmit={handleSubmit}>
            <h3>Signup Page</h3>
            <div className='signup-form-item'>
                <label htmlFor='firstName'>First Name</label>
                <input type="text" name="firstName"></input>
            </div>
             <div className='signup-form-item'>
                <label htmlFor='lastName'>Last Name</label>
                <input type="text" name="lastName"></input>
            </div>
             <div className='signup-form-item'>
                <label htmlFor='email'> Email Address</label>
                <input type="email" name="email"></input>
            </div>
             <div className='signup-form-item'>
                <label htmlFor='password'>Password</label>
                <input type="password" name="password"></input>
            </div>
             <div className="signup-form-buttons">
               <button type="submit">Sign Up</button>
               Already have and account <Link to={'/login'}>Login</Link>
               
              
            </div>
        </form>
      </div>
   )
}
export default Signup;