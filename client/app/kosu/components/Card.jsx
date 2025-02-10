import React from "react";

const Card = ({ title, author, length, completion_percentage, isCompleted }) => {
  return (
    <div className={`p-5 rounded-lg shadow-lg transition-all duration-300 ${isCompleted ? "bg-green-700" : "bg-gray-800"}`}>
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-gray-300">Author: <span className="text-white">{author}</span></p>
      <p className="text-gray-300">Length: <span className="text-white">{length}</span></p>
      
      <div className="mt-3">
        {isCompleted ? (
          <p className="text-green-300 font-semibold">Completed</p>
        ) : (
          <div>
            <p className="text-yellow-400 mb-1">Progress: {completion_percentage}%</p>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden relative">
              <div
                className="h-full bg-yellow-400 transition-all duration-300 absolute left-0 top-0"
                style={{ width: `${completion_percentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
