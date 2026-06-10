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
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-black/10">
      <div
        key={timeLeft}
        className="animate-countdown flex items-center justify-center rounded-full bg-black/65 border border-white/15 px-5 py-4 shadow-lg"
      >
        <span className="font-display text-[70px] md:text-[100px] text-white tracking-tight select-none leading-none block">
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
