import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';  // Import the Spinner component

const SignUp = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ name: "", username: "", email: "", password: "", bio: "" });
    const [loading, setLoading] = useState(false);  // Add loading state
    const [errorMessage, setErrorMessage] = useState('');
    const url=`https://todo-application-ba.onrender.com`

    const handleOnChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);  // Set loading to true when the form is submitted
            await axios.post(`${url}/api/auth/signup`, { ...userInfo });
            navigate("/signin");
            toast.success('Sign up successful!');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            toast.error(`Error: ${error.response.data.message}`);
        } finally {
            setLoading(false);  // Set loading back to false after handling the response
        }
    }

    return (
        <section className="w-full h-screen flex justify-center items-center">
            <div className=" rounded shadow-[0px_0px_15px_#00000032] p-8 w-96">
                <form action="" onSubmit={handleFormSubmit}>
                    <h2 className="text-gray-900 text-3xl font-bold text-center mb-5">SignUp</h2>

                    <div className="relative mb-4">
                        <input type="text" onChange={handleOnChange} value={userInfo.name} required id='name' name="name" placeholder='Enter your name' className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <input type="email" onChange={handleOnChange} value={userInfo.email} required id='email' name="email" placeholder='Enter your email' className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <input type="password" onChange={handleOnChange} value={userInfo.password} required id='password' name="password" placeholder='Enter your password' autoComplete='false' className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    {errorMessage && <p className="mb-3 text-sm text-red-600">*{errorMessage}</p>}
                    
                    <div className='flex justify-center'>
                        <button type='submit' className="text-white bg-yellow-400 active:bg-yellow-500 border-0 w-full py-1 px-8 focus:outline-none hover:bg-yellow-500 rounded-xl text-lg">
                            {loading ? <Spinner /> : 'Sign up'}
                        </button>
                    </div>
                </form>
                <p className="text-gray-500 mt-3 text-center text-sm">Already have an account? <Link to={'/signin'} className="text-blue-600" >Log in</Link></p>
            </div>
        </section>
    )
}

export default SignUp;
