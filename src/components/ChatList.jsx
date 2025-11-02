import React, { useEffect, useRef, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ChatList({ room = 'global', username }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  async function loadMessages() {
    try {
      const res = await fetch(`${API_BASE}/api/messages?room=${encodeURIComponent(room)}&limit=100`)
      const data = await res.json()
      setMessages(data)
      setLoading(false)
    } catch (e) {
      console.error('Failed to load messages', e)
    }
  }

  useEffect(() => {
    setLoading(true)
    loadMessages()
    const id = setInterval(loadMessages, 2500)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 space-y-3">
      {loading && (
        <div className="text-center text-xs text-white/50 py-6">Loading chat...</div>
      )}
      {!loading && messages.length === 0 && (
        <div className="text-center text-xs text-white/50 py-6">Be the first to say hi 👋</div>
      )}
      {messages.map((m) => {
        const mine = m.username === username
        return (
          <div key={m.id || Math.random()} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
            <div
              className={
                'max-w-[80%] px-3 py-2 border-4 rounded-none font-mono text-[11px] leading-snug ' +
                (mine
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 border-purple-300 text-white shadow-[0_0_16px_rgba(147,51,234,0.5)]'
                  : 'bg-black/60 border-blue-400 text-blue-100 shadow-[0_0_12px_rgba(59,130,246,0.35)]')
              }
            >
              <div className="text-[10px] uppercase tracking-wider opacity-80 mb-1">
                {m.username}
              </div>
              <div className="whitespace-pre-wrap break-words">{m.text}</div>
            </div>
          </div>
        )
      })}
      <div className="h-2" />
    </div>
  )
}
