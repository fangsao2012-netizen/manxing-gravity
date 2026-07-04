import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

export default function CinematicText() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);

  const transformStyle = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen h-[100dvh] overflow-hidden"
      style={{ perspective: '400px' }}
    >
      {/* Background video */}
      <video
        src={VIDEO_URL}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          height: '180px',
          background: 'linear-gradient(from top, #010103 0%, transparent 100%)',
        }}
      />
      {/* Fallback — standard direction */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '180px',
          background: 'linear-gradient(to bottom, #010103 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <motion.p
          className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center max-w-5xl"
          style={{
            transform: transformStyle,
            opacity,
          }}
        >
          A comprehensive cultural enterprise at the intersection of music, film, and games.
          Manxing Gravity transforms original IPs across every medium — original scores become
          the soul of cinematic worlds, game engines render stories you can step into, and films
          bring characters to life. Every creation is connected. Music binds them all into a
          single, unified universe.
        </motion.p>
      </div>
    </section>
  );
}
