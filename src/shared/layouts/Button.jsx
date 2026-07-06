import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const COLOR_STYLES = {
  blue: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
  red: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
  green: 'bg-green-500 hover:bg-green-600 focus:ring-green-500',
  gray: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500',
};

function Button({ loading = false, onClick, className = '', color = 'gray', children }) {
  const clazz = [
    'text-white font-bold py-1.5 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50',
    COLOR_STYLES[color] || COLOR_STYLES.blue,
    className,
  ].join(' ');

  const handleClick = () => {
    if (loading) {
      return;
    }
    onClick();
  };

  return (
      <button className={clazz} onClick={handleClick} disabled={loading}>
      <span className="flex items-center justify-center">
        {loading && <FaSpinner className='animate-spin mr-2' />}
        {children}
      </span>
      </button>
  );
}

export default Button;