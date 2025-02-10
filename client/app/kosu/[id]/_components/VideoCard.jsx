import React from "react";

function VideoCard({ video }) {
  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <img
        src={video.thumbnail_url}
        alt={video.title}
        className="w-full h-60 object-cover rounded-md"
      />
      <div className="mt-4 text-center">
        <h2 className="text-lg font-bold">{video.title}</h2>
        <a
          href={video.by_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {video.by}
        </a>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {video.summarized_description}
        </p>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Watch Video
        </a>
      </div>
    </div>
  );
}

export default VideoCard;
