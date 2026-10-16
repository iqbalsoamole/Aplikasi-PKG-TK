import React from 'react';
import { PKGState } from '../types/pkg';
import { hitungNPKGAkhir, hitungSkorPenunjang, hitungSkor360, hitungKehadiran, hitungSkorKompetensi } from '../utils/calculations';
import { Printer, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface BeritaAcaraProps {
  pkg: PKGState;
  onNavigate: (tabId: string) => void;
  onPrint: () => void;
}

export const BeritaAcara: React.FC<BeritaAcaraProps> = ({ pkg, onNavigate, onPrint }) => {
  const npkg = hitungNPKGAkhir(pkg);
  const penunjang = hitungSkorPenunjang(pkg.penunjang);
  const data360 = hitungSkor360(pkg);
  const dataHadir = hitungKehadiran(pkg.kehadiran);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Action Bar (no-print) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('menu')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Menu Utama</span>
          </button>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs font-bold text-slate-700">Berita Acara Penilaian Kinerja</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('npkg')}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
          >
            Lihat NPKG
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Berita Acara (A4)</span>
          </button>
        </div>
      </div>

      {/* Official Berita Acara Document Sheet matching Page 29 */}
      <div className="bg-white border-2 border-slate-800 p-8 sm:p-12 rounded-lg shadow-lg text-black">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-black tracking-wider uppercase underline underline-offset-4 font-serif">
            BERITA ACARA PENILAIAN KINERJA KEPALA SEKOLAH
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            PENILAIAN KINERJA GURU (PKG) TAMAN KANAK-KANAK
          </p>
        </div>

        {/* Narrative */}
        <div className="space-y-4 text-xs leading-relaxed">
          <p>
            Pada hari ini, <span className="font-bold underline">{pkg.dataKepalaSekolah.tanggalPenilaian}</span> bertempat di <span className="font-bold underline">{pkg.dataSekolah.namaSekolah}</span>
            <br />
            Kepala Sekolah yang bertanda tangan di bawah ini :
          </p>

          <table className="w-full text-xs ml-4">
            <tbody>
              <tr>
                <td className="w-40 py-0.5">Nama</td>
                <td className="w-4 py-0.5">:</td>
                <td className="py-0.5 font-bold uppercase">{pkg.dataKepalaSekolah.namaKepalaSekolah}</td>
              </tr>
              <tr>
                <td className="py-0.5">NIP</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5 font-mono">{pkg.dataKepalaSekolah.nip || '-'}</td>
              </tr>
              <tr>
                <td className="py-0.5">Jabatan</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataKepalaSekolah.jabatan || 'Kepala Sekolah'}</td>
              </tr>
            </tbody>
          </table>

          <p className="pt-2">
            Telah melaksanakan Penilaian Kinerja Guru (PKG) terhadap :
          </p>

          <table className="w-full text-xs ml-4">
            <tbody>
              <tr>
                <td className="w-40 py-0.5">Nama Guru Yang dinilai</td>
                <td className="w-4 py-0.5">:</td>
                <td className="py-0.5 font-bold uppercase">{pkg.dataGuru.namaGuru}</td>
              </tr>
              <tr>
                <td className="py-0.5">NIP</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5 font-mono">{pkg.dataGuru.nip || '-'}</td>
              </tr>
              <tr>
                <td className="py-0.5">Jabatan</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataGuru.jabatan}</td>
              </tr>
              <tr>
                <td className="py-0.5">Unit Kerja</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5 font-semibold">{pkg.dataSekolah.namaSekolah}</td>
              </tr>
            </tbody>
          </table>

          <p className="font-bold pt-2 underline">
            Dengan Aspek Penilaian Meliputi :
          </p>
        </div>

        {/* Aspects Table */}
        <div className="my-5">
          <table className="w-full text-xs border-2 border-black border-collapse">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-black text-center">
                <th className="py-2 px-4 border-r border-black text-left">ASPEK PENILAIAN</th>
                <th className="py-2 px-4 border-r border-black w-32">SKOR</th>
                <th className="py-2 px-4 w-44">LEVEL KOMPETENSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              <tr>
                <td className="py-2 px-4 border-r border-black">1. Kompetensi Paedagogik</td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-bold tabular-nums">
                  {hitungSkorKompetensi(pkg.paedagogik).toFixed(0)}
                </td>
                <td className="py-2 px-4 text-center font-semibold">Level {pkg.paedagogik.selectedLevel}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-r border-black">2. Kompetensi Kepribadian</td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-bold tabular-nums">
                  {hitungSkorKompetensi(pkg.kepribadian).toFixed(0)}
                </td>
                <td className="py-2 px-4 text-center font-semibold">Level {pkg.kepribadian.selectedLevel}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-r border-black">3. Kompetensi Sosial</td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-bold tabular-nums">
                  {hitungSkorKompetensi(pkg.sosial).toFixed(0)}
                </td>
                <td className="py-2 px-4 text-center font-semibold">Level {pkg.sosial.selectedLevel}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-r border-black">4. Kompetensi Profesional</td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-bold tabular-nums">
                  {hitungSkorKompetensi(pkg.profesional).toFixed(0)}
                </td>
                <td className="py-2 px-4 text-center font-semibold">Level {pkg.profesional.selectedLevel}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-r border-black">5. Kegiatan Penunjang</td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-bold tabular-nums">
                  {penunjang.totalSkor.toFixed(0)}
                </td>
                <td className="py-2 px-4 text-center font-semibold uppercase">{penunjang.sebutan}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-r border-black">6. Penilaian 360</td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-bold tabular-nums">
                  {data360.totalSkor.toFixed(0)}
                </td>
                <td className="py-2 px-4 text-center font-semibold uppercase">{data360.level} ({data360.sebutan})</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-r border-black">7. Kehadiran</td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-bold tabular-nums">
                  {dataHadir.avgPctHadir.toFixed(0)}
                </td>
                <td className="py-2 px-4 text-center font-semibold uppercase">{dataHadir.kategori}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-black font-bold">
                <td className="py-2 px-4 border-r border-black uppercase">Total Skor</td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-black tabular-nums">
                  {npkg.jumlahSkor.toFixed(2)}
                </td>
                <td className="py-2 px-4 bg-slate-50"></td>
              </tr>
              <tr className="border-t border-black font-bold bg-slate-100">
                <td className="py-2 px-4 border-r border-black uppercase">Nilai Prestasi Kerja</td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-black text-sm text-amber-800 tabular-nums">
                  {npkg.nilaiPrestasiKerja.toFixed(2)}
                </td>
                <td className="py-2 px-4 bg-slate-50"></td>
              </tr>
              <tr className="border-t border-black font-semibold">
                <td className="py-2 px-4 border-r border-black uppercase">Level Kompetensi</td>
                <td colSpan={2} className="py-2 px-4 text-center font-bold">
                  Level 5
                </td>
              </tr>
              <tr className="border-t border-black font-black bg-amber-50">
                <td className="py-2 px-4 border-r border-black uppercase text-xs">Kategori</td>
                <td colSpan={2} className="py-2 px-4 text-center text-sm font-black tracking-wider uppercase text-amber-900">
                  {npkg.sebutan}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Closing */}
        <p className="text-xs leading-relaxed italic text-slate-700 mb-10">
          Demikian Berita Acara ini dibuat dengan sebenarnya dan digunakan sebagaimana mestinya.
        </p>

        {/* Signatures */}
        <div className="flex justify-between items-start text-xs pt-4">
          <div className="text-center w-64 space-y-16">
            <div>
              <p className="font-medium text-slate-700">Kepala {pkg.dataSekolah.namaSekolah},</p>
            </div>
            <div>
              <p className="font-bold underline uppercase">{pkg.dataKepalaSekolah.namaKepalaSekolah}</p>
              <p className="font-mono text-[11px]">NIP. {pkg.dataKepalaSekolah.nip || '-'}</p>
            </div>
          </div>

          <div className="text-center w-64 space-y-16">
            <div>
              <p className="font-medium text-slate-700">Guru Yang dinilai,</p>
            </div>
            <div>
              <p className="font-bold underline uppercase">{pkg.dataGuru.namaGuru}</p>
              <p className="font-mono text-[11px]">NIP. {pkg.dataGuru.nip || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
