import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./Slices/tasks.Slice.jsx"
import userSlice from "./Slices/user.Slice.jsx";

const store = configureStore({
    reducer:{
        tasks: tasksSlice,
        user: userSlice
    }
});

export default store;