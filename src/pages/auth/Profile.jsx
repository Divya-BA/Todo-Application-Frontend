import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png';
import { toast } from 'react-toastify';
import { MdCancel } from 'react-icons/md';
import { CiMenuKebab } from 'react-icons/ci';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Profile = () => {
    const navigate = useNavigate();
    const [menuPopup, setMenuPopup] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [changePasswordPopup, setChangePasswordPopup] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isHide, setIsHide] = useState({ oldPassword: true, newPassword: true });
    const [isLoading, setIsLoading] = useState(true);
    const [updatedName, setUpdatedName] = useState('');
    const [user, setUser] = useState({ name: '', email: '', id: '' });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const url=`http://localhost:3000`

    

    const handleLogout = async (e) => {
        if (e.target.textContent === 'Yes') {
            try {
                await axios.get(`${url}/api/auth/logout`, { withCredentials: true });
                setLogoutPopup(false);
                navigate('/signin');
            } catch (error) {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
        else {
            setLogoutPopup(false);
        }
    }

    const handleDeleteUser = async (e) => {
        if (e.target.textContent === 'Yes') {
            try {
                const res = await axios.get(`${url}/api/auth/deleteUser`, { withCredentials: true });
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/signup');
                setDeletePopup(false);
            } catch (error) {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
        else {
            setDeletePopup(false);
        }
    }

    const handleShowHidePasswordOldPassword = () => {
        setIsHide({ ...isHide, oldPassword: !isHide.oldPassword });
    }
    const handleShowHidePasswordNewPassword = () => {
        setIsHide({ ...isHide, newPassword: !isHide.newPassword });
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            toast.error('please enter atleast 6 characters', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        try {

            const res = await axios.post(`${url}/api/auth/updatUserPassword`, { email: user.email, password: oldPassword, newPassword }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setChangePasswordPopup(false);
            }
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }


    const fetchUserDetail = async () => {
        try {
            const { data: { data } } = await axios.get(`${url}/api/auth/user`, { withCredentials: true });
            setIsLoading(false);
            setUser({ name: data.name, email: data.email, id: data._id });
        } catch (error) {
            navigate("/signin")
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    useEffect(() => {
        fetchUserDetail();
    }, [])

    const handleOnChange = (e) => {
        setUpdatedName(e.target.value);
    }

    const handleProfileUpdate = async (e) => {
        if (e.target.textContent === 'Cancel') {
            setIsUpdate(false);
            setUpdatedName('');
        }
        if (e.target.textContent === 'Submit' && updatedName !== '') {
            try {
                const res = await axios.put(`${url}/api/auth/updatUserProfile`, { name: updatedName, email: user.email }, { withCredentials: true });
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                fetchUserDetail();
                setIsUpdate(false);
                setUpdatedName('');
            } catch (error) {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    return (
        <div className='h-full flex justify-center items-center relative'>
            {!isLoading ?
                <>
                    <div className="p-4 lg:w-1/4 md:w-1/2">
                        <div className="h-full flex flex-col items-center text-center">
                            <img alt="Profile img" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={profile} />
                            {isUpdate ?
                                <div onClick={handleProfileUpdate} className='flex flex-col gap-4'>
                                    <input type="text" className='border-2 px-2' placeholder='Enter your name' onChange={handleOnChange} value={updatedName} />
                                    <button className='bg-yellow-400 hover:bg-yellow-300 transition-colors px-2 py-1 font-semibold rounded-md'>Cancel</button>
                                    <button className='bg-yellow-400 hover:bg-yellow-300 transition-colors px-2 py-1 font-semibold rounded-md'>Submit</button>
                                </div>
                                :
                                <div className="w-full">
                                    <h2 className="title-font font-medium text-lg text-gray-900">{user.name}</h2>
                                    <h3 className="text-gray-500 mb-3">{user.email}</h3>
                                    <button onClick={() => setIsUpdate(true)} className='bg-yellow-400 hover:bg-yellow-300 transition-colors px-2 py-1 font-semibold rounded-md'>Update Profile</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='absolute right-3 top-2 flex items-center'>
                        <button onClick={() => { setChangePasswordPopup(true); setMenuPopup(false) }} className='bg-yellow-400 hover:bg-yellow-300 mr-3 transition-colors px-2 py-1 font-semibold rounded-md'>Change Password</button>
                        <button onClick={() => { setMenuPopup(!menuPopup); setChangePasswordPopup(false); setDeletePopup(false); setLogoutPopup(false) }} className='bg-yellow-400 hover:bg-yellow-300 transition-colors px-1 py-1 font-semibold rounded-md'><CiMenuKebab size={23} /></button>
                    </div>
                </>
                :
                <div className='mt-10 flex justify-center items-center min-h-[60vh]'></div>
            }
            {menuPopup &&
                <div className='absolute right-3 top-12 shadow-xl flex flex-col p-4 rounded'>
                    <button onClick={() => { setLogoutPopup(true); setDeletePopup(false) }} className='bg-yellow-400 hover:bg-yellow-300 transition-colors px-2 py-1 mb-4 font-semibold rounded-md'>Logout</button>
                    {/* <button onClick={() => { setDeletePopup(true); setLogoutPopup(false) }} className='bg-yellow-400 hover:bg-yellow-300 transition-colors px-2 py-1 font-semibold rounded-md'>Delete User</button> */}
                </div>}

            {logoutPopup &&
                <div className='w-60 rounded-md bg-white shadow-2xl p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <p className='mb-6 font-semibold'>Are you sure to Logout?</p>
                    <div onClick={handleLogout} className='flex justify-between gap-5'>
                        <button className='px-3 rounded-md bg-yellow-400 hover:bg-yellow-300'>No</button>
                        <button className='px-3 rounded-md bg-yellow-400 hover:bg-yellow-300'>Yes</button>
                    </div>
                </div>
            }
            {deletePopup &&
                <div className='w-60 rounded-md bg-white shadow-2xl p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <p className='mb-6 font-semibold'>Are you sure to delete account?</p>
                    <div onClick={handleDeleteUser} className='flex justify-between gap-5'>
                        <button className='px-3 rounded-md bg-yellow-400 hover:bg-yellow-300'>No</button>
                        <button className='px-3 rounded-md bg-yellow-400 hover:bg-yellow-300'>Yes</button>
                    </div>
                </div>
            }
            {changePasswordPopup &&
                <div className='w-64 rounded-md bg-white shadow-2xl p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <p className='mb-6 font-semibold text-center'>Change Password</p>
                    <span onClick={() => { setChangePasswordPopup(false); setIsHide({ oldPassword: true, newPassword: true }) }} className='absolute top-3 right-2 cursor-pointer text-xl'><MdCancel /></span>
                    <div>
                        <form className='flex flex-col gap-5 relative'>
                            <input type={`${isHide.oldPassword ? 'password' : 'text'}`} onChange={(e) => setOldPassword(e.target.value)} className='px-3 py-1 rounded border-2 border-gray-600' required placeholder='Enter old password' />
                            <input type={`${isHide.newPassword ? 'password' : 'text'}`} onChange={(e) => setNewPassword(e.target.value)} className='px-3 py-1 rounded border-2 border-gray-600' required placeholder='Enter new password' />
                            <span onClick={handleShowHidePasswordOldPassword} className='cursor-pointer absolute right-3 top-2'>{isHide.oldPassword ? <FaEye /> : <FaEyeSlash />}</span>
                            <span onClick={handleShowHidePasswordNewPassword} className='cursor-pointer absolute right-3 top-16'>{isHide.newPassword ? <FaEye /> : <FaEyeSlash />}</span>
                            <button onClick={handleChangePassword} className='px-3 py-1 rounded-md bg-yellow-400 hover:bg-yellow-300 font-medium'>Submit</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile