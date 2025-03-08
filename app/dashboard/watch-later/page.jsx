"use client"

import React from 'react'
import SideNav from '../_components/SideNav'

function WatchLater() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Watch Later</h1>
            <p className="text-zinc-400">Watch Later</p>
          </div>          
        </main>
      </div>
    </div>
  )
}

export default WatchLater