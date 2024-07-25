import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Modal from './modal';

interface User {
  name: string;
  number: string;
  dob: Date;
  email: string;
  _id: string;
  profilePicture?: string;
}

interface FormData {
  name: string;
  number: string;
  dob: string;
  email: string;
  password: string;
  profilePicture: File | null;
}

const ProfileDisplay: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    number: '',
    dob: '',
    email: '',
    password: '',
    profilePicture: null
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      number: user.number,
      dob: new Date(user.dob).toISOString().substring(0, 10),
      email: user.email,
      password: '',
      profilePicture: null
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingUser) {
      try {
        const updatedUser = new FormData();
        updatedUser.append('name', formData.name);
        updatedUser.append('number', formData.number);
        updatedUser.append('dob', formData.dob);
        updatedUser.append('email', formData.email);
        if (formData.password) {
          updatedUser.append('password', formData.password);
        }
        if (formData.profilePicture) {
          updatedUser.append('profilePicture', formData.profilePicture);
        }
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        await axios.put(`http://localhost:5000/users/${editingUser._id}`, updatedUser, config);
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
        setEditingUser(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Failed to update user', error);
      }
    }
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData({ ...formData, profilePicture: event.target.files[0] });
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">User Profiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <motion.div
            key={user._id}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md transition transform hover:scale-105"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <img
                src={user.profilePicture ? `http://localhost:5000${user.profilePicture}` : "https://via.placeholder.com/150"}
                alt={user.name}
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">{user.number}</p>
              <p className="text-gray-700 dark:text-gray-300">{new Date(user.dob).toLocaleDateString()}</p>
              <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
              <div className="flex mt-4 space-x-2 w-full">
                <button
                  onClick={() => handleEdit(user)}
                  className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="flex-1 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 dark:text-white dark:bg-gray-900 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="number" className="block text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input
                id="number"
                type="text"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="dob" className="block text-gray-700 dark:text-gray-300">Date of Birth</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 border rounded bg-gray-100 dark:text-white dark:bg-gray-900 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="profilePicture" className="block text-gray-700 dark:text-gray-300">Profile Picture</label>
              <input
                id="profilePicture"
                type="file"
                onChange={handleProfilePictureChange}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-600"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ProfileDisplay;
