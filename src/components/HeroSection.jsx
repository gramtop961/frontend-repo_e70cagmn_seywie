import React from 'react'
import Spline from '@splinetool/react-spline'

export default function HeroSection() {
  return (
    <div className="relative h-64 w-full overflow-hidden">
      <Spline
        scene="https://prod.spline.design/sHDPSbszZja1qap3/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      <div className="pointer-events-none absolute inset-0 flex items-end p-4">
        <div>
          <h2 className="text-white text-xl font-extrabold tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(168,85,247,0.6)]">
            Neon Arcade
          </h2>
          <p className="text-xs text-purple-200/80 font-mono opacity-90">
            A black keypad with glowing purple and blue keys
          </p>
        </div>
      </div>
    </div>
  )
}
