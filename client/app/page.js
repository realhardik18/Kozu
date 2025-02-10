"use client";

import { FaChartLine, FaBolt, FaFolder } from "react-icons/fa";
import Navbar from "./_components/Navbar";
import { motion } from "framer-motion";

const features = [
  {
    title: "Improve Your Pace",
    description: "Enhance your learning speed with AI-powered optimizations.",
    icon: <FaBolt size={40} />, 
  },
  {
    title: "Progress Tracking",
    description: "Keep track of your learning journey seamlessly.",
    icon: <FaChartLine size={40} />, 
  },
  {
    title: "Organize Videos in One Place",
    description: "Easily store and manage all your learning resources.",
    icon: <FaFolder size={40} />, 
  },
];

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-black relative text-white px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000428] to-[#004e92] animate-pulse opacity-50" />
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mt-16 relative"
        >
          <div className="bg-white/10 text-sm px-4 py-1 rounded-full inline-block mb-4">
            Our AI-generated courses have helped thousands!
          </div>
          <h1 className="text-5xl font-bold">
            Transform Any <span className="text-blue-400 animate-pulse">Video</span> Into a Course
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Learn faster with structured, interactive content powered by AI.
          </p>
          <motion.div
            className="mt-6 flex gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-300">
              Get Started
            </button>
            <button className="border border-gray-400 px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-800">
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl relative"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 p-6 rounded-lg text-center flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              {feature.icon}
              <h2 className="mt-4 text-xl font-semibold">{feature.title}</h2>
              <p className="text-gray-300 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}