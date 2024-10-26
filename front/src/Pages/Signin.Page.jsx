import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Slices/user.Slice';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(1, 'Password must be at least 6 characters').required('Password is required')
});

export default function Signin() {
    
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  
  // Mutation to post sign-in data
  const mutation = useMutation((formData) => {
    return axios.post(`${import.meta.env.VITE_API_URI}/signin`, formData);
  }, {
    onSuccess: (data) => {
      console.log('Sign-in successful:', data.data);
      //set user in application
      dispatch(setUser(data.data))
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.data));
      
      navigate("/");
    },
    onError: (error) => {
      console.error('Error signing in:', error.response.data);
    }
  });

  const onSubmit = (data) => {
    console.log(data); // Log the submitted data
    mutation.mutate(data); // Trigger the mutation with form data
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
      <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
          <p className="text-gray-100 font-semibold">Login to your account</p>
        </div>
        <div className="login-form">
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div className="flex items-center border-b border-gray-300">
                <i className="fas fa-user text-gray-600 mr-2"></i>
                <input 
                  type="text"
                  {...register('email')} // Register input with react-hook-form
                  placeholder="Email" 
                  className={`flex-1 py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded ${errors.email ? 'border-red-500' : ''}`} 
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <div className="flex items-center border-b border-gray-300">
                <i className="fas fa-lock text-gray-600 mr-2"></i>
                <input 
                  type="password"
                  {...register('password')} // Register input with react-hook-form
                  placeholder="Password" 
                  className={`flex-1 py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded ${errors.password ? 'border-red-500' : ''}`} 
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-500 transition duration-200">
              Login
            </button>
          </form>
        </div>
        <div className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-indigo-100 font-semibold hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
