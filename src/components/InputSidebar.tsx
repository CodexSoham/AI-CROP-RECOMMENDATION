import React from 'react';
import {
  SlidersHorizontal,
  Droplets,
  Coins,
  Calendar,
  Compass,
  RotateCcw,
  Sparkles,
  HelpCircle,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import {
  SoilNutrients,
  FarmingConstraints,
  WaterConstraint,
  BudgetConstraint,
  GrowingSeason,
} from '../types';
import { SoilHealthRadar } from './SoilHealthRadar';

interface InputSidebarProps {
  soil: SoilNutrients;
  onSoilChange: (newSoil: SoilNutrients) => void;
  constraints: FarmingConstraints;
  onConstraintsChange: (newConstraints: FarmingConstraints) => void;
  onAutoFetchSoil: () => void;
  isLoadingSoilGrids: boolean;
  onRunEngine: () => void;
  isEngineRunning: boolean;
  onResetDefaults: () => void;
}

export const InputSidebar: React.FC<InputSidebarProps> = ({
  soil,
  onSoilChange,
  constraints,
  onConstraintsChange,
  onAutoFetchSoil,
  isLoadingSoilGrids,
  onRunEngine,
  isEngineRunning,
  onResetDefaults,
}) => {
  const updateSoilField = (field: keyof SoilNutrients, value: number) => {
    onSoilChange({
      ...soil,
      [field]: value,
    });
  };

  const updateConstraint = <K extends keyof FarmingConstraints>(
    field: K,
    val: FarmingConstraints[K]
  ) => {
    onConstraintsChange({
      ...constraints,
      [field]: val,
    });
  };

  return (
    <aside className="w-full lg:w-80 xl:w-84 shrink-0 flex flex-col gap-6">
      
      {/* Box 1: Soil Chemistry Parameters */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#112A20] border border-slate-200/80 dark:border-emerald-800/60 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/50 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Soil Parameters
            </h2>
          </div>

          <button
            onClick={onAutoFetchSoil}
            disabled={isLoadingSoilGrids}
            title="Auto-query SoilGrids API / Regional Soil Database"
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/60 transition-colors disabled:opacity-50"
          >
            <MapPin className="w-3 h-3" />
            <span>{isLoadingSoilGrids ? 'Fetching...' : 'GPS SoilGrids'}</span>
          </button>
        </div>

        {/* Soil Type Subtitle */}
        {soil.soilType && (
          <div className="mb-4 text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-emerald-950/40 text-slate-600 dark:text-emerald-200/80 border border-slate-200/60 dark:border-emerald-900/40 flex items-center justify-between">
            <span>Soil Classification:</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[140px]">
              {soil.soilType}
            </span>
          </div>
        )}

        {/* N-P-K Nutrient Balance Radar Chart (Recharts) */}
        <div className="mb-4">
          <SoilHealthRadar soil={soil} />
        </div>

        {/* NPK + pH Inputs */}
        <div className="space-y-4">
          
          {/* Nitrogen (N) */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                Nitrogen (N)
                <span className="text-[10px] text-slate-400 font-normal">kg/ha</span>
              </span>
              <input
                type="number"
                min="0"
                max="160"
                value={soil.N}
                onChange={(e) => updateSoilField('N', Math.max(0, Math.min(160, Number(e.target.value))))}
                className="w-16 text-right px-2 py-0.5 rounded-lg border border-slate-200 dark:border-emerald-800/60 bg-slate-50 dark:bg-emerald-950/50 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={soil.N}
              onChange={(e) => updateSoilField('N', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>Low (&lt;40)</span>
              <span className="text-emerald-600 font-medium">Optimal (60-90)</span>
              <span>High (&gt;110)</span>
            </div>
          </div>

          {/* Phosphorus (P) */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                Phosphorus (P)
                <span className="text-[10px] text-slate-400 font-normal">kg/ha</span>
              </span>
              <input
                type="number"
                min="0"
                max="160"
                value={soil.P}
                onChange={(e) => updateSoilField('P', Math.max(0, Math.min(160, Number(e.target.value))))}
                className="w-16 text-right px-2 py-0.5 rounded-lg border border-slate-200 dark:border-emerald-800/60 bg-slate-50 dark:bg-emerald-950/50 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <input
              type="range"
              min="5"
              max="140"
              value={soil.P}
              onChange={(e) => updateSoilField('P', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>Low (&lt;25)</span>
              <span className="text-emerald-600 font-medium">Optimal (40-70)</span>
              <span>High (&gt;90)</span>
            </div>
          </div>

          {/* Potassium (K) */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                Potassium (K)
                <span className="text-[10px] text-slate-400 font-normal">kg/ha</span>
              </span>
              <input
                type="number"
                min="0"
                max="220"
                value={soil.K}
                onChange={(e) => updateSoilField('K', Math.max(0, Math.min(220, Number(e.target.value))))}
                className="w-16 text-right px-2 py-0.5 rounded-lg border border-slate-200 dark:border-emerald-800/60 bg-slate-50 dark:bg-emerald-950/50 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <input
              type="range"
              min="10"
              max="210"
              value={soil.K}
              onChange={(e) => updateSoilField('K', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>Low (&lt;30)</span>
              <span className="text-emerald-600 font-medium">Optimal (40-80)</span>
              <span>High (&gt;120)</span>
            </div>
          </div>

          {/* Soil pH */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                Soil Reaction (pH)
              </span>
              <input
                type="number"
                step="0.1"
                min="4.0"
                max="9.5"
                value={soil.pH}
                onChange={(e) => updateSoilField('pH', Math.max(4.0, Math.min(9.5, Number(e.target.value))))}
                className="w-16 text-right px-2 py-0.5 rounded-lg border border-slate-200 dark:border-emerald-800/60 bg-slate-50 dark:bg-emerald-950/50 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <input
              type="range"
              step="0.1"
              min="4.5"
              max="9.0"
              value={soil.pH}
              onChange={(e) => updateSoilField('pH', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>Acidic (&lt;6.0)</span>
              <span className="text-emerald-600 font-medium">Neutral (6.5 - 7.5)</span>
              <span>Alkaline (&gt;8.0)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Box 2: Real-World Constraint Controls */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#112A20] border border-slate-200/80 dark:border-emerald-800/60 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/50 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-amber-700 dark:text-amber-300">
              <Droplets className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Real-World Constraints
            </h2>
          </div>
          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-900/40 px-2 py-0.5 rounded-md">
            Active Guardrails
          </span>
        </div>

        <div className="space-y-4">
          
          {/* Water Availability Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Water Availability
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Plentiful', 'Moderate', 'Low'] as WaterConstraint[]).map((level) => {
                const isSelected = constraints.water === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => updateConstraint('water', level)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                      isSelected
                        ? level === 'Low'
                          ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-700 dark:text-rose-300 shadow-sm'
                          : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 shadow-sm'
                        : 'bg-slate-50 dark:bg-emerald-950/30 border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    {level === 'Low' ? 'Low / Drought' : level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Farmer Budget / Resource Capacity */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Farmer Capital / Budget
              </label>
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                {constraints.budget === 'Low'
                  ? 'Low (Constrained)'
                  : constraints.budget === 'Moderate'
                  ? 'Moderate (Standard)'
                  : 'High (Commercial)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Low', 'Moderate', 'High'] as BudgetConstraint[]).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateConstraint('budget', b)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                    constraints.budget === b
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 shadow-sm'
                      : 'bg-slate-50 dark:bg-emerald-950/30 border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Growing Season Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Growing Season
            </label>
            <select
              value={constraints.season}
              onChange={(e) => updateConstraint('season', e.target.value as GrowingSeason)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-emerald-800/60 bg-slate-50 dark:bg-emerald-950/50 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Kharif">Kharif (Monsoon Season • Jun - Oct)</option>
              <option value="Rabi">Rabi (Winter Season • Nov - Apr)</option>
              <option value="Year-Round">Perennial / Year-Round Cultivation</option>
            </select>
          </div>

        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-emerald-900/50 flex flex-col gap-2.5">
          <button
            onClick={onRunEngine}
            disabled={isEngineRunning}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEngineRunning ? 'animate-spin' : ''}`} />
            <span>{isEngineRunning ? 'Recalibrating Models...' : 'Run Constraint Engine'}</span>
          </button>

          <button
            onClick={onResetDefaults}
            className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Farm Baseline</span>
          </button>
        </div>

      </div>

    </aside>
  );
};
