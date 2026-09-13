import React, { useState } from 'react';
import {
  TrendingUp,
  Droplets,
  Sprout,
  ShieldCheck,
  Search,
  ArrowRight,
  Radio,
  Layers,
  Sparkles,
  CloudRain,
  Activity,
  Check,
} from 'lucide-react';
import { KshetraHowItWorksAndPricing } from './KshetraHowItWorksAndPricing';

interface CropilyLandingProps {
  onExploreMap: () => void;
  onOpenAnalysis: () => void;
  onSelectGoal?: (goal: string) => void;
}

export const CropilyLanding: React.FC<CropilyLandingProps> = ({
  onExploreMap,
  onOpenAnalysis,
}) => {
  const [activeGoals, setActiveGoals] = useState<string[]>(['HIGHER YIELD', 'CROP HEALTH']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeOrbitNode, setActiveOrbitNode] = useState<string>('Crop Monitoring');

  const toggleGoal = (goal: string) => {
    setActiveGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const orbitNodes = [
    {
      id: 'disease',
      name: 'Disease Detection',
      position: 'top-4 left-1/2 -translate-x-1/2',
      metric: '0.02% Pest Incidence',
      icon: ShieldCheck,
    },
    {
      id: 'monitoring',
      name: 'Crop Monitoring',
      position: 'top-1/2 left-8 -translate-y-1/2',
      metric: 'Multispectral NDVI 0.84',
      icon: Activity,
    },
    {
      id: 'soil',
      name: 'Soil Analysis',
      position: 'top-24 left-16',
      metric: 'N:82 P:48 K:41 • pH 6.7',
      icon: Layers,
    },
    {
      id: 'prediction',
      name: 'Yield Prediction',
      position: 'bottom-20 left-1/2 -translate-x-1/2',
      metric: '+18.4% Projected Yield',
      icon: TrendingUp,
    },
    {
      id: 'weather',
      name: 'Weather Intelligence',
      position: 'bottom-6 left-1/2 -translate-x-1/2',
      metric: '812mm • Next Rain: 48h',
      icon: CloudRain,
    },
  ];

  return (
    <section className="relative w-full min-h-[92vh] bg-cropily-dots text-stone-800 dark:text-stone-100 flex flex-col justify-between py-6 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-stone-200/80 dark:border-stone-800">
      
      {/* 1. Top Minimalist Tags */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between text-[11px] font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400 py-2 border-b border-stone-300/40 dark:border-stone-800/40">
        <button
          onClick={() => toggleGoal('HIGHER YIELD')}
          className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeGoals.includes('HIGHER YIELD') ? 'text-emerald-800 dark:text-emerald-300 font-extrabold' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-lime-500"></span>
          <span>Higher Yield</span>
        </button>

        <button
          onClick={() => toggleGoal('SAVE WATER')}
          className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeGoals.includes('SAVE WATER') ? 'text-emerald-800 dark:text-emerald-300 font-extrabold' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
          <span>Save Water</span>
        </button>

        <button
          onClick={() => toggleGoal('CROP HEALTH')}
          className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeGoals.includes('CROP HEALTH') ? 'text-emerald-800 dark:text-emerald-300 font-extrabold' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Crop Health</span>
        </button>
      </div>

      {/* 2. Centerpiece: The Constellation Orbit & Floating Health Card */}
      <div className="relative my-auto py-12 flex items-center justify-center min-h-[460px]">
        
        {/* Concentric Dotted Orbit Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-stone-300/80 dark:border-emerald-900/40"></div>
          <div className="absolute w-[500px] h-[500px] sm:w-[680px] sm:h-[680px] rounded-full border border-dashed border-stone-300/60 dark:border-emerald-900/30"></div>
          <div className="absolute w-[700px] h-[700px] sm:w-[920px] sm:h-[920px] rounded-full border border-dashed border-stone-200/50 dark:border-emerald-900/20"></div>
        </div>

        {/* Orbiting Constellation Text Nodes */}
        <div className="absolute inset-0 max-w-4xl mx-auto pointer-events-none">
          {/* Node 1: Disease Detection (Top) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-auto">
            <button
              onClick={() => setActiveOrbitNode('Disease Detection')}
              className={`px-4 py-1.5 rounded-full text-sm sm:text-base font-medium tracking-tight transition-all cursor-pointer backdrop-blur-sm ${
                activeOrbitNode === 'Disease Detection'
                  ? 'bg-stone-900 text-white dark:bg-lime-400 dark:text-stone-950 font-bold shadow-lg scale-105'
                  : 'text-stone-600 hover:text-stone-950 dark:text-stone-300 hover:scale-102'
              }`}
            >
              Disease Detection
            </button>
          </div>

          {/* Node 2: Soil Analysis (Top Left) */}
          <div className="absolute top-16 left-6 sm:left-20 pointer-events-auto">
            <button
              onClick={() => setActiveOrbitNode('Soil Analysis')}
              className={`px-4 py-1.5 rounded-full text-sm sm:text-base font-medium tracking-tight transition-all cursor-pointer backdrop-blur-sm ${
                activeOrbitNode === 'Soil Analysis'
                  ? 'bg-stone-900 text-white dark:bg-lime-400 dark:text-stone-950 font-bold shadow-lg scale-105'
                  : 'text-stone-600 hover:text-stone-950 dark:text-stone-300 hover:scale-102'
              }`}
            >
              Soil Analysis
            </button>
          </div>

          {/* Node 3: Crop Monitoring (Center Left/Right) */}
          <div className="absolute top-1/2 right-4 sm:right-24 -translate-y-12 pointer-events-auto">
            <button
              onClick={() => setActiveOrbitNode('Crop Monitoring')}
              className={`px-4 py-1.5 rounded-full text-base sm:text-xl font-bold tracking-tight transition-all cursor-pointer backdrop-blur-sm ${
                activeOrbitNode === 'Crop Monitoring'
                  ? 'bg-stone-900 text-white dark:bg-lime-400 dark:text-stone-950 shadow-xl scale-105'
                  : 'text-stone-800 hover:text-stone-950 dark:text-stone-200 hover:scale-102'
              }`}
            >
              Crop Monitoring
            </button>
          </div>

          {/* Node 4: Yield Prediction (Bottom Center) */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-auto">
            <button
              onClick={() => setActiveOrbitNode('Yield Prediction')}
              className={`px-4 py-1.5 rounded-full text-base sm:text-lg font-medium tracking-tight transition-all cursor-pointer backdrop-blur-sm ${
                activeOrbitNode === 'Yield Prediction'
                  ? 'bg-stone-900 text-white dark:bg-lime-400 dark:text-stone-950 font-bold shadow-lg scale-105'
                  : 'text-stone-600 hover:text-stone-950 dark:text-stone-300 hover:scale-102'
              }`}
            >
              Yield Prediction
            </button>
          </div>

          {/* Node 5: Weather Intelligence (Outer Bottom) */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-auto">
            <button
              onClick={() => setActiveOrbitNode('Weather Intelligence')}
              className={`px-4 py-1.5 rounded-full text-sm sm:text-base font-medium tracking-tight transition-all cursor-pointer backdrop-blur-sm ${
                activeOrbitNode === 'Weather Intelligence'
                  ? 'bg-stone-900 text-white dark:bg-lime-400 dark:text-stone-950 font-bold shadow-lg scale-105'
                  : 'text-stone-500 hover:text-stone-950 dark:text-stone-400 hover:scale-102'
              }`}
            >
              Weather Intelligence
            </button>
          </div>
        </div>

        {/* Center Glass Card (The exact Floating Crop Health Card) */}
        <div className="relative z-10 w-full max-w-[320px] sm:max-w-[350px] p-4 sm:p-5 rounded-3xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-700 shadow-2xl shadow-stone-400/20 dark:shadow-black/50 transition-all hover:scale-[1.02]">
          
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-1.5 text-stone-900 dark:text-white font-extrabold tracking-wider uppercase text-[11px]">
              <span className="text-emerald-500">:::</span>
              <span>Crop Health</span>
            </div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Updated 2m ago
            </span>
          </div>

          {/* Sparkline Graphic (SVG Wave) */}
          <div className="relative h-20 w-full mb-3">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 280 80">
              <defs>
                <linearGradient id="cropHealthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#84cc16" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#84cc16" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Soft area under curve */}
              <path
                d="M 0 60 Q 40 68 80 48 T 160 38 T 240 22 T 280 14 L 280 80 L 0 80 Z"
                fill="url(#cropHealthGrad)"
              />
              {/* Primary sparkline stroke */}
              <path
                d="M 0 60 Q 40 68 80 48 T 160 38 T 240 22 T 280 14"
                fill="none"
                stroke="#65a30d"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              {/* Active data point nodes */}
              <circle cx="80" cy="48" r="3.5" fill="#65a30d" />
              <circle cx="160" cy="38" r="3.5" fill="#65a30d" />
              <circle cx="240" cy="22" r="3.5" fill="#65a30d" />
              <circle cx="280" cy="14" r="5" fill="#84cc16" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* Glowing live telemetry indicator */}
            <div className="absolute top-1 right-0 transform translate-x-1 -translate-y-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500"></span>
              </span>
            </div>
          </div>

          {/* Bottom Badges */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-[#D4F843] text-stone-950 text-xs font-black tracking-tight shadow-xs flex items-center gap-1.5">
              <span>98%</span>
              <span className="font-bold text-[11px]">Health Score</span>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold border border-stone-200/80 dark:border-stone-700">
              2,351 Acres Count
            </div>
          </div>

        </div>

      </div>

      {/* 3. Bottom Section: Stacked Polaroid Photos (Left) & Harvest Planning Widget (Right) */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4 pb-2">
        
        {/* Bottom Left: Stacked Photos & "About Us" Value Proposition */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Stacked Tilted Polaroid/Card Cluster */}
          <div className="flex items-center -space-x-4 pl-2 mb-1">
            {/* Card 1: Aerial drone field */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white dark:border-stone-800 shadow-xl transform -rotate-8 transition-transform hover:rotate-0 hover:z-20 duration-300">
              <img
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=300&auto=format&fit=crop&q=80"
                alt="Agricultural drone scanning crop parcel"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Card 2: Field machinery / tractor in green wheat */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white dark:border-stone-800 shadow-xl transform rotate-4 transition-transform hover:rotate-0 hover:z-20 duration-300">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&auto=format&fit=crop&q=80"
                alt="Lush green wheat field and hedgerows"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Card 3: Farmers in field */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white dark:border-stone-800 shadow-xl transform -rotate-3 transition-transform hover:rotate-0 hover:z-20 duration-300">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&auto=format&fit=crop&q=80"
                alt="Agronomist inspecting crop vigor"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* About Us Pill */}
          <div className="inline-flex self-start">
            <span className="px-3 py-0.5 rounded-full bg-[#D4F843] text-stone-950 font-extrabold text-[10px] tracking-wider uppercase">
              About Us
            </span>
          </div>

          {/* Value Prop Headline */}
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 max-w-md leading-snug tracking-tight">
            Our AI platform transforms satellite imagery, drone data, weather forecasts, and field sensors into actionable insights.
          </h2>

        </div>

        {/* Bottom Right: "Plan your Perfect harvest" interactive card */}
        <div className="lg:col-span-6 flex justify-start lg:justify-end">
          <div className="w-full max-w-[420px] p-6 rounded-3xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/90 dark:border-stone-700/80 shadow-xl">
            
            {/* Title */}
            <h3 className="text-xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              Plan your <span className="font-serif-italic font-normal text-2xl text-emerald-800 dark:text-emerald-400">Perfect harvest</span>
            </h3>

            {/* Search Input */}
            <div className="mt-3 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH BY FIELD, OR GOAL..."
                className="w-full px-4 py-2.5 pr-10 text-xs font-semibold uppercase tracking-wider rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 placeholder:text-stone-400 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Field Goals Selector Chips */}
            <div className="mt-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 block mb-2">
                ::: Field Goals
              </span>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                {[
                  { name: 'HIGHER YIELD', color: 'border-lime-500' },
                  { name: 'SAVE WATER', color: 'border-cyan-500' },
                  { name: 'CROP HEALTH', color: 'border-emerald-500' },
                  { name: 'REDUCE COST', color: 'border-amber-500' },
                ].map((goal) => {
                  const isChecked = activeGoals.includes(goal.name);
                  return (
                    <button
                      key={goal.name}
                      type="button"
                      onClick={() => toggleGoal(goal.name)}
                      className={`px-3 py-2 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-stone-900 text-white dark:bg-emerald-950 dark:text-emerald-200 border-stone-900 dark:border-emerald-600 shadow-xs'
                          : 'bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>{goal.name}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-lime-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Farm Overview Stats Row */}
            <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400 block mb-2">
                ::: Farm Overview
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/60">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-1">
                    <Radio className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Monitored
                    </span>
                  </div>
                  <div className="text-xl font-black text-stone-900 dark:text-white font-mono">
                    1,250
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Acres Monitored
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/60">
                  <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Parcels
                    </span>
                  </div>
                  <div className="text-xl font-black text-stone-900 dark:text-white font-mono">
                    24
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Active Fields
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action Button: "OPTIMIZE MY FARM" */}
            <button
              onClick={onExploreMap}
              className="mt-5 w-full py-3.5 px-5 rounded-2xl bg-[#323D26] hover:bg-[#27321D] active:scale-[0.99] text-[#D8F946] font-black text-xs uppercase tracking-wider shadow-lg shadow-lime-900/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Optimize My Farm</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>

      {/* Exact Match "HOW IT WORKS" and "PRICING PLANS" from provided user image */}
      <KshetraHowItWorksAndPricing onOptimizeFarm={onExploreMap} />

    </section>
  );
};
