import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import {/* addTask, */ createNewTask} from "../Redux/Slices/tasks.Slice";
import { useNavigate } from 'react-router-dom';




export default function InputCard() {
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state=>state.user.accessToken);

    const taskSchema = Yup.object().shape({
        image:Yup.mixed()
        .required("Image is required")
        .test("fileType","Unsupported file type",(value)=>{
            return value && value[0]  && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
        })
        .test("fileSize", "File size is too large (max 2 MB)", (value) => {
            return value && value[0] && value[0].size <= 2000000; // 2 MB
        }),
        title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
        description: Yup.string().required("Description is required"),
        priority: Yup.string().oneOf(["low", "medium", "high"], "Priority is required"),
        state: Yup.string().oneOf(["todo", "doing", "done"], "State is required"),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(taskSchema),
      });
    //handle submit 
    const onSubmit = (data) => {
        const reader = new FileReader();
        reader.onloadend = () => {
        const taskData = {
            image: reader.result, // This will be the Base64 string
            title: data.title,
            description: data.description,
            priority: data.priority,
            state: data.state,
        };
        /* dispatch(addTask(taskData)); */
        dispatch(createNewTask({taskData,token}))
            //after the successfuly adding the task navigate to homepage
            navigate("/")
                    };

    if (data.image[0]) {
        reader.readAsDataURL(data.image[0]); // Convert the image to Base64
    }

    
      };
      // Handle file change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        // Create a preview URL for the selected image
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    }
    };
       // Cleanup preview URL on component unmount
       useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview); // Revoke the object URL
            }
        };
    }, [imagePreview]);
  return (
    <div className='card'>
        <form className=' font-semibold flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <div className='text-center text-3xl text-orange-400'>
                <h3>Add A new Task</h3>
            </div>
            <div className='input-container'>
                <label htmlFor='input-image'>Enter The Task Image</label>
                <input 
                id='input-image'  
                type='file' 
                {...register('image')}
                onChange={handleFileChange}
                />
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 w-full h-32 object-contain max-w-full" />}
            </div>
            <div className='input-container'>
                <label htmlFor='input-title'>Enter The Task Title</label>
                <input id='input-title' type='text' {...register('title')} />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div className='input-container'>
                <label>Enter The Task Description</label>
                <input id='input-description' type='text' {...register('description')} />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div className='input-container'>
                <label htmlFor='input-priority'>Enter The Task Priority</label>
                <select id='input-priority' {...register('priority')} defaultValue="low">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
            </div>
            <div className='input-container'>
                <label htmlFor='input-state'>Enter The Task State</label>
                <select id='input-state' {...register('state')}>
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
                {errors.state && <p className="text-red-500">{errors.state.message}</p>}
            </div>
            <div className='mt-4'>
                <button className='bg-slate-800 text-orange-400 hover:bg-slate-700 rounded-md w-full' type='submit'>Submit</button>
            </div>
        </form>

    </div>
  )
}