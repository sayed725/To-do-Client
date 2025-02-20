import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash , FaGoogle} from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';




const Register = () => {

    const location = useLocation()

    
    const navigate = useNavigate()

    const { createNewUser, setUser , updateUserProfile ,  signInWithGoogle } = useContext(AuthContext)
    const [error , setError] = useState('')
    const [showPassword , setShowPassword] = useState(false)








    const handleSubmit =(e)=>{
        e.preventDefault()

        const form = new FormData(e.target)

        const name = form.get("name")

        const photo = form.get("photo")
        const email = form.get("email")
        const password = form.get("password")
        if (password.length < 6) {
            setError('Password must be 6 character or more')
            return;
        } 
       
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
        if (!passwordRegex.test(password)) {
            setError('At least one uppercase, one lowercase character');
            return;
        }  

        createNewUser(email,password)
        .then(result =>{
            const user = result.user;
            setUser(user)
            updateUserProfile({displayName:name, photoURL:photo})
            .then(()=>{
                navigate('/')
            })
            .catch(error=>{
                setError(error.code)  
            })
            // toast.success(`Congratulation! Registration Successful`)
        })
        .catch((error) => {
            const errorCode = error.code;
            setError(errorCode)  
        }) 
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
                <h2 className="text-4xl my-10 text-center font-semibold text-green-600 animate__slideInRight animate__animated">Register your account</h2>
                <form onSubmit={handleSubmit}  className=" md:w-3/4 lg:w-1/3 mx-auto">
                <div className="form-control">
                        <label className="label">
                            <span className="label-text text-green-600">Your Name</span>
                        </label>
                        <input type="text" required name="name" placeholder="Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-green-600">Photo URL</span>
                        </label>
                        <input type="text" required name="photo" placeholder="Photo URL" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-green-600">Email address</span>
                        </label>
                        <input type="email" required name="email" placeholder="Email" className="input input-bordered" />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-green-600">Password</span>
                        </label>
                        <input type={showPassword?"text":"password"} required name="password" placeholder="Password" className="input input-bordered" />

                        <span
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-5 top-[52px] text-xl text-green-600'>
                        {
                            showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                        }
                    </span> 
                    </div>
                    {
                        error && ( <label className="label text-sm text-red-600">
                           {error}
                        </label>)
                    }
                    <div className="form-control mt-6">
                        <button className="btn rounded-md text-white bg-gradient-to-r from-[#184E68] to-[#57CA85] hover:text-black">Register</button>
                    </div>
                </form>

                <div className='md:w-3/4 lg:w-1/3 mx-auto mt-5'>
               <button onClick={handleGoogleSignIn}
                className="w-full btn rounded-md text-white bg-gradient-to-r from-[#184E68] to-[#57CA85] hover:text-black">
                    <FaGoogle></FaGoogle>
                    Log In with Google
                </button>
               </div>




                <p className="text-center mt-4 textarea-sm">Already have an account <Link className="text-green-600 font-bold" to="/auth/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;