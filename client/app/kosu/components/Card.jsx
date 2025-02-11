'use client'
import React from "react";
import Link from "next/link";

const Card = ({ 
  title, 
  author, 
  length, 
  completion_status, 
  completion_percentage, 
  isCompleted, 
  thumbnail_url, 
  video_url, 
  by_url, 
  id 
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Thumbnail Container with Overlay Effect */}
      <div className="relative group overflow-hidden rounded-t-lg">
        <img
          src={thumbnail_url}
          alt={title}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4">
        {/* Title with truncation */}
        <h2 className="text-xl font-bold line-clamp-2 mb-2 text-white">
          {title}
        </h2>

        {/* Author and Duration Info */}
        <div className="mb-3 space-y-1">
          <a 
            href={by_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
          >
            {author}
          </a>
          <p className="text-sm text-gray-500">
            {length}
          </p>
        </div>

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="w-full bg-gray-700 rounded-full h-1.5 mb-4">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${completion_percentage}%` }}
            />
          </div>
        )}

        {/* Button Container */}
        <div className="mt-auto flex gap-3">
          <a
            href={video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg 
                     transition-colors duration-200 text-center text-sm font-medium"
          >
            Open in YouTube
          </a>
          <Link 
            href={`/kosu/${id}`}
            className="flex-1"
          >
            <button            
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg 
                       transition-colors duration-200 text-sm font-medium"
            >
              Go To Kosu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;