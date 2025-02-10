"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-20 backdrop-blur-lg bg-[#0D0B14]/80 border-b border-gray-700 shadow-lg px-6 py-4 flex items-center justify-between"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-2xl font-extrabold text-white tracking-wide"
      >
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Kosu
        </span>
      </motion.div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-white">
        <Link
          href="/kosu"
          className="relative transition duration-300 hover:text-blue-400"
        >
          My Kosu
        </Link>

        <SignedOut>
          <Link
            href="/sign-in"
            className="relative transition duration-300 hover:text-blue-400"
          >
            Login
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </motion.nav>
  );
}
