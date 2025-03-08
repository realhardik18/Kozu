"use client"

import React from 'react'
import SideNav from '../_components/SideNav'

function Notes() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My notes</h1>
            <p className="text-zinc-400">Here are your personal notes</p>
          </div>          
        </main>
      </div>
    </div>
  )
}

export default Notes