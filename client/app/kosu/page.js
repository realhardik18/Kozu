'use client'
import React from "react";
import Card from "./components/Card";
import Navbar from "../_components/Navbar";

const kosuData = [
  { title: "Kosu 1", author: "Author A", length: "10 min", completion_status: false, completion_percentage: 50 },
  { title: "Kosu 2", author: "Author B", length: "15 min", completion_status: false, completion_percentage: 20 },
  { title: "Kosu 3", author: "Author C", length: "20 min", completion_status: true, completion_percentage: 100 },
  { title: "Kosu 4", author: "Author D", length: "5 min", completion_status: false, completion_percentage: 0 },
  { title: "Kosu 5", author: "Author E", length: "8 min", completion_status: true, completion_percentage: 100 },
];

const CardsPage = () => {
  const activeKosu = kosuData
    .filter(kosu => !kosu.completion_status)
    .sort((a, b) => a.completion_percentage - b.completion_percentage);
  
  const completedKosu = kosuData.filter(kosu => kosu.completion_status);

  return (
    <div>
      <Navbar/>
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-4">Active Kosu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeKosu.map((kosu, index) => (
            <Card key={index} {...kosu} isCompleted={false} />
          ))}
        </div>
        
        <h1 className="text-2xl font-bold mt-8 mb-4">Completed Kosu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedKosu.map((kosu, index) => (
            <Card key={index} {...kosu} isCompleted={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsPage;