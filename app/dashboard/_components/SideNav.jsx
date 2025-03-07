"use client"

import { cn } from "@/lib/utils"
import { 
  VideoIcon, 
  ListTodo, 
  BookOpen, 
  Library, 
  ChevronLeft,
  Settings,
  Bell,
  Star,
  History,
  Folder,
  PlusCircle
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "My Library",
        icon: Library,
        href: "/dashboard",
      },
      {
        title: "My Videos",
        icon: VideoIcon,
        href: "/dashboard/videos",
      },
      {
        title: "My Tasks",
        icon: ListTodo,
        href: "/dashboard/tasks",
      },
      {
        title: "My Notes",
        icon: BookOpen,
        href: "/dashboard/notes",
      },
    ]
  },
  {
    title: "Library",
    items: [
      {
        title: "Recent",
        icon: History,
        href: "/dashboard/recent",
      },
      {
        title: "Favorites",
        icon: Star,
        href: "/dashboard/favorites",
      },
      {
        title: "Collections",
        icon: Folder,
        href: "/dashboard/collections",
      }
    ]
  }
]

export default function SideNav() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(
      "relative h-screen border-r border-zinc-800 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Image 
            src="/icon.png" 
            alt="Kozu" 
            width={32} 
            height={32} 
            className="flex-shrink-0"
          />
          {!collapsed && <span className="text-lg font-semibold text-zinc-100">Kosu</span>}
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 z-10 rounded-full border border-zinc-800 bg-zinc-900"
        onClick={() => setCollapsed(!collapsed)}
      >
        <ChevronLeft className={cn(
          "h-4 w-4 transition-all",
          collapsed ? "rotate-180" : "rotate-0"
        )} />
      </Button>

      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              {!collapsed && (
                <h3 className="mb-2 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                      pathname === item.href 
                        ? "bg-blue-500/10 text-blue-400" 
                        : "text-zinc-400 hover:bg-zinc-800/50",
                      collapsed && "justify-center"
                    )}
                  >
                    <item.icon className="size-5 flex-shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-auto px-4">
            {!collapsed && (
              <Button 
                className="w-full mb-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
              >
                <PlusCircle className="size-4 mr-2" />
                New Collection
              </Button>
            )}
          </div>
          <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://github.com/shadcn.png"
                alt="User"
                className="rounded-full w-10 h-10"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-100">John Doe</span>
                <span className="text-xs text-zinc-400">john@example.com</span>
              </div>
            )}
          </div>
        </div>          
        </div>
              
      </div>
    </div>
  )
}
