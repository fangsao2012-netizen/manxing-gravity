import { useEffect, useRef } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';
const INTERVAL_MS = 25;
const FRAMES_PER_CHAR = 4;

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export default function ScrambleText({ text, isHovered, className = '' }: ScrambleTextProps) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!displayRef.current) return;

    if (isHovered) {
      const len = text.length;
      let frame = 0;
      let revealIndex = 0;

      intervalRef.current = setInterval(() => {
        frame++;
        if (frame % FRAMES_PER_CHAR === 0) {
          revealIndex++;
        }

        let result = '';
        for (let i = 0; i < len; i++) {
          const ch = text[i];
          if (ch === ' ') {
            result += ' ';
          } else if (i < revealIndex) {
            result += ch;
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        if (displayRef.current) {
          displayRef.current.textContent = result;
        }

        if (revealIndex >= len) {
          if (displayRef.current) {
            displayRef.current.textContent = text;
          }
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, INTERVAL_MS);
    } else {
      if (displayRef.current) {
        displayRef.current.textContent = text;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, text]);

  return (
    <span ref={displayRef} className={className}>
      {text}
    </span>
  );
}
