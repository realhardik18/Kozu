"use client";

import React, { useState, useEffect } from 'react';
import SideNav from "./_components/SideNav";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const sampleVideos = [
  {
    id: "1",
    title: "Introduction to React",
    channel: "React Masters",
    duration: "15:30",
    progress: 65,
    thumbnail: "https://source.unsplash.com/random/800x600/?coding",
    description: "Learn the basics of React in this introductory video.",
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    channel: "TypeScript Guru",
    duration: "22:45",
    progress: 30,
    thumbnail: "https://source.unsplash.com/random/800x600/?programming",
    description: "Explore advanced TypeScript patterns and techniques.",
  },
  {
    id: "3",
    title: "Next.js 14 Fundamentals",
    channel: "Next.js Official",
    duration: "18:20",
    progress: 90,
    thumbnail: "https://source.unsplash.com/random/800x600/?javascript",
    description: "Understand the fundamentals of Next.js 14 in this video.",
  },
];

function Dashboard() {
  const { data: session, status } = useSession();
  const [videoID, setVideoID] = useState("");
  const [videos, setVideos] = useState(sampleVideos);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        const data = await response.json();
        setVideos([...sampleVideos, ...data.videos]);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You need to sign in to view this page.</p>;

  const handleAddVideo = async () => {
    try {
      const response = await fetch(`/api/getInfo?videoID=${videoID}`);
      const data = await response.json();
      if (response.ok) {
        const newVideo = {
          id: videoID,
          title: data.message.items[0].snippet.title,
          channel: data.message.items[0].snippet.channelTitle,
          duration: data.message.items[0].contentDetails.duration,
          progress: 0,
          thumbnail: data.message.items[0].snippet.thumbnails.high.url,
          description: data.message.items[0].snippet.description,
        };
        await fetch("/api/videos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video: newVideo }),
        });
        setVideos([...videos, newVideo]);
        setVideoID("");
        router.push(`/dashboard/video/${videoID}`);
      } else {
        console.error("Error fetching video info:", data.message);
      }
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <SideNav name={session.user.name} email={session.user.email} avatar_url={session.user.image}/>
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Library</h1>
            <p className="text-zinc-400">Continue where you left off</p>
          </div>          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500" />
                <div className="relative bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-zinc-800/50 hover:border-blue-500/50 transition-colors overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-700">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${video.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-zinc-100 mb-1">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                      <span>{video.channel}</span>
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;