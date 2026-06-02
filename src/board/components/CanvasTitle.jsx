import { FaCheck, FaEdit } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

function CanvasTitle({value, onChange}) {
  const [title, setTitle] = useState(value); // 초기값만 할당.
  useEffect(() => {
    setTitle(value);
  }, [value]);

  const [isEditing, setIsEditing] = useState(false);

  const handleDoneTitle = () => {
    setIsEditing(false);
    onChange(title);
  };

  return (
    <div className="flex items-center justify-center mb-10">
      {isEditing ? ( // isEditing = true
        <div className="flex items-center">
          <input
            type="text"
            className="text-4xl font-bold text-center text-blue-600 bg-transparent border-b-2 border-blue-600 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label="Save title"
            onClick={handleDoneTitle}
          >
            <FaCheck />
          </button>
        </div>
      ) : (
        // isEditing = false
        <>
          <h1 className="text-4xl font-bold text-center ">{title}</h1>
          <button
            className="ml-2 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            aria-label="Edit title"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
}

export default CanvasTitle;
