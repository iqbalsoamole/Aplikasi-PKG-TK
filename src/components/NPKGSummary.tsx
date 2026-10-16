import React from 'react';
import { PKGState } from '../types/pkg';
import { hitungNPKGAkhir } from '../utils/calculations';
import { LogoSukabumi, LogoTK } from './Logos';
import { Printer, ArrowLeft, CheckCircle, Award } from 'lucide-react';

interface NPKGSummaryProps {
  pkg: PKGState;
  onNavigate: (tabId: string) => void;
  onPrint: () => void;
}

export const NPKGSummary: React.FC<NPKGSummaryProps> = ({ pkg, onNavigate, onPrint }) => {
  const npkg = hitungNPKGAkhir(pkg);

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
            <span>Kembali ke Menu</span>
          </button>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs font-bold text-slate-700">Lembar Rekapitulasi Resmi NPKG</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('berita-acara')}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
          >
            Lihat Berita Acara
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Dokumen NPKG (A4)</span>
          </button>
        </div>
      </div>

      {/* Official Document Sheet Preview (Standard Indonesian A4 Letterhead Format) */}
      <div className="bg-white border-2 border-slate-800 p-8 sm:p-12 rounded-lg shadow-lg text-black relative">
        {/* Watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <LogoSukabumi className="w-[500px] h-[500px]" />
        </div>

        {/* Kop Surat Resmi Dinas Pendidikan Kota Sukabumi */}
        <div className="flex items-center justify-between gap-4 border-b-4 border-double border-black pb-4 text-center">
          <LogoSukabumi className="w-20 h-24 shrink-0" />
          <div className="space-y-0.5 flex-1">
            <h4 className="text-base font-bold tracking-wider uppercase font-serif">
              Pemerintah Daerah Kota Sukabumi
            </h4>
            <h3 className="text-xl font-black tracking-wide uppercase font-serif">
              Dinas Pendidikan dan Kebudayaan
            </h3>
            <p className="text-xs text-slate-700">
              {pkg.dataSekolah.alamat || 'Jl. Pelabuhan II Km. 5 Telp/Fax (0266) 221766 Sukabumi'}
            </p>
          </div>
          <LogoTK className="w-20 h-20 shrink-0" />
        </div>

        {/* Title */}
        <div className="text-center my-6 space-y-1">
          <h2 className="text-lg font-black tracking-wider uppercase underline underline-offset-4 font-serif">
            HASIL PENILAIAN KINERJA
          </h2>
          <h3 className="text-base font-bold tracking-wide uppercase font-serif">
            GURU TAMAN KANAK-KANAK
          </h3>
          <h3 className="text-base font-bold tracking-wide uppercase font-serif">
            KOTA SUKABUMI
          </h3>
          <div className="text-sm font-bold font-mono">
            TAHUN {pkg.dataKepalaSekolah.tahunPenilaian || '2025'}
          </div>
        </div>

        {/* Statement & Personnel Profile */}
        <div className="space-y-3 text-xs mb-6">
          <p className="leading-relaxed">
            Tim Penilai Kinerja Guru <span className="font-bold">{pkg.dataSekolah.namaSekolah || 'Nama Sekolah TK'}</span> menyatakan bahwa :
          </p>

          <table className="w-full text-xs">
            <tbody>
              <tr>
                <td className="w-48 py-0.5">Nama</td>
                <td className="w-4 py-0.5">:</td>
                <td className="py-0.5 font-bold uppercase">{pkg.dataGuru.namaGuru}</td>
              </tr>
              <tr>
                <td className="py-0.5">NIP</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5 font-mono">{pkg.dataGuru.nip || '-'}</td>
              </tr>
              <tr>
                <td className="py-0.5">Tempat, Tanggal Lahir</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataGuru.tempatTglLahir || '-'}</td>
              </tr>
              <tr>
                <td className="py-0.5">NUPTK</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5 font-mono">{pkg.dataGuru.nuptk || '-'}</td>
              </tr>
              <tr>
                <td className="py-0.5">Pangkat / Golongan</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataGuru.pangkatGol}</td>
              </tr>
              <tr>
                <td className="py-0.5">Unit Kerja</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataSekolah.namaSekolah}</td>
              </tr>
              <tr>
                <td className="py-0.5">Jabatan</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataGuru.jabatan}</td>
              </tr>
              <tr>
                <td className="py-0.5">Periode Penilaian</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataKepalaSekolah.periodePenilaian}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Main 7 Components Table */}
        <div className="mb-6">
          <table className="w-full text-xs border-2 border-black border-collapse">
            <thead>
              <tr className="bg-slate-100 text-black font-bold border-b border-black text-center">
                <th className="py-2 px-3 border-r border-black w-12">No.</th>
                <th className="py-2 px-4 border-r border-black text-left">KOMPONEN</th>
                <th className="py-2 px-4 border-r border-black w-28">SCORE</th>
                <th className="py-2 px-4 w-44">LEVEL KOMPETENSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              {npkg.komponen.map((k) => (
                <tr key={k.no}>
                  <td className="py-2 px-3 border-r border-black text-center font-mono font-medium">
                    {k.no}
                  </td>
                  <td className="py-2 px-4 border-r border-black font-medium">{k.nama}</td>
                  <td className="py-2 px-4 border-r border-black text-center font-mono font-bold tabular-nums">
                    {k.score.toFixed(0)}
                  </td>
                  <td className="py-2 px-4 text-center font-semibold">{k.level}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-black font-bold">
                <td colSpan={2} className="py-2 px-4 border-r border-black text-right uppercase">
                  Jumlah
                </td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-black text-sm tabular-nums">
                  {npkg.jumlahSkor.toFixed(2)}
                </td>
                <td className="py-2 px-4 bg-slate-50"></td>
              </tr>
              <tr className="border-t border-black font-bold bg-slate-100">
                <td colSpan={2} className="py-2 px-4 border-r border-black text-right uppercase">
                  Nilai Prestasi Kerja
                </td>
                <td className="py-2 px-4 border-r border-black text-center font-mono font-black text-sm text-amber-800 tabular-nums">
                  {npkg.nilaiPrestasiKerja.toFixed(2)}
                </td>
                <td className="py-2 px-4 bg-slate-50"></td>
              </tr>
              <tr className="border-t border-black font-black bg-amber-50">
                <td colSpan={2} className="py-2.5 px-4 border-r border-black text-right uppercase text-xs">
                  Sebutan
                </td>
                <td colSpan={2} className="py-2.5 px-4 text-center text-sm font-black tracking-wider uppercase text-amber-900">
                  {npkg.sebutan}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Closing paragraph */}
        <p className="text-xs leading-relaxed italic text-slate-700 mb-8">
          Demikian hasil Penilaian Kinerja Guru yang dilakukan oleh Tim Penilai, ucapan terimakasih dan penghargaan yang setinggi-tingginya atas dedikasi serta kerja keras saudara.
        </p>

        {/* Dual Signatures: Pengawas Pembina & Kepala Sekolah */}
        <div className="flex justify-between items-start text-xs pt-4">
          <div className="text-center w-64 space-y-16">
            <div>
              <p className="font-medium text-slate-700">Pengawas Pembina,</p>
            </div>
            <div>
              <p className="font-bold underline uppercase">{pkg.dataPengawas.namaPengawas}</p>
              <p className="font-mono text-[11px]">NIP. {pkg.dataPengawas.nip}</p>
            </div>
          </div>

          <div className="text-center w-64 space-y-16">
            <div>
              <p>{pkg.dataSekolah.kota}, {pkg.dataKepalaSekolah.tanggalPenilaian}</p>
              <p className="font-medium text-slate-700">Kepala Sekolah,</p>
            </div>
            <div>
              <p className="font-bold underline uppercase">{pkg.dataKepalaSekolah.namaKepalaSekolah}</p>
              <p className="font-mono text-[11px]">NIP. {pkg.dataKepalaSekolah.nip || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
