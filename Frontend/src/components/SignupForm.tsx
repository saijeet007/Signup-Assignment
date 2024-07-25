import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  number: z.string().regex(/^\d{10}$/, 'Invalid mobile number'),
  dob: z.string().min(1, 'Enter your DOB'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type FormData = z.infer<typeof schema>;

const SignupForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('https://signup-assignment.onrender.com/signup', data);
      toast.success('User registered successfully!');
      navigate('/profiles');
    } catch (error) {
      toast.error('Failed to register user');
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Sign Up</h2>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name</label>
          <motion.input
            id="name"
            {...register('name')}
            className="w-full p-2 border rounded bg-gray-100 dark:text-white dark:bg-gray-900 dark:border-gray-600"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="number" className="block text-gray-700 dark:text-gray-300">Mobile Number</label>
          <motion.input
            id="number"
            {...register('number')}
            className="w-full p-2 border rounded bg-gray-100 dark:text-white dark:bg-gray-900 dark:border-gray-600"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          {errors.number && <p className="text-red-500">{errors.number.message}</p>}
        </div>
        <div>
          <label htmlFor="dob" className="block text-gray-700 dark:text-gray-300">Date of Birth</label>
          <motion.input
            id="dob"
            type="date"
            {...register('dob')}
            className="w-full p-2 border rounded bg-gray-100 dark:text-white dark:bg-gray-900 dark:border-gray-600"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
          <motion.input
            id="email"
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded bg-gray-100 dark:text-white dark:bg-gray-900 dark:border-gray-600"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
          <motion.input
            id="password"
            type="password"
            {...register('password')}
            className="w-full p-2 border rounded bg-gray-100 dark:text-white dark:bg-gray-900 dark:border-gray-600"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <motion.button
          type="submit"
          disabled={!isValid}
          className={`w-full p-2 ${isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'} text-white rounded`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Sign Up
        </motion.button>
      </motion.form>
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300">Already have an account? <a href="/login" className="text-blue-500">Login here</a></p>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default SignupForm;
