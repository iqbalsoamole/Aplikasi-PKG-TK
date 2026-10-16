import React from 'react';
import { SchoolRecord } from '../types/pkg';
import { LogoSukabumi, LogoTK } from './Logos';
import { hitungNPKGAkhir, hitungSkorKompetensi, hitungSkorPenunjang, hitungSkor360, hitungKehadiran } from '../utils/calculations';
import { Printer, ArrowLeft } from 'lucide-react';

interface RekapKolektifCetakProps {
  school: SchoolRecord;
  onNavigate: (tabId: string) => void;
  onPrint: () => void;
}

export const RekapKolektifCetak: React.FC<RekapKolektifCetakProps> = ({
  school,
  onNavigate,
  onPrint,
}) => {
  const teachersSummary = school.teachers.map((t, idx) => {
    const pkgCompat = {
      dataSekolah: school.sekolah,
      dataGuru: t.guru,
      dataKepalaSekolah: {
        namaKepalaSekolah: school.sekolah.namaKepalaSekolah,
        nip: school.sekolah.nipKepalaSekolah,
        nuptk: school.sekolah.nuptkKepalaSekolah,
        pangkatGol: school.sekolah.pangkatGolKepalaSekolah,
        jabatan: school.sekolah.jabatanKepalaSekolah,
        tahunPenilaian: school.sekolah.tahunPenilaian,
        periodePenilaian: school.sekolah.periodePenilaian,
        tanggalPenilaian: school.sekolah.tanggalPenilaian,
      },
      dataPengawas: {
        namaPengawas: school.sekolah.namaPengawas,
        nip: school.sekolah.nipPengawas,
      },
      paedagogik: t.paedagogik,
      kepribadian: t.kepribadian,
      sosial: t.sosial,
      profesional: t.profesional,
      penunjang: t.penunjang,
      rekanSejawat: t.rekanSejawat,
      orangTua: t.orangTua,
      kehadiran: t.kehadiran,
    };

    const npkg = hitungNPKGAkhir(pkgCompat);
    const sPed = hitungSkorKompetensi(t.paedagogik);
    const sKep = hitungSkorKompetensi(t.kepribadian);
    const sSos = hitungSkorKompetensi(t.sosial);
    const sPro = hitungSkorKompetensi(t.profesional);
    const sPen = hitungSkorPenunjang(t.penunjang).totalSkor;
    const s360 = hitungSkor360(pkgCompat).totalSkor;
    const sHadir = hitungKehadiran(t.kehadiran).avgPctHadir;

    return {
      no: idx + 1,
      nama: t.guru.namaGuru,
      nip: t.guru.nip,
      pangkat: t.guru.pangkatGol,
      sPed,
      sKep,
      sSos,
      sPro,
      sPen,
      s360,
      sHadir,
      npkg: npkg.nilaiPrestasiKerja,
      sebutan: npkg.sebutan,
    };
  });

  const avgNPKG =
    teachersSummary.reduce((acc, curr) => acc + curr.npkg, 0) / (teachersSummary.length || 1);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Action Bar (no-print) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('daftar-guru')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Guru</span>
          </button>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs font-bold text-slate-700 uppercase">
            Rekapitulasi Kolektif Sekolah: {school.sekolah.namaSekolah}
          </span>
        </div>

        <button
          onClick={onPrint}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak Lembar Rekapitulasi Kolektif (A4 Landscape / Portrait)</span>
        </button>
      </div>

      {/* Official Master Document Preview */}
      <div className="bg-white border-2 border-black p-8 sm:p-12 rounded-lg shadow-lg text-black page-break">
        {/* Kop Surat */}
        <div className="flex items-center justify-between gap-4 border-b-4 border-double border-black pb-4 text-center">
          <LogoSukabumi className="w-20 h-24 shrink-0" />
          <div className="space-y-0.5 flex-1">
            <h4 className="text-sm font-bold tracking-wider uppercase font-serif">
              PEMERINTAH DAERAH KOTA SUKABUMI
            </h4>
            <h3 className="text-lg font-black tracking-wide uppercase font-serif">
              DINAS PENDIDIKAN DAN KEBUDAYAAN
            </h3>
            <p className="text-xs text-slate-700">
              {school.sekolah.alamat} · Telp/Fax: {school.sekolah.teleponFax}
            </p>
          </div>
          <LogoTK className="w-20 h-20 shrink-0" />
        </div>

        {/* Title */}
        <div className="text-center my-6 space-y-1">
          <h2 className="text-base font-black tracking-wider uppercase underline underline-offset-4 font-serif">
            REKAPITULASI HASIL PENILAIAN KINERJA GURU (PKG)
          </h2>
          <h3 className="text-sm font-bold tracking-wide uppercase font-serif">
            GURU TAMAN KANAK-KANAK KOTA SUKABUMI
          </h3>
          <div className="text-xs font-mono font-bold">
            TAHUN PENILAIAN {school.sekolah.tahunPenilaian || '2025'}
          </div>
        </div>

        {/* School Metadata */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-4 pb-3 border-b border-black">
          <div className="space-y-1">
            <div className="flex">
              <span className="w-32 font-semibold">Nama Sekolah TK</span>
              <span className="w-3">:</span>
              <span className="font-bold uppercase">{school.sekolah.namaSekolah}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-semibold">NPSN</span>
              <span className="w-3">:</span>
              <span className="font-mono">{school.sekolah.npsn}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-semibold">Kecamatan / Kota</span>
              <span className="w-3">:</span>
              <span>{school.sekolah.kecamatan} / {school.sekolah.kota}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex">
              <span className="w-36 font-semibold">Kepala Sekolah</span>
              <span className="w-3">:</span>
              <span className="font-bold">{school.sekolah.namaKepalaSekolah}</span>
            </div>
            <div className="flex">
              <span className="w-36 font-semibold">Pengawas Pembina</span>
              <span className="w-3">:</span>
              <span>{school.sekolah.namaPengawas}</span>
            </div>
            <div className="flex">
              <span className="w-36 font-semibold">Periode Penilaian</span>
              <span className="w-3">:</span>
              <span>{school.sekolah.periodePenilaian}</span>
            </div>
          </div>
        </div>

        {/* Master Collective Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-[11px] border-2 border-black border-collapse text-center">
            <thead>
              <tr className="bg-slate-100 font-bold border-b-2 border-black">
                <th rowSpan={2} className="py-2 px-1 border-r border-black w-8">No</th>
                <th rowSpan={2} className="py-2 px-3 border-r border-black text-left w-48">Nama Guru & NIP</th>
                <th rowSpan={2} className="py-2 px-2 border-r border-black w-24">Pangkat / Gol</th>
                <th colSpan={4} className="py-1 px-2 border-b border-r border-black">4 Kompetensi Guru</th>
                <th rowSpan={2} className="py-2 px-2 border-r border-black w-14">Penunjang</th>
                <th rowSpan={2} className="py-2 px-2 border-r border-black w-14">360°</th>
                <th rowSpan={2} className="py-2 px-2 border-r border-black w-14">Hadir (%)</th>
                <th rowSpan={2} className="py-2 px-2 border-r border-black w-16">NPKG</th>
                <th rowSpan={2} className="py-2 px-2 w-24">Sebutan</th>
              </tr>
              <tr className="bg-slate-50 text-[10px] font-bold border-b border-black">
                <th className="py-1 px-1 border-r border-black w-11">Ped</th>
                <th className="py-1 px-1 border-r border-black w-11">Kep</th>
                <th className="py-1 px-1 border-r border-black w-11">Sos</th>
                <th className="py-1 px-1 border-r border-black w-11">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              {teachersSummary.map((t) => (
                <tr key={t.no}>
                  <td className="py-2 px-1 border-r border-black font-mono">{t.no}</td>
                  <td className="py-2 px-3 border-r border-black text-left">
                    <div className="font-bold text-black uppercase">{t.nama}</div>
                    <div className="text-[10px] text-slate-600 font-mono">NIP. {t.nip || '-'}</div>
                  </td>
                  <td className="py-2 px-2 border-r border-black text-[10px]">{t.pangkat}</td>
                  <td className="py-2 px-1 border-r border-black font-mono tabular-nums">{t.sPed.toFixed(0)}</td>
                  <td className="py-2 px-1 border-r border-black font-mono tabular-nums">{t.sKep.toFixed(0)}</td>
                  <td className="py-2 px-1 border-r border-black font-mono tabular-nums">{t.sSos.toFixed(0)}</td>
                  <td className="py-2 px-1 border-r border-black font-mono tabular-nums">{t.sPro.toFixed(0)}</td>
                  <td className="py-2 px-1 border-r border-black font-mono tabular-nums">{t.sPen.toFixed(0)}</td>
                  <td className="py-2 px-1 border-r border-black font-mono tabular-nums">{t.s360.toFixed(0)}</td>
                  <td className="py-2 px-1 border-r border-black font-mono tabular-nums">{t.sHadir.toFixed(0)}</td>
                  <td className="py-2 px-2 border-r border-black font-mono font-black text-xs tabular-nums">
                    {t.npkg.toFixed(2)}
                  </td>
                  <td className="py-2 px-2 font-bold text-[10px] uppercase">{t.sebutan}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold border-t-2 border-black">
                <td colSpan={10} className="py-2 px-3 text-right border-r border-black uppercase">
                  Rata-rata Nilai Prestasi Kerja (NPKG) Sekolah
                </td>
                <td className="py-2 px-2 border-r border-black font-mono font-black text-xs tabular-nums">
                  {avgNPKG.toFixed(2)}
                </td>
                <td className="py-2 px-2 font-bold text-[10px] uppercase">
                  {avgNPKG >= 90 ? 'SANGAT BAIK' : avgNPKG >= 76 ? 'BAIK' : 'CUKUP'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Dual Signatures */}
        <div className="flex justify-between items-start text-xs pt-4 avoid-break">
          <div className="text-center w-64 space-y-16">
            <div>
              <p className="font-medium">Mengetahui,</p>
              <p className="font-semibold">Pengawas Pembina Kota Sukabumi,</p>
            </div>
            <div>
              <p className="font-bold underline uppercase">{school.sekolah.namaPengawas}</p>
              <p className="font-mono text-[11px]">NIP. {school.sekolah.nipPengawas}</p>
            </div>
          </div>

          <div className="text-center w-64 space-y-16">
            <div>
              <p>{school.sekolah.kota}, {school.sekolah.tanggalPenilaian}</p>
              <p className="font-semibold">Kepala {school.sekolah.namaSekolah},</p>
            </div>
            <div>
              <p className="font-bold underline uppercase">{school.sekolah.namaKepalaSekolah}</p>
              <p className="font-mono text-[11px]">NIP. {school.sekolah.nipKepalaSekolah || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
