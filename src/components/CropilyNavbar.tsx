import React from 'react';
import {
  Moon,
  Sun,
  Map,
  BarChart3,
  Home,
  HelpCircle,
  Sliders,
  FileText,
  Sparkles,
} from 'lucide-react';
import { KshetraLogo } from './KshetraLogo';

export type CropilySection = 'landing' | 'map' | 'analysis' | 'ending' | 'studio';

interface CropilyNavbarProps {
  currentSection: CropilySection;
  onSelectSection: (section: CropilySection) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenWhatIf: () => void;
  onOpenOcr: () => void;
}

export const CropilyNavbar: React.FC<CropilyNavbarProps> = ({
  currentSection,
  onSelectSection,
  isDarkMode,
  onToggleTheme,
  onOpenWhatIf,
  onOpenOcr,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F3ED]/95 dark:bg-[#0C140F]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand: KshetraAI Logo Provided */}
        <button
          type="button"
          onClick={() => onSelectSection('landing')}
          className="cursor-pointer group text-left"
        >
          <KshetraLogo size="md" variant="horizontal" />
        </button>

        {/* Section View Tabs (Matching the 4 visual sections from the image) */}
        <nav className="hidden md:flex items-center p-1 rounded-2xl bg-stone-100 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => onSelectSection('landing')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentSection === 'landing'
                ? 'bg-stone-900 text-white dark:bg-lime-400 dark:text-stone-950 font-black shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectSection('map')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentSection === 'map'
                ? 'bg-stone-900 text-white dark:bg-lime-400 dark:text-stone-950 font-black shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Deciding Area</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectSection('analysis')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentSection === 'analysis'
                ? 'bg-stone-900 text-white dark:bg-lime-400 dark:text-stone-950 font-black shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analysis Data</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectSection('ending')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              currentSection === 'ending'
                ? 'bg-stone-900 text-white dark:bg-lime-400 dark:text-stone-950 font-black shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ & About</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectSection('studio')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-emerald-700 dark:text-emerald-400 ${
              currentSection === 'studio'
                ? 'bg-emerald-700 text-white dark:bg-emerald-600 dark:text-white font-black shadow-xs'
                : 'hover:bg-emerald-100/50 dark:hover:bg-emerald-950/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Crop ML Studio</span>
          </button>
        </nav>

        {/* Right Tools & Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Quick OCR Scan */}
          <button
            type="button"
            onClick={onOpenOcr}
            title="Scan Soil Test Report"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold border border-stone-200 dark:border-stone-700 cursor-pointer transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>OCR Lab Card</span>
          </button>

          {/* Quick What-If Simulator */}
          <button
            type="button"
            onClick={onOpenWhatIf}
            title="What-If Scenario Simulator"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-[#D4F843] text-xs font-bold shadow-xs cursor-pointer transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>What-If</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 dark:border-stone-800 py-2 px-3 text-[11px] font-bold overflow-x-auto gap-1">
        <button
          type="button"
          onClick={() => onSelectSection('landing')}
          className={`px-2 py-1 rounded-lg ${currentSection === 'landing' ? 'bg-stone-900 text-white font-black' : 'text-stone-500'}`}
        >
          Landing
        </button>
        <button
          type="button"
          onClick={() => onSelectSection('map')}
          className={`px-2 py-1 rounded-lg ${currentSection === 'map' ? 'bg-stone-900 text-white font-black' : 'text-stone-500'}`}
        >
          Deciding Area
        </button>
        <button
          type="button"
          onClick={() => onSelectSection('analysis')}
          className={`px-2 py-1 rounded-lg ${currentSection === 'analysis' ? 'bg-stone-900 text-white font-black' : 'text-stone-500'}`}
        >
          Analysis
        </button>
        <button
          type="button"
          onClick={() => onSelectSection('ending')}
          className={`px-2 py-1 rounded-lg ${currentSection === 'ending' ? 'bg-stone-900 text-white font-black' : 'text-stone-500'}`}
        >
          FAQ
        </button>
        <button
          type="button"
          onClick={() => onSelectSection('studio')}
          className={`px-2 py-1 rounded-lg text-emerald-600 font-black ${currentSection === 'studio' ? 'bg-emerald-100' : ''}`}
        >
          Studio
        </button>
      </div>

    </header>
  );
};
