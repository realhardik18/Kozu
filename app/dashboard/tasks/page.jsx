"use client"

import React from 'react'
import SideNav from '../_components/SideNav'

function Tasks() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <p className="text-zinc-400">Here are your tasks for the day</p>
          </div>          
        </main>
      </div>
    </div>
  )
}

export default Tasks