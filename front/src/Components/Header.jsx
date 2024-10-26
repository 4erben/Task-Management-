import React from 'react'
import { IoIosHome } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../Redux/Slices/user.Slice';

export default function Header() {
  const userName = useSelector(state=>state.user.name);
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch(logOut())
  }
  return (
    <header className='bg-slate-300 bg-opacity-30'>
      <nav className='navbar flex justify-evenly items-center text-white font-bold py-5'>
        {
          userName?
          <>
          <span>{userName}</span>
        <Link to="/">
            <IoIosHome size={26}  className=' hover:text-green-300 hover:scale-125'/>
        </Link>
        <Link to="/alltasks" className='hover:bg-slate-500 hover:bg-opacity-20 hover:text-green-300 px-3 rounded-lg hover:scale-125'>
          Tasks
        </Link>
        <button className='hover:text-red-400' onClick={handleLogout}>
          Logout
        </button>
        </>
          :
          <div>
          <Link to="/signin" className='hover:bg-slate-500 hover:bg-opacity-20 hover:text-slate-200 px-3 rounded-lg hover:scale-125'>
            Sign In
          </Link>
          <Link to="/signup" className='hover:bg-slate-500 hover:bg-opacity-20 hover:text-slate-200 px-3 rounded-lg hover:scale-125'>
            Signup
          </Link>
          </div>
        }
        
       
        
        
      </nav>
    </header>
  )
}
