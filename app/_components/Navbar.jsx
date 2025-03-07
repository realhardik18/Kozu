"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-black/50 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Kozu
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-zinc-400 hover:text-white">
                Dashboard
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" className="text-zinc-400 hover:text-white">
                <Github className="size-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}