'use client';

import { useEffect, useState } from 'react';

interface WaitTimeCircleProps {
  waitTime: number;
  orderCount: number;
}

export function WaitingCircle({ waitTime, orderCount }: WaitTimeCircleProps) {
  const [wave, setWave] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWave((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative size-64">
      <div className="absolute inset-0 overflow-hidden rounded-full bg-blue-100">
        <div
          className="absolute inset-0 rounded-full bg-blue-500"
          style={{
            transform: `scale(${1 + wave * 0.01})`,
            opacity: 1 - wave * 0.01,
            transition: 'all 0.5s ease-out',
          }}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <p className="text-3xl font-bold">{orderCount}件</p>
        <p className="text-xl">待ち時間 約{waitTime}分</p>
      </div>
    </div>
  );
}
