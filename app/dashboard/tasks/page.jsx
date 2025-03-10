"use client"

import React from 'react'
import SideNav from '../_components/SideNav'
import { useSession } from 'next-auth/react';

function Tasks() {
  const { data: session, status } = useSession();
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <SideNav name={session.user.name} email={session.user.email} avatar_url={session.user.image}/>
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