import React from 'react';
import { PKGState, KehadiranBulan } from '../types/pkg';
import { hitungKehadiran } from '../utils/calculations';
import { ArrowLeft, ArrowRight, Calendar, Sparkles } from 'lucide-react';

interface KehadiranFormProps {
  kehadiran: PKGState['kehadiran'];
  guru: PKGState['dataGuru'];
  sekolah: PKGState['dataSekolah'];
  onChange: (updated: KehadiranBulan[]) => void;
  onNavigate: (tabId: string) => void;
}

export const KehadiranForm: React.FC<KehadiranFormProps> = ({
  kehadiran,
  guru,
  sekolah,
  onChange,
  onNavigate,
}) => {
  const result = hitungKehadiran(kehadiran);

  const handleFieldChange = (
    index: number,
    field: 'terlambat' | 'pulangCepat' | 'tanpaKeterangan' | 'hariEfektif',
    value: number
  ) => {
    const updated = [...kehadiran];
    updated[index] = {
      ...updated[index],
      [field]: Math.max(0, value),
    };
    onChange(updated);
  };

  const handleSetZeroAll = () => {
    const updated = kehadiran.map((k) => ({
      ...k,
      terlambat: 0,
      pulangCepat: 0,
      tanpaKeterangan: 0,
    }));
    onChange(updated);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
            Komponen 7 PKG TK
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            REKAPITULASI KEHADIRAN GURU
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Penghitungan indeks persentase kehadiran 12 bulan (keterlambatan, pulang cepat & alpa)
          </p>
        </div>

        {/* Score Card */}
        <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-500">Indeks Kehadiran</div>
            <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums leading-none">
              {result.avgPctHadir.toFixed(2)}%
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Persentase Rata-rata</div>
          </div>
          <div className="h-8 w-px bg-emerald-200" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-500">Kategori Kehadiran</div>
            <div className="text-sm font-extrabold text-emerald-900 uppercase">
              {result.kategori}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold">Tercatat di NPKG</div>
          </div>
        </div>
      </div>

      {/* Info & Fast Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200 text-xs">
        <div className="text-slate-600">
          <span className="font-semibold text-slate-800">Keterangan Rumus: </span>
          Konversi Hari = Total Menit / 450 menit (1 hari kerja = 7.5 jam) · % Hadir = 100% - % Tidak Hadir
        </div>

        <button
          onClick={handleSetZeroAll}
          className="flex items-center gap-1.5 px-3 py-1 font-bold rounded-md bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 transition-colors shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Isi Hadir Penuh (0 Terlambat & 0 Alpa)</span>
        </button>
      </div>

      {/* Table matching Page 15 & 16 */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white font-bold">
                <th rowSpan={2} className="py-2.5 px-2 w-10 border border-slate-700">No.</th>
                <th rowSpan={2} className="py-2.5 px-4 w-36 border border-slate-700 text-left">Bulan dan Tahun</th>
                <th colSpan={4} className="py-1.5 px-3 border border-slate-700 bg-slate-750">
                  TIDAK HADIR KARENA KETERLAMBATAN
                </th>
                <th rowSpan={2} className="py-2.5 px-3 w-24 border border-slate-700">
                  Tanpa Keterangan (hari)
                </th>
                <th rowSpan={2} className="py-2.5 px-3 w-24 border border-slate-700">
                  Jumlah Tidak Hadir (hari)
                </th>
                <th colSpan={2} className="py-1.5 px-3 border border-slate-700 bg-slate-750">
                  SKOR PERSENTASE
                </th>
              </tr>
              <tr className="bg-slate-700 text-slate-200 font-semibold text-[11px]">
                <th className="py-2 px-2 border border-slate-600 w-24">Terlambat (menit)</th>
                <th className="py-2 px-2 border border-slate-600 w-24">Pulang Cepat (menit)</th>
                <th className="py-2 px-2 border border-slate-600 w-20">Jumlah (menit)</th>
                <th className="py-2 px-2 border border-slate-600 w-20">Konversi (hari)</th>
                <th className="py-2 px-2 border border-slate-600 w-24">Tidak Hadir (%)</th>
                <th className="py-2 px-2 border border-slate-600 w-24 bg-emerald-900/60 text-white font-bold">
                  Hadir (%)
                </th>
              </tr>
              <tr className="bg-slate-100 text-slate-500 text-[10px] font-mono">
                <td className="py-1 border border-slate-200">(1)</td>
                <td className="py-1 border border-slate-200">(2)</td>
                <td className="py-1 border border-slate-200">(3)</td>
                <td className="py-1 border border-slate-200">(4)</td>
                <td className="py-1 border border-slate-200">(5)</td>
                <td className="py-1 border border-slate-200">(6)</td>
                <td className="py-1 border border-slate-200">(7)</td>
                <td className="py-1 border border-slate-200">(8)</td>
                <td className="py-1 border border-slate-200">(9)</td>
                <td className="py-1 border border-slate-200">(10)</td>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {result.rekapBulan.map((b, idx) => (
                <tr
                  key={b.bulan}
                  className={`hover:bg-amber-50/40 transition-colors ${
                    idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                  }`}
                >
                  <td className="py-2 px-2 font-mono font-bold text-slate-600 border-r border-slate-200">
                    {idx + 1}
                  </td>
                  <td className="py-2 px-4 text-left font-semibold text-slate-900 border-r border-slate-200">
                    {b.bulan}
                  </td>
                  {/* Terlambat (menit) */}
                  <td className="py-2 px-2 border-r border-slate-200">
                    <input
                      type="number"
                      min={0}
                      value={b.terlambat}
                      onChange={(e) =>
                        handleFieldChange(idx, 'terlambat', parseInt(e.target.value) || 0)
                      }
                      className="w-16 px-1.5 py-1 text-center border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </td>
                  {/* Pulang Cepat (menit) */}
                  <td className="py-2 px-2 border-r border-slate-200">
                    <input
                      type="number"
                      min={0}
                      value={b.pulangCepat}
                      onChange={(e) =>
                        handleFieldChange(idx, 'pulangCepat', parseInt(e.target.value) || 0)
                      }
                      className="w-16 px-1.5 py-1 text-center border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </td>
                  {/* Jumlah (menit) */}
                  <td className="py-2 px-2 border-r border-slate-200 font-mono text-slate-700 tabular-nums">
                    {b.jumlahMenit}
                  </td>
                  {/* Konversi (hari) */}
                  <td className="py-2 px-2 border-r border-slate-200 font-mono text-slate-700 tabular-nums">
                    {b.konversiHari.toFixed(2)}
                  </td>
                  {/* Tanpa Keterangan (hari) */}
                  <td className="py-2 px-2 border-r border-slate-200">
                    <input
                      type="number"
                      min={0}
                      step={0.5}
                      value={b.tanpaKeterangan}
                      onChange={(e) =>
                        handleFieldChange(idx, 'tanpaKeterangan', parseFloat(e.target.value) || 0)
                      }
                      className="w-16 px-1.5 py-1 text-center border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </td>
                  {/* Jumlah Tidak Hadir (hari) */}
                  <td className="py-2 px-2 border-r border-slate-200 font-mono font-semibold text-slate-800 tabular-nums">
                    {b.jumlahTidakHadirHari.toFixed(2)}
                  </td>
                  {/* % Tidak Hadir */}
                  <td className="py-2 px-2 border-r border-slate-200 font-mono text-slate-600 tabular-nums">
                    {b.pctTidakHadir.toFixed(2)}%
                  </td>
                  {/* % Hadir */}
                  <td className="py-2 px-2 font-mono font-bold text-emerald-800 tabular-nums bg-emerald-50/40">
                    {b.pctHadir.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-extrabold text-slate-900 border-t-2 border-slate-300">
                <td colSpan={2} className="py-2.5 px-4 text-center border-r border-slate-200 uppercase tracking-wider">
                  JUMLAH TOTAL
                </td>
                <td className="py-2.5 px-2 font-mono border-r border-slate-200 tabular-nums">
                  {result.totalTerlambat}
                </td>
                <td className="py-2.5 px-2 font-mono border-r border-slate-200 tabular-nums">
                  {result.totalPulangCepat}
                </td>
                <td className="py-2.5 px-2 font-mono border-r border-slate-200 tabular-nums">
                  {result.totalJumlahMenit}
                </td>
                <td className="py-2.5 px-2 font-mono border-r border-slate-200 tabular-nums">
                  {result.totalKonversiHari.toFixed(2)}
                </td>
                <td className="py-2.5 px-2 font-mono border-r border-slate-200 tabular-nums">
                  {result.totalTanpaKeterangan}
                </td>
                <td className="py-2.5 px-2 font-mono border-r border-slate-200 tabular-nums font-black">
                  {result.totalJumlahTidakHadirHari.toFixed(2)}
                </td>
                <td className="py-2.5 px-2 font-mono border-r border-slate-200 tabular-nums">
                  {result.avgPctTidakHadir.toFixed(2)}%
                </td>
                <td className="py-2.5 px-2 font-mono font-black text-emerald-700 bg-emerald-100/70 tabular-nums text-sm">
                  {result.avgPctHadir.toFixed(2)}%
                </td>
              </tr>
              <tr className="bg-emerald-50 font-extrabold text-emerald-950">
                <td colSpan={8} className="py-3 px-4 text-right border-r border-emerald-200 uppercase tracking-wider text-xs">
                  INDEKS PERSENTASE KEHADIRAN & KATEGORI
                </td>
                <td colSpan={2} className="py-3 px-4 text-center font-bold text-sm uppercase tracking-wide bg-emerald-100 text-emerald-900">
                  {result.kategori} ({result.avgPctHadir.toFixed(2)}%)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => onNavigate('orang-tua')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali: Penilaian Orang Tua</span>
        </button>

        <button
          onClick={() => onNavigate('npkg')}
          className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
        >
          <span>Lihat Hasil Akhir (NPKG)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
