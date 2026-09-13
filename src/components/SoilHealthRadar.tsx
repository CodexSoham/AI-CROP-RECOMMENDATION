import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { SoilNutrients } from '../types';

interface SoilHealthRadarProps {
  soil: SoilNutrients;
}

interface NutrientAxis {
  key: string;
  name: string;
  current: number; // 0 - 100 scale for radar rendering
  ideal: number;   // benchmark target
  rawCurrent: number;
  rawIdeal: string;
  unit: string;
  status: 'Low' | 'Optimal' | 'High';
}

export const SoilHealthRadar: React.FC<SoilHealthRadarProps> = ({ soil }) => {
  // 1. Calculate status and normalized indices (0-100) for each soil axis
  // Nitrogen: Ideal 60 - 90 kg/ha (midpoint ~75)
  const nStatus: 'Low' | 'Optimal' | 'High' =
    soil.N < 50 ? 'Low' : soil.N > 100 ? 'High' : 'Optimal';
  const nScore = Math.min(100, Math.max(10, Math.round((soil.N / 130) * 100)));

  // Phosphorus: Ideal 40 - 70 kg/ha (midpoint ~55)
  const pStatus: 'Low' | 'Optimal' | 'High' =
    soil.P < 35 ? 'Low' : soil.P > 80 ? 'High' : 'Optimal';
  const pScore = Math.min(100, Math.max(10, Math.round((soil.P / 90) * 100)));

  // Potassium: Ideal 40 - 80 kg/ha (midpoint ~60)
  const kStatus: 'Low' | 'Optimal' | 'High' =
    soil.K < 35 ? 'Low' : soil.K > 95 ? 'High' : 'Optimal';
  const kScore = Math.min(100, Math.max(10, Math.round((soil.K / 110) * 100)));

  // pH: Ideal 6.2 - 7.5 (midpoint ~6.8)
  const phStatus: 'Low' | 'Optimal' | 'High' =
    soil.pH < 6.0 ? 'Low' : soil.pH > 7.8 ? 'High' : 'Optimal';
  const phDeviation = Math.abs(soil.pH - 6.8);
  const phScore = Math.min(100, Math.max(15, Math.round(100 - phDeviation * 25)));

  // Organic Carbon: Ideal 1.2 - 2.5% (default 1.4%)
  const oc = soil.organicCarbon ?? 1.4;
  const ocStatus: 'Low' | 'Optimal' | 'High' =
    oc < 1.0 ? 'Low' : oc > 2.6 ? 'High' : 'Optimal';
  const ocScore = Math.min(100, Math.max(10, Math.round((oc / 2.2) * 100)));

  // Radar dataset
  const radarData: NutrientAxis[] = [
    {
      key: 'N',
      name: 'N (Nitrogen)',
      current: nScore,
      ideal: 65,
      rawCurrent: soil.N,
      rawIdeal: '60 - 90',
      unit: 'kg/ha',
      status: nStatus,
    },
    {
      key: 'P',
      name: 'P (Phosphorus)',
      current: pScore,
      ideal: 65,
      rawCurrent: soil.P,
      rawIdeal: '40 - 70',
      unit: 'kg/ha',
      status: pStatus,
    },
    {
      key: 'K',
      name: 'K (Potassium)',
      current: kScore,
      ideal: 65,
      rawCurrent: soil.K,
      rawIdeal: '40 - 80',
      unit: 'kg/ha',
      status: kStatus,
    },
    {
      key: 'pH',
      name: 'Reaction (pH)',
      current: phScore,
      ideal: 80,
      rawCurrent: Number(soil.pH.toFixed(1)),
      rawIdeal: '6.2 - 7.5',
      unit: 'pH',
      status: phStatus,
    },
    {
      key: 'C',
      name: 'Organic (C)',
      current: ocScore,
      ideal: 70,
      rawCurrent: Number(oc.toFixed(1)),
      rawIdeal: '1.2 - 2.5',
      unit: '%',
      status: ocStatus,
    },
  ];

  // Overall NPK Health Balance Index (0 - 100%)
  const optimalCount = [nStatus, pStatus, kStatus, phStatus, ocStatus].filter(
    (s) => s === 'Optimal'
  ).length;
  const balancePercentage = Math.round((optimalCount / 5) * 100);

  const getStatusBadge = (status: 'Low' | 'Optimal' | 'High') => {
    switch (status) {
      case 'Optimal':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'Low':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'High':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800';
    }
  };

  return (
    <div className="w-full bg-slate-50/70 dark:bg-[#0d2018]/60 border border-slate-200/80 dark:border-emerald-900/40 rounded-2xl p-3.5 flex flex-col gap-2.5 transition-colors">
      
      {/* Header: Title & Balance Score */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
            Nutrient Equilibrium
          </span>
          <h3 className="text-xs font-black text-slate-800 dark:text-stone-200 leading-tight">
            N-P-K Soil Health Radar
          </h3>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white dark:bg-[#112A20] border border-slate-200/80 dark:border-emerald-800/60 shadow-xs">
          <span
            className={`w-2 h-2 rounded-full ${
              balancePercentage >= 80
                ? 'bg-emerald-500 animate-pulse'
                : balancePercentage >= 40
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
          />
          <span className="text-[11px] font-extrabold text-slate-900 dark:text-white">
            {balancePercentage}% Balanced
          </span>
        </div>
      </div>

      {/* Radar Chart Container */}
      <div className="relative w-full h-44 sm:h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 10, right: 15, bottom: 10, left: 15 }}>
            <PolarGrid
              stroke="#94a3b8"
              strokeDasharray="3 3"
              strokeOpacity={0.35}
            />
            <PolarAngleAxis
              dataKey="key"
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            
            {/* Target Ideal Zone Polygon (Benchmark) */}
            <Radar
              name="Ideal Health Range"
              dataKey="ideal"
              stroke="#0284c7"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="#38bdf8"
              fillOpacity={0.12}
            />

            {/* Current Soil Nutrient Levels Polygon */}
            <Radar
              name="Current Soil Level"
              dataKey="current"
              stroke="#10b981"
              strokeWidth={2}
              fill="#10b981"
              fillOpacity={0.42}
              activeDot={{ r: 4, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
            />

            {/* Interactive Tooltip with Rich Nutrients Detail */}
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as NutrientAxis;
                  return (
                    <div className="bg-stone-900 text-white text-[11px] px-3 py-2 rounded-xl shadow-xl border border-stone-700 min-w-[150px]">
                      <div className="font-black text-stone-100 border-b border-stone-700 pb-1 mb-1.5 flex items-center justify-between">
                        <span>{data.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold ${
                          data.status === 'Optimal'
                            ? 'bg-emerald-900 text-emerald-200'
                            : data.status === 'Low'
                            ? 'bg-amber-900 text-amber-200'
                            : 'bg-purple-900 text-purple-200'
                        }`}>
                          {data.status}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-stone-400">Current:</span>
                          <span className="font-bold text-lime-400">
                            {data.rawCurrent} {data.unit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Ideal Range:</span>
                          <span className="font-semibold text-sky-300">
                            {data.rawIdeal} {data.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Quick Diagnostic Pill Indicators */}
      <div className="flex items-center justify-between px-1 text-[10px]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block opacity-80" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Current Soil
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 border-b-2 border-dashed border-sky-500 inline-block" />
          <span className="font-semibold text-slate-500 dark:text-slate-400">
            Ideal Range Target
          </span>
        </div>
      </div>

      {/* Real-Time N-P-K Value Status Strip */}
      <div className="grid grid-cols-3 gap-1.5 pt-1">
        <div className={`px-2 py-1.5 rounded-xl border text-center ${getStatusBadge(nStatus)}`}>
          <div className="text-[9px] font-bold opacity-80">Nitrogen</div>
          <div className="text-xs font-black">{soil.N} <span className="text-[9px] font-normal">kg</span></div>
          <div className="text-[8px] font-extrabold uppercase mt-0.5">{nStatus}</div>
        </div>

        <div className={`px-2 py-1.5 rounded-xl border text-center ${getStatusBadge(pStatus)}`}>
          <div className="text-[9px] font-bold opacity-80">Phosphorus</div>
          <div className="text-xs font-black">{soil.P} <span className="text-[9px] font-normal">kg</span></div>
          <div className="text-[8px] font-extrabold uppercase mt-0.5">{pStatus}</div>
        </div>

        <div className={`px-2 py-1.5 rounded-xl border text-center ${getStatusBadge(kStatus)}`}>
          <div className="text-[9px] font-bold opacity-80">Potassium</div>
          <div className="text-xs font-black">{soil.K} <span className="text-[9px] font-normal">kg</span></div>
          <div className="text-[8px] font-extrabold uppercase mt-0.5">{kStatus}</div>
        </div>
      </div>

    </div>
  );
};
