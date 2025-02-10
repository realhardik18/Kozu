"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between p-4 md:p-6 bg-[#0D0B14]/90 backdrop-blur-md border-b border-gray-700">
      <div className="flex items-center gap-2">        
        <span className="font-semibold text-white">Kosu</span>
      </div>
      <div className="flex items-center gap-4 md:gap-6 text-white">
        <Link href="/kosu" className="hover:text-[#6B4EAE] transition-colors">
          My Kosu
        </Link>
        <SignedOut>
          <Link href="/sign-in" className="hover:text-[#6B4EAE] transition-colors">
            Login
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
