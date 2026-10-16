import React from 'react';
import { X, BookOpen, CheckCircle, Award, Users, CalendarCheck, HelpCircle, Lock, KeyRound } from 'lucide-react';

interface PetunjukModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PetunjukModal: React.FC<PetunjukModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-amber-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-amber-950 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Petunjuk Penggunaan Aplikasi PKG TK
              </h3>
              <p className="text-xs text-slate-600">
                Panduan Operasional Penilaian Kinerja Guru Taman Kanak-Kanak Kota Sukabumi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
          {/* Dasar Regulasi */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Dasar Hukum & Regulasi</span>
            </h4>
            <p>
              Instrumen penilaian kinerja ini mengacu pada:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li><strong>Peraturan Direktur Jenderal GTK No. 2626/B/GT/2023</strong> tentang Model Kompetensi Guru.</li>
              <li><strong>Permendikbudristek No. 40 Tahun 2021</strong> tentang Penugasan Guru sebagai Kepala Sekolah.</li>
              <li>Pedoman Teknis Penilaian Kinerja Guru TK Dinas Pendidikan dan Kebudayaan Kota Sukabumi.</li>
            </ul>
          </div>

          {/* Alur Kerja */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Langkah Pengisian Aplikasi</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-800">1. Data Guru & Sekolah (0)</div>
                <p className="text-slate-500 text-[11px]">
                  Isi data identitas sekolah, guru yang dinilai, kepala sekolah penilai, dan pengawas pembina.
                </p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-800">2. Empat Pilar Kompetensi (1-4)</div>
                <p className="text-slate-500 text-[11px]">
                  Beri nilai 1 - 4 pada setiap butir penilaian (Pedagogik 15 butir, Kepribadian 10 butir, Sosial 10 butir, Profesional 15 butir) dan tentukan Level Capaian (1-5).
                </p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-800">3. Kegiatan Penunjang (5)</div>
                <p className="text-slate-500 text-[11px]">
                  Pilih kondisi ijazah terakhir, keaktifan organisasi IGTKI/KKG/P5, serta penghargaan dan pelatihan PMM.
                </p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-800">4. Penilaian 360° & Presensi</div>
                <p className="text-slate-500 text-[11px]">
                  Input kuesioner dari 3 rekan guru dan 3 orang tua murid, serta rekapitulasi kehadiran per bulan.
                </p>
              </div>
            </div>
          </div>

          {/* Kategori Predikat */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-2">
            <h4 className="font-bold text-slate-900">Kriteria Sebutan Nilai Prestasi Kerja (NPKG)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
              <div className="p-2 bg-white rounded-lg border border-amber-200">
                <div className="font-black text-amber-700">90,00 - 100</div>
                <div className="font-bold text-slate-800">SANGAT BAIK</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-amber-200">
                <div className="font-black text-emerald-700">76,00 - 89,99</div>
                <div className="font-bold text-slate-800">BAIK</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-amber-200">
                <div className="font-black text-yellow-700">60,00 - 75,99</div>
                <div className="font-bold text-slate-800">CUKUP</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-amber-200">
                <div className="font-black text-rose-700">&lt; 60,00</div>
                <div className="font-bold text-slate-800">KURANG</div>
              </div>
            </div>
          </div>

          {/* Keamanan Kode Akses Admin / Pengawas */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-2">
            <h4 className="font-bold text-sm text-indigo-950 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>Kode Akses Keamanan Mode Admin / Pengawas</span>
            </h4>
            <p className="text-slate-700 text-xs">
              Untuk mencegah modifikasi data sekolah dan data pembina oleh sembarang pihak, <strong>Mode Admin / Pengawas</strong> dilindungi oleh kode akses PIN:
            </p>
            <div className="bg-white rounded-lg p-2.5 border border-indigo-200 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Kode Akses Default Awal:</span>
              <span className="font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">123456</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
              <li>Pengawas dapat mengganti kode akses kapan saja melalui tombol <strong>"Ubah PIN"</strong> di dalam Dashboard Admin.</li>
              <li>Selesai menggunakan mode admin? Tekan tombol <strong>"Kunci Mode"</strong> untuk langsung mengunci sesi dan kembali ke mode Kepala Sekolah.</li>
              <li>Jika lupa PIN yang baru dibuat, tersedia opsi reset ke PIN bawaan <code>123456</code> pada layar verifikasi.</li>
            </ul>
          </div>

          {/* Cetak & Simpan */}
          <div className="border-t border-slate-200 pt-3 flex items-start gap-2 text-slate-600">
            <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p>
              Semua data disimpan secara otomatis pada browser Anda. Anda dapat mengunduh berkas cadangan melalui menu <strong>Export</strong> dan memuatnya kembali melalui menu <strong>Import</strong>. Untuk mencetak, tekan tombol <strong>Cetak Berkas</strong> atau gunakan shortcut <strong>Ctrl + P</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
