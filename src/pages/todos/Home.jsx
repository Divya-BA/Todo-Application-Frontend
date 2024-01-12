import { Link, Outlet, useLocation } from 'react-router-dom';
import { FcTodoList } from 'react-icons/fc';
import { IoMdDoneAll } from 'react-icons/io';
import { MdPendingActions } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import Navbar from '../../components/Navbar';

const Home = () => {
    const { pathname } = useLocation();

    return (
        <>
            <Navbar />
            <div className='flex h-[86vh] overflow-auto'>
                <div className='w-64 md:sticky md:top-0 shadow-[0px_10px_8px_#00000032] bg-white p-5 md:p-10  flex justify-center text-lg font-semibold max-[768px]:absolute  max-[768px]:bottom-0  max-[768px]:left-0  max-[768px]:right-0 max-[768px]:w-full'>
                    <div className='flex w-full flex-col gap-5 max-[768px]:justify-between max-[768px]:flex-row'>
                        <Link to={'/todo'} className={`flex gap-2 items-center hover:bg-yellow-200 ${pathname === '/todo' ? 'bg-yellow-200' : 'bg-white'} px-2 py-1 rounded`}>
                            <FcTodoList className='text-3xl md:text-2xl' />
                            <span className='max-[500px]:hidden'>Todos</span>
                        </Link>
                        <Link to={'/completed'} className={`flex gap-2 items-center hover:bg-yellow-200 ${pathname === '/completed' ? 'bg-yellow-200' : 'bg-white'} px-2 py-1 rounded`}>
                            <IoMdDoneAll size={23} />
                            <span className='max-[500px]:hidden'>Completed</span>
                        </Link>
                        <Link to={'/pending'} className={`flex gap-2 items-center hover:bg-yellow-200 ${pathname === '/pending' ? 'bg-yellow-200' : 'bg-white'} px-2 py-1 rounded`}>
                            <MdPendingActions size={23} />
                            <span className='max-[500px]:hidden'>Pending</span>
                        </Link>
                        <Link to={'/profile'} className={`flex gap-2 items-center hover:bg-yellow-200 ${pathname === '/profile' ? 'bg-yellow-200' : 'bg-white'} px-2 py-1 rounded`}>
                            <ImProfile size={23} />
                            <span className='max-[500px]:hidden'>Profile</span>
                        </Link>
                    </div>
                </div>
                <div className='max-w-7xl w-full p-8 max-[500px]:p-2'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Home