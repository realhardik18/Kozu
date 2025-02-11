"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Info, Pencil, Save } from "lucide-react";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/app/_components/Navbar";

export default function ToDo() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [editingTime, setEditingTime] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch video information
        const response = await fetch(`http://127.0.0.1:5000/vid_info/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        
        // Fetch initial cursor time
        const cursorResponse = await fetch(`http://127.0.0.1:5000/get_cursor?id=${id}`);
        if (!cursorResponse.ok) {
          throw new Error("Failed to fetch cursor");
        }
        const cursorResult = await cursorResponse.text();        
        setCurrentTime(cursorResult.replace(/['"]+/g, ''));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const toggleChapter = (index) => {
    setCompletedChapters((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSaveTime = async () => {
    if (!currentTime) return;
    const formattedTime = formatTime(currentTime);
    try {
      await fetch(`http://127.0.0.1:5000/update_cursor?id=${id}&cursor=${formattedTime}`);
      setEditingTime(false);
    } catch (error) {
      console.error("Failed to update time:", error);
    }
  };

  const formatTime = (time) => {
    const parts = time.split(":").map((part) => part.padStart(2, "0"));
    return parts.join(":");
  };

  const progress = data
    ? Math.round((completedChapters.length / data.meta_data.chapter_info.length) * 100)
    : 0;

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center font-mono">Loading...</div>;
  if (error) return <div className="min-h-screen bg-black flex items-center justify-center font-mono text-red-500">Error: {error}</div>;
  if (!data) return <div className="min-h-screen bg-black flex items-center justify-center font-mono text-gray-400">No data found</div>;

  return (
    <div>
      <Navbar />
      <TooltipProvider>
        <div className="min-h-screen bg-black">
          <div className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 font-mono text-white">
              <div className="w-full md:w-1/3">
                <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-6">Chapters</h2>
                  <div className="flex items-center gap-3 mb-6">
                    {editingTime ? (
                      <>
                        <input
                          type="text"
                          value={currentTime || ""}
                          onChange={(e) => setCurrentTime(e.target.value)}
                          className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm w-20"
                        />
                        <Save
                          size={16}
                          className="text-green-400 cursor-pointer hover:text-green-500"
                          onClick={handleSaveTime}
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-gray-400 text-sm">@{currentTime}</span>
                        <Pencil
                          size={16}
                          className="text-gray-400 cursor-pointer hover:text-white"
                          onClick={() => setEditingTime(true)}
                        />
                      </>
                    )}
                  </div>
                  <ul className="space-y-4">
                    {data.meta_data.chapter_info.map((chapter, index) => (
                      <li key={index} className="flex items-center gap-3 group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-sm border-2 border-gray-600 bg-gray-800 checked:bg-white checked:border-white transition-colors duration-200 cursor-pointer"
                          checked={completedChapters.includes(index)}
                          onChange={() => toggleChapter(index)}
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                          {chapter.chapter_name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 space-y-2">
                    <Progress value={progress} className="w-full bg-gray-800" indicatorClassName="bg-white" />
                    <p className="text-sm text-gray-400">{progress}% completed</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg">
                  <h1 className="text-2xl font-bold mb-6">{data.meta_data.title}</h1>
                  <div className="relative pb-[56.25%] h-0 mb-6">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${data.id}`}
                      title={data.meta_data.title}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>s
      </TooltipProvider>
    </div>
  );
}
