import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CloudRain,
  Thermometer,
  Layers,
  Droplets,
  RotateCcw,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Check,
} from 'lucide-react';
import {
  SoilNutrients,
  MeteorologicalData,
  FarmingConstraints,
  WhatIfState,
  WaterConstraint,
} from '../types';
import { runRecommendationEngine } from '../services/recommendationEngine';

interface WhatIfSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  soil: SoilNutrients;
  weather: MeteorologicalData;
  constraints: FarmingConstraints;
  onApplyScenarioToActive: (newSoil: SoilNutrients, newConstraints: FarmingConstraints) => void;
}

export const WhatIfSimulatorModal: React.FC<WhatIfSimulatorModalProps> = ({
  isOpen,
  onClose,
  soil,
  weather,
  constraints,
  onApplyScenarioToActive,
}) => {
  const [whatIf, setWhatIf] = useState<WhatIfState>({
    rainfallDeltaPercent: -30, // Default scenario from blueprint: "What if seasonal rainfall decreases by 30%?"
    tempDelta: 1.5,
    nitrogenDelta: 0,
    waterOverride: 'Low',
  });

  if (!isOpen) return null;

  // Baseline execution
  const baseline = runRecommendationEngine(soil, weather, constraints);

  // Simulated execution
  const scenario = runRecommendationEngine(soil, weather, constraints, whatIf);

  const effectiveRainfall = Math.round(
    weather.annualizedRainfallEst * (1 + whatIf.rainfallDeltaPercent / 100)
  );
  const effectiveTemp = Math.round((weather.temperature + whatIf.tempDelta) * 10) / 10;
  const effectiveN = Math.max(5, soil.N + whatIf.nitrogenDelta);

  const handleReset = () => {
    setWhatIf({
      rainfallDeltaPercent: 0,
      tempDelta: 0,
      nitrogenDelta: 0,
      waterOverride: 'Inherit',
    });
  };

  const handleApply = () => {
    const updatedSoil = { ...soil, N: effectiveN };
    const updatedConstraints = {
      ...constraints,
      water: whatIf.waterOverride !== 'Inherit' ? whatIf.waterOverride : constraints.water,
    };
    onApplyScenarioToActive(updatedSoil, updatedConstraints);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#112A20] border border-slate-200 dark:border-emerald-800/80 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-emerald-900/50 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-[#112A20]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                What-If Scenario Simulator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Test climate resilience, drought conditions, and soil shifts before committing capital.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8">
          
          {/* Simulation Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-slate-50 dark:bg-emerald-950/30 border border-slate-200/80 dark:border-emerald-900/40">
            
            {/* Slider 1: Rainfall Variation */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                  Seasonal Rainfall Shift
                </span>
                <span className={`font-mono font-bold ${whatIf.rainfallDeltaPercent < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {whatIf.rainfallDeltaPercent > 0 ? `+${whatIf.rainfallDeltaPercent}%` : `${whatIf.rainfallDeltaPercent}%`} ({effectiveRainfall} mm)
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={whatIf.rainfallDeltaPercent}
                onChange={(e) => setWhatIf({ ...whatIf, rainfallDeltaPercent: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Severe Drought (-50%)</span>
                <span>Normal (0%)</span>
                <span>Heavy Monsoon (+50%)</span>
              </div>
            </div>

            {/* Slider 2: Temperature Shift */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                  Mean Temperature Shift
                </span>
                <span className={`font-mono font-bold ${whatIf.tempDelta > 0 ? 'text-amber-500' : 'text-blue-500'}`}>
                  {whatIf.tempDelta > 0 ? `+${whatIf.tempDelta}°C` : `${whatIf.tempDelta}°C`} ({effectiveTemp}°C)
                </span>
              </div>
              <input
                type="range"
                min="-4"
                max="6"
                step="0.5"
                value={whatIf.tempDelta}
                onChange={(e) => setWhatIf({ ...whatIf, tempDelta: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Cooler (-4°C)</span>
                <span>Baseline</span>
                <span>Heat Wave (+6°C)</span>
              </div>
            </div>

            {/* Slider 3: Nitrogen Soil Shift */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  Soil Nitrogen (N) Delta
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {whatIf.nitrogenDelta > 0 ? `+${whatIf.nitrogenDelta}` : whatIf.nitrogenDelta} kg/ha (Total: {effectiveN})
                </span>
              </div>
              <input
                type="range"
                min="-40"
                max="50"
                step="5"
                value={whatIf.nitrogenDelta}
                onChange={(e) => setWhatIf({ ...whatIf, nitrogenDelta: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Depleted (-40)</span>
                <span>Baseline</span>
                <span>Heavy Fertilizer (+50)</span>
              </div>
            </div>

            {/* Control 4: Water Constraint Override */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Water Availability Condition
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Inherit', 'Plentiful', 'Moderate', 'Low'] as (WaterConstraint | 'Inherit')[]).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWhatIf({ ...whatIf, waterOverride: w })}
                    className={`py-1.5 px-1 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer ${
                      whatIf.waterOverride === w
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-emerald-950/50 border-slate-200 dark:border-emerald-900/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {w === 'Inherit' ? 'Current' : w === 'Low' ? 'Drought' : w}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Side-by-Side Comparison: Baseline vs Scenario */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Real-Time Impact Comparison (Baseline vs Simulated Scenario)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Baseline Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#112A20] border border-slate-200 dark:border-emerald-900/50 shadow-sm">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 dark:border-emerald-900/40">
                  <span className="text-xs font-bold text-slate-500">BASELINE CONDITIONS</span>
                  <span className="text-[11px] text-slate-400">
                    {weather.annualizedRainfallEst}mm • {weather.temperature}°C
                  </span>
                </div>

                <div className="space-y-2.5">
                  {baseline.top3.map((c, i) => (
                    <div key={c.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-emerald-950/40 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-slate-400">#{i + 1}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{c.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{c.score}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scenario Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/40 border-2 border-emerald-500/80 shadow-md">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-200/60 dark:border-emerald-800/50">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    SIMULATED SCENARIO
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {effectiveRainfall}mm • {effectiveTemp}°C
                  </span>
                </div>

                <div className="space-y-2.5">
                  {scenario.top3.map((c, i) => {
                    const baselineScore = baseline.allEvaluated.find((b) => b.id === c.id)?.score || c.score;
                    const diff = Math.round((c.score - baselineScore) * 10) / 10;
                    return (
                      <div key={c.id} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#112A20] text-xs border border-emerald-200/50 dark:border-emerald-800/40">
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">#{i + 1}</span>
                          <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                            {c.badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 dark:text-white">{c.score}%</span>
                          {diff !== 0 && (
                            <span className={`text-[10px] font-mono font-bold flex items-center ${diff > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                              {diff > 0 ? <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                              {diff > 0 ? `+${diff}%` : `${diff}%`}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-emerald-900/50 bg-slate-50 dark:bg-emerald-950/40 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sandbox</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-emerald-900/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Scenario to Dashboard</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
