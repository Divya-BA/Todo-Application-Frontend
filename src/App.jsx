import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/todos/Home';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Welcome from './pages/todos/Welcome';
import AllTodos from './pages/todos/AllTodos';
import Completed from './pages/todos/Completed';
import Pending from './pages/todos/Pending';
import Profile from './pages/auth/Profile';
import NotFound from './pages/notFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} >
            <Route index element={<Welcome />} />
            <Route path='/todo' element={<AllTodos />} />
            <Route path='/completed' element={<Completed />} />
            <Route path='/pending' element={<Pending />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/*' element={<NotFound />} />
         


        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
