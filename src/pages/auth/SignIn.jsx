// SignIn.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner'; // Adjust the path based on your project structure

const SignIn = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState('');
    const [showDemoCredentials, setShowDemoCredentials] = useState(false);
    const [loading, setLoading] = useState(false);
    const url=`https://todo-application-ba.onrender.com`



    const handleOnChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${url}/api/auth/signin`, { ...userInfo }, { withCredentials: true });
            navigate("/");
            toast.success('Login successful!');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            toast.error(`Error: ${error.response.data.message}`);
        } finally {
            setLoading(false);
        }
    }

    const showDemoCredentialsDialog = () => {
        setShowDemoCredentials(true);
    }

    const closeDemoCredentialsDialog = () => {
        setShowDemoCredentials(false);
    }

    return (
        <section className="w-full h-screen flex justify-center items-center relative">
            {loading && <Spinner />}

            <div className="shadow-[0px_0px_15px_#00000032] rounded p-8 w-96">
                <form action="" onSubmit={handleFormSubmit}>
                    <h2 className="text-gray-900 text-3xl font-bold text-center mb-5">Login</h2>
                    <div className="relative mb-4">
                        <input type="email" onChange={handleOnChange} value={userInfo.email} placeholder='Enter your email' autoComplete='false' id="email" name="email" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <input type="password" onChange={handleOnChange} value={userInfo.password} placeholder='Enter your password' autoComplete='false' id="password" name="password" className="w-full mt-1 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    {errorMessage && <p className="mb-3 text-sm text-red-600">*{errorMessage}</p>}
                    <div className='flex justify-center'>
                        <button className="text-white bg-yellow-400 active:bg-yellow-400 border-0 w-full py-1 px-8 focus:outline-none hover:bg-yellow-500 rounded-xl text-lg">Log in</button>
                    </div>
                    <p className="text-gray-500 mt-3 text-center text-sm">
                        Do not have an account? <Link to={'/signup'} className="text-blue-600">Sign Up</Link>
                    </p>
                    <div className='flex justify-center'>
                        <button onClick={showDemoCredentialsDialog} className="text-white bg-yellow-400 active:bg-yellow-400 border-0 w-full py-1 px-8 focus:outline-none hover:bg-yellow-500 rounded-xl text-lg">Login with Demo Credentials</button>
                    </div>
                </form>
            </div>

            {showDemoCredentials && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded">
                        <p className="mb-3 text-lg font-bold ">Demo Credentials</p>
                        <p>Email: linder010101@gmail.com</p>
                        <p>Password: 12345</p>
                        <button onClick={closeDemoCredentialsDialog} className=" mt-3 text-white bg-yellow-400 active:bg-yellow-400 border-0 w-full py-1 px-8 focus:outline-none hover:bg-yellow-500 rounded-xl text-lg">Close</button>
                    </div>
                </div>
            )}

           
        </section>
    )
}

export default SignIn;
