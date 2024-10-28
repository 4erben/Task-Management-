import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { editTask, editUserTask} from "../Redux/Slices/tasks.Slice";
import { useNavigate, useParams } from 'react-router-dom';
import { editTaskSchema } from '../utils/Validations/TaskSchema';




export default function EditTask() {
    const token = useSelector(state=>state.user.accessToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allTasks = useSelector(state=>state.tasks.tasks);
    const {id} = useParams();

    const task = allTasks.find(task=>task._id===id);

    
    const [imagePreview, setImagePreview] = useState(task?.image);
/*     const taskSchema = Yup.object().shape({
        title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
        description: Yup.string().required("Description is required"),
        priority: Yup.string().oneOf(["low", "medium", "high"], "Priority is required"),
        state: Yup.string().oneOf(["todo", "doing", "done"], "State is required"),
    }); */
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(editTaskSchema),
        defaultValues:task
      });
    //handle submit 
    const onSubmit = (data) => {
        const taskData = {
            // Use the existing image if no new image is uploaded
            image: data.image && data.image[0] instanceof File ? null : task.image,
            title: data.title,
            description: data.description,
            priority: data.priority,
            state: data.state,
        };
    
        // If a new image is uploaded, read it as a Base64 string
        if (data.image && data.image[0] instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update the image in taskData after reading the file
                taskData.image = reader.result;
                // Dispatch the editTask action with the updated taskData
                dispatch(editUserTask({
                    token,taskId:id,taskData
                }))
                /* dispatch(editTask({
                    id: id,
                    updatedData: taskData
                })); */
                // Navigate after the dispatch
                navigate("/");
            };
            reader.readAsDataURL(data.image[0]); // Convert the image to Base64
        } else {
            // Use the default image if no new image is uploaded
            taskData.image = task.image;
            // Dispatch the editTask action with the existing image
            dispatch(editUserTask({
                token,taskId:id,taskData
            }))
            /* dispatch(editTask({
                id: id,
                updatedData: taskData
            })); */
            // Navigate after the dispatch
            navigate("/");
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
    <div className='card centered'>
        <form className=' font-semibold flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <div className='text-center text-3xl text-orange-400'>
                <h3>Edit Your Task</h3>
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
