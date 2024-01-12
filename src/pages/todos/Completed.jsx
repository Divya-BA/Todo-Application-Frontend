import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Task from '../../components/Task';
import { useNavigate } from 'react-router-dom';

const Completed = () => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('old');
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 6;
  const navigate = useNavigate();
  const url=`http://localhost:3000`


  useEffect(() => {
    const fetchCompletedTask = async () => {
      try {
        const res = await axios.get(`${url}/api/todo/completed`, { withCredentials: true });
        setIsLoading(false);
        setCompletedTodos(res.data.completedTodos);
      } catch (error) {
        setIsLoading(false);
        if (error.response.data.error) {
          navigate("/login");
        }
      }
    }
    fetchCompletedTask();
  }, [])

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  }

  // filter todos
  useEffect(() => {
    const filteredTodos = completedTodos.slice()
      .sort((a, b) => {
        if (filterOption === 'old') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
    setCompletedTodos(filteredTodos);
  }, [filterOption])

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = completedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className='max-w-4xl w-full mx-auto relative'>
      {completedTodos.length > 0 && <div>
        <label>
          Filter by :
          <select value={filterOption} onChange={handleFilterOptionChange}>
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </label>
      </div>}
      {
        currentTodos.length !== 0 &&
        <div className="mt-10 flex flex-col items-center w-full">
          {currentTodos.map((todo) => (
            <Task key={todo.todo} todo={todo} show={true} fun={() => { }} />
          ))}
          {/* Pagination */}
          <div className="flex flex-col items-center mt-4">
            <div className="flex justify-center">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="mx-2 px-3 py-1 rounded-md bg-yellow-400">Previous</button>
              <span className="mx-2 px-3 py-1 rounded-md">{`Page ${currentPage} of ${Math.ceil(completedTodos.length / todosPerPage)}`}</span>
              <button onClick={handleNextPage} disabled={currentPage === Math.ceil(completedTodos.length / todosPerPage)} className="mx-2 px-3 py-1 rounded-md bg-yellow-400">Next</button>
            </div>
          </div>
        </div>
      }
      {!isLoading && completedTodos.length === 0 && <div className='mt-10 text-center'>No Tasks Found</div>}
      {isLoading && <div className='mt-10 flex justify-center items-center min-h-[60vh]'></div>}
    </div>
  )
}

export default Completed;
