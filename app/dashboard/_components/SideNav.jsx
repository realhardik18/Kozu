"use client"

import { cn } from "@/lib/utils"
import {
  ListTodo,
  BookOpen,
  Library,
  ChevronLeft,
  Settings,
  LogOut,
  User,
  Puzzle,
  Clock,
  Smartphone,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Library",
        icon: Library,
        href: "/dashboard",
      },
      {
        title: "Tasks",
        icon: ListTodo,
        href: "/dashboard/tasks",
      },
      {
        title: "Notes",
        icon: BookOpen,
        href: "/dashboard/notes",
      },
      {
        title: "Watch Later",
        icon: Clock,
        href: "/dashboard/watch-later",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        title: "Connect Extension",
        icon: Puzzle,
        href: "/dashboard/recent",
      },
      {
        title: "Connect Mobile",
        icon: Smartphone,
        href: "/dashboard/favorites",
      },
      {
        title: "Community",
        icon: Users,
        href: "/dashboard/collections",
      },
    ],
  },
]

export default function SideNav() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // This ensures animations only run after initial mount
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={cn(
        "relative h-screen border-r border-zinc-800 transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <Image
              src="/icon.png"
              alt="Kozu"
              width={32}
              height={32}
              className="flex-shrink-0 transition-transform duration-300 ease-in-out"
              style={{ transform: collapsed ? "scale(1.2)" : "scale(1)" }}
            />
            {!collapsed && (
              <div
                className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping opacity-75"
                style={{ animationDuration: "3s" }}
              />
            )}
          </div>
          <span
            className={cn(
              "text-lg font-semibold text-zinc-100 origin-left transition-all duration-300 ease-in-out",
              collapsed ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100",
            )}
          >
            Kosu
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 z-10 rounded-full border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 hover:border-zinc-700"
        onClick={() => setCollapsed(!collapsed)}
      >
        <ChevronLeft
          className={cn("h-4 w-4 transition-all duration-300 ease-in-out", collapsed ? "rotate-180" : "rotate-0")}
        />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="flex flex-col h-[calc(100%-80px)]">
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              {!collapsed && (
                <h3
                  className={cn(
                    "mb-2 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider transition-all duration-300 ease-in-out",
                    mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                  )}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out",
                      pathname === item.href
                        ? "bg-blue-500/10 text-blue-400"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200",
                      collapsed ? "justify-center" : "",
                      mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                    )}
                    style={{ transitionDelay: `${idx * 100 + itemIdx * 50}ms` }}
                  >
                    <item.icon
                      className={cn(
                        "flex-shrink-0 transition-all duration-300 ease-in-out",
                        collapsed ? "size-5" : "size-5",
                      )}
                    />
                    <span
                      className={cn(
                        "whitespace-nowrap transition-all duration-300 ease-in-out",
                        collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100",
                      )}
                    >
                      {item.title}
                    </span>
                    {pathname === item.href && (
                      <div
                        className={cn(
                          "absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full transition-all duration-300 ease-in-out",
                          collapsed ? "opacity-100" : "opacity-100",
                        )}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Profile Card */}
        <div
          className={cn(
            "p-3 mx-3 mb-4 rounded-xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 ease-in-out",
            collapsed ? "px-2" : "",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full p-2 h-auto hover:bg-zinc-800/50 transition-all duration-300 ease-in-out",
                  collapsed ? "justify-center" : "justify-start",
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="relative flex-shrink-0">
                    <Avatar className="border-2 border-zinc-800 h-10 w-10">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                  </div>
                  {!collapsed && (
                    <div className="flex flex-col items-start text-left overflow-hidden">
                      <span className="text-sm font-medium text-zinc-100 truncate w-full">John Doe</span>
                      <span className="text-xs text-zinc-400 truncate w-full">john@example.com</span>
                    </div>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={collapsed ? "center" : "end"}
              className="w-56 bg-zinc-900 border-zinc-800 text-zinc-200"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer text-red-400 hover:text-red-300">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

