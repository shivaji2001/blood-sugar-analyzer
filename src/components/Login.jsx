import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
const Login=()=>{
    const {session,signInUser}=UserAuth();
    const navigate=useNavigate()
    const handleLogin=async(email,password)=>{
      
   try {
        const result=await signInUser(email,password)
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
        
        let email=e.target.elements.email.value;
        let password=e.target.elements.password.value;
        try {
           handleLogin(email,password)

        } catch (error) {
           console.error('Error occured in Signing In :- ',error)
        }
    }
   return (
      <div className="login-container" onSubmit={handleSubmit}>
       
        <form className='login-form'>
            <h3>Login Page</h3>
           
             <div className='login-form-item'>
                <label htmlFor='email'> Email Address</label>
                <input type="email" name="email"></input>
            </div>
             <div className='login-form-item'>
                <label htmlFor='password'>Password</label>
                <input type="password" name="password"></input>
            </div>
             <div className="login-form-buttons">
               <button type="submit">Login</button>
               Don't have an account <Link to={'/signup'}>Signup</Link>
               
            </div>
        </form>
      </div>
   )
}
export default Login;