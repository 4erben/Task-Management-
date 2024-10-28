import * as Yup from "yup";


//signing in schema
export const signinSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(1, 'Password must be at least 6 characters').required('Password is required')
  });




//sign up schema

export const signupSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(1, 'Password must be at least 1 characters')
      .required('Password is required')
  });
  