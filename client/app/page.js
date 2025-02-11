"use client";

import { FaChartLine, FaBolt, FaFolder } from "react-icons/fa";
import Navbar from "./_components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Improve Your Pace",
    description: "Enhance your learning speed with AI-powered optimizations.",
    icon: <FaBolt size={50} className="text-white" />, 
  },
  {
    title: "Progress Tracking",
    description: "Keep track of your learning journey seamlessly.",
    icon: <FaChartLine size={50} className="text-white" />, 
  },
  {
    title: "Organize Videos in One Place",
    description: "Easily store and manage all your learning resources.",
    icon: <FaFolder size={50} className="text-white" />, 
  },
];
export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen w-full font-mono flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center px-8 py-20 w-full max-w-4xl">
        <h1 className="text-6xl font-bold text-white leading-tight">
          Transform Any <span className="text-gray-400">Video</span> Into a Course
        </h1>
        <p className="mt-6 text-xl text-gray-400 max-w-2xl">
          Learn faster with structured, interactive content powered by AI.
        </p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/kosu">
            <Button className="bg-white text-black hover:bg-gray-500 px-8 py-3 text-lg font-semibold rounded-lg shadow-md">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl pb-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
            <Card className="bg-gray-900 border border-gray-700 text-white p-6 text-center flex flex-col items-center justify-between h-auto min-h-[250px] shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] overflow-hidden">
              <CardContent className="flex flex-col items-center w-full h-full">
                {feature.icon}
                <h2 className="mt-4 text-2xl font-semibold">{feature.title}</h2>
                <p className="text-gray-400 mt-3 text-lg leading-tight break-words">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

