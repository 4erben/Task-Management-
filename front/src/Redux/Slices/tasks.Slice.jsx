import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; 
import axiosInstance from "../../utils/api/axiosInstance";


export const createNewTask = createAsyncThunk(
    "tasks/createTask",
    async(args,{rejectWithValue})=>{
        const { taskData } = args;
        try{
            const res = await axiosInstance.post("/tasks",taskData);
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
            const res = await axiosInstance("/tasks");
            /* const res = await axios.get(`${import.meta.env.VITE_API_URI}/tasks`); */
            return res.data;
        }catch(err){
            console.log(err.message);
            return rejectWithValue(err.message)
        } 
    }
);
export const editUserTask = createAsyncThunk(
    "tasks/editTask",
    async(args,{rejectWithValue})=>{
        const { taskId,taskData} = args;
        console.log(args);
        try{
            const res = await axiosInstance.put(`/tasks/${taskId}`,taskData);
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
        const {taskId} = args;
        try{
            const res = await axiosInstance.delete(`/tasks/${taskId}`);
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
        selectedPriority:"all"
    },
    reducers:{
        filterState:(state,action)=>{
            state.selectedState = action.payload;
        },
        filterPriority:(state,action)=>{
            state.selectedPriority = action.payload;
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

export const { filterState,filterPriority,deleteTaskOptim, editTaskOptim } =tasksSlice.actions;
export default tasksSlice.reducer;