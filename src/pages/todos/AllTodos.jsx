import React, { useEffect, useState } from 'react';
import Task from '../../components/Task';
import axios from 'axios';
import { toast } from 'react-toastify';

const Todo = () => {
  const [task, setTask] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('all');
  const [showCompleted, setShowCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 6;
  const url=`http://localhost:3000`

  const fetchAllTask = async () => {
    try {
      const res = await axios.get(`${url}/api/todo/allTodos`, { withCredentials: true });
      setIsLoading(false);

      let filteredTodos = res.data.todos;

      if (filterOption === 'completed') {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
      } else if (filterOption === 'uncompleted') {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
      }

      setAllTodos(filteredTodos);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllTask();
  }, [filterOption, showCompleted])

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  }

  const handleShowCompletedChange = () => {
    setShowCompleted(!showCompleted);
  }

  const handleAddTask = async () => {
    if (task !== '') {
      const res = await axios.post(`${url}/api/todo/create`, { task }, { withCredentials: true });
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
      fetchAllTask();
      setTask('');
    }
  }

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = allTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className='h-full md:p-10 p-2 flex flex-col items-center relative ms-20'>
      <div className='max-w-3xl w-full'>
        <div className='flex gap-1'>
          <input value={task} onChange={(e) => setTask(e.target.value)} type="text" className='w-full h-16 px-3 rounded-md border-2' placeholder='Enter your task' />
          <button onClick={handleAddTask} className='px-5 rounded-md font-semibold bg-yellow-400'>Add</button>
        </div>
        <div className='m-4'>
          <label>
            Filter by:
            <select value={filterOption} onChange={handleFilterOptionChange} className='ml-2 bg-yellow-400 rounded-md'>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </label>
        </div>
        {
  currentTodos.length !== 0 ?
    <div className="mt-10 mb-16 flex justify-center items-center flex-col items-start w-full">
      {currentTodos.map((todo, index) => (
        <Task key={index} todo={todo} fun={fetchAllTask} />
      ))}
      {/* Pagination */}
      <div className="flex flex-col items-center mt-4">
        <div className="flex justify-center">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="mx-2 px-3 py-1 rounded-md bg-yellow-400">Previous</button>
          <span className="mx-2 px-3 py-1 rounded-md">{`Page ${currentPage} of ${Math.ceil(allTodos.length / todosPerPage)}`}</span>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(allTodos.length / todosPerPage)} className="mx-2 px-3 py-1 rounded-md bg-yellow-400">Next</button>
        </div>
      </div>
    </div>
    :
    (isLoading) ? <div className='mt-10 flex justify-center items-center min-h-[60vh]'></div>
      :
      <div className='mt-10 text-center'>No Tasks Found</div>
}
      </div>
    </div>
  )
}

export default Todo;
