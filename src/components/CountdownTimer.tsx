import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = Date.now();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 text-center max-w-2xl mx-auto">
      <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4">
        <div className="text-4xl md:text-6xl font-bold">{timeLeft.days}</div>
        <div className="text-sm md:text-base text-gray-300">Days</div>
      </div>
      <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4">
        <div className="text-4xl md:text-6xl font-bold">{timeLeft.hours}</div>
        <div className="text-sm md:text-base text-gray-300">Hours</div>
      </div>
      <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4">
        <div className="text-4xl md:text-6xl font-bold">{timeLeft.minutes}</div>
        <div className="text-sm md:text-base text-gray-300">Minutes</div>
      </div>
      <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4">
        <div className="text-4xl md:text-6xl font-bold">{timeLeft.seconds}</div>
        <div className="text-sm md:text-base text-gray-300">Seconds</div>
      </div>
    </div>
  );
}

export default CountdownTimer;