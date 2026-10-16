import React from 'react';
import { KompetensiSection, PKGState } from '../types/pkg';
import { hitungSkorKompetensi, getLevelKompetensi } from '../utils/calculations';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface KompetensiFormProps {
  section: KompetensiSection;
  onUpdate: (updated: KompetensiSection) => void;
  onNavigate: (tabId: string) => void;
  prevTab: string;
  nextTab: string;
}

export const KompetensiForm: React.FC<KompetensiFormProps> = ({
  section,
  onUpdate,
  onNavigate,
  prevTab,
  nextTab,
}) => {
  const currentScore = hitungSkorKompetensi(section);
  const calculatedLevel = getLevelKompetensi(currentScore).level;

  const handleItemScoreChange = (index: number, newScore: number) => {
    const updatedItems = [...section.items];
    updatedItems[index] = {
      ...updatedItems[index],
      nilai: newScore,
    };
    onUpdate({
      ...section,
      items: updatedItems,
    });
  };

  const handleSetAll = (score: number) => {
    const updatedItems = section.items.map((item) => ({
      ...item,
      nilai: score,
    }));
    onUpdate({
      ...section,
      items: updatedItems,
      selectedLevel: score === 4 ? 5 : score === 3 ? 4 : score === 2 ? 3 : 2,
    });
  };

  const handleLevelSelect = (level: number) => {
    onUpdate({
      ...section,
      selectedLevel: level,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700">
            Model Kompetensi Guru
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">{section.nama}</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {section.deskripsiUmum}
          </p>
        </div>

        {/* Score & Level Display */}
        <div className="flex items-center gap-4 bg-amber-50/80 border border-amber-200 p-3 rounded-xl shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-500">Total Skor</div>
            <div className="text-2xl font-black text-amber-700 font-mono tabular-nums leading-none">
              {currentScore.toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Maksimum: 100,00</div>
          </div>
          <div className="h-8 w-px bg-amber-200" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-500">Tingkat Capaian</div>
            <div className="text-sm font-extrabold text-amber-900">
              Level {section.selectedLevel}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold">
              {section.selectedLevel >= 4 ? 'Terpenuhi Baik' : 'Perlu Bimbingan'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Fill Utility Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="font-semibold">Isi Cepat Semua Indikator:</span>
          <div className="flex items-center gap-1.5">
            {[4, 3, 2, 1].map((val) => (
              <button
                key={val}
                onClick={() => handleSetAll(val)}
                className="px-2.5 py-1 font-bold rounded-md bg-white hover:bg-amber-100 text-slate-700 border border-slate-200 transition-colors"
              >
                Semua Nilai {val}
              </button>
            ))}
          </div>
        </div>

        <div className="text-slate-500 text-[11px]">
          Skala: 4 (Sangat Baik) · 3 (Baik) · 2 (Cukup) · 1 (Kurang)
        </div>
      </div>

      {/* Main Indicators Table matching PDF layout */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="py-3 px-3 w-12 text-center border-r border-slate-200">No</th>
                <th className="py-3 px-4 w-44 border-r border-slate-200">Indikator</th>
                <th className="py-3 px-4 border-r border-slate-200">Butir Penilaian</th>
                <th className="py-3 px-4 w-56 border-r border-slate-200">Bukti Dukung</th>
                <th className="py-3 px-4 w-36 text-center">Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {section.items.map((item, idx) => (
                <tr
                  key={item.no}
                  className={`hover:bg-amber-50/50 transition-colors ${
                    idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                  }`}
                >
                  <td className="py-3 px-3 text-center font-bold text-slate-600 border-r border-slate-200 font-mono">
                    {item.no}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 border-r border-slate-200 align-top">
                    {item.indikator}
                  </td>
                  <td className="py-3 px-4 text-slate-700 border-r border-slate-200 leading-relaxed align-top">
                    {item.butirPenilaian}
                  </td>
                  <td className="py-3 px-4 text-slate-600 border-r border-slate-200 text-[11px] leading-relaxed align-top italic">
                    {item.buktiDukung}
                  </td>
                  <td className="py-3 px-4 align-top">
                    <div className="flex items-center justify-center gap-1">
                      {[1, 2, 3, 4].map((score) => {
                        const isSelected = item.nilai === score;
                        return (
                          <button
                            key={score}
                            type="button"
                            onClick={() => handleItemScoreChange(idx, score)}
                            className={`w-7 h-7 rounded-md font-bold text-xs transition-all ${
                              isSelected
                                ? 'bg-amber-600 text-white shadow-xs scale-105'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {score}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rubric Table: TINGKAT KOMPETENSI (Level 1 - 5) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Tingkat Kompetensi {section.nama.replace(/^\d+\.\s*/, '')}
          </h3>
          <span className="text-xs text-slate-500">
            Klik pada level untuk memilih tingkat capaian guru
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-300 border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white font-bold text-center">
                <th className="py-2.5 px-3 border border-slate-700 w-12">No.</th>
                <th className="py-2.5 px-3 border border-slate-700 w-1/5">Level 1</th>
                <th className="py-2.5 px-3 border border-slate-700 w-1/5">Level 2</th>
                <th className="py-2.5 px-3 border border-slate-700 w-1/5">Level 3</th>
                <th className="py-2.5 px-3 border border-slate-700 w-1/5">Level 4</th>
                <th className="py-2.5 px-3 border border-slate-700 w-1/5">Level 5</th>
                <th className="py-2.5 px-3 border border-slate-700 w-24">SKOR</th>
              </tr>
              {/* Checkmark indicator row matching PDF format */}
              <tr className="bg-amber-50 text-amber-950 font-bold text-center">
                <td className="py-1 border border-slate-300">1</td>
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <td
                    key={lvl}
                    onClick={() => handleLevelSelect(lvl)}
                    className={`py-1 border border-slate-300 cursor-pointer font-black text-sm transition-colors ${
                      section.selectedLevel === lvl ? 'bg-amber-400 text-slate-900' : 'hover:bg-amber-100'
                    }`}
                  >
                    {section.selectedLevel === lvl ? '✓' : ''}
                  </td>
                ))}
                <td className="py-1 border border-slate-300 font-mono font-bold text-amber-900">
                  {currentScore.toFixed(2)}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-300 text-center font-bold font-mono">Deskripsi</td>
                {section.rubrikLevels.map((rubrik) => {
                  const isChosen = section.selectedLevel === rubrik.level;
                  return (
                    <td
                      key={rubrik.level}
                      onClick={() => handleLevelSelect(rubrik.level)}
                      className={`p-3 border border-slate-300 align-top cursor-pointer transition-colors leading-relaxed ${
                        isChosen ? 'bg-amber-50/80 font-medium text-slate-900 ring-2 ring-inset ring-amber-500' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold mb-1 text-[11px] text-amber-900">
                        Level {rubrik.level}
                      </div>
                      <div>{rubrik.deskripsi}</div>
                    </td>
                  );
                })}
                <td className="p-3 border border-slate-300 text-center font-mono font-extrabold text-slate-900 bg-slate-50">
                  {currentScore.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => onNavigate(prevTab)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          onClick={() => onNavigate(nextTab)}
          className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
        >
          <span>Lanjut ke Berikutnya</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
