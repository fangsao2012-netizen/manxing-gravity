import { useEffect, useRef, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';
const INTERVAL_MS = 25;

interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
}

export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!triggered || startedRef.current) return;

    const timeout = setTimeout(() => {
      startedRef.current = true;
      const len = text.length;
      let revealIndex = 0;

      intervalRef.current = setInterval(() => {
        let result = '';
        for (let i = 0; i < len; i++) {
          const ch = text[i];
          if (ch === ' ') {
            result += ' ';
          } else if (i < revealIndex) {
            result += ch;
          } else if (i < revealIndex + 3) {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
            result += '';
          }
        }
        setDisplayText(result);
        revealIndex += 0.5;

        if (revealIndex >= len) {
          setDisplayText(text);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, INTERVAL_MS);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggered, delay, text]);

  if (!triggered) {
    return <span>&nbsp;</span>;
  }

  return <span>{displayText || '\u00A0'}</span>;
}
