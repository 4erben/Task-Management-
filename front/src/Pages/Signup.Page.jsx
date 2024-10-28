import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import { signupSchema } from '../utils/Validations/UserSchema';
// Validation schema using Yup

export default function Signup() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signupSchema)
  });
    // Mutation to post sign-up data
    const mutation = useMutation((formData) => {
        return axios.post(`${import.meta.env.VITE_API_URI}/signup`, formData);
  }, {
    onSuccess: (data) => {
      console.log('Sign-up successful:', data.data);
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.data));
      setServerResponse(data.data.message);
      setServerError("")
      setTimeout(()=>{
        navigate("/signin");
      },2000)
      
    },
    onError: (error) => {
      console.error('Error signing up:', error.response.data);
      setServerError(error.response.data || 'An error occurred during sign up.');
      setServerResponse("")
    }
  });
  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
          <p className="text-gray-100 font-semibold">Sign up</p>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <div className="mb-4">
              <div className="flex items-center border-b border-gray-300">
                <i className="fas fa-user text-gray-600 mr-2"></i>
                <input 
                  type="text"
                  {...register('name')}
                  placeholder="Name" 
                  className={`flex-1 py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded ${errors.name ? 'border-red-500' : ''}`} 
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <div className="flex items-center border-b border-gray-300">
                <i className="fas fa-envelope text-gray-600 mr-2"></i>
                <input 
                  type="text"
                  {...register('email')}
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
                  {...register('password')}
                  placeholder="Password" 
                  className={`flex-1 py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded ${errors.password ? 'border-red-500' : ''}`} 
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {serverResponse && <p className="text-white bg-green-800 rounded-md py-2 font-bold text-center text-sm mb-4">{serverResponse}</p>}
            {serverError && <p className="text-white bg-red-500 rounded-md py-2 font-bold text-center text-sm mb-4">{serverError}</p>}
            <button type="submit" className="w-full py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-500 transition duration-200">
              Sign up
            </button>
          </form>
        </div>
        <div className="text-center mt-4">
          Already Have an Account? <Link to="/signin" className="text-indigo-100 font-semibold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
