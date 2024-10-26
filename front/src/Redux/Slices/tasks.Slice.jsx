import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'; 
import axios from "axios";

export const createNewTask = createAsyncThunk(
    "tasks/createTask",
    async(args,{rejectWithValue})=>{
        const { token, taskData  } = args;
        try{
            const res = await axios.post(
                `${import.meta.env.VITE_API_URI}/tasks`,
                taskData,
                {
                    headers:{
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                return res.data;
        }catch(err){
            console.log(err);
            return rejectWithValue(err.message)
        } 
    }
);
export const getUserTasks = createAsyncThunk(
    "tasks/userTasks",
    async(args,{rejectWithValue})=>{
        
        try{
            const res = await axios.get(
                `${import.meta.env.VITE_API_URI}/tasks`,
                {
                    headers:{
                        "Authorization": `Bearer ${args}`
                    }
                });
                return res.data;
        }catch(err){
            console.log(err);
            return rejectWithValue(err.message)
        } 
    }
);
export const editUserTask = createAsyncThunk(
    "tasks/editTask",
    async(args,{rejectWithValue})=>{
        const {token , taskId,taskData} = args;
        console.log(args);
        
        try{
            const res = await axios.put(
                `${import.meta.env.VITE_API_URI}/tasks/${taskId}`,
                taskData,
                {
                    headers:{
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                return res.data;
        }catch(err){
            console.log(err);
            return rejectWithValue(err.message)
        } 
    }
);
export const deleteUserTask = createAsyncThunk(
    "tasks/deleteTask",
    async(args,{rejectWithValue})=>{
        const {token , taskId} = args;
        console.log(token);
        
        try{
            const res = await axios.delete(
                `${import.meta.env.VITE_API_URI}/tasks/${taskId}`,
                {
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                });
                return res.data;
        }catch(err){
            console.log(err);
            return rejectWithValue(err.message)
        } 
    }
);




const tasksSlice = createSlice({
    name:"tasks",
    initialState:{
        tasks:[],
        selectedState:"all",
        selectedPriority:"all",
    },
    reducers:{
       /*  addTask:(state,action)=>{
            const newTask = {
                id: uuidv4(),
                ...action.payload
            }
            state.tasks.push(newTask)
        },
        deleteTask:(state,action)=>{
           const taskIndex = state.tasks.findIndex(task=> task.id === action.payload);
           state.tasks.splice(taskIndex,1);
        }, */
        editTask: (state, action) => {    
            const { id, updatedData } = action.payload;
            const taskIndex = state.tasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedData };
            }
        },
        filterState:(state,action)=>{
            state.selectedState = action.payload;
        },
        filterPriority:(state,action)=>{
            state.selectedPriority = action.payload;
        },
        searchTask:(state,action)=>{
            const {searchWord} = action.payload;
            if(searchWord ==="")return state.filteredTasks = state.tasks;
            state.filteredTasks = state.tasks.filter((task)=>{
                return task.title === searchWord
            })
        },
        
    },
    extraReducers(builder){
        builder
        .addCase(getUserTasks.pending,(state,action)=>{
        })
        .addCase(getUserTasks.fulfilled,(state,action)=>{
            state.tasks = action.payload;
        })
        .addCase(getUserTasks.rejected,(state,action)=>{
        })
    }
});

export const {/* addTask ,deleteTask,  */editTask,filterState,filterPriority} =tasksSlice.actions;
export default tasksSlice.reducer;