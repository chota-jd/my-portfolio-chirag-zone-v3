'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showLensFlare, setShowLensFlare] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showTransition, setShowTransition] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const welcomeMessage = "Welcome to my Digital Universe";
  const typewriterSpeed = 80; // milliseconds per character

  // Ensure client-side only rendering for animations with random values
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Create and play background music
    const audio = new Audio('/cinematic-audio.mp3');
    audio.volume = 0.4;
    audio.loop = false;
    audioRef.current = audio;

    // Enhanced cinematic sequence
    const timer1 = setTimeout(() => setShowSpotlight(true), 800);
    const timer2 = setTimeout(() => setShowName(true), 1200); // Fast name load
    const timer3 = setTimeout(() => setShowTyping(true), 1500); // Start typing after fast load
    const timer4 = setTimeout(() => setShowLensFlare(true), 2800);
    const timer5 = setTimeout(() => setShowTransition(true), 4500); // Start transition
    const timer6 = setTimeout(() => {
      setShowIntro(false);
      setTimeout(onComplete, 800); // Smoother transition
    }, 5500);

    // Try to play audio (will be blocked if no user interaction)
    const playAudio = async () => {
      try {
        await audio.play();
      } catch {
        console.log('Audio autoplay blocked - will play after user interaction');
      }
    };
    playAudio();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onComplete]);

  // Typewriter effect
  useEffect(() => {
    if (!showTyping) return;
    
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= welcomeMessage.length) {
        setTypedText(welcomeMessage.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, typewriterSpeed);

    return () => clearInterval(typeInterval);
  }, [showTyping, welcomeMessage]);

  // Skip intro on click/tap
  const handleSkip = () => {
    setShowIntro(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setTimeout(onComplete, 500);
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-50 bg-black overflow-hidden cursor-pointer cinematic-intro w-full h-full"
          onClick={handleSkip}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Film Grain Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Cinematic Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none w-full h-full"
            style={{
              background: `radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.8) 100%)`,
            }}
          />

          {/* Skip indicator */}
          {/* <motion.div
            className="absolute top-8 right-8 text-white/60 text-sm font-light tracking-wider z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Click to skip
          </motion.div> */}

          {/* Enhanced Dust Particles */}
          {isClient && (
            <div className="absolute inset-0">
              {[...Array(80)].map((_, i) => {
                const leftPos = Math.random() * 100;
                const topPos = Math.random() * 100;
                const width = 1 + Math.random() * 2;
                const height = 1 + Math.random() * 2;
                const yMovement = -30 - Math.random() * 20;
                const xMovement = Math.random() * 20 - 10;
                const duration = 5 + Math.random() * 3;
                const delay = Math.random() * 3;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full cinematic-particle"
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                      width: `${width}px`,
                      height: `${height}px`,
                      background: i % 3 === 0 ? 'rgba(79, 193, 198, 0.4)' : 'rgba(255, 255, 255, 0.2)',
                    }}
                    animate={{
                      y: [0, yMovement, 0],
                      x: [0, xMovement, 0],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Floating Light Orbs */}
          {isClient && (
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => {
                const leftPos = 10 + Math.random() * 80;
                const topPos = 10 + Math.random() * 80;
                const width = 3 + Math.random() * 5;
                const height = 3 + Math.random() * 5;
                const xMovement = Math.random() * 30 - 15;
                const duration = 6 + Math.random() * 2;
                const delay = Math.random() * 4;
                
                return (
                  <motion.div
                    key={`orb-${i}`}
                    className="absolute rounded-full cinematic-particle"
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                      width: `${width}px`,
                      height: `${height}px`,
                      background: `radial-gradient(circle, rgba(79, 193, 198, 0.6) 0%, transparent 70%)`,
                      boxShadow: '0 0 20px rgba(79, 193, 198, 0.3)',
                    }}
                    animate={{
                      y: [0, -40, 0],
                      x: [0, xMovement, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Light Flares */}
          {isClient && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => {
                const leftPos = 20 + Math.random() * 60;
                const topPos = 20 + Math.random() * 60;
                const width = 20 + Math.random() * 40;
                const height = 20 + Math.random() * 40;
                const opacity = 0.1 + Math.random() * 0.2;
                const duration = 3 + Math.random() * 2;
                const delay = Math.random() * 2;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                      width: `${width}px`,
                      height: `${height}px`,
                      background: `radial-gradient(circle, rgba(79, 193, 198, ${opacity}) 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Enhanced Spotlight Effect */}
          <AnimatePresence>
            {showSpotlight && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              >
                {/* Main spotlight */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 900px 700px at center center, 
                      rgba(255, 255, 255, 0.08) 0%, 
                      rgba(79, 193, 198, 0.03) 20%,
                      rgba(255, 255, 255, 0.02) 40%, 
                      transparent 80%)`,
                  }}
                />
                
                {/* Secondary light beam */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: `conic-gradient(from 0deg at center, 
                      transparent 0deg, 
                      rgba(79, 193, 198, 0.1) 45deg, 
                      transparent 90deg, 
                      rgba(79, 193, 198, 0.1) 135deg, 
                      transparent 180deg,
                      rgba(79, 193, 198, 0.1) 225deg,
                      transparent 270deg,
                      rgba(79, 193, 198, 0.1) 315deg,
                      transparent 360deg)`,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Welcome Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence>
              {showName && (
                <motion.div
                  className="relative text-center max-w-6xl px-4"
                  initial={{ y: 100, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 120,
                    damping: 20
                  }}
                >
                  {/* Enhanced Light Streaks Behind Text */}
                  <motion.div
                    className="absolute inset-0 -z-10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 1.2 }}
                  >
                    {isClient && [...Array(8)].map((_, i) => {
                      const height = 120 + Math.random() * 60;
                      const rotation = 10 + Math.random() * 10;
                      const xMovement = Math.random() * 20 - 10;
                      const duration = 3 + Math.random() * 2;
                      
                      return (
                        <motion.div
                          key={i}
                          className="absolute bg-gradient-to-t from-transparent via-cyan-400/20 to-transparent rounded-full"
                          style={{
                            left: `${15 + i * 10}%`,
                            top: '50%',
                            width: '3px',
                            height: `${height}px`,
                            transform: `translateY(-50%) rotate(${rotation}deg)`,
                          }}
                          animate={{
                            opacity: [0, 0.8, 0],
                            scaleY: [0.3, 1.2, 0.3],
                            x: [0, xMovement, 0],
                          }}
                          transition={{
                            duration,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut",
                          }}
                        />
                      );
                    })}
                  </motion.div>

                  {/* Fast Loading Text Effect */}
                  {!showTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.7] }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white/90 mb-4"
                      style={{
                        fontFamily: 'var(--font-playfair-display), serif',
                      }}
                    >
                      Loading...
                    </motion.div>
                  )}

                  {/* Typing Animation Text */}
                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white relative cinematic-text mb-6"
                        style={{
                          fontFamily: 'var(--font-playfair-display), serif',
                          textShadow: `
                            0 0 30px rgba(79, 193, 198, 0.9),
                            0 0 60px rgba(79, 193, 198, 0.7),
                            0 0 90px rgba(79, 193, 198, 0.5),
                            0 0 120px rgba(79, 193, 198, 0.3)
                          `,
                        }}
                        animate={{
                          textShadow: [
                            '0 0 30px rgba(79, 193, 198, 0.9), 0 0 60px rgba(79, 193, 198, 0.7)',
                            '0 0 40px rgba(79, 193, 198, 1), 0 0 80px rgba(79, 193, 198, 0.9)',
                            '0 0 30px rgba(79, 193, 198, 0.9), 0 0 60px rgba(79, 193, 198, 0.7)'
                          ]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {typedText}
                        <motion.span
                          className="inline-block w-1 h-16 bg-cyan-400 ml-2"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      </motion.h1>

                      {/* Subtitle with elegant animation */}
                      <motion.p
                        className="text-xl md:text-3xl text-white/90 font-light tracking-[0.2em] mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        style={{
                          fontFamily: 'var(--font-geist-sans), sans-serif',
                        }}
                      >
                        Crafted by Chirag Prajapati
                      </motion.p>

                      {/* Elegant divider */}
                      <motion.div
                        className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Lens Flare Effect */}
          <AnimatePresence>
            {showLensFlare && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                {/* Main lens flare */}
                <div
                  className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background: `radial-gradient(circle, 
                      rgba(255, 255, 255, 0.3) 0%, 
                      rgba(79, 193, 198, 0.2) 20%, 
                      transparent 50%)`,
                  }}
                />
                
                {/* Secondary flares */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-20 h-20 rounded-full"
                    style={{
                      left: `${30 + i * 20}%`,
                      top: `${40 + i * 10}%`,
                      background: `radial-gradient(circle, rgba(79, 193, 198, 0.4) 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slow zoom effect overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 5.5, ease: "easeInOut" }}
          />

          {/* Smooth Cyan Transition */}
          <AnimatePresence>
            {showTransition && (
              <motion.div
                className="absolute inset-0 z-20"
                style={{
                  background: 'rgba(79, 193, 198, 1)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;