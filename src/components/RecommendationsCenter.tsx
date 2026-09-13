import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Coins,
  Calendar,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Wheat,
} from 'lucide-react';
import { CropRecommendation, FarmingConstraints } from '../types';
import { CropLifecycleTimeline } from './CropLifecycleTimeline';

interface RecommendationsCenterProps {
  recommendations: CropRecommendation[];
  allEvaluated: CropRecommendation[];
  constraints: FarmingConstraints;
  onSelectCropForDetails?: (crop: CropRecommendation) => void;
  onOpenWhatIf: () => void;
}

export const RecommendationsCenter: React.FC<RecommendationsCenterProps> = ({
  recommendations,
  allEvaluated,
  constraints,
  onOpenWhatIf,
}) => {
  const [showFullMatrix, setShowFullMatrix] = useState<boolean>(false);
  const [expandedCropId, setExpandedCropId] = useState<string | null>(recommendations[0]?.id || null);

  const top3 = recommendations.slice(0, 3);

  // Identify noteworthy re-rankings (e.g. large drops or jumps due to constraints)
  const demotedCrops = allEvaluated
    .filter((c) => c.rawScore - c.score >= 15)
    .slice(0, 2);

  const boostedCrops = allEvaluated
    .filter((c) => c.score - c.rawScore >= 8)
    .slice(0, 2);

  return (
    <main className="flex-1 flex flex-col gap-6 min-w-0">
      
      {/* Top Banner: Constraint Engine Status Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-900 via-[#163827] to-teal-950 text-white shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Constraint Engine Calibrated
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Active
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-white mt-0.5 font-display">
                Top 3 Most Viable Crops Under Real-World Conditions
              </h1>
            </div>
          </div>

          <button
            onClick={onOpenWhatIf}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Simulate What-If</span>
          </button>
        </div>

        {/* Constraint Re-ranking Notes Pill */}
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs text-emerald-100/90">
          <span className="font-semibold text-emerald-300">Engine Adjustments:</span>
          {constraints.water === 'Low' && (
            <span className="px-2 py-0.5 rounded-md bg-rose-500/30 border border-rose-400/40 text-rose-200 text-[11px] font-medium flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              High-water cultivars demoted (-48%)
            </span>
          )}
          {constraints.budget === 'Low' && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500/30 border border-amber-400/40 text-amber-200 text-[11px] font-medium">
              High-capital perennials penalized (-35%)
            </span>
          )}
          {boostedCrops.length > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-[11px] font-medium">
              {boostedCrops[0].name} promoted (+{Math.round(boostedCrops[0].score - boostedCrops[0].rawScore)}% resilience)
            </span>
          )}
        </div>
      </div>

      {/* Top 3 Ranked Recommendation Cards */}
      <div className="space-y-4">
        {top3.map((crop, index) => {
          const isPrimary = index === 0;
          const isExpanded = expandedCropId === crop.id;

          const medalColor =
            index === 0
              ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/60 dark:text-amber-200 dark:border-amber-700'
              : index === 1
              ? 'bg-slate-200 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
              : 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800';

          const medalIcon = index === 0 ? '🥇 #1 Rank' : index === 1 ? '🥈 #2 Rank' : '🥉 #3 Rank';

          return (
            <div
              key={crop.id}
              className={`rounded-3xl border transition-all duration-200 shadow-md ${
                isPrimary
                  ? 'bg-white dark:bg-[#112A20] border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-[#112A20] border-slate-200/80 dark:border-emerald-800/50 hover:border-emerald-400/70'
              }`}
            >
              {/* Card Header Section */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left: Rank badge, Crop name & Scientific info */}
                  <div className="flex items-start gap-3.5">
                    <div className={`px-2.5 py-1 rounded-xl text-xs font-black border flex items-center justify-center shrink-0 ${medalColor}`}>
                      {medalIcon}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                          {crop.name}
                        </h3>
                        
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60">
                          {crop.badge}
                        </span>

                        <span className="text-xs text-slate-400 italic">
                          ({crop.scientificName})
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                        <span>Category: <strong className="text-slate-700 dark:text-slate-300">{crop.category}</strong></span>
                        <span>•</span>
                        <span>Expected Yield: <strong className="text-emerald-700 dark:text-emerald-300">{crop.expectedYield}</strong></span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Radial Suitability Ring & Score */}
                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    {/* Raw vs Adjusted Suitability Indicator */}
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                        {crop.score}%
                      </div>
                      <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        Suitability
                      </div>
                      {Math.abs(crop.score - crop.rawScore) >= 1 && (
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Raw: {crop.rawScore}% ({crop.score >= crop.rawScore ? `+${Math.round((crop.score - crop.rawScore)*10)/10}` : Math.round((crop.score - crop.rawScore)*10)/10}%)
                        </div>
                      )}
                    </div>

                    {/* SVG Radial Gauge Meter */}
                    <div className="relative w-14 h-14 shrink-0">
                      <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                        {/* Background track */}
                        <path
                          className="text-slate-100 dark:text-emerald-950 stroke-current"
                          strokeWidth="3.2"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Fill track */}
                        <path
                          className={`${
                            crop.score >= 88
                              ? 'text-emerald-500'
                              : crop.score >= 80
                              ? 'text-teal-500'
                              : 'text-amber-500'
                          } stroke-current transition-all duration-700`}
                          strokeDasharray={`${crop.score}, 100`}
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-slate-700 dark:text-slate-200">
                        #{crop.rank}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Constraint Re-weighting Explanation Badge */}
                <div className="mt-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200/70 dark:border-emerald-900/40 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">
                      {crop.adjustmentReason}
                    </span>
                  </div>

                  <button
                    onClick={() => setExpandedCropId(isExpanded ? null : crop.id)}
                    className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 text-[11px] font-bold flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>{isExpanded ? 'Less' : 'Details'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>

                {/* Visual Growth Lifecycle Timeline based on current date */}
                <CropLifecycleTimeline
                  cropId={crop.id}
                  cropName={crop.name}
                  currentDate="2026-09-13"
                />

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-emerald-900/40 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] block mb-1.5">
                        Key Agronomic Merits
                      </span>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                        {crop.keyStrengths.map((s, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] block mb-1.5">
                        Risk Considerations & Constraints
                      </span>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                        {crop.riskFactors.map((r, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Re-ranking Highlights & Warnings */}
      {demotedCrops.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900 dark:text-amber-200">
                Constraint Engine Demotion Notice:
              </span>
              <p className="text-amber-800 dark:text-amber-300 mt-0.5">
                {demotedCrops.map((c) => `${c.name} (raw ${c.rawScore}% → calibrated ${c.score}%)`).join(', ')} were demoted due to the current {constraints.water} water / {constraints.budget} budget limits to protect against crop failure.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comparative Evaluation Matrix Toggle */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#112A20] border border-slate-200/80 dark:border-emerald-800/50 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Full 22-Crop Agronomic Evaluation Matrix
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Inspect how all candidates ranked across water, budget, and raw ML probabilities.
            </p>
          </div>

          <button
            onClick={() => setShowFullMatrix(!showFullMatrix)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-xs font-semibold text-slate-700 dark:text-emerald-200 transition-colors flex items-center gap-1"
          >
            <span>{showFullMatrix ? 'Hide Full Matrix' : 'View All 22 Crops'}</span>
            {showFullMatrix ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showFullMatrix && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-emerald-900/40 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-emerald-900/50">
                  <th className="pb-2 font-bold">Rank</th>
                  <th className="pb-2 font-bold">Crop</th>
                  <th className="pb-2 font-bold">Category</th>
                  <th className="pb-2 font-bold">Water Req</th>
                  <th className="pb-2 font-bold text-right">Raw ML %</th>
                  <th className="pb-2 font-bold text-right">Calibrated %</th>
                  <th className="pb-2 font-bold pl-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
                {allEvaluated.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-emerald-950/40">
                    <td className="py-2 font-bold font-mono text-slate-500">#{c.rank}</td>
                    <td className="py-2 font-bold text-slate-900 dark:text-white">{c.name}</td>
                    <td className="py-2 text-slate-500 dark:text-slate-400">{c.category}</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        c.waterNeed === 'High'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : c.waterNeed === 'Moderate'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {c.waterNeed}
                      </span>
                    </td>
                    <td className="py-2 text-right font-mono text-slate-500">{c.rawScore}%</td>
                    <td className="py-2 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">{c.score}%</td>
                    <td className="py-2 pl-4">
                      <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                        {c.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </main>
  );
};
