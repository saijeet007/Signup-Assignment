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
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type FormData = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('https://signup-assignment.onrender.com/login', data);
      navigate('/profiles');
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Failed to login');
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Login</h2>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
          Login
        </motion.button>
      </motion.form>
      <ToastContainer />
    </motion.div>
  );
};

export default LoginForm;
