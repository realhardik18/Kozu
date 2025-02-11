"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";

const NewCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [dailyCommitment, setDailyCommitment] = useState(1);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const getYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : "";
  };

  const getBinaryDays = () => {
    return daysOfWeek.map((day) => (selectedDays.includes(day) ? "1" : "0")).join("");
  };

  const handleSubmit = async () => {
    const youtubeId = getYouTubeId(videoUrl);
    const selectedDaysBinary = getBinaryDays();
    const url = `http://127.0.0.1:5000/create_kosu?id=${youtubeId}&df=${selectedDaysBinary}&dc=${dailyCommitment}`;

    try {
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        console.log("Request successful!");
        window.location.reload(); // Refresh the page after successful request
      } else {
        console.error("Request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg flex flex-col justify-center items-center cursor-pointer h-36 w-56 hover:bg-gray-700 transition transform hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={28} className="text-white" />
        <p className="text-white mt-2 font-semibold text-sm">Add a New Card</p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl w-96 max-w-full transform transition-all duration-300 scale-95 hover:scale-100">
            <h2 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Add a Video
            </h2>
            <input
              type="text"
              placeholder="Enter YouTube URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg mb-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <p className="text-gray-300 text-sm mb-2">Select Days:</p>
            <div className="flex justify-center gap-2 mb-6">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedDays.includes(day)
                      ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
            <p className="text-gray-300 text-sm mb-2">Daily Commitment (Hours):</p>
            <input
              type="number"
              min="1"
              value={dailyCommitment}
              onChange={(e) => setDailyCommitment(Number(e.target.value))}
              className="w-full bg-gray-700 text-white p-3 rounded-lg mb-6 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-all transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-green-500 hover:to-blue-500 transition-all transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCard;
