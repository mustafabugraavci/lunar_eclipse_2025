import React, { useState, useEffect } from 'react';
import SunCalc from 'suncalc';
import { format } from 'date-fns';
import { Compass, ArrowUp } from 'lucide-react';
import { NASA_API_KEY } from '../config/nasa';

interface MoonPosition {
  azimuth: number;
  altitude: number;
  phase: number;
  illumination: number;
}

function MoonTracker() {
  const [moonPosition, setMoonPosition] = useState<MoonPosition>({
    azimuth: 0,
    altitude: 0,
    phase: 0,
    illumination: 0
  });
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [apiStatus, setApiStatus] = useState<string>('');

  useEffect(() => {
    // Verify NASA API key
    if (!NASA_API_KEY) {
      setApiStatus('NASA API key is not set. Please check your .env file.');
      console.error('NASA API key is missing');
      return;
    }

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }

    const updateMoonPosition = () => {
      const now = new Date();
      const moonInfo = SunCalc.getMoonPosition(now, location.lat, location.lng);
      const moonIllumination = SunCalc.getMoonIllumination(now);

      setMoonPosition({
        azimuth: moonInfo.azimuth * (180 / Math.PI),
        altitude: moonInfo.altitude * (180 / Math.PI),
        phase: moonIllumination.phase,
        illumination: moonIllumination.fraction
      });
    };

    const timer = setInterval(updateMoonPosition, 1000);
    updateMoonPosition();

    return () => clearInterval(timer);
  }, [location]);

  const getMoonPhaseImage = (phase: number) => {
    const phaseIndex = Math.round(phase * 8);
    return `https://www.timeanddate.com/scripts/moon.php?i=${phaseIndex}`;
  };

  const getCompassDirection = (azimuth: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((azimuth + 360) % 360) / 45) % 8;
    return directions[index];
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 grid md:grid-cols-2 gap-8">
      {apiStatus && (
        <div className="col-span-2 bg-red-500/20 text-red-100 p-4 rounded-lg">
          {apiStatus}
        </div>
      )}
      
      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Compass className="w-8 h-8" />
          Moon Position
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Direction:</span>
            <span className="font-semibold">
              {getCompassDirection(moonPosition.azimuth)} ({moonPosition.azimuth.toFixed(1)}°)
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Altitude:</span>
            <span className="font-semibold flex items-center gap-2">
              <ArrowUp 
                className="w-4 h-4" 
                style={{ transform: `rotate(${moonPosition.altitude}deg)` }}
              />
              {moonPosition.altitude.toFixed(1)}°
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Illumination:</span>
            <span className="font-semibold">
              {(moonPosition.illumination * 100).toFixed(1)}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Last Updated:</span>
            <span className="font-semibold">
              {format(new Date(), 'HH:mm:ss')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
          <img
            src={getMoonPhaseImage(moonPosition.phase)}
            alt="Current Moon Phase"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-center mt-4 text-gray-300">
          Current Moon Phase
        </p>
      </div>
    </div>
  );
}

export default MoonTracker;