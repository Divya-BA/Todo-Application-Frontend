import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="text-gray-600 sticky top-0 z-10 bg-white shadow-[10px_0px_6px_#00000032]">
            <div className="container mx-auto flex justify-between p-4 items-center">
                {/* Left corner icon */}
                <Link to={'/'} className="flex font-medium items-center text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-yellow-400 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl"><span className='text-yellow-400'>Todo</span>List</span>
                </Link>

                {/* Right corner icon */}
                <Link to={'/profile'} className="flex items-center justify-center text-yellow-400 border-0 w-10 h-10 rounded-full focus:outline-none hover:scale-105 text-base">
                   <FaUserCircle size={28} />
                </Link>
            </div>
        </header>
    )
}

export default Navbar;
