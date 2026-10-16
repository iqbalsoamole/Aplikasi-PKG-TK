import React from 'react';
import { SchoolRecord, TeacherPKGRecord } from '../types/pkg';
import { hitungNPKGAkhir } from '../utils/calculations';
import { LogoSukabumi, LogoTK } from './Logos';
import {
  ShieldCheck,
  Building,
  Users,
  Award,
  FileSpreadsheet,
  Plus,
  Printer,
  Download,
  Upload,
  ArrowRight,
  ExternalLink,
  Edit3,
  HelpCircle,
  GraduationCap,
  Sparkles,
  Smartphone,
  Share2,
  Lock,
  KeyRound,
} from 'lucide-react';

interface AdminPengawasDashboardProps {
  schools: SchoolRecord[];
  activeSchoolId: string;
  onSelectSchool: (schoolId: string) => void;
  onOpenSchoolManager: () => void;
  onOpenRoleExplainer: () => void;
  onSwitchToKepalaSekolah: (schoolId?: string, teacherId?: string) => void;
  onNavigate: (tabId: string) => void;
  onExportData: () => void;
  onImportData: () => void;
  onOpenPublishGuide?: () => void;
  onLockAdmin?: () => void;
  onOpenChangePin?: () => void;
}

export const AdminPengawasDashboard: React.FC<AdminPengawasDashboardProps> = ({
  schools,
  activeSchoolId,
  onSelectSchool,
  onOpenSchoolManager,
  onOpenRoleExplainer,
  onSwitchToKepalaSekolah,
  onNavigate,
  onExportData,
  onImportData,
  onOpenPublishGuide,
  onLockAdmin,
  onOpenChangePin,
}) => {
  // Aggregate statistics
  const totalSchools = schools.length;
  let totalTeachers = 0;
  let completedTeachers = 0;
  let allScores: number[] = [];

  schools.forEach((s) => {
    totalTeachers += s.teachers.length;
    s.teachers.forEach((t) => {
      // Create minimal pkg state for score calculation
      const dummyPkg: any = {
        dataSekolah: s.sekolah,
        dataGuru: t.guru,
        dataKepalaSekolah: {
          namaKepalaSekolah: s.sekolah.namaKepalaSekolah,
          nip: s.sekolah.nipKepalaSekolah,
          nuptk: s.sekolah.nuptkKepalaSekolah,
          pangkatGol: s.sekolah.pangkatGolKepalaSekolah,
          jabatan: s.sekolah.jabatanKepalaSekolah,
          tahunPenilaian: s.sekolah.tahunPenilaian,
          periodePenilaian: s.sekolah.periodePenilaian,
          tanggalPenilaian: s.sekolah.tanggalPenilaian,
        },
        dataPengawas: {
          namaPengawas: s.sekolah.namaPengawas,
          nip: s.sekolah.nipPengawas,
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
      const npkg = hitungNPKGAkhir(dummyPkg);
      if (npkg.nilaiPrestasiKerja > 0) {
        allScores.push(npkg.nilaiPrestasiKerja);
        if (npkg.nilaiPrestasiKerja >= 60) {
          completedTeachers += 1;
        }
      }
    });
  });

  const avgNPKG =
    allScores.length > 0
      ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(2)
      : '0.00';

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Admin Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-900/50">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <LogoSukabumi className="w-80 h-80 text-white" />
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 bg-white/10 p-2.5 rounded-xl backdrop-blur-xs border border-white/15 shrink-0">
              <LogoSukabumi className="w-14 h-16 drop-shadow-md" />
              <LogoTK className="w-14 h-14 drop-shadow-md" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="bg-indigo-600/90 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-indigo-400/40 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Mode Pengawas / Admin Dinas
                </span>
                <span className="text-xs text-indigo-200">
                  Pemerintah Daerah Kota Sukabumi
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
                Dashboard Supervisi & Monitoring PKG TK
              </h1>
              <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-2xl leading-relaxed">
                Pusat pengawasan dan rekapitulasi kinerja guru Taman Kanak-Kanak se-Kota Sukabumi. Kelola sekolah binaan, pantau progres penilaian tiap satuan, dan unduh laporan kolektif resmi.
              </p>
            </div>
          </div>

          {/* Quick Switch & Security Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full lg:w-auto flex-wrap">
            {onOpenChangePin && (
              <button
                type="button"
                onClick={onOpenChangePin}
                className="px-3 py-2 bg-indigo-800/80 hover:bg-indigo-700 text-amber-300 border border-indigo-400/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                title="Ganti Kode Akses PIN Admin / Pengawas"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Ubah PIN</span>
              </button>
            )}

            {onLockAdmin && (
              <button
                type="button"
                onClick={onLockAdmin}
                className="px-3 py-2 bg-rose-600/90 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5"
                title="Kunci Sesi Admin dan Kembali ke Tampilan Biasa"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Kunci Mode</span>
              </button>
            )}

            <button
              onClick={onOpenRoleExplainer}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              title="Lihat penjelasan perbedaan Admin vs Kepala Sekolah"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Panduan</span>
            </button>

            <button
              onClick={() => onSwitchToKepalaSekolah()}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 group"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Mode Kepala Sekolah</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Role Clarity Notification Banner */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm text-indigo-950 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-600 text-white rounded-lg shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 text-sm">
                Anda sedang di Halaman Khusus Pengawas / Admin Dinas
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                PIN Terverifikasi
              </span>
            </div>
            <div className="text-slate-600 text-xs mt-0.5">
              Di halaman ini Anda mengelola data master <strong>seluruh sekolah</strong> dan mencetak <strong>rekap kolektif</strong>. Untuk mengisi instrumen penilaian 4 kompetensi atau survey 360°, silakan klik tombol <strong>"Nilai Guru Ini"</strong> pada kartu sekolah di bawah untuk masuk sebagai Kepala Sekolah.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          {onOpenChangePin && (
            <button
              onClick={onOpenChangePin}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-100 transition"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Ganti Kode Akses</span>
            </button>
          )}
          <button
            onClick={onOpenRoleExplainer}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline whitespace-nowrap"
          >
            Pelajari Selengkapnya &rarr;
          </button>
        </div>
      </div>

      {/* Key Aggregate Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Total Sekolah Binaan</span>
            <Building className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalSchools}</div>
          <div className="text-[11px] text-slate-500 mt-1">TK di Kota Sukabumi</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Total Guru Terdaftar</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalTeachers}</div>
          <div className="text-[11px] text-slate-500 mt-1">Guru di semua sekolah</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Guru Selesai Dinilai</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {completedTeachers}{' '}
            <span className="text-xs font-normal text-slate-400">/ {totalTeachers}</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            {totalTeachers > 0 ? Math.round((completedTeachers / totalTeachers) * 100) : 0}% tuntas
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Rata-rata Skor Kota</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700 tabular-nums">
            {avgNPKG}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Skor NPKG Gabungan</div>
        </div>
      </div>

      {/* Publication & Multi-Device Distribution Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-700/50">
        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-400/30 shrink-0">
            <Smartphone className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                PWA Siap Pasang
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Publikasi & Pemasangan di Semua HP Android & Komputer PC
              </h3>
            </div>
            <p className="text-xs text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
              Aplikasi ini berteknologi Progressive Web App (PWA). Seluruh Kepala Sekolah dan Guru TK se-Kota Sukabumi dapat membuka dan memasangnya langsung di HP Android (muncul di layar utama) maupun di Laptop PC tanpa perlu download APK manual!
            </p>
          </div>
        </div>

        {onOpenPublishGuide && (
          <button
            type="button"
            onClick={onOpenPublishGuide}
            className="shrink-0 w-full md:w-auto px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition shadow flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-slate-950" />
            <span>Panduan & Salin Tautan</span>
          </button>
        )}
      </div>

      {/* Admin Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Daftar Sekolah Binaan ({schools.length} Satuan TK)
          </h2>
          <p className="text-xs text-slate-500">
            Pilih sekolah untuk melihat rincian guru, mencetak rekap kolektif, atau memulai penilaian.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenSchoolManager}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Sekolah Baru</span>
          </button>

          <button
            onClick={onExportData}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition-colors flex items-center gap-1.5"
            title="Cadangkan seluruh database sekolah & guru ke file JSON"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Cadangkan Data (JSON)</span>
          </button>

          <button
            onClick={onImportData}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition-colors flex items-center gap-1.5"
            title="Pulihkan data cadangan dari file JSON"
          >
            <Upload className="w-4 h-4 text-slate-600" />
            <span>Impor Data</span>
          </button>
        </div>
      </div>

      {/* Schools Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {schools.map((s) => {
          const isCurrentActive = s.id === activeSchoolId;

          // Calculate average score for this school
          let schoolScores: number[] = [];
          s.teachers.forEach((t) => {
            const dummyPkg: any = {
              dataSekolah: s.sekolah,
              dataGuru: t.guru,
              dataKepalaSekolah: {
                namaKepalaSekolah: s.sekolah.namaKepalaSekolah,
                nip: s.sekolah.nipKepalaSekolah,
                nuptk: s.sekolah.nuptkKepalaSekolah,
                pangkatGol: s.sekolah.pangkatGolKepalaSekolah,
                jabatan: s.sekolah.jabatanKepalaSekolah,
                tahunPenilaian: s.sekolah.tahunPenilaian,
                periodePenilaian: s.sekolah.periodePenilaian,
                tanggalPenilaian: s.sekolah.tanggalPenilaian,
              },
              dataPengawas: {
                namaPengawas: s.sekolah.namaPengawas,
                nip: s.sekolah.nipPengawas,
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
            const sc = hitungNPKGAkhir(dummyPkg).nilaiPrestasiKerja;
            if (sc > 0) schoolScores.push(sc);
          });

          const avgSchoolScore =
            schoolScores.length > 0
              ? (schoolScores.reduce((a, b) => a + b, 0) / schoolScores.length).toFixed(2)
              : '-';

          return (
            <div
              key={s.id}
              className={`bg-white rounded-xl border transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                isCurrentActive
                  ? 'border-indigo-500 ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                        {s.sekolah.namaSekolah}
                      </h3>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>NPSN: {s.sekolah.npsn || '-'}</span>
                        <span>·</span>
                        <span>{s.sekolah.kecamatan || 'Kota Sukabumi'}</span>
                      </div>
                    </div>
                  </div>
                  {isCurrentActive && (
                    <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 shrink-0">
                      Aktif Dipilih
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body details */}
              <div className="p-4 space-y-3 text-xs text-slate-600 flex-1">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-400">Kepala Sekolah:</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">
                    {s.sekolah.namaKepalaSekolah || '-'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-400">Pengawas Pembina:</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">
                    {s.sekolah.namaPengawas || 'Pengawas Kota Sukabumi'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-400">Jumlah Guru Terdaftar:</span>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {s.teachers.length} Guru
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Rata-rata Skor NPKG:</span>
                  <span className="font-extrabold text-amber-600 text-sm">
                    {avgSchoolScore}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectSchool(s.id);
                    onNavigate('rekap-kolektif');
                  }}
                  className="flex-1 py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                  title="Lihat / Cetak Rekapitulasi Kolektif Sekolah"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                  <span>Rekap Nilai</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSwitchToKepalaSekolah(s.id)}
                  className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1"
                  title="Buka form penilaian guru di sekolah ini sebagai Kepala Sekolah"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Nilai Guru</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
