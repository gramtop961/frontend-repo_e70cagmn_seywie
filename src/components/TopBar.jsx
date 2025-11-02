import React from 'react'
import { User } from 'lucide-react'

export default function TopBar({ username }) {
  return (
    <div className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-[4px] shadow-lg shadow-purple-500/30" />
        <h1 className="text-white font-black tracking-widest text-sm uppercase select-none">
          8Bit Chat
        </h1>
      </div>
      <div className="flex items-center gap-2 text-xs text-white/80">
        <User className="h-4 w-4 text-purple-300" />
        <span className="font-mono bg-white/5 border border-white/10 rounded px-2 py-1 leading-none">
          {username}
        </span>
      </div>
    </div>
  )
}
