import React from 'react';
import type { ToastType } from '../../types';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

// Fix: Replaced JSX.Element with React.ReactElement to avoid relying on a global JSX namespace.
const icons: Record<ToastType, React.ReactElement> = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const colors: Record<ToastType, string> = {
    success: 'border-green-400 text-green-400',
    error: 'border-red-500 text-red-500',
    info: 'border-neon-cyan text-neon-cyan',
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`flex items-center justify-between w-full max-w-xs p-4 bg-dark-bg/80 backdrop-blur-sm border-l-4 ${colors[type]} rounded-lg shadow-lg animate-fade-in`}
      role="alert"
    >
      <div className="flex items-center">
         <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
           {icons[type]}
        </div>
        <div className="ml-3 text-sm font-normal text-gray-200">{message}</div>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-dark-bg text-gray-400 hover:text-neon-cyan rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-800 inline-flex h-8 w-8"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Toast;
