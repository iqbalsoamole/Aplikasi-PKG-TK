import React from 'react';
import {
  X,
  ShieldCheck,
  GraduationCap,
  CheckCircle2,
  Building,
  Users,
  FileText,
  FileCheck2,
  Printer,
  Database,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { UserRole } from '../types/pkg';

interface RoleExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const RoleExplainerModal: React.FC<RoleExplainerModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-scale-in my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              Panduan Pembagian Hak Akses & Tugas
            </div>
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 mt-1">
              <span>Perbedaan Bagian Admin (Pengawas) vs Kepala Sekolah</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 text-xs sm:text-sm">
            <span className="font-bold">💡 Kenapa dipisahkan?</span> Dalam sistem PKG Kota Sukabumi, <strong>Pengawas/Admin</strong> bertugas di tingkat pengawasan seluruh sekolah binaan, sedangkan <strong>Kepala Sekolah</strong> bertugas menilai langsung para guru di sekolah masing-masing.
          </div>

          {/* 2-Column Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column 1: Admin / Pengawas */}
            <div
              className={`rounded-xl border-2 p-5 transition-all ${
                currentRole === 'pengawas'
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-300'
                  : 'border-slate-200 bg-white hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-600 text-white rounded-lg">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-base">Bagian Admin / Pengawas</h3>
                      <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5 text-amber-700" />
                        PIN
                      </span>
                    </div>
                    <div className="text-[11px] text-indigo-700 font-semibold">Tingkat Dinas & Pengawasan</div>
                  </div>
                </div>
                {currentRole === 'pengawas' && (
                  <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">
                    Aktif
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-4">
                Digunakan oleh <strong>Pengawas Pembina</strong> atau Admin Dinas Pendidikan untuk supervisi makro (dilindungi kode akses PIN):
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Building className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Kelola Sekolah Binaan:</strong> Menambah, mengedit, dan menghapus data sekolah di Kota Sukabumi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Monitoring Penilaian:</strong> Memantau sekolah mana saja yang sudah/belum selesai menilai guru.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Rekap Kolektif Sekolah:</strong> Mengunduh dan mencetak rekapitulasi nilai seluruh guru per sekolah.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Database className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Pusat Data Cadangan:</strong> Ekspor file database lengkap (JSON) dan impor kembali ke komputer lain.</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => {
                  onSelectRole('pengawas');
                  onClose();
                }}
                className={`mt-5 w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  currentRole === 'pengawas'
                    ? 'bg-indigo-700 text-white shadow-xs hover:bg-indigo-800'
                    : 'bg-white border border-indigo-600 text-indigo-700 hover:bg-indigo-50'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Beralih ke Tampilan Pengawas (Perlu Kode Akses)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Column 2: Kepala Sekolah */}
            <div
              className={`rounded-xl border-2 p-5 transition-all ${
                currentRole === 'kepala_sekolah'
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-300'
                  : 'border-slate-200 bg-white hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-600 text-white rounded-lg">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Bagian Kepala Sekolah</h3>
                    <div className="text-[11px] text-emerald-700 font-semibold">Tingkat Satuan TK & Penilai</div>
                  </div>
                </div>
                {currentRole === 'kepala_sekolah' && (
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                    Aktif
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-4">
                Digunakan oleh <strong>Kepala Sekolah</strong> atau Tim Penilai internal untuk menilai kinerja guru:
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Penilaian 4 Kompetensi:</strong> Mengisi rubrik Pedagogik (15), Kepribadian (10), Sosial (10), dan Profesional (15).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Survey 360 Derajat:</strong> Menginput jawaban kuesioner dari 3 rekan sejawat & 3 perwakilan orang tua.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Penunjang & Kehadiran:</strong> Mencatat ijazah, tugas tambahan, dan indeks kehadiran bulanan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Printer className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Berita Acara & NPKG:</strong> Menandatangani Berita Acara (Hal. 29) dan mencetak bundle berkas guru.</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => {
                  onSelectRole('kepala_sekolah');
                  onClose();
                }}
                className={`mt-5 w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  currentRole === 'kepala_sekolah'
                    ? 'bg-emerald-700 text-white shadow-xs hover:bg-emerald-800'
                    : 'bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <span>Beralih ke Tampilan Kepala Sekolah</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Summary Table */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="font-bold text-slate-900 text-xs mb-2 uppercase tracking-wider">
              Tabel Alur Kerja Bersama:
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-600">
                    <th className="py-1.5 px-2">Tahap</th>
                    <th className="py-1.5 px-2">Aktivitas</th>
                    <th className="py-1.5 px-2">Penanggung Jawab</th>
                    <th className="py-1.5 px-2">Fitur Menu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="py-1.5 px-2 font-semibold">1. Persiapan</td>
                    <td className="py-1.5 px-2">Daftarkan Sekolah & Pengawas Pembina</td>
                    <td className="py-1.5 px-2 font-bold text-indigo-700">Admin / Pengawas</td>
                    <td className="py-1.5 px-2">Kelola Sekolah</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2 font-semibold">2. Entri Guru</td>
                    <td className="py-1.5 px-2">Input daftar guru yang dinilai di TK</td>
                    <td className="py-1.5 px-2 font-bold text-emerald-700">Kepala Sekolah</td>
                    <td className="py-1.5 px-2">Daftar Guru / Data Guru</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2 font-semibold">3. Observasi & Skoring</td>
                    <td className="py-1.5 px-2">Isi 4 Kompetensi, Penunjang, 360°, Hadir</td>
                    <td className="py-1.5 px-2 font-bold text-emerald-700">Kepala Sekolah / Penilai</td>
                    <td className="py-1.5 px-2">Instrumen 1 s/d Kehadiran</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2 font-semibold">4. Pengesahan</td>
                    <td className="py-1.5 px-2">Tandatangani Berita Acara & NPKG</td>
                    <td className="py-1.5 px-2 font-bold text-emerald-700">Kepala Sekolah & Guru</td>
                    <td className="py-1.5 px-2">Berita Acara & Cetak Berkas</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2 font-semibold">5. Verifikasi & Monev</td>
                    <td className="py-1.5 px-2">Monev nilai & cetak rekap kolektif kota</td>
                    <td className="py-1.5 px-2 font-bold text-indigo-700">Admin / Pengawas</td>
                    <td className="py-1.5 px-2">Rekap Kolektif Sekolah</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Anda dapat beralih peran kapan saja melalui tombol peran di bagian atas layar.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
