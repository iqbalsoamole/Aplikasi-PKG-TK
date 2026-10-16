import React from 'react';
import { PKGState } from '../types/pkg';
import { LogoSukabumi } from './Logos';
import { PERTANYAAN_REKAN_SEJAWAT, PERTANYAAN_ORANG_TUA } from '../data/initialData';
import {
  hitungNPKGAkhir,
  hitungSkorPenunjang,
  hitungSkor360,
  hitungKehadiran,
  hitungSkorKompetensi,
} from '../utils/calculations';
import { Printer, ArrowLeft } from 'lucide-react';

interface PrintViewsProps {
  documentType:
    | 'cover'
    | 'identitas-cetak'
    | 'form-cetak-guru'
    | 'form-cetak-ortu'
    | 'cetak-semua';
  pkg: PKGState;
  onNavigate: (tabId: string) => void;
  onPrint: () => void;
}

export const PrintViews: React.FC<PrintViewsProps> = ({
  documentType,
  pkg,
  onNavigate,
  onPrint,
}) => {
  const npkg = hitungNPKGAkhir(pkg);
  const penunjang = hitungSkorPenunjang(pkg.penunjang);
  const data360 = hitungSkor360(pkg);
  const dataHadir = hitungKehadiran(pkg.kehadiran);

  // Helper renderers for individual print pages
  const renderCover = () => (
    <div className="bg-white border-[3px] border-black p-10 sm:p-16 flex flex-col justify-between min-h-[920px] text-center text-black page-break">
      <div className="space-y-6">
        <div className="flex justify-center pt-4">
          <LogoSukabumi className="w-28 h-32 drop-shadow-sm" />
        </div>

        <div className="space-y-2 pt-2">
          <h1 className="text-2xl font-black tracking-wider uppercase font-serif">
            PENILAIAN KINERJA GURU
          </h1>
          <h2 className="text-xl font-bold tracking-widest font-serif">(PKG)</h2>
          <p className="text-xs font-semibold text-slate-800 tracking-wide uppercase max-w-lg mx-auto">
            SESUAI PERATURAN DIREKTUR JENDERAL GTK NO. 2626/B/GT/2023
            <br />
            DAN PERMENDIKBUDRISTEK NO.40 TAHUN 2021
          </p>
        </div>

        <div className="pt-6 space-y-1">
          <div className="text-xs uppercase tracking-widest font-bold text-slate-600">
            JANGKA WAKTU PENILAIAN
          </div>
          <div className="text-sm font-bold font-mono">
            {pkg.dataKepalaSekolah.periodePenilaian}
          </div>
        </div>
      </div>

      {/* Middle Teacher Identity Box */}
      <div className="max-w-md mx-auto w-full my-8 text-left text-xs space-y-2 border border-black p-5 bg-slate-50/50">
        <div className="flex">
          <span className="w-36 font-semibold">Nama</span>
          <span className="w-4">:</span>
          <span className="font-bold uppercase flex-1">{pkg.dataGuru.namaGuru}</span>
        </div>
        <div className="flex">
          <span className="w-36 font-semibold">NIP</span>
          <span className="w-4">:</span>
          <span className="font-mono flex-1">{pkg.dataGuru.nip || '-'}</span>
        </div>
        <div className="flex">
          <span className="w-36 font-semibold">Pangkat / Gol.</span>
          <span className="w-4">:</span>
          <span className="flex-1">{pkg.dataGuru.pangkatGol}</span>
        </div>
        <div className="flex">
          <span className="w-36 font-semibold">Jabatan</span>
          <span className="w-4">:</span>
          <span className="flex-1">{pkg.dataGuru.jabatan}</span>
        </div>
        <div className="flex">
          <span className="w-36 font-semibold">Unit Kerja</span>
          <span className="w-4">:</span>
          <span className="font-bold flex-1">{pkg.dataSekolah.namaSekolah}</span>
        </div>
      </div>

      {/* Bottom Sukabumi Dinas Banner */}
      <div className="space-y-1 pt-6 border-t border-black">
        <h3 className="text-base font-black uppercase tracking-wider font-serif">
          PEMERINTAH KOTA SUKABUMI
        </h3>
        <h4 className="text-sm font-bold uppercase tracking-wide font-serif">
          DINAS PENDIDIKAN DAN KEBUDAYAAN
        </h4>
        <div className="text-xs font-mono font-bold pt-1">
          TAHUN {pkg.dataKepalaSekolah.tahunPenilaian || '2025'}
        </div>
      </div>
    </div>
  );

  const renderIdentitas = () => (
    <div className="bg-white border-2 border-black p-8 sm:p-12 text-black space-y-6 page-break">
      <div className="text-center border-b-2 border-black pb-3">
        <h2 className="text-base font-black uppercase tracking-wider font-serif">
          IDENTITAS SEKOLAH, GURU DAN KEPALA SEKOLAH
        </h2>
        <p className="text-xs text-slate-600">Instrumen Penilaian Kinerja Guru Taman Kanak-Kanak</p>
      </div>

      <div className="space-y-5 text-xs">
        {/* A. Data Sekolah */}
        <div>
          <div className="font-bold uppercase tracking-wider mb-1.5 text-slate-900 border-b border-slate-300 pb-0.5">
            A. Data Sekolah
          </div>
          <table className="w-full text-xs">
            <tbody>
              <tr>
                <td className="w-48 py-0.5">Nama Sekolah</td>
                <td className="w-4">:</td>
                <td className="font-bold py-0.5">{pkg.dataSekolah.namaSekolah}</td>
              </tr>
              <tr>
                <td className="py-0.5">NPSN</td>
                <td className="py-0.5">:</td>
                <td className="font-mono py-0.5">{pkg.dataSekolah.npsn}</td>
              </tr>
              <tr>
                <td className="py-0.5">Telepon / Fax</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataSekolah.teleponFax}</td>
              </tr>
              <tr>
                <td className="py-0.5">Alamat</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataSekolah.alamat}</td>
              </tr>
              <tr>
                <td className="py-0.5">Kelurahan</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataSekolah.kelurahan}</td>
              </tr>
              <tr>
                <td className="py-0.5">Kecamatan</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataSekolah.kecamatan}</td>
              </tr>
              <tr>
                <td className="py-0.5">Kota</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataSekolah.kota}</td>
              </tr>
              <tr>
                <td className="py-0.5">Provinsi</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataSekolah.provinsi}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* B. Data Guru */}
        <div>
          <div className="font-bold uppercase tracking-wider mb-1.5 text-slate-900 border-b border-slate-300 pb-0.5">
            B. Data Guru Yang Dinilai
          </div>
          <table className="w-full text-xs">
            <tbody>
              <tr>
                <td className="w-48 py-0.5">Nama Guru</td>
                <td className="w-4">:</td>
                <td className="font-bold uppercase py-0.5">{pkg.dataGuru.namaGuru}</td>
              </tr>
              <tr>
                <td className="py-0.5">NIP</td>
                <td className="py-0.5">:</td>
                <td className="font-mono py-0.5">{pkg.dataGuru.nip || '-'}</td>
              </tr>
              <tr>
                <td className="py-0.5">NUPTK</td>
                <td className="py-0.5">:</td>
                <td className="font-mono py-0.5">{pkg.dataGuru.nuptk || '-'}</td>
              </tr>
              <tr>
                <td className="py-0.5">Tempat / Tgl Lahir</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataGuru.tempatTglLahir}</td>
              </tr>
              <tr>
                <td className="py-0.5">Pangkat / Gol.</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataGuru.pangkatGol}</td>
              </tr>
              <tr>
                <td className="py-0.5">Jabatan</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataGuru.jabatan}</td>
              </tr>
              <tr>
                <td className="py-0.5">Jenis Kelamin</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataGuru.jenisKelamin}</td>
              </tr>
              <tr>
                <td className="py-0.5">Pend. Terakhir</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataGuru.pendTerakhir}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* C. Data Kepala Sekolah */}
        <div>
          <div className="font-bold uppercase tracking-wider mb-1.5 text-slate-900 border-b border-slate-300 pb-0.5">
            C. Data Kepala Sekolah
          </div>
          <table className="w-full text-xs">
            <tbody>
              <tr>
                <td className="w-48 py-0.5">Nama Kepala Sekolah</td>
                <td className="w-4">:</td>
                <td className="font-bold uppercase py-0.5">{pkg.dataKepalaSekolah.namaKepalaSekolah}</td>
              </tr>
              <tr>
                <td className="py-0.5">NIP</td>
                <td className="py-0.5">:</td>
                <td className="font-mono py-0.5">{pkg.dataKepalaSekolah.nip || '-'}</td>
              </tr>
              <tr>
                <td className="py-0.5">NUPTK</td>
                <td className="py-0.5">:</td>
                <td className="font-mono py-0.5">{pkg.dataKepalaSekolah.nuptk || '-'}</td>
              </tr>
              <tr>
                <td className="py-0.5">Pangkat / Gol.</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataKepalaSekolah.pangkatGol}</td>
              </tr>
              <tr>
                <td className="py-0.5">Jabatan</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataKepalaSekolah.jabatan}</td>
              </tr>
              <tr>
                <td className="py-0.5">Tahun Penilaian</td>
                <td className="py-0.5">:</td>
                <td className="font-mono py-0.5">{pkg.dataKepalaSekolah.tahunPenilaian}</td>
              </tr>
              <tr>
                <td className="py-0.5">Periode Penilaian</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataKepalaSekolah.periodePenilaian}</td>
              </tr>
              <tr>
                <td className="py-0.5">Tanggal Penilaian</td>
                <td className="py-0.5">:</td>
                <td className="py-0.5">{pkg.dataKepalaSekolah.tanggalPenilaian}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dual Signature */}
      <div className="flex justify-between items-start text-xs pt-8">
        <div className="text-center w-60 space-y-16">
          <p className="font-medium">Guru Yang Dinilai,</p>
          <div>
            <p className="font-bold underline uppercase">{pkg.dataGuru.namaGuru}</p>
            <p className="font-mono text-[11px]">NIP. {pkg.dataGuru.nip || '-'}</p>
          </div>
        </div>

        <div className="text-center w-60 space-y-16">
          <div>
            <p>{pkg.dataSekolah.kota}, {pkg.dataKepalaSekolah.tanggalPenilaian}</p>
            <p className="font-medium">Kepala Sekolah,</p>
          </div>
          <div>
            <p className="font-bold underline uppercase">{pkg.dataKepalaSekolah.namaKepalaSekolah}</p>
            <p className="font-mono text-[11px]">NIP. {pkg.dataKepalaSekolah.nip || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormKosong = (title: string, questions: typeof PERTANYAAN_REKAN_SEJAWAT) => (
    <div className="bg-white border-2 border-black p-6 sm:p-10 text-black space-y-4 page-break">
      <div className="text-center border-b-2 border-black pb-2">
        <h2 className="text-sm font-black uppercase tracking-wider font-serif">
          {title}
        </h2>
        <p className="text-[11px] text-slate-600">
          Penilaian Kinerja Guru (PKG) TK · Kota Sukabumi
        </p>
      </div>

      <div className="text-xs space-y-1 mb-2">
        <div className="flex">
          <span className="w-36">Nama Kepala Sekolah</span>
          <span className="w-3">:</span>
          <span className="font-medium">{pkg.dataKepalaSekolah.namaKepalaSekolah}</span>
        </div>
        <div className="flex">
          <span className="w-36">Nama Guru Yang Dinilai</span>
          <span className="w-3">:</span>
          <span className="font-bold uppercase">{pkg.dataGuru.namaGuru}</span>
        </div>
        <div className="flex">
          <span className="w-36">Nama Sekolah</span>
          <span className="w-3">:</span>
          <span className="font-medium">{pkg.dataSekolah.namaSekolah}</span>
        </div>
      </div>

      <table className="w-full text-[11px] border border-black border-collapse">
        <thead>
          <tr className="bg-slate-100 text-center font-bold border-b border-black">
            <th rowSpan={2} className="py-1 px-1 w-8 border-r border-black">NO</th>
            <th rowSpan={2} className="py-1 px-2 w-32 border-r border-black">KOMPONEN</th>
            <th rowSpan={2} className="py-1 px-2 border-r border-black text-left">PERNYATAAN</th>
            <th colSpan={4} className="py-0.5 px-1 border-b border-black">Kategori Pilihan</th>
          </tr>
          <tr className="bg-slate-50 text-[10px] font-bold text-center border-b border-black">
            <th className="py-1 px-1 w-12 border-r border-black">Sangat Setuju</th>
            <th className="py-1 px-1 w-12 border-r border-black">Setuju</th>
            <th className="py-1 px-1 w-12 border-r border-black">Kurang Setuju</th>
            <th className="py-1 px-1 w-12">Tidak Setuju</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black">
          {questions.map((q) => (
            <tr key={q.no}>
              <td className="py-1 px-1 text-center font-mono border-r border-black">{q.no}</td>
              <td className="py-1 px-2 font-medium border-r border-black text-[10px]">{q.komponen}</td>
              <td className="py-1 px-2 border-r border-black leading-tight text-[10.5px]">{q.pernyataan}</td>
              <td className="py-1 px-1 border-r border-black text-center"></td>
              <td className="py-1 px-1 border-r border-black text-center"></td>
              <td className="py-1 px-1 border-r border-black text-center"></td>
              <td className="py-1 px-1 text-center"></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-end text-xs pt-2">
        <p className="text-[10px] italic text-slate-500">
          Catatan : Responden boleh tidak mencantumkan nama jika tidak berkenan.
        </p>
        <div className="text-center w-48 space-y-12">
          <p>{pkg.dataSekolah.kota}, .................... 2025<br />Responden,</p>
          <p className="border-b border-black pb-0.5 text-transparent">.</p>
        </div>
      </div>
    </div>
  );

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
          <span className="text-xs font-bold text-slate-700 uppercase">
            {documentType === 'cover'
              ? 'Cover Depan Resmi'
              : documentType === 'identitas-cetak'
              ? 'Lembar Identitas'
              : documentType === 'form-cetak-guru'
              ? 'Formulir Survei Guru (Kosong)'
              : documentType === 'form-cetak-ortu'
              ? 'Formulir Survei Orang Tua (Kosong)'
              : 'Bundle Lengkap Berkas PKG'}
          </span>
        </div>

        <button
          onClick={onPrint}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak Dokumen Ini (Ctrl + P / PDF)</span>
        </button>
      </div>

      {/* Renders Selected View */}
      {documentType === 'cover' && renderCover()}
      {documentType === 'identitas-cetak' && renderIdentitas()}
      {documentType === 'form-cetak-guru' &&
        renderFormKosong(
          'INSTRUMEN PENILAIAN PERILAKU KINERJA GURU OLEH REKAN SEJAWAT',
          PERTANYAAN_REKAN_SEJAWAT
        )}
      {documentType === 'form-cetak-ortu' &&
        renderFormKosong(
          'INSTRUMEN PENILAIAN GURU OLEH ORANG TUA PESERTA DIDIK',
          PERTANYAAN_ORANG_TUA
        )}
      {documentType === 'cetak-semua' && (
        <div className="space-y-8">
          {renderCover()}
          {renderIdentitas()}
          {renderFormKosong(
            'INSTRUMEN PENILAIAN PERILAKU KINERJA GURU OLEH REKAN SEJAWAT',
            PERTANYAAN_REKAN_SEJAWAT
          )}
          {renderFormKosong(
            'INSTRUMEN PENILAIAN GURU OLEH ORANG TUA PESERTA DIDIK',
            PERTANYAAN_ORANG_TUA
          )}
        </div>
      )}
    </div>
  );
};
