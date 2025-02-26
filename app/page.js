"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Youtube, Smartphone, Chrome, Sparkles, BookOpen, Brain, ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import Navbar from "@/components/Navbar" // Import Navbar component

export default function Component() {
  const targetRef = useRef(null) // Fix useRef initialization
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  
  // Add state for email input and loading state
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  // Function to handle email submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!email || !email.includes('@')) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' })
      return
    }
    
    setLoading(true)
    setStatus(null)
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email          
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus({ type: 'success', message: 'Thanks for joining our waitlist!' })
        setEmail("")
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      setStatus({ type: 'error', message: 'Failed to submit. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 selection:text-white">
      <Navbar /> {/* Add Navbar component */}
      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
          <motion.div style={{ y, opacity }} className="absolute inset-0">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          </motion.div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-32 md:py-48">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
                  Coming Soon
                </span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Learn from YouTube,
                <span className="block mt-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
                  Structured by AI
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
                Transform any YouTube video into an organized learning experience with AI-powered course structuring.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-2 relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-50 blur-lg group-hover:opacity-100 transition duration-500" />
                <div className="relative flex w-full gap-2 bg-zinc-900/50 p-1 rounded-lg backdrop-blur-xl">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    disabled={loading}
                  >
                    {loading ? 'Joining...' : 'Join Waitlist'}
                  </Button>
                </div>
              </form>
              
              {/* Status message */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                >
                  {status.message}
                </motion.div>
              )}
              
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <div className="flex items-center gap-1">
                  <Sparkles className="size-4" />
                  <span>AI-Powered</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
                <div className="flex items-center gap-1">
                  <BookOpen className="size-4" />
                  <span>Structured Learning</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
                <div className="flex items-center gap-1">
                  <Brain className="size-4" />
                  <span>Smart Progress</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Brain,
                title: "AI Analysis",
                description: "Smart breakdown of video content into structured learning modules with detailed insights and summaries.",
              },
              {
                icon: BookOpen,
                title: "Learning Paths",
                description: "Organized chapters and key points for effective learning, tailored to your progress and preferences.",
              },
              {
                icon: Sparkles,
                title: "Cross-Platform",
                description: "Seamless experience across web, mobile, and Chrome extension, ensuring you can learn anytime, anywhere.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500" />
                <div className="relative h-full bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50 hover:border-blue-500/50 transition-colors">
                  <div className="size-12 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="size-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-zinc-100">{feature.title}</h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Available Everywhere</h2>
            <p className="text-zinc-400">Access your structured learning content across all platforms</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Chrome, label: "Chrome Extension", desc: "Learn as you watch with our intuitive Chrome extension." },
              { icon: Smartphone, label: "Mobile App", desc: "Learn on the go with our feature-rich mobile app." },
              { icon: Youtube, label: "Web Platform", desc: "Learn from anywhere with our comprehensive web platform." },
            ].map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500" />
                <div className="relative p-6 rounded-xl bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 hover:border-blue-500/50 transition-all">
                  <div className="size-14 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4 mx-auto">
                    <platform.icon className="size-7 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">{platform.label}</h3>
                  <p className="text-zinc-400 text-sm">{platform.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-400/20" /> {/* Change to red */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-500/30 via-transparent to-transparent" /> {/* Change to red */}
            </div>
            <div className="relative p-8 md:p-12 lg:p-16 text-center">
              <div className="max-w-2xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold">Top 50 Tech YouTube Videos on the Internet</h2> {/* Update title */}
                <p className="text-zinc-400 text-lg">
                  Powered by the community, discover the best tech videos curated for you.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} className="inline-flex items-center">
                  <Button className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-lg"> {/* Change to red */}
                    Coming Soon                    
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} Kozu. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-zinc-500 hover:text-zinc-400 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-400 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}