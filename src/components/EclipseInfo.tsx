import React from 'react';

interface EclipseInfoProps {
  eclipse: {
    date: string;
    type: string;
    duration: string;
  };
}

function EclipseInfo({ eclipse }: EclipseInfoProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-6">Next Eclipse Details</h2>
      <div className="space-y-4">
        <p className="text-lg">
          The next lunar eclipse will be a <span className="text-red-400 font-semibold">{eclipse.type}</span> occurring on{' '}
          <span className="text-red-400 font-semibold">
            {new Date(eclipse.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </p>
        <p className="text-gray-300">
          This celestial event will last approximately {eclipse.duration}, during which the Moon will pass through Earth's shadow,
          creating a stunning astronomical display visible from various parts of the globe.
        </p>
      </div>
    </div>
  );
}

export default EclipseInfo;