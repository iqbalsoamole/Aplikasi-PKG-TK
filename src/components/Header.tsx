import React from 'react';
import { LogoSukabumi, LogoTK } from './Logos';
import { SchoolRecord, TeacherPKGRecord, UserRole } from '../types/pkg';
import {
  FileText,
  Printer,
  HelpCircle,
  Download,
  Upload,
  RotateCcw,
  Home,
  CheckCircle2,
  Building,
  Users,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Info,
  Smartphone,
  Share2,
  Lock,
  KeyRound,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenHelp: () => void;
  onOpenPublishGuide?: () => void;
  onResetData: () => void;
  onExportData: () => void;
  onImportData: () => void;
  savedIndicator: boolean;
  schools: SchoolRecord[];
  activeSchool: SchoolRecord;
  activeTeacher: TeacherPKGRecord;
  onSelectSchool: (schoolId: string) => void;
  onSelectTeacher: (teacherId: string) => void;
  onOpenSchoolManager: () => void;
  role: UserRole;
  isAdminUnlocked?: boolean;
  onSelectRole: (role: UserRole) => void;
  onLockAdmin?: () => void;
  onOpenRoleExplainer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenHelp,
  onOpenPublishGuide,
  onResetData,
  onExportData,
  onImportData,
  savedIndicator,
  schools,
  activeSchool,
  activeTeacher,
  onSelectSchool,
  onSelectTeacher,
  onOpenSchoolManager,
  role,
  isAdminUnlocked = false,
  onSelectRole,
  onLockAdmin,
  onOpenRoleExplainer,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs no-print">
      {/* Top Government Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-slate-50 to-emerald-50 border-b border-amber-200/60 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Left Brand Lockup */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center gap-2 shrink-0">
              <LogoSukabumi className="w-10 h-12 drop-shadow-xs" />
              <LogoTK className="w-10 h-10 drop-shadow-xs" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold tracking-wider text-slate-600 uppercase">
                Pemerintah Daerah Kota Sukabumi · Dinas Pendidikan dan Kebudayaan
              </div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                PENILAIAN KINERJA GURU TAMAN KANAK-KANAK (PKG TK)
              </h1>
              <div className="text-[10px] text-slate-500 flex items-center gap-1.5 font-medium">
                <span>Perdirjen GTK No. 2626/B/GT/2023</span>
                <span>·</span>
                <span className="text-slate-600 font-semibold">Tahun 2025/2026</span>
              </div>
            </div>
          </div>

          {/* Center: Explicit Role Switcher (Admin vs Kepala Sekolah) */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <div className="flex items-center bg-white p-1 rounded-xl border-2 border-slate-300 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  onSelectRole('pengawas');
                  if (['paedagogik', 'kepribadian', 'sosial', 'profesional', 'penunjang', 'rekan-sejawat', 'orang-tua', 'kehadiran'].includes(currentTab)) {
                    onSelectTab('menu');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'pengawas'
                    ? 'bg-indigo-700 text-white shadow-xs ring-1 ring-indigo-500'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={
                  isAdminUnlocked
                    ? "Mode Admin / Pengawas: Kelola Sekolah Binaan, Rekap Kolektif, dan Monitoring"
                    : "Mode Admin / Pengawas (Terkunci - Memerlukan Kode Akses PIN)"
                }
              >
                {isAdminUnlocked ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span>Mode Admin / Pengawas</span>
                {!isAdminUnlocked && (
                  <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded-full font-bold ml-0.5">
                    PIN
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectRole('kepala_sekolah');
                  onSelectTab('menu');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'kepala_sekolah'
                    ? 'bg-emerald-700 text-white shadow-xs ring-1 ring-emerald-500'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Mode Kepala Sekolah: Penilaian 4 Kompetensi Guru, 360°, Kehadiran, dan Berita Acara"
              >
                <GraduationCap className="w-3.5 h-3.5 text-white" />
                <span>Mode Kepala Sekolah</span>
              </button>
            </div>

            {/* Quick Lock Button if in Admin Mode */}
            {role === 'pengawas' && isAdminUnlocked && onLockAdmin && (
              <button
                type="button"
                onClick={onLockAdmin}
                className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
                title="Kunci sesi admin dan kembali ke mode Kepala Sekolah"
              >
                <Lock className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">Kunci Mode</span>
              </button>
            )}

            {/* Help / Role Explanation Button */}
            <button
              type="button"
              onClick={onOpenRoleExplainer}
              className="px-2.5 py-1.5 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 text-xs font-bold flex items-center gap-1 transition-colors"
              title="Klik untuk melihat panduan pembagian tugas Admin vs Kepala Sekolah"
            >
              <Info className="w-3.5 h-3.5 text-amber-800" />
              <span className="hidden sm:inline">Panduan Peran</span>
            </button>
          </div>

          {/* Right Global Actions */}
          <div className="flex items-center gap-1.5 text-xs flex-wrap justify-end">
            {savedIndicator && (
              <span className="flex items-center gap-1 text-emerald-600 font-medium px-2 py-1 bg-emerald-50 rounded-md border border-emerald-200 animate-fade-in text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Auto-saved
              </span>
            )}

            <button
              onClick={onExportData}
              className="p-1.5 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg"
              title="Unduh Data Cadangan Semua Sekolah (JSON)"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onImportData}
              className="p-1.5 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg"
              title="Impor Cadangan Data (JSON)"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onResetData}
              className="p-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg"
              title="Reset ke Contoh Standar"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* PWA Install Action */}
            <PWAInstallButton />

            {onOpenPublishGuide && (
              <button
                type="button"
                onClick={onOpenPublishGuide}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition"
                title="Panduan Publikasi, Berbagi Tautan, dan Pasang di Android/PC"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden lg:inline">Publikasi & Bagikan</span>
              </button>
            )}

            <button
              onClick={onOpenHelp}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-100 text-sky-800 hover:bg-sky-200 font-semibold"
              title="Petunjuk Penggunaan"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Bantuan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Bar: Active Target & Role-Adaptive Tabs */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Active Entity Indicators */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {/* School Selector */}
            <div className="flex items-center bg-white border border-slate-300 rounded-lg shadow-2xs px-2.5 py-1">
              <Building className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
              <span className="text-slate-400 mr-1 text-[11px]">Sekolah:</span>
              <select
                value={activeSchool.id}
                onChange={(e) => onSelectSchool(e.target.value)}
                className="bg-transparent font-bold text-slate-800 outline-none max-w-[170px] sm:max-w-[220px] truncate cursor-pointer"
              >
                {schools.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.sekolah.namaSekolah} ({s.teachers.length} guru)
                  </option>
                ))}
              </select>
              {role === 'pengawas' && (
                <button
                  type="button"
                  onClick={onOpenSchoolManager}
                  className="ml-2 pl-2 border-l border-slate-200 text-indigo-700 hover:text-indigo-900 text-[10px] font-bold"
                  title="Kelola / Tambah Sekolah"
                >
                  Kelola
                </button>
              )}
            </div>

            {/* Teacher Selector (prominent for Kepala Sekolah) */}
            <div className="flex items-center bg-white border border-slate-300 rounded-lg shadow-2xs px-2.5 py-1">
              <Users className="w-3.5 h-3.5 text-indigo-600 mr-1.5 shrink-0" />
              <span className="text-slate-400 mr-1 text-[11px]">Guru Dinilai:</span>
              <select
                value={activeTeacher?.id || ''}
                onChange={(e) => onSelectTeacher(e.target.value)}
                className="bg-transparent font-bold text-slate-800 outline-none max-w-[150px] sm:max-w-[200px] truncate cursor-pointer"
              >
                {activeSchool.teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.guru.namaGuru}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => onSelectTab('daftar-guru')}
                className="ml-2 pl-2 border-l border-slate-200 text-slate-500 hover:text-indigo-700 text-[10px] font-semibold"
                title="Lihat Semua Guru"
              >
                Daftar ({activeSchool.teachers.length})
              </button>
            </div>
          </div>

          {/* Quick Context Tag */}
          <div className="flex items-center gap-2">
            {role === 'pengawas' ? (
              <span className="text-[11px] font-semibold text-indigo-900 bg-indigo-100/80 px-2.5 py-1 rounded-md border border-indigo-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                <span>Area Supervisi Pengawas & Admin</span>
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-100/80 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                <span>Area Penilaian Kepala Sekolah</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Tab Navigation - Filtered & Organized by Role */}
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none flex items-center gap-1 py-1.5 border-t border-slate-200 text-xs">
        {role === 'pengawas' ? (
          /* TABS FOR ADMIN / PENGAWAS */
          <>
            <button
              onClick={() => onSelectTab('menu')}
              className={`px-3 py-1.5 font-bold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'menu'
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dashboard Pengawas</span>
            </button>

            <button
              onClick={onOpenSchoolManager}
              className="px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors text-slate-700 hover:bg-slate-200 flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kelola Sekolah Binaan</span>
            </button>

            <button
              onClick={() => onSelectTab('daftar-guru')}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'daftar-guru'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span>Daftar Guru ({activeSchool.teachers.length})</span>
            </button>

            <button
              onClick={() => onSelectTab('rekap-kolektif')}
              className={`px-3 py-1.5 font-bold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'rekap-kolektif'
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Rekap Kolektif Sekolah</span>
            </button>

            <div className="h-5 w-px bg-slate-300 mx-1" />

            <button
              onClick={() => {
                onSelectRole('kepala_sekolah');
                onSelectTab('menu');
              }}
              className="px-3 py-1.5 font-bold rounded-md whitespace-nowrap transition-all bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs flex items-center gap-1.5 ml-auto"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Buka Form Penilaian Guru (Sebagai Kepsek) &rarr;</span>
            </button>
          </>
        ) : (
          /* TABS FOR KEPALA SEKOLAH */
          <>
            {[
              { id: 'menu', label: 'Dashboard Hub Kepsek', icon: Home },
              { id: 'daftar-guru', label: `Daftar Guru (${activeSchool.teachers.length})`, icon: Users },
              { id: 'data-guru', label: '0. Data Guru & Sekolah' },
              { id: 'paedagogik', label: '1. Pedagogik' },
              { id: 'kepribadian', label: '2. Kepribadian' },
              { id: 'sosial', label: '3. Sosial' },
              { id: 'profesional', label: '4. Profesional' },
              { id: 'penunjang', label: '5. Penunjang' },
              { id: 'rekan-sejawat', label: 'Rekan (360°)' },
              { id: 'orang-tua', label: 'Ortu (360°)' },
              { id: 'kehadiran', label: 'Kehadiran' },
              { id: 'npkg', label: 'NPKG Rekap' },
              { id: 'berita-acara', label: 'Berita Acara (Hal. 29)' },
              { id: 'cetak-semua', label: 'Cetak Berkas', icon: Printer },
            ].map((tab) => {
              const isActive = currentTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-3 py-1 font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <div className="h-5 w-px bg-slate-300 mx-1" />

            <button
              onClick={() => {
                onSelectRole('pengawas');
                onSelectTab('menu');
              }}
              className="px-2.5 py-1 font-semibold rounded-md whitespace-nowrap text-indigo-700 hover:bg-indigo-50 border border-indigo-200 transition-colors flex items-center gap-1 ml-auto"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Kembali ke Mode Pengawas</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
