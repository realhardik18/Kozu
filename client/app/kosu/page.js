'use client'
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Navbar from "../_components/Navbar";
import Card from "./components/Card";
import NewCard from "./components/NewCard";

const CardsPage = () => {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_kosu'); // Replace with your API endpoint
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
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="pt-16 p-6">
      <Navbar />
      <h1 className="mt-10 text-3xl font-bold flex items-center">Hi realhardik18 👋</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data.kosu.map((item, index) => (
          <Card
            key={index}
            title={item.meta_data.title}
            author={item.meta_data.by}
            length={item.meta_data.duration}
            completion_status={false}
            completion_percentage={0}
            isCompleted={false}
            thumbnail_url={item.meta_data.thumbnail_url}
            video_url={item.meta_data.url}
            by_url={item.meta_data.by_url}
            id={item.id}
          />
        ))}

        {/* Add New Kosu Button */}
        <NewCard/>
      </div>
    </div>
  );
};

export default CardsPage;
