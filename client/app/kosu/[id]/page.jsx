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
  const [editingIndex, setEditingIndex] = useState(null);
  const [chapterTimes, setChapterTimes] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/vid_info/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        const initialTimes = result.meta_data.chapter_info.reduce((acc, chapter, index) => {
          acc[index] = chapter.cursor || "00:00:00";
          return acc;
        }, {});
        setChapterTimes(initialTimes);
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

  const handleTimeChange = (index, newTime) => {
    setChapterTimes((prev) => ({
      ...prev,
      [index]: newTime,
    }));
  };

  const handleSaveTime = async (index) => {
    const formattedTime = formatTime(chapterTimes[index]);
    try {
      await fetch(`http://127.0.0.1:5000/update_cursor?id=${id}&cursor=${formattedTime}`);
      setEditingIndex(null);
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

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-gray-400">No data found</div>
      </div>
    );

  return (
    <div>
      <Navbar />
      <TooltipProvider>
        <div className="min-h-screen bg-black">
          <div className="max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 font-mono text-white">
              {/* Chapter List as a To-Do List */}
              <div className="w-full md:w-1/3">
                <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-6">Chapters</h2>
                  <div
                    className="max-h-[400px] overflow-y-auto pr-2 mb-6
                              scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
                  >
                    <ul className="space-y-4">
                      {data.meta_data.chapter_info.map((chapter, index) => (
                        <li key={index} className="flex items-center gap-3 group">
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded-sm border-2 border-gray-600 
                                   bg-gray-800 checked:bg-white checked:border-white
                                   transition-colors duration-200 cursor-pointer"
                            checked={completedChapters.includes(index)}
                            onChange={() => toggleChapter(index)}
                          />
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                            {chapter.chapter_name}
                          </span>
                          {editingIndex === index ? (
                            <input
                              type="text"
                              value={chapterTimes[index]}
                              onChange={(e) => handleTimeChange(index, e.target.value)}
                              className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm w-20"
                            />
                          ) : (
                            <span className="text-gray-400 text-sm">@{chapterTimes[index]}</span>
                          )}
                          {editingIndex === index ? (
                            <Save
                              size={16}
                              className="text-green-400 cursor-pointer hover:text-green-500"
                              onClick={() => handleSaveTime(index)}
                            />
                          ) : (
                            <Pencil
                              size={16}
                              className="text-gray-400 cursor-pointer hover:text-white"
                              onClick={() => setEditingIndex(index)}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Progress value={progress} className="w-full bg-gray-800" indicatorClassName="bg-white" />
                    <p className="text-sm text-gray-400">{progress}% completed</p>
                  </div>
                </div>
              </div>

              {/* Video and Details */}
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
                  <div className="relative mb-4">
                    <p className="text-gray-300 pr-8">{data.meta_data.summarized_description}</p>
                    <Tooltip content="AI-generated summary">
                      <Info
                        className="absolute top-0 right-0 cursor-pointer text-gray-400 
                                   hover:text-white transition-colors duration-200"
                      />
                    </Tooltip>
                  </div>
                  <a
                    href={data.meta_data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 
                           rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    Open on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
