import React from "react";

const Card = ({ title, author, length, completion_percentage, isCompleted }) => {
  return (
    <div className={`p-4 rounded-lg shadow-lg ${isCompleted ? "bg-green-700" : "bg-gray-800"}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-400">Author: {author}</p>
      <p className="text-gray-400">Length: {length}</p>
      <p className={isCompleted ? "text-gray-100" : "text-yellow-400"}>
        {isCompleted ? "Completed" : `Progress: ${completion_percentage}%`}
      </p>
    </div>
  );
};

export default Card;
