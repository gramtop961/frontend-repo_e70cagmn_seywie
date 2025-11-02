import React, { useEffect, useMemo, useState } from 'react'
import TopBar from './components/TopBar'
import HeroSection from './components/HeroSection'
import ChatList from './components/ChatList'
import ChatInput from './components/ChatInput'

function randomUser() {
  const existing = localStorage.getItem('eightbit_username')
  if (existing) return existing
  const id = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0')
  const name = `Player-${id}`
  localStorage.setItem('eightbit_username', name)
  return name
}

export default function App() {
  const [room] = useState('global')
  const [username, setUsername] = useState('')
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    setUsername(randomUser())
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#0a0316] to-black text-white flex flex-col">
      <TopBar username={username} />
      <HeroSection />

      <div className="relative mx-auto w-full max-w-md flex-1 flex flex-col rounded-none border-x-4 border-purple-400 bg-black/50 backdrop-blur-sm">
        <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-purple-200/80 bg-black/40 border-b border-white/10">
          Room: {room}
        </div>
        <ChatList key={refresh} room={room} username={username} />
        <ChatInput room={room} username={username} onSent={() => setRefresh((n) => n + 1)} />
      </div>

      <footer className="mx-auto w-full max-w-md px-4 py-3 text-center text-[10px] text-white/40">
        Built with a retro 8-bit vibe • Dark neon theme
      </footer>
    </div>
  )
}
