import React, { useState } from 'react';
import { PKGState, Responden360 } from '../types/pkg';
import { PERTANYAAN_REKAN_SEJAWAT, PERTANYAAN_ORANG_TUA } from '../data/initialData';
import { hitungSkor360 } from '../utils/calculations';
import { ArrowLeft, ArrowRight, Printer, Sparkles, UserCheck, Users } from 'lucide-react';

interface Penilaian360FormProps {
  type: 'rekan' | 'ortu';
  pkg: PKGState;
  onChange: (updated: Partial<PKGState>) => void;
  onNavigate: (tabId: string) => void;
}

export const Penilaian360Form: React.FC<Penilaian360FormProps> = ({
  type,
  pkg,
  onChange,
  onNavigate,
}) => {
  const isRekan = type === 'rekan';
  const dataResponden = isRekan ? pkg.rekanSejawat : pkg.orangTua;
  const questions = isRekan ? PERTANYAAN_REKAN_SEJAWAT : PERTANYAAN_ORANG_TUA;
  const [activeRespondenIndex, setActiveRespondenIndex] = useState(0);

  const skorSummary = hitungSkor360(pkg);

  const handleScoreChange = (respIdx: number, qIdx: number, val: number) => {
    const updated = [...dataResponden];
    const newItems = [...updated[respIdx].items];
    newItems[qIdx] = val;
    updated[respIdx] = {
      ...updated[respIdx],
      items: newItems,
    };

    if (isRekan) {
      onChange({ rekanSejawat: updated });
    } else {
      onChange({ orangTua: updated });
    }
  };

  const handleNameChange = (respIdx: number, name: string) => {
    const updated = [...dataResponden];
    updated[respIdx] = {
      ...updated[respIdx],
      nama: name,
    };

    if (isRekan) {
      onChange({ rekanSejawat: updated });
    } else {
      onChange({ orangTua: updated });
    }
  };

  const handleFillAll = (respIdx: number, val: number) => {
    const updated = [...dataResponden];
    updated[respIdx] = {
      ...updated[respIdx],
      items: Array(20).fill(val),
    };

    if (isRekan) {
      onChange({ rekanSejawat: updated });
    } else {
      onChange({ orangTua: updated });
    }
  };

  const currentResponden = dataResponden[activeRespondenIndex] || dataResponden[0];
  const currentTotal = currentResponden.items.reduce((a, b) => a + (b || 0), 0);
  const currentNilaiKinerja = Number(((currentTotal / 80) * 100).toFixed(2));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-rose-700">
            Penilaian 360 Derajat
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            {isRekan ? 'PENILAIAN GURU OLEH REKAN SEJAWAT' : 'PENILAIAN GURU OLEH ORANG TUA PESERTA DIDIK'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isRekan
              ? 'Kuesioner evaluasi perilaku kinerja guru oleh 3 rekan guru sejawat di sekolah (20 butir per responden)'
              : 'Kuesioner evaluasi pelayanan dan kepuasan orang tua / wali murid (20 butir per responden)'}
          </p>
        </div>

        {/* Global 360 Score Badge */}
        <div className="flex items-center gap-4 bg-rose-50 border border-rose-200 p-3.5 rounded-xl shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-500">
              Rata-rata {isRekan ? 'Rekan' : 'Orang Tua'}
            </div>
            <div className="text-2xl font-black text-rose-700 font-mono tabular-nums leading-none">
              {(isRekan ? skorSummary.skorRekan : skorSummary.skorOrtu).toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Dari 3 Responden</div>
          </div>
          <div className="h-8 w-px bg-rose-200" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-500">Total 360°</div>
            <div className="text-sm font-extrabold text-rose-900">
              {skorSummary.totalSkor.toFixed(2)}
            </div>
            <div className="text-[10px] text-emerald-700 font-bold uppercase">
              {skorSummary.level} ({skorSummary.sebutan})
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Responden 1, 2, 3 & Print Blank Form CTA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-100 p-2 rounded-xl border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {dataResponden.map((r, idx) => {
            const sum = r.items.reduce((a, b) => a + (b || 0), 0);
            const score = Number(((sum / 80) * 100).toFixed(1));
            const isActive = activeRespondenIndex === idx;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRespondenIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Responden {idx + 1}</span>
                <span className="ml-1 text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                  {score}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onNavigate(isRekan ? 'form-cetak-guru' : 'form-cetak-ortu')}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs rounded-lg transition-colors shadow-xs shrink-0"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak Formulir Kosong ({isRekan ? 'Form Guru' : 'Form Ortu'})</span>
        </button>
      </div>

      {/* Active Responden Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              R{activeRespondenIndex + 1}
            </div>
            <div>
              <div className="text-xs text-slate-500">Nama Responden:</div>
              <input
                type="text"
                value={currentResponden.nama}
                onChange={(e) => handleNameChange(activeRespondenIndex, e.target.value)}
                placeholder="misal: Guru Rekan / Bunda Siswa (Opsional/Anonim)"
                className="text-sm font-bold text-slate-800 border-b border-slate-300 focus:border-indigo-600 outline-none pb-0.5 w-64 sm:w-80"
              />
            </div>
          </div>

          {/* Quick set for this respondent */}
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-slate-600">Isi Semua:</span>
            <div className="flex gap-1">
              {[4, 3, 2, 1].map((val) => (
                <button
                  key={val}
                  onClick={() => handleFillAll(activeRespondenIndex, val)}
                  className="px-2 py-0.5 font-bold rounded-md bg-slate-100 hover:bg-amber-100 text-slate-800 border border-slate-200 text-xs"
                >
                  {val === 4 ? '4 (Sangat Setuju)' : val === 3 ? '3 (Setuju)' : val === 2 ? '2 (Kurang)' : '1 (Tidak)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Questions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="py-2.5 px-3 w-12 text-center border-r border-slate-200">No</th>
                <th className="py-2.5 px-4 w-44 border-r border-slate-200">Komponen</th>
                <th className="py-2.5 px-4 border-r border-slate-200">Pernyataan</th>
                <th className="py-2.5 px-4 w-60 text-center">Jawaban Responden</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {questions.map((q, qIdx) => {
                const currentVal = currentResponden.items[qIdx] || 4;
                return (
                  <tr
                    key={q.no}
                    className={`hover:bg-amber-50/40 transition-colors ${
                      qIdx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-center font-bold text-slate-600 border-r border-slate-200 font-mono">
                      {q.no}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800 border-r border-slate-200 text-[11px]">
                      {q.komponen}
                    </td>
                    <td className="py-2.5 px-4 text-slate-700 border-r border-slate-200 leading-relaxed">
                      {q.pernyataan}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="grid grid-cols-4 gap-1">
                        {[
                          { val: 4, label: 'Sangat Setuju', short: 'SS (4)' },
                          { val: 3, label: 'Setuju', short: 'S (3)' },
                          { val: 2, label: 'Kurang Setuju', short: 'KS (2)' },
                          { val: 1, label: 'Tidak Setuju', short: 'TS (1)' },
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => handleScoreChange(activeRespondenIndex, qIdx, opt.val)}
                            className={`px-1 py-1 rounded font-bold text-[10px] transition-all ${
                              currentVal === opt.val
                                ? 'bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-600'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            title={opt.label}
                          >
                            {opt.short}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-extrabold text-slate-900 border-t-2 border-slate-300">
                <td colSpan={3} className="py-2.5 px-4 text-right border-r border-slate-200">
                  JUMLAH SKOR (Maksimum 80)
                </td>
                <td className="py-2.5 px-4 text-center font-mono font-bold text-sm">
                  {currentTotal} / 80
                </td>
              </tr>
              <tr className="bg-amber-100/70 font-extrabold text-amber-950">
                <td colSpan={3} className="py-2.5 px-4 text-right border-r border-amber-200">
                  NILAI KINERJA = (Jumlah Skor / 80) x 100
                </td>
                <td className="py-2.5 px-4 text-center font-mono font-black text-sm text-amber-900">
                  {currentNilaiKinerja.toFixed(2)}
                </td>
              </tr>
              <tr className="bg-slate-50 font-bold text-slate-700">
                <td colSpan={3} className="py-2 px-4 text-right border-r border-slate-200">
                  Sebutan / Kategori
                </td>
                <td className="py-2 px-4 text-center text-xs uppercase font-extrabold text-indigo-700">
                  {currentNilaiKinerja >= 90
                    ? 'Amat Baik'
                    : currentNilaiKinerja >= 80
                    ? 'Baik'
                    : currentNilaiKinerja >= 70
                    ? 'Cukup'
                    : 'Sedang'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => onNavigate(isRekan ? 'penunjang' : 'rekan-sejawat')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          onClick={() => onNavigate(isRekan ? 'orang-tua' : 'kehadiran')}
          className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
        >
          <span>Lanjut: {isRekan ? 'Penilaian Orang Tua' : 'Indeks Kehadiran'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
