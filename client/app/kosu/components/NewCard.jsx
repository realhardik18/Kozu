"use client";
import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react"; // Import Loader2 for the spinner

const NewCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [dailyCommitment, setDailyCommitment] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // New loading state

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
    setIsLoading(true); // Set loading to true when the request starts
    const youtubeId = getYouTubeId(videoUrl);
    const selectedDaysBinary = getBinaryDays();
    

    try {
        const url = `http://127.0.0.1:5000/create_kosu?id=${youtubeId}&df=${selectedDaysBinary}&dc=${dailyCommitment}`;
        const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        console.log("Request successful!");
        window.location.reload(); // Refresh the page after successful request
      } else {
        console.error("Request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Reset loading state when the request completes
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Circular Add Button */}
      <button
        className="flex items-center justify-center w-14 h-14 bg-gray-800 rounded-full shadow-lg 
                   hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={24} className="text-white" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-96 max-w-full">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Add a Video</h2>
            <input
              type="text"
              placeholder="Enter YouTube URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg mb-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-gray-300 text-sm mb-2">Select Days:</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedDays.includes(day)
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
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
              className="w-full bg-gray-700 text-white p-3 rounded-lg mb-6 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-all" // Red color for cancel button
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading} // Disable the button when loading
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> {/* Spinner */}
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCard;