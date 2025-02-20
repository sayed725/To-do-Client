import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash , FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';


const Login = () => {
    const [inputEmail, setInputEmail] = useState("");


    const handleForgotPassword = () => {
        setForgetEmail(inputEmail);
        // Redirect to Forgot Password page
        navigate("/forgetpassword");
        // Redirect to Forget Password page with email in query params
      };
    


    const { userLogIn , setUser, user , signInWithGoogle, setForgetEmail  } = useContext(AuthContext)
    const [error , setError] = useState({})
    const [showPassword , setShowPassword] = useState(false)

    const location = useLocation()

    const navigate = useNavigate()

    const handleLogIn =(e)=>{
        e.preventDefault()

        const form = new FormData(e.target)

        const email = form.get("email")
        const password = form.get("password")

       
      

        userLogIn(email,password)
        .then(result=>{
            const user = result.user
            setUser(user)
            
            // toast.success(`Congratulation! ${user.displayName} Login Successful`)
           
            // navigate(location?.state ? location.state : "/");

        })
        .catch((err) => {
            setError({ ...error, Login:err.code})
            toast.error(`${err.code}`)
          
          });
    }

    const handleGoogleSignIn=()=>{
        signInWithGoogle()
        .then(result => {
            const user = result.user
            setUser(user)
            
            // toast.success(`Congratulation! ${user.displayName} Login Successful`)
            // navigate(location?.state ? location.state : "/");
        })
        .catch((err) => {
            setError({ ...error, Login:err.code})
          
          });
    }

    return (
        <div>
             <div>
                <h2 className="text-4xl my-10 text-center text-green-600  font-semibold animate__slideInLeft animate__animated">Login your account</h2>
                <form onSubmit={handleLogIn}  className=" md:w-3/4 lg:w-1/3 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-green-600">Email address</span>
                        </label>
                        <input type="email" required name="email" placeholder="Email" className="input input-bordered"  onChange={(e) => setInputEmail(e.target.value)}/>
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-green-600">Password</span>
                        </label>
                        <input type={showPassword?"text":"password"} required name="password" placeholder="Password" className="input input-bordered" />
                        {
                            error.Login && ( <label className="label text-sm text-red-600">
                               {error.Login}
                            </label>)
                        }

                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-5 top-[52px] text-xl text-green-600'>
                        {
                            showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                        }
                    </span> 
                     
                        <label className="label">
                            < Link onClick={handleForgotPassword} className="label-text-alt link link-hover text-green-600">Forgot password?</Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn rounded-md text-white bg-gradient-to-r from-[#184E68] to-[#57CA85] hover:text-black">Login</button>
                    </div>
                </form>

             
               <div className='md:w-3/4 lg:w-1/3 mx-auto mt-5'>
               <button onClick={handleGoogleSignIn}
                className="w-full btn rounded-md text-white bg-gradient-to-r from-[#184E68] to-[#57CA85] hover:text-black">
                    <FaGoogle ></FaGoogle>
                    Log In with Google
                </button>
               </div>
               


                <p className="text-center mt-4 textarea-sm">Do not have an account <Link className="text-green-600 font-bold" to="/auth/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;