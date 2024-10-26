import React, { useEffect, useState } from 'react'
import { MdDeleteForever, MdOutlineModeEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

export default function SingleTaskPage() {
    const tasks = useSelector(state=>state.tasks.tasks);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const task = tasks.find(task=>task._id === id);
        
    const handleDeleteTask = ()=>{
      dispatch(deleteTask(id))
    }
    const handleEditTask = ()=>{
      navigate(`/edit-task/${id}`)
    }
  return (
    <section className='centered'>
      <div className='card task-card '>
        <div className='w-48 mb-4'>
          <img src={task?.image} alt='' className='object-contain rounded-xl'/>
        </div>
        <p>
          <span>Title:</span>
          <span>{task?.title}</span>
        </p>
        <p>
          <span>Description:</span>
          <span>{task?.description}</span>
        </p>
        <p>
          <span>Priority:</span>
          <span>{task?.priority}</span>
        </p>
        <p>
          <span>State:</span>
          <span>{task?.state}</span>
        </p>
        
        <div className='bg-opacity-75 bg-slate-400 w-full flex justify-evenly  rounded-md mt-3'>
          <button className="icon hover:bg-slate-500 hover:bg-opacity-25 p-3" onClick={handleEditTask}><MdOutlineModeEdit /></button>
          <button className="icon hover:bg-slate-500 hover:bg-opacity-25 p-3" onClick={handleDeleteTask}><MdDeleteForever /></button>
        </div>
      </div>
        
    </section>
  )
}
