'use client';

import { useEffect, useState } from 'react';

interface WaitingCircleProps {
  waitTime: number;
  ordersAhead: number;
}

export function WaitingCircle({ waitTime, ordersAhead }: WaitingCircleProps) {
  const [wave, setWave] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWave((prevWave) => (prevWave + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative size-64">
      <div className="absolute inset-0 overflow-hidden rounded-full bg-blue-200">
        <div
          className="absolute inset-0 rounded-full bg-blue-500"
          style={{
            transform: `scale(${1 + wave * 0.01})`,
            opacity: 1 - wave * 0.01,
            transition: 'all 0.5s ease-out',
          }}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-bold">{ordersAhead}組待ち</p>
        <p className="text-xl">約{waitTime}分</p>
      </div>
    </div>
  );
}
