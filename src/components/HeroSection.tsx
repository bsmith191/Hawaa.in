'use client';

import { useRef, useState } from 'react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoEnded ? 'opacity-0' : 'opacity-100'
        }`}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        <source src="/videos/hero-video.webm" type="video/webm" />
      </video>

      {/* Resting Image (shows when video ends) */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          videoEnded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: 'url(/images/hero-resting.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Product Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight">
            <span className="font-normal">Hawaa</span>{' '}
            <span className="font-semibold tracking-widest">EDGE</span>
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            {/* Order Now Button - Primary */}
            <a
              href="#order"
              className="group relative flex-1 px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 rounded-full" />
              <span className="relative z-10 text-white font-medium text-base sm:text-lg tracking-wide">
                Order Now
              </span>
            </a>

            {/* Explore Edge Button - Secondary */}
            <a
              href="#explore"
              className="group relative flex-1 px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-md border border-white/20 rounded-full" />
              <span className="relative z-10 text-white/90 font-medium text-base sm:text-lg tracking-wide">
                Explore Edge
              </span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
