import React from 'react'
import { FaPlus } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    
    const handleAddTask = ()=>{
        navigate("/addtask")
    }
  return (
    <section className='flex flex-col items-center centered text-center'>
        <div className='card flex flex-col text-white'>
        <span className='font-bold text-3xl md:text-6xl'>Task Management</span>
        <div className='flex justify-center items-center py-1 bg-gray-900 hover:bg-gray-800 rounded-md mt-4 ' tabIndex={0} role='button' onClick={handleAddTask}>
          <span className='mx-3 font-semibold '>Add New Task </span>
          <FaPlus/>
          </div>
        </div>
      </section>
  )
}
