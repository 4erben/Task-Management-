import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.Page';
import AddTask from './Pages/AddTask.Page';
import Header from './Components/Header';
import AllTasks from './Pages/AllTasks.Page';
import SingleTaskPage from './Pages/SingleTask.Page';
import EditTask from './Pages/EditTask.Page';
import Signin from './Pages/Signin.Page';
import Signup from './Pages/Signup.Page';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {
  const userName = useSelector(state=>state.user.name);
  const navigate = useNavigate();
  

useEffect(()=>{
  if(!userName){
    navigate("/signin")
  }
},[userName])

  return (
    <div className='App'>
    <Header />
    <main className='flex flex-1  '>
      <Routes>
        <Route path='/' element={ userName?<Home />:<Navigate to="/signin" />}/>
        <Route path='/addtask' element={userName?<AddTask />:<Navigate to="/signin" />  }/>
        <Route path='/task/:id' element={userName?<SingleTaskPage />:<Navigate to="/signin" /> } />
        <Route path='/alltasks' element={userName?<AllTasks />:<Navigate to="/signin" /> } />
        <Route path='/edit-task/:id' element={userName?<EditTask /> :<Navigate to="/signin" />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        
      </Routes>
    </main>
    </div>
  )
}

export default App
