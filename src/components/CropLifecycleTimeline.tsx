import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Sprout,
  Leaf,
  Flower2,
  Wheat,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Zap,
  ChevronDown,
  ChevronUp,
  MapPin,
  CalendarCheck,
} from 'lucide-react';
import {
  calculateCropLifecycleTimeline,
  SOWING_DATE_PRESETS,
} from '../utils/cropLifecycle';
import { GrowthStageInfo, GrowthStageKey } from '../types';

interface CropLifecycleTimelineProps {
  cropId: string;
  cropName: string;
  currentDate?: string; // e.g. "2026-09-13"
  initialSowingPreset?: string;
  compact?: boolean;
}

export const CropLifecycleTimeline: React.FC<CropLifecycleTimelineProps> = ({
  cropId,
  cropName,
  currentDate = '2026-09-13',
  initialSowingPreset = 'today',
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(initialSowingPreset);
  const [customSowingDate, setCustomSowingDate] = useState<string>(currentDate);
  const [selectedStageKey, setSelectedStageKey] = useState<GrowthStageKey | null>(null);
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState<boolean>(false);

  // Determine effective sowing date string based on preset or custom input
  const effectiveSowingDate = useMemo(() => {
    if (selectedPreset === 'custom') {
      return customSowingDate || currentDate;
    }
    const found = SOWING_DATE_PRESETS.find((p) => p.id === selectedPreset);
    return found ? found.date : currentDate;
  }, [selectedPreset, customSowingDate, currentDate]);

  // Compute reactive agronomic lifecycle data
  const lifecycle = useMemo(() => {
    return calculateCropLifecycleTimeline(
      cropId,
      cropName,
      effectiveSowingDate,
      currentDate
    );
  }, [cropId, cropName, effectiveSowingDate, currentDate]);

  // Determine active stage
  const activeStage = useMemo(() => {
    return (
      lifecycle.stages.find((s) => s.status === 'active') ||
      (lifecycle.daysElapsed <= 0 ? lifecycle.stages[0] : lifecycle.stages[3])
    );
  }, [lifecycle]);

  // If user hasn't explicitly selected a stage to inspect, default to the currently active stage
  const inspectedStage: GrowthStageInfo = useMemo(() => {
    if (selectedStageKey) {
      const found = lifecycle.stages.find((s) => s.key === selectedStageKey);
      if (found) return found;
    }
    return activeStage;
  }, [selectedStageKey, lifecycle, activeStage]);

  const getStageIcon = (key: GrowthStageKey, className: string = 'w-4 h-4') => {
    switch (key) {
      case 'sowing':
        return <Sprout className={className} />;
      case 'vegetative':
        return <Leaf className={className} />;
      case 'flowering':
        return <Flower2 className={className} />;
      case 'harvest':
        return <Wheat className={className} />;
      default:
        return <Sprout className={className} />;
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-emerald-900/50">
      
      {/* Header with Title & Date Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-700/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Growth Lifecycle Timeline
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                {lifecycle.totalDurationDays} Days Total Cycle
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Calibrated to Today: <strong className="text-slate-700 dark:text-slate-200">Sep 13, 2026</strong> ({lifecycle.seasonAlignment})
            </p>
          </div>
        </div>

        {/* Sowing Reference Presets Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-emerald-950/60 p-1 rounded-xl border border-slate-200/70 dark:border-emerald-800/60 self-start sm:self-auto text-[11px]">
          <span className="text-[10px] font-semibold text-slate-500 dark:text-emerald-400 px-1.5 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Sowing:
          </span>
          {SOWING_DATE_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedPreset(preset.id)}
                title={preset.desc}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-emerald-900/50'
                }`}
              >
                {preset.id === 'today'
                  ? 'Plant Today (Sep 13)'
                  : preset.id === 'rabi-early'
                  ? 'Upcoming Rabi (Oct 1)'
                  : 'Kharif Sown (Jul 1)'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Lifecycle Stepper / Progress Track */}
      <div className="relative py-2">
        {/* Horizontal Connecting Progress Rail */}
        <div className="hidden sm:block absolute top-[28px] left-[10%] right-[10%] h-1 bg-slate-200 dark:bg-emerald-950/80 rounded-full z-0">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-full transition-all duration-700 shadow-xs"
            style={{ width: `${lifecycle.overallProgressPercent}%` }}
          />
        </div>

        {/* 4 Stages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative z-10">
          {lifecycle.stages.map((stage) => {
            const isActive = stage.status === 'active';
            const isCompleted = stage.status === 'completed';
            const isSelected = inspectedStage.key === stage.key;

            return (
              <button
                key={stage.key}
                type="button"
                onClick={() => {
                  setSelectedStageKey(stage.key);
                  setIsDetailedViewOpen(true);
                }}
                className={`text-left p-2.5 sm:p-3 rounded-2xl border transition-all relative flex flex-col justify-between cursor-pointer group ${
                  isActive
                    ? 'bg-gradient-to-b from-emerald-50 to-teal-50/70 dark:from-emerald-950/80 dark:to-[#123826] border-emerald-500 dark:border-emerald-400 shadow-md ring-2 ring-emerald-500/20'
                    : isCompleted
                    ? 'bg-slate-50/80 dark:bg-[#0d221a]/80 border-slate-200/80 dark:border-emerald-900/40 opacity-90'
                    : 'bg-white dark:bg-[#112A20]/80 border-slate-200/70 dark:border-emerald-900/40 hover:border-emerald-400/60'
                } ${isSelected ? 'ring-2 ring-emerald-400/50' : ''}`}
              >
                {/* Active Stage Pulsing Badge */}
                {isActive && (
                  <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Current Stage
                  </div>
                )}

                {/* Top: Icon & Stage Number */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-500 dark:bg-emerald-950 dark:text-slate-400 group-hover:text-emerald-500'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                    ) : (
                      getStageIcon(stage.key, 'w-4 h-4')
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    Stage {stage.stageNumber}
                  </span>
                </div>

                {/* Middle: Stage Title & Subtitle */}
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">
                    {stage.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {stage.subTitle}
                  </p>
                </div>

                {/* Bottom: Date Window & Duration */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-emerald-900/40 flex flex-col gap-0.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {stage.startDate.replace(/, \d{4}/, '')} – {stage.endDate.replace(/, \d{4}/, '')}
                    </span>
                    <span className="font-mono text-slate-400">
                      {stage.durationDays}d
                    </span>
                  </div>

                  {/* Stage-level mini progress bar */}
                  {isActive && (
                    <div className="mt-1 w-full bg-emerald-200/60 dark:bg-emerald-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stage.progressPercent}%` }}
                      />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Real-Time Agronomic Status Banner */}
      <div className="mt-3 p-3 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <CalendarCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-emerald-950 dark:text-emerald-100">
                {lifecycle.currentStageName}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-emerald-900/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 font-semibold">
                Day {lifecycle.daysElapsed} of {lifecycle.totalDurationDays} ({lifecycle.overallProgressPercent}% Complete)
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                • {lifecycle.daysRemaining} days until harvest ({lifecycle.harvestDate})
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-1">
              {lifecycle.managementAlert}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsDetailedViewOpen(!isDetailedViewOpen)}
          className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-bold text-[11px] flex items-center gap-1 self-end sm:self-auto cursor-pointer shrink-0"
        >
          <span>{isDetailedViewOpen ? 'Hide Agronomic Guide' : 'View Stage Operations'}</span>
          {isDetailedViewOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Agronomic Operations Guide for Selected Stage */}
      {isDetailedViewOpen && (
        <div className="mt-3 p-4 rounded-2xl bg-white dark:bg-[#0c241b] border border-emerald-300 dark:border-emerald-800/80 shadow-sm animate-fadeIn text-xs">
          
          {/* Header of the inspected stage */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-emerald-900/50 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                {getStageIcon(inspectedStage.key, 'w-4 h-4')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                    {inspectedStage.name} Details
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-emerald-300 border border-slate-200 dark:border-emerald-800">
                    Days {inspectedStage.startDay} – {inspectedStage.endDay} ({inspectedStage.durationDays} Days)
                  </span>
                  {inspectedStage.status === 'active' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                      Active Now
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Window: {inspectedStage.startDate} to {inspectedStage.endDate}
                </p>
              </div>
            </div>

            {/* Quick stage tab selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-emerald-950 p-1 rounded-xl text-[10px]">
              {lifecycle.stages.map((stg) => (
                <button
                  key={stg.key}
                  type="button"
                  onClick={() => setSelectedStageKey(stg.key)}
                  className={`px-2 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    inspectedStage.key === stg.key
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {stg.key.charAt(0).toUpperCase() + stg.key.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Agronomic Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Column 1: Critical Field Tasks */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200/70 dark:border-emerald-900/40 flex flex-col gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Key Agronomic Operations
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                {inspectedStage.criticalTasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Water & Nutrients */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200/70 dark:border-emerald-900/40 flex flex-col gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5 text-teal-700 dark:text-teal-400">
                <Droplets className="w-3.5 h-3.5" />
                Water & Nutrient Scheduling
              </span>
              
              <div className="text-[11px] space-y-2">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">Irrigation:</span>
                  <p className="text-slate-600 dark:text-slate-300">{inspectedStage.waterRequirementTip}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">Fertilizer Dose:</span>
                  <p className="text-slate-600 dark:text-slate-300">{inspectedStage.nutrientRecommendation}</p>
                </div>
              </div>
            </div>

            {/* Column 3: Risks & Defenses */}
            <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex flex-col gap-2">
              <span className="font-extrabold text-amber-900 dark:text-amber-200 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Stage Risk & Prevention
              </span>
              <p className="text-[11px] text-amber-900 dark:text-amber-300">
                {inspectedStage.riskAlert}
              </p>
              <div className="mt-auto pt-2 text-[10px] text-amber-800 dark:text-amber-400 font-medium">
                💡 Monitored against live station telemetry
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
