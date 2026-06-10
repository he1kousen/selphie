import React, { useEffect, useState } from 'react';

export default function CountdownTimer({ seconds, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft === null || timeLeft === 0) {
      if (timeLeft === 0) onComplete();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onComplete]);

  if (timeLeft === null || timeLeft === 0) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-black/25">
      <div
        key={timeLeft}
        className="animate-countdown"
      >
        <span className="font-display text-[120px] md:text-[200px] text-white/90 tracking-tightest drop-shadow-[0_4px_30px_rgba(0,0,0,0.3)] select-none leading-none block">
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
