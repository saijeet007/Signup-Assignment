import React from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-700 dark:text-gray-300">
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
