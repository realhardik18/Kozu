"use client";

import { useParams } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import React, { useState, useEffect } from "react";
import VideoCard from "./_components/VideoCard";

export default function BlogPost() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the public folder
        const response = await fetch('C:\Users\hardi\Documents\.hrdk\HandyMan\client\public\kosu.json');
        const data = await response.json();
        const videoData = data.chapter_info.find((item) => item.id === id);
        setVideo(videoData || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div>
      <Navbar />
      <VideoCard video={video} />
    </div>
  );
}