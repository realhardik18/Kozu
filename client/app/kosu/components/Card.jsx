'use client'
import React from "react";
import Link from "next/link";

const Card = ({ title, author, length, completion_status, completion_percentage, isCompleted }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <img
        src="data:image/png;base64,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" // Placeholder for video thumbnail
        alt="Video Thumbnail"
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-400">{author}</p>
        <p className="text-gray-400">{length}</p>
        {!isCompleted && (
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${completion_percentage}%` }}
            ></div>
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Open on YouTube
          </a>
          <Link href={"/kosu/121212"}>
          <button            
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Kosu
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;