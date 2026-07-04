import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from './ScrambleIn';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [entranceTriggered, setEntranceTriggered] = useState(false);
  const seekingRef = useRef(false);

  // Start entrance after 800ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntranceTriggered(true);
      setTimeout(() => setEntranceComplete(true), 1000);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Mouse-scrub video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastClientX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!video) return;
      const delta = e.clientX - lastClientX;
      lastClientX = e.clientX;

      if (seekingRef.current) return;

      const newTime = video.currentTime + delta * 0.8 * 0.01;
      const clamped = Math.max(0, Math.min(newTime, video.duration || 0));

      seekingRef.current = true;
      video.currentTime = clamped;
    };

    const handleSeeked = () => {
      seekingRef.current = false;
    };

    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen h-[100dvh] overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />

      {/* Watermark text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ transform: 'translateY(50px)' }}
      >
        <span
          className="font-display uppercase text-transparent select-none"
          style={{
            fontSize: 'clamp(120px, 30vw, 521px)',
            letterSpacing: '-4px',
            backgroundImage:
              'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            opacity: 0.1,
          }}
        >
          MANXING
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Left column */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={entranceComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="Music" delay={200} triggered={entranceTriggered} />
              <br />
              <ScrambleIn text="Film" delay={500} triggered={entranceTriggered} />
            </h1>
            <motion.p
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.215, 0.61, 0.355, 1],
                delay: 0.2,
              }}
            >
              A comprehensive cultural enterprise driven by music creation, game development, and film production. We focus on IP incubation, content creation, and full-chain operations — connecting every story across every medium.
            </motion.p>
          </motion.div>

          {/* Right h1 */}
          <motion.div
            className="text-left md:text-right"
            initial={{ opacity: 0 }}
            animate={entranceComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="Game" delay={700} triggered={entranceTriggered} />
              <br />
              <ScrambleIn text="Studio" delay={1000} triggered={entranceTriggered} />
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
