import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <p className='text-3xl font-semibold'>NotFound</p>
      <Link to={'/'} className='text-blue-500'>Go Back</Link>
    </div>
  )
}

export default NotFound