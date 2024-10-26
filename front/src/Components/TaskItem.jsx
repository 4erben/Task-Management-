import React from 'react'
import { MdOutlineModeEdit , MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { /* deleteTask, */ deleteUserTask, editTask, editUserTask } from '../Redux/Slices/tasks.Slice';
export default function TaskItem({title ="Title",id,state,priority}) {
  const navigate = useNavigate();
  const token = useSelector(state=>state.user.accessToken);
  const dispatch = useDispatch();
  const displayedTitle = title.length > 15 ? title.slice(0, 15) + '...' : title;

  const handleNavigate = ()=>{
    navigate(`/task/${id}`);
  }
  const handleDeleteTask = ()=>{
    dispatch(deleteUserTask({taskId:id,token}))
  }
  const handleEditTask = ()=>{
    navigate(`/edit-task/${id}`)
  }
  const handleChangePriority = (e)=>{
    const newPriority = e.target.value;
    dispatch(editUserTask({
      token,taskId:id,taskData :{priority: newPriority}
  }))
    /* dispatch(editTask({
      id: id,
      updatedData:{priority:newPriority}
    })) */
  }
  const handleChangeState = (e)=>{
    const newState = e.target.value;
    dispatch(editUserTask({
      token,taskId:id,taskData :{state: newState}
  }))
    /* dispatch(editTask({
      id: id,
      updatedData:{state:newState}
    })) */
  }
  return (
    <li className='task-item  capitalize rounded-lg cursor-pointer hover:bg-gray-500 hover:bg-opacity-45 flex items-center justify-center flex-col sm:flex-row my-3' >
            <span onClick={handleNavigate}> {displayedTitle} </span>
            <select 
            value={priority} 
            className='text-orange-400 font-semibold bg-slate-600 bg-opacity-20 text-center'
            onChange={handleChangePriority}
            >
                <option value="low">
                  Low
                </option>
                <option value="medium">
                  Medium
                </option>
                <option value="high">
                  High
                </option>
            </select>
            <select 
            value={state} 
            className='text-orange-400 font-semibold bg-slate-600 bg-opacity-20 text-center mx-0' 
            onChange={handleChangeState}
            >
                <option value="todo">
                  Todo
                </option>
                <option value="doing">
                  Doing
                </option>
                <option value="done">
                  Done
                </option>
            </select>
            <button className="icon" onClick={handleEditTask}><MdOutlineModeEdit /></button>
            <button className="icon" onClick={handleDeleteTask}><MdDeleteForever /></button>
    </li>
  )
}
