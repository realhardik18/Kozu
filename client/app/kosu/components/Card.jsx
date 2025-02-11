'use client'
import React from "react";
import Link from "next/link";

const Card = ({ title, author, length, completion_status, completion_percentage, isCompleted, thumbnail_url, video_url, by_url, id }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <img
        src={thumbnail_url} // Use the thumbnail_url from the API
        alt="Video Thumbnail"
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-400">
          <a href={by_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {author}
          </a>
        </p>
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
            href={video_url} // Use the video URL directly
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Open on YouTube
          </a>
          <Link href={`/kosu/${id}`}>
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