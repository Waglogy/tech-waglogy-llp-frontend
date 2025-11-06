import React from 'react'

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-950 -z-10 overflow-hidden">
      {/* Modern Grid Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(30, 144, 255, 0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Gradient Orbs - Brand Colors */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-10 animate-blob" style={{ backgroundColor: '#1e90ff' }}></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-10 animate-blob animation-delay-2000" style={{ backgroundColor: '#4169e1' }}></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-10 animate-blob animation-delay-4000" style={{ backgroundColor: '#87ceeb' }}></div>

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <svg className="absolute inset-0 h-full w-full">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" className="text-gray-300 dark:text-gray-800" />
        </svg>
      </div>
    </div>
  )
}

export default AnimatedBackground

