import {  createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name:"user",
    initialState:{
        accessToken:null,
        refreshToken:null,
        name:null,
    },
    reducers:{
        setUser:(state,action)=>{
            const {accessToken , refreshToken , name} = action.payload;
            console.log(action.payload);
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.name = name;
        },
        logOut:(state,action)=>{
            localStorage.removeItem("user");
            state.accessToken = null;
            state.refreshToken = null;
            state.name= null;
        }
        
    },
    extraReducers(builder){
        builder
        
    
    }
});

export const {setUser,logOut} =userSlice.actions;
export default userSlice.reducer;