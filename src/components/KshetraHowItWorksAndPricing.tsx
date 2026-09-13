import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface KshetraHowItWorksAndPricingProps {
  onOptimizeFarm: () => void;
  onSelectPlan?: (plan: string) => void;
}

export const KshetraHowItWorksAndPricing: React.FC<KshetraHowItWorksAndPricingProps> = ({
  onOptimizeFarm,
  onSelectPlan,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('GROWTH');
  const [activeStep, setActiveStep] = useState<number>(1);

  const handlePlanClick = (planName: string) => {
    setSelectedPlan(planName);
    if (onSelectPlan) onSelectPlan(planName);
  };

  return (
    <div className="w-full bg-[#F4F3ED] dark:bg-[#0C140F] text-[#191E19] dark:text-stone-100 py-16 px-4 sm:px-6 lg:px-12 border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* =========================================================================
            SECTION 1: "HOW IT WORKS" (Exact match to top half of user reference image)
            ========================================================================= */}
        <section id="how-it-works" className="w-full">
          
          {/* Top Row: Pill Badge, Subtext + Button on Left, Large Statement on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
            
            {/* Left Column: Badge, Descriptive Microcopy, and Button */}
            <div className="lg:col-span-4 flex flex-col items-start gap-4">
              <span className="inline-block px-3 py-1 bg-[#D4F843] text-[#191E19] text-[11px] font-black uppercase tracking-wider rounded-sm shadow-xs">
                How It Works
              </span>

              <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm mt-1">
                We help you understand what&apos;s happening, anticipate what&apos;s next, and take action with confidence.
              </p>

              <button
                type="button"
                onClick={onOptimizeFarm}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#323D26] hover:bg-[#27321D] text-[#D8F946] text-xs font-black uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer group"
              >
                <span>Optimize My Farm</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Right Column: Hero Statement Copy */}
            <div className="lg:col-span-8">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] leading-[1.3] font-medium text-stone-900 dark:text-stone-100 tracking-tight">
                Connect your farm, let AI analyze crop and environmental conditions, and receive clear recommendations that help you respond faster, use resources efficiently, and improve every growing season.
              </h2>
            </div>

          </div>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* STEP 01 (Featured Lime Card) */}
            <div
              onClick={() => setActiveStep(1)}
              className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[320px] shadow-sm ${
                activeStep === 1
                  ? 'bg-[#D8F946] text-[#191E19] ring-2 ring-lime-400 shadow-xl scale-[1.01]'
                  : 'bg-[#D8F946]/90 text-[#191E19]'
              }`}
            >
              {/* Subtle Radiating Watermark Rays */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 300 300" fill="none">
                  <line x1="150" y1="150" x2="30" y2="20" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="270" y2="40" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="290" y2="220" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="40" y2="260" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="150" y2="10" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="150" cy="150" r="100" stroke="#000000" strokeWidth="0.8" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Top Row: Step Tag + Farmer Portrait Thumbnail */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-stone-800">
                  Step 01
                </span>

                {/* Farmer Image Thumbnail from image.png */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shadow-md border-2 border-white/60 bg-emerald-800 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=300&q=80"
                    alt="Farmer in lush agricultural field holding tablet"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-12">
                <h3 className="text-xl sm:text-2xl font-bold text-stone-950 tracking-tight mb-2">
                  Connect your farm
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-800/90 leading-relaxed">
                  Integrate drone imagery, IoT sensors, satellite data, or upload field information.
                </p>
              </div>
            </div>

            {/* STEP 02 (Clean White Card) */}
            <div
              onClick={() => setActiveStep(2)}
              className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[320px] bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm ${
                activeStep === 2
                  ? 'ring-2 ring-lime-500 shadow-lg scale-[1.01]'
                  : 'hover:border-stone-300'
              }`}
            >
              {/* Subtle Watermark Rays */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg className="w-full h-full" viewBox="0 0 300 300" fill="none">
                  <circle cx="150" cy="150" r="110" stroke="#000000" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="30" y2="40" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="270" y2="50" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="280" y2="250" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="40" y2="240" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Top Row */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Step 02
                </span>
                
                <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-xs font-mono font-bold text-stone-400">
                  AI
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-12">
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight mb-2">
                  AI analyzes your data
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-400 leading-relaxed">
                  Deep neural networks calculate crop stress, NDVI indices, live weather impacts, and yield trajectories.
                </p>
              </div>
            </div>

            {/* STEP 03 (Clean White Card) */}
            <div
              onClick={() => setActiveStep(3)}
              className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[320px] bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm ${
                activeStep === 3
                  ? 'ring-2 ring-lime-500 shadow-lg scale-[1.01]'
                  : 'hover:border-stone-300'
              }`}
            >
              {/* Subtle Watermark Rays */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg className="w-full h-full" viewBox="0 0 300 300" fill="none">
                  <circle cx="150" cy="150" r="110" stroke="#000000" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="30" y2="40" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="270" y2="50" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="280" y2="250" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="150" y1="150" x2="40" y2="240" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Top Row */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Step 03
                </span>

                <div className="w-10 h-10 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-xs font-mono font-bold text-stone-400">
                  ML
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-12">
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-tight mb-2">
                  Turn insights into action
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-400 leading-relaxed">
                  Receive prioritized spray timings, precision irrigation schedules, and harvest advisories.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* =========================================================================
            SECTION 2: "PRICING PLANS" (Exact match to bottom half of user reference image)
            ========================================================================= */}
        <section id="pricing-plans" className="w-full text-center">
          
          {/* Section Pill Badge */}
          <div className="inline-flex justify-center mb-4">
            <span className="px-3.5 py-1 bg-[#D4F843] text-[#191E19] text-[11px] font-black uppercase tracking-wider rounded-sm shadow-xs">
              Pricing Plans
            </span>
          </div>

          {/* Heading with "smarter" in Serif Italic */}
          <h2 className="text-3xl sm:text-5xl lg:text-5xl font-bold text-stone-900 dark:text-white tracking-tight mb-12">
            Simple plans for{' '}
            <span className="font-serif italic font-normal text-stone-900 dark:text-stone-100">
              smarter
            </span>{' '}
            farming
          </h2>

          {/* Clean Outer Framed Container Matching image.png */}
          <div className="max-w-5xl mx-auto p-3 sm:p-5 rounded-[2.5rem] bg-white/95 dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-stretch">
              
              {/* ---------------- CARD 1: STARTER ---------------- */}
              <div
                onClick={() => handlePlanClick('STARTER')}
                className={`p-6 sm:p-7 rounded-3xl text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  selectedPlan === 'STARTER'
                    ? 'bg-stone-50 dark:bg-stone-800/90 ring-2 ring-stone-900 dark:ring-lime-400 shadow-md'
                    : 'bg-stone-50/60 dark:bg-stone-800/40 hover:bg-stone-50'
                }`}
              >
                <div>
                  {/* Pill Chip */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#D8F946] text-[#191E19] text-[10px] font-extrabold uppercase tracking-wider rounded-sm">
                      Starter
                    </span>
                  </div>

                  {/* Plan Subtext */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 min-h-[36px] leading-relaxed mb-4">
                    For small farms getting started with smarter crop monitoring.
                  </p>

                  {/* Price Row: $49/month */}
                  <div className="flex items-baseline gap-0.5 mb-6">
                    <span className="text-4xl font-bold text-stone-900 dark:text-white tracking-tight font-serif italic">
                      $49
                    </span>
                    <span className="text-stone-500 dark:text-stone-400 text-sm font-serif italic">
                      /month
                    </span>
                  </div>

                  {/* Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanClick('STARTER');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#323D26] hover:bg-[#27321D] text-[#D8F946] text-xs font-black uppercase tracking-wider shadow-xs transition-colors cursor-pointer text-center"
                  >
                    Get Started
                  </button>

                  {/* Feature Bullets (Using solid square bullets ▪) */}
                  <ul className="mt-7 space-y-3 text-xs text-stone-700 dark:text-stone-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-900 dark:text-white font-black mt-0.5">■</span>
                      <span>Monitor crop health with ease</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-900 dark:text-white font-black mt-0.5">■</span>
                      <span>Get timely weather insights</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-900 dark:text-white font-black mt-0.5">■</span>
                      <span>Detect early signs of crop stress</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-900 dark:text-white font-black mt-0.5">■</span>
                      <span>Track up to 500 acres</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-900 dark:text-white font-black mt-0.5">■</span>
                      <span>Receive weekly field reports</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ---------------- CARD 2: GROWTH (Featured Full Lime Yellow-Green Card) ---------------- */}
              <div
                onClick={() => handlePlanClick('GROWTH')}
                className={`p-6 sm:p-7 rounded-3xl text-left flex flex-col justify-between transition-all duration-300 cursor-pointer bg-[#E4FA53] text-[#191E19] shadow-lg ${
                  selectedPlan === 'GROWTH'
                    ? 'ring-2 ring-stone-950 scale-[1.02] shadow-2xl z-10'
                    : 'hover:brightness-98'
                }`}
              >
                <div>
                  {/* Pill Chip (White in the image) */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-white text-[#191E19] text-[10px] font-extrabold uppercase tracking-wider rounded-sm shadow-xs">
                      Growth
                    </span>
                  </div>

                  {/* Plan Subtext */}
                  <p className="text-xs text-stone-800 min-h-[36px] leading-relaxed mb-4">
                    For growing operations that need deeper insights and greater control.
                  </p>

                  {/* Price Row: $129/month */}
                  <div className="flex items-baseline gap-0.5 mb-6">
                    <span className="text-4xl font-bold text-stone-950 tracking-tight font-serif italic">
                      $129
                    </span>
                    <span className="text-stone-700 text-sm font-serif italic">
                      /month
                    </span>
                  </div>

                  {/* Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanClick('GROWTH');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#323D26] hover:bg-[#27321D] text-[#D8F946] text-xs font-black uppercase tracking-wider shadow-sm transition-colors cursor-pointer text-center"
                  >
                    Get Started
                  </button>

                  {/* Feature Bullets */}
                  <ul className="mt-7 space-y-3 text-xs text-stone-900 font-medium">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-950 font-black mt-0.5">■</span>
                      <span>Detect diseases before they spread</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-950 font-black mt-0.5">■</span>
                      <span>Optimize water and irrigation usage</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-950 font-black mt-0.5">■</span>
                      <span>Forecast yields more accurately</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-950 font-black mt-0.5">■</span>
                      <span>Monitor multiple fields in real time</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-950 font-black mt-0.5">■</span>
                      <span>Get priority expert support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ---------------- CARD 3: ENTERPRISE ---------------- */}
              <div
                onClick={() => handlePlanClick('ENTERPRISE')}
                className={`p-6 sm:p-7 rounded-3xl text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  selectedPlan === 'ENTERPRISE'
                    ? 'bg-stone-50 dark:bg-stone-800/90 ring-2 ring-stone-900 dark:ring-lime-400 shadow-md'
                    : 'bg-stone-50/60 dark:bg-stone-800/40 hover:bg-stone-50'
                }`}
              >
                <div>
                  {/* Pill Chip */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#D8F946] text-[#191E19] text-[10px] font-extrabold uppercase tracking-wider rounded-sm">
                      Enterprise
                    </span>
                  </div>

                  {/* Plan Subtext */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 min-h-[36px] leading-relaxed mb-4">
                    For large agricultural operations managing multiple farms at scale.
                  </p>

                  {/* Price Row: $199/month */}
                  <div className="flex items-baseline gap-0.5 mb-6">
                    <span className="text-4xl font-bold text-stone-900 dark:text-white tracking-tight font-serif italic">
                      $199
                    </span>
                    <span className="text-stone-500 dark:text-stone-400 text-sm font-serif italic">
                      /month
                    </span>
                  </div>

                  {/* Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanClick('ENTERPRISE');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#323D26] hover:bg-[#27321D] text-[#D8F946] text-xs font-black uppercase tracking-wider shadow-xs transition-colors cursor-pointer text-center"
                  >
                    Get Started
                  </button>

                  {/* Feature Bullets */}
                  <ul className="mt-7 space-y-3 text-xs text-stone-700 dark:text-stone-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-900 dark:text-white font-black mt-0.5">■</span>
                      <span>Manage unlimited fields and acreage</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-900 dark:text-white font-black mt-0.5">■</span>
                      <span>Connect multiple farms in one platform</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-900 dark:text-white font-black mt-0.5">■</span>
                      <span>Build custom AI models for your operation</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-900 dark:text-white font-black mt-0.5">■</span>
                      <span>Integrate sensors and existing farm systems</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[9px] text-stone-900 dark:text-white font-black mt-0.5">■</span>
                      <span>Access advanced analytics and reporting</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </section>

      </div>
    </div>
  );
};
