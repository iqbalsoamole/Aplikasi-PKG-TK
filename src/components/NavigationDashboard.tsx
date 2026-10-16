import React from 'react';
import { PKGState, SchoolRecord, TeacherPKGRecord } from '../types/pkg';
import {
  hitungSkorKompetensi,
  hitungSkorPenunjang,
  hitungSkor360,
  hitungKehadiran,
  hitungNPKGAkhir,
} from '../utils/calculations';
import { LogoSukabumi, LogoTK } from './Logos';
import {
  FileSpreadsheet,
  Users,
  Award,
  CalendarCheck,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Printer,
  ChevronRight,
  Building,
  UserCheck,
  UserPlus,
  ShieldCheck,
  GraduationCap,
  Smartphone,
  Lock,
} from 'lucide-react';

interface NavigationDashboardProps {
  pkg: PKGState;
  activeSchool: SchoolRecord;
  activeTeacher: TeacherPKGRecord;
  onNavigate: (tabId: string) => void;
  onOpenHelp: () => void;
  onOpenSchoolManager: () => void;
  onSwitchToPengawas?: () => void;
  onOpenRoleExplainer?: () => void;
  onOpenPublishGuide?: () => void;
}

export const NavigationDashboard: React.FC<NavigationDashboardProps> = ({
  pkg,
  activeSchool,
  activeTeacher,
  onNavigate,
  onOpenHelp,
  onOpenSchoolManager,
  onSwitchToPengawas,
  onOpenRoleExplainer,
  onOpenPublishGuide,
}) => {
  const skorPaedagogik = hitungSkorKompetensi(pkg.paedagogik);
  const skorKepribadian = hitungSkorKompetensi(pkg.kepribadian);
  const skorSosial = hitungSkorKompetensi(pkg.sosial);
  const skorProfesional = hitungSkorKompetensi(pkg.profesional);
  const penunjangData = hitungSkorPenunjang(pkg.penunjang);
  const data360 = hitungSkor360(pkg);
  const dataHadir = hitungKehadiran(pkg.kehadiran);
  const npkg = hitungNPKGAkhir(pkg);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Official Top Hero Presentation Banner - Focused on Kepala Sekolah */}
      <div className="bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50 border-2 border-emerald-300 rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
          <LogoSukabumi className="w-80 h-80" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 bg-white/95 p-2.5 rounded-xl border border-emerald-200 shadow-xs">
              <LogoSukabumi className="w-16 h-20 drop-shadow-sm" />
              <LogoTK className="w-16 h-16 drop-shadow-sm" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="bg-emerald-700 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-500 flex items-center gap-1.5 shadow-2xs">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Mode Kepala Sekolah / Penilai PKG
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Taman Kanak-Kanak Kota Sukabumi
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                LEMBAR PENILAIAN KINERJA GURU (PKG)
              </h2>
              <div className="flex items-center gap-2 flex-wrap mt-1 text-xs">
                <span className="font-bold text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-300 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-emerald-700" />
                  {activeSchool.sekolah.namaSekolah}
                </span>
                <span className="text-slate-500 font-medium">
                  NPSN: {activeSchool.sekolah.npsn}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600 font-semibold">
                  Kepsek: {activeSchool.sekolah.namaKepalaSekolah || '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Score Badge Card */}
          <div className="bg-white/95 backdrop-blur-xs border border-emerald-300 rounded-xl p-4 shadow-sm text-center shrink-0 min-w-[240px]">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Nilai Prestasi Kerja (NPKG) Guru
            </div>
            <div className="text-3xl font-black text-amber-600 my-1 tabular-nums">
              {npkg.nilaiPrestasiKerja.toFixed(2)}
            </div>
            <div className="inline-block px-3 py-0.5 bg-emerald-600 text-white text-xs font-bold rounded-full">
              {npkg.sebutan}
            </div>
            <div className="text-[11px] font-semibold text-slate-800 mt-2 truncate max-w-[210px] mx-auto">
              Guru: {pkg.dataGuru.namaGuru}
            </div>
            <div className="text-[10px] text-slate-400">
              NIP: {pkg.dataGuru.nip || '-'}
            </div>
          </div>
        </div>
      </div>

      {/* Role Notice & Switcher Bar */}
      <div className="bg-white border border-emerald-200 rounded-xl p-3.5 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-xs sm:text-sm">
              Tugas Kepala Sekolah: Menilai Guru "{pkg.dataGuru.namaGuru}"
            </div>
            <div className="text-slate-500 text-[11px]">
              Silakan isi formulir identitas, 4 kompetensi, kuesioner 360°, dan kehadiran di bawah ini.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onOpenPublishGuide && (
            <button
              onClick={onOpenPublishGuide}
              className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold rounded-lg transition-colors border border-emerald-300 flex items-center gap-1.5 text-xs shadow-2xs"
              title="Pasang aplikasi ini di HP Android atau Laptop Anda"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span>📱 Pasang di HP / PC</span>
            </button>
          )}

          {onOpenRoleExplainer && (
            <button
              onClick={onOpenRoleExplainer}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors border border-slate-200 flex items-center gap-1 text-[11px]"
            >
              <span>ℹ️ Perbedaan Admin vs Kepsek</span>
            </button>
          )}

          {onSwitchToPengawas && (
            <button
              onClick={onSwitchToPengawas}
              className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg transition-all shadow-2xs flex items-center gap-1.5 text-xs"
              title="Beralih ke Mode Pengawas (Memerlukan Kode Akses)"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>Beralih ke Mode Pengawas / Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Teacher Quick Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" />
          <span className="text-slate-500">Guru yang Sedang Dinilai:</span>
          <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
            {pkg.dataGuru.namaGuru} ({pkg.dataGuru.pangkatGol || 'Guru'})
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">Total di sekolah ini: {activeSchool.teachers.length} guru</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('daftar-guru')}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg transition-colors border border-slate-300 flex items-center gap-1.5 shadow-2xs"
          >
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Ganti Guru yang Dinilai ({activeSchool.teachers.length})</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid Layout matching the 3-section structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Petunjuk, Data Guru & Model Kompetensi (Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={onOpenHelp}
              className="flex items-center justify-between p-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold rounded-xl shadow-xs transition-transform active:scale-[0.98] border border-yellow-500"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm">PETUNJUK</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-75" />
            </button>

            <button
              onClick={() => onNavigate('data-guru')}
              className="flex items-center justify-between p-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-transform active:scale-[0.98] border border-emerald-700"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs leading-none opacity-80">0. DATA IDENTITAS</div>
                  <div className="text-sm">GURU & PENILAI</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-75" />
            </button>
          </div>

          {/* Model Kompetensi Guru Box with 5 child sections */}
          <div className="bg-slate-800 text-white rounded-2xl p-5 border border-slate-700 shadow-md">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <h3 className="font-bold text-base text-sky-300">MODEL KOMPETENSI GURU</h3>
                  <p className="text-xs text-slate-400">4 Pilar Kompetensi & Kegiatan Penunjang</p>
                </div>
              </div>
              <span className="text-xs bg-slate-700 text-sky-300 px-2.5 py-1 rounded-md font-mono">
                15 + 10 + 10 + 15 Butir
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 'paedagogik',
                  title: '1. KOMPETENSI PAEDAGOGIK',
                  subtitle: '15 Indikator Pembelajaran',
                  skor: skorPaedagogik,
                  level: `Level ${pkg.paedagogik.selectedLevel}`,
                  color: 'from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600',
                },
                {
                  id: 'kepribadian',
                  title: '2. KOMPETENSI KEPRIBADIAN',
                  subtitle: '10 Indikator Kematangan & Etika',
                  skor: skorKepribadian,
                  level: `Level ${pkg.kepribadian.selectedLevel}`,
                  color: 'from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700',
                },
                {
                  id: 'sosial',
                  title: '3. KOMPETENSI SOSIAL',
                  subtitle: '10 Indikator Kolaborasi & Komunikasi',
                  skor: skorSosial,
                  level: `Level ${pkg.sosial.selectedLevel}`,
                  color: 'from-orange-700 to-orange-800 hover:from-orange-600 hover:to-orange-700',
                },
                {
                  id: 'profesional',
                  title: '4. KOMPETENSI PROFESIONAL',
                  subtitle: '15 Indikator Penguasaan Materi',
                  skor: skorProfesional,
                  level: `Level ${pkg.profesional.selectedLevel}`,
                  color: 'from-orange-800 to-orange-900 hover:from-orange-700 hover:to-orange-800',
                },
                {
                  id: 'penunjang',
                  title: '5. KEGIATAN PENUNJANG',
                  subtitle: 'Ijazah, IGTKI, KKG & Prestasi',
                  skor: penunjangData.totalSkor,
                  level: penunjangData.sebutan,
                  color: 'from-amber-800 to-yellow-800 hover:from-amber-700 hover:to-yellow-700',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-xs transition-all active:scale-[0.99] border border-amber-500/30 text-left`}
                >
                  <div>
                    <div className="font-bold text-sm tracking-wide">{item.title}</div>
                    <div className="text-[11px] text-amber-200/90 font-medium">{item.subtitle}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-extrabold font-mono tabular-nums leading-none">
                      {item.skor.toFixed(2)}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-amber-200 mt-1">
                      {item.level}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Penilaian 360 Derajat & Indeks Kehadiran (Span 4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-b from-rose-900 via-rose-950 to-slate-900 text-white rounded-2xl p-5 border border-rose-800 shadow-md">
            <div className="flex items-center justify-between mb-4 border-b border-rose-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold">
                  360°
                </div>
                <div>
                  <h3 className="font-bold text-base text-rose-200">PENILAIAN 360° & KEHADIRAN</h3>
                  <p className="text-xs text-rose-300/80">Rekan Sejawat, Orang Tua & Presensi</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Rekan Sejawat Card */}
              <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700">
                <button
                  onClick={() => onNavigate('rekan-sejawat')}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase">Survei Rekan</div>
                    <div className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                      PENILAIAN OLEH REKAN
                    </div>
                    <div className="text-[11px] text-slate-400">3 Responden Guru Sejawat</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold font-mono text-emerald-400 tabular-nums">
                      {data360.skorRekan.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-400">Skor Rata-rata</div>
                  </div>
                </button>
                <div className="mt-2 pt-2 border-t border-slate-700/60 flex justify-end">
                  <button
                    onClick={() => onNavigate('form-cetak-guru')}
                    className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-[11px] rounded-md transition-colors"
                  >
                    <Printer className="w-3 h-3" />
                    <span>FORM GURU (Cetak Kosong)</span>
                  </button>
                </div>
              </div>

              {/* Orang Tua Card */}
              <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700">
                <button
                  onClick={() => onNavigate('orang-tua')}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase">Survei Wali Murid</div>
                    <div className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                      PENILAIAN OLEH ORANG TUA
                    </div>
                    <div className="text-[11px] text-slate-400">3 Responden Orang Tua Murid</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold font-mono text-emerald-400 tabular-nums">
                      {data360.skorOrtu.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-400">Skor Rata-rata</div>
                  </div>
                </button>
                <div className="mt-2 pt-2 border-t border-slate-700/60 flex justify-end">
                  <button
                    onClick={() => onNavigate('form-cetak-ortu')}
                    className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-[11px] rounded-md transition-colors"
                  >
                    <Printer className="w-3 h-3" />
                    <span>FORM ORTU (Cetak Kosong)</span>
                  </button>
                </div>
              </div>

              {/* Indeks Kehadiran Card */}
              <button
                onClick={() => onNavigate('kehadiran')}
                className="w-full bg-slate-800/90 hover:bg-slate-750 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                      INDEKS KEHADIRAN
                    </div>
                    <div className="text-[11px] text-slate-400">Rekap 12 Bulan (Jan - Des)</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold font-mono text-emerald-400 tabular-nums">
                    {dataHadir.avgPctHadir.toFixed(2)}%
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    {dataHadir.kategori}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dokumen Resmi, Cetak & Berita Acara (Span 3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-slate-500" />
              <span>Berkas & Laporan</span>
            </h3>

            <div className="space-y-2">
              {[
                {
                  id: 'daftar-guru',
                  label: 'DAFTAR GURU SEKOLAH',
                  sub: `Kelola ${activeSchool.teachers.length} Guru`,
                  icon: Users,
                  badge: 'Direktori',
                  highlight: true,
                },
                {
                  id: 'rekap-kolektif',
                  label: 'REKAP KOLEKTIF SEKOLAH',
                  sub: 'Rekapitulasi Semua Guru',
                  icon: Printer,
                  badge: 'Cetak',
                },
                {
                  id: 'cover',
                  label: 'COVER',
                  sub: 'Sampul Resmi PKG TK',
                  icon: BookOpen,
                  badge: 'Cetak',
                },
                {
                  id: 'identitas-cetak',
                  label: 'IDENTITAS GURU & PENILAI',
                  sub: 'Data Sekolah & Personel',
                  icon: Users,
                  badge: 'Cetak',
                },
                {
                  id: 'berita-acara',
                  label: 'BERITA ACARA',
                  sub: 'Pengesahan Kepala Sekolah',
                  icon: CheckCircle,
                  badge: 'Cetak',
                },
                {
                  id: 'npkg',
                  label: 'NPKG (HASIL AKHIR)',
                  sub: 'Rekapitulasi 7 Komponen',
                  icon: Award,
                  badge: 'Cetak',
                },
                {
                  id: 'cetak-semua',
                  label: 'CETAK SELURUH BERKAS',
                  sub: 'Bundle Lengkap PKG Guru Ini',
                  icon: Printer,
                  badge: 'A4',
                },
              ].map((doc) => {
                const IconComponent = doc.icon;
                return (
                  <button
                    key={doc.id}
                    onClick={() => onNavigate(doc.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      doc.highlight
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 font-semibold'
                        : 'bg-slate-900 text-white hover:bg-slate-800 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent
                        className={`w-4 h-4 ${doc.highlight ? 'text-emerald-700' : 'text-amber-400'}`}
                      />
                      <div>
                        <div className="text-xs font-bold leading-tight">{doc.label}</div>
                        <div
                          className={`text-[10px] ${
                            doc.highlight ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        >
                          {doc.sub}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm uppercase ${
                        doc.highlight
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {doc.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Profile Snapshot Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>Guru Sedang Dinilai</span>
              <span className="text-emerald-700 font-normal">Aktif</span>
            </div>
            <div className="space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Nama:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                  {pkg.dataGuru.namaGuru}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">NIP:</span>
                <span className="font-mono">{pkg.dataGuru.nip || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pangkat/Gol:</span>
                <span>{pkg.dataGuru.pangkatGol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sekolah:</span>
                <span className="truncate max-w-[150px] font-medium text-slate-800">{pkg.dataSekolah.namaSekolah}</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('daftar-guru')}
              className="w-full mt-2 pt-2 border-t border-slate-200 text-indigo-600 hover:text-indigo-800 text-center font-medium flex items-center justify-center gap-1"
            >
              <span>Kelola Seluruh Guru</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Attribution Footer matching page 1 bottom note */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200">
        <div>Dinas Pendidikan dan Kebudayaan Kota Sukabumi · Instrumen Resmi PKG TK</div>
        <div className="font-medium text-slate-400 mt-1 sm:mt-0">Format Sesuai Terlampir (Created by Iqbal Soamole)</div>
      </div>
    </div>
  );
};
