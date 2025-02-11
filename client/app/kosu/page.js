"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Navbar from "../_components/Navbar";
import Card from "./components/Card";
import NewCard from "./components/NewCard";
import Link from "next/link";

const CardsPage = () => {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  function timeToSeconds(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

function timePercentage(part, total) {
    const partSeconds = timeToSeconds(part);
    const totalSeconds = timeToSeconds(total);
    
    if (totalSeconds === 0) return 0; // Prevent division by zero

    return (partSeconds / totalSeconds) * 100;
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_kosu");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center font-mono">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!data || data.kosu.length === 0) {
    return (
      <div>
        <Navbar/>
      <div className="bg-black text-white min-h-screen flex items-center justify-center font-mono">
        <div className="text-gray-400 text-lg">          
          You have no Kosu.{" "}          
            Start by creating one!
            <div className="fixed bottom-8 right-8 z-50">
          <NewCard className="bg-blue-600 hover:bg-blue-700" />
        </div>            
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen w-full font-mono">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* User Info */}
        <div className="text-left mb-10">
          <h1 className="text-4xl font-bold">Hi, {user?.firstName || "there"} 👋</h1>
          <p className="mt-2 text-gray-400 text-lg">
            Your AI-powered learning courses are here.
          </p>
        </div>
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {data.kosu.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg shadow-lg border border-gray-700 
                         transform transition-all duration-300 
                         hover:bg-gray-800 hover:border-gray-600 hover:-translate-y-1"
            >
              <div className="p-4">
                <Card
                  title={item.meta_data.title}
                  author={item.meta_data.by}
                  length={item.meta_data.duration}
                  completion_status={false}
                  completion_percentage={timePercentage(item.video_cursor, item.meta_data.duration)}
                  isCompleted={false}
                  thumbnail_url={item.meta_data.thumbnail_url}
                  video_url={item.meta_data.url}
                  by_url={item.meta_data.by_url}
                  id={item.id}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add New Kosu Button - Moved to bottom right */}
        <div className="fixed bottom-8 right-8 z-50">
          <NewCard className="bg-blue-600 hover:bg-blue-700" />
        </div>
      </div>
    </div>
  );
};

export default CardsPage;
