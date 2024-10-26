import React, { useEffect, useState } from 'react'
import TaskItem from '../Components/TaskItem'
import { useDispatch, useSelector } from 'react-redux';
import FilterSlider from '../Components/FilterSlider';
import { filterPriority,filterState, getUserTasks } from '../Redux/Slices/tasks.Slice';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

export default function AllTasks() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state=>state.user.accessToken);
    const tasks = useSelector(state=>state.tasks.tasks);
    const selectedState = useSelector(state=>state.tasks.selectedState);
    const selectedPriority = useSelector(state=>state.tasks.selectedPriority);
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    useEffect(()=>{
      dispatch(getUserTasks(token))
    },[tasks])



     // Filter tasks based on selected state and priority
     useEffect(() => {
      const filtered = tasks.filter((task) => {
          const stateMatch = selectedState === "all" || task.state === selectedState;
          const priorityMatch = selectedPriority === "all" || task.priority === selectedPriority;
          return stateMatch && priorityMatch;
      });
      setFilteredTasks(filtered);
  }, [tasks, selectedState, selectedPriority]);
    /* let filteredTasks = tasks.filter((task)=>{
      const stateMatch = selectedState ==="all" || task.state === selectedState;
      const priorityMatch = selectedPriority === "all" || task.priority === selectedPriority;
      return stateMatch && priorityMatch;
  }); */
  const handleSearch = (e)=>{
    const searchValue = e.target.value.toLowerCase();
        setFilteredTasks(tasks.filter((task) =>
            task.title.toLowerCase().includes(searchValue)
        ));
  }
  const handleAddTask = ()=>{
    navigate("/addtask")
}
  return (
    <section className='mx-auto pt-10 md:pt-20 w-full flex flex-col justify-start items-center'>
        <div className='px-4 text-xl md:text-3xl text-white text-center'>
            <h1>Tasks Page</h1>
            {tasks.length !==0 && 
            <>
            <div className='flex justify-between flex-col md:flex-row mt-10'>
              <FilterSlider 
                textValues={["all","todo","doing","done"]}
                filterName={"State"}
                filterFunction={filterState}
              />
              <FilterSlider 
                textValues={["all","low","medium","high"]}
                filterName={"priority"}
                filterFunction={filterPriority}
              />
            </div>
              <input 
              type='text' 
              placeholder='Search...' 
              className='px-4 rounded-md w-full my-4 text-black'
              onChange={handleSearch}
              />
            </>
            }
        </div>
        {tasks.length == 0 && 
        <>
          <p className='text-5xl text-white text-center mt-10'>There is no Tasks Yet</p>
          <div 
          className='flex justify-center items-center text-white px-10 py-3 bg-gray-900 hover:bg-gray-800 rounded-md mt-10' 
          tabIndex={0} role='button' 
          onClick={handleAddTask}
          >
          <span className='mx-3 font-semibold '>Add New Task </span>
          <FaPlus/>
          </div>
        </>}
         <ul className='tasks'>
          {filteredTasks && 
          filteredTasks.map(task=>{
            return <TaskItem title={task.title} id={task._id} key={task._id} state={task.state} priority={task.priority}/>
          })}
        </ul>
    </section>
  )
}
