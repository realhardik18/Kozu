"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pencil, Save } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/app/_components/Navbar";

export default function ToDo() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [editingTime, setEditingTime] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/vid_info/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);

        const cursorResponse = await fetch(`http://127.0.0.1:5000/get_cursor?id=${id}`);
        if (!cursorResponse.ok) throw new Error("Failed to fetch cursor");
        const cursorResult = await cursorResponse.text();
        setCurrentTime(cursorResult.replace(/['"]+/g, ""));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const calculateProgress = (startTime, endTime, completedTime) => {
    const toSeconds = (time) => {
      const parts = time.split(":" ).map(Number);
      return parts[0] * 60 + (parts[1] || 0);
    };
    const start = toSeconds(startTime);
    const end = toSeconds(endTime);
    const completed = toSeconds(completedTime);
    return Math.min(100, Math.max(0, ((completed - start) / (end - start)) * 100));
  };

  const handleSaveTime = async () => {
    if (!currentTime) return;
    try {
      await fetch(`http://127.0.0.1:5000/update_cursor?id=${id}&cursor=${currentTime}`);
      setEditingTime(false);
    } catch (error) {
      console.error("Failed to update time:", error);
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center font-mono">Loading...</div>;
  if (error) return <div className="min-h-screen bg-black flex items-center justify-center font-mono text-red-500">Error: {error}</div>;
  if (!data) return <div className="min-h-screen bg-black flex items-center justify-center font-mono text-gray-400">No data found</div>;

  return (
    <div >
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
                  <ul className="space-y-4 overflow-y-auto max-h-96">
                    {data.meta_data.chapter_info.map((chapter, index) => {
                      const progress = calculateProgress(chapter.start_time, chapter.end_time, currentTime);
                      return (
                        <li key={index} className="space-y-1">
                          <span className="text-gray-300">{chapter.chapter_name}</span>
                          <Progress                                                        
                            bg="bg-transparent"
                            value={progress}
                            className="w-5/6"
                            indicatorClassName="bg-transparent"
                            style={{
                              backgroundColor: "#3f3f46", // Darker green for the empty part
                              "--indicator-bg": "#004d00", // Brighter green for the filled progress
                            }}
                          />

                          <p className="text-xs text-gray-400">{progress.toFixed(2)}% completed</p>
                        </li>
                      );
                    })}
                  </ul>
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
                  <p className="text-gray-300">{data.meta_data.summarized_description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
