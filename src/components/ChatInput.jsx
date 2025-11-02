import React, { useState } from 'react'
import { Send } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ChatInput({ room = 'global', username, onSent }) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSend(e) {
    e.preventDefault()
    if (!text.trim() || sending) return
    setSending(true)
    try {
      await fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room, username, text: text.trim() }),
      })
      setText('')
      onSent && onSent()
    } catch (e) {
      console.error('Failed to send', e)
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/40">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type an 8-bit message..."
          className="flex-1 bg-black/60 text-white placeholder-white/40 border-4 border-blue-400 rounded-none px-3 py-2 font-mono text-xs outline-none focus:border-purple-400 transition-colors"
        />
        <button
          type="submit"
          disabled={sending}
          className="px-3 py-2 bg-gradient-to-br from-purple-600 to-blue-600 text-white border-4 border-purple-300 rounded-none font-black uppercase tracking-wider text-[10px] flex items-center gap-1 disabled:opacity-50"
        >
          <Send className="h-3 w-3" /> Send
        </button>
      </div>
    </form>
  )
}
