import React, { useState, useEffect } from 'react';
import { Moon, Clock, Calendar } from 'lucide-react';
import CountdownTimer from './components/CountdownTimer';
import EclipseInfo from './components/EclipseInfo';
import MoonTracker from './components/MoonTracker';

function App() {
  // Next lunar eclipse: September 18, 2024 - Total Lunar Eclipse
  // Using exact UTC time: September 18, 2024, 02:44:00 UTC
  const [nextEclipse] = useState({
    date: new Date('2024-09-18T02:44:00.000Z').toISOString(),
    type: 'Total Lunar Eclipse',
    duration: '3 hours 29 minutes'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?ixlib=rb-4.0.3")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <div className="flex justify-center mb-6">
            <Moon className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Lunar Eclipse Tracker</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Next {nextEclipse.type}
          </p>
          <CountdownTimer targetDate={nextEclipse.date} />
        </div>
      </div>

      {/* Moon Position Tracker */}
      <div className="container mx-auto px-4 py-16">
        <MoonTracker />
        
        {/* Eclipse Information Section */}
        <div className="mt-16">
          <EclipseInfo eclipse={nextEclipse} />
        </div>
        
        {/* Eclipse Facts */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <Clock className="w-8 h-8 mb-4 text-red-400" />
            <h3 className="text-xl font-semibold mb-2">Duration</h3>
            <p className="text-gray-300">{nextEclipse.duration}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <Calendar className="w-8 h-8 mb-4 text-red-400" />
            <h3 className="text-xl font-semibold mb-2">Best Viewing Time</h3>
            <p className="text-gray-300">02:44 UTC</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <Moon className="w-8 h-8 mb-4 text-red-400" />
            <h3 className="text-xl font-semibold mb-2">Eclipse Type</h3>
            <p className="text-gray-300">{nextEclipse.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;