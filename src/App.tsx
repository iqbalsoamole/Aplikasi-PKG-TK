import React, { useState, useEffect, useRef } from 'react';
import {
  AppDatabase,
  SchoolRecord,
  TeacherPKGRecord,
  PKGState,
  KompetensiSection,
  DataSekolah,
  UserRole,
} from './types/pkg';
import {
  INITIAL_DATABASE,
  createNewTeacherRecord,
  createNewSchoolRecord,
} from './data/initialData';
import { Header } from './components/Header';
import { NavigationDashboard } from './components/NavigationDashboard';
import { AdminPengawasDashboard } from './components/AdminPengawasDashboard';
import { RoleExplainerModal } from './components/RoleExplainerModal';
import { TeacherDirectory } from './components/TeacherDirectory';
import { RekapKolektifCetak } from './components/RekapKolektifCetak';
import { SchoolManagerModal } from './components/SchoolManagerModal';
import { DataGuruForm } from './components/DataGuruForm';
import { KompetensiForm } from './components/KompetensiForm';
import { KegiatanPenunjangForm } from './components/KegiatanPenunjangForm';
import { Penilaian360Form } from './components/Penilaian360Form';
import { KehadiranForm } from './components/KehadiranForm';
import { NPKGSummary } from './components/NPKGSummary';
import { BeritaAcara } from './components/BeritaAcara';
import { PrintViews } from './components/PrintViews';
import { PetunjukModal } from './components/PetunjukModal';
import { PublishGuideModal } from './components/PublishGuideModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AdminAccessModal } from './components/AdminAccessModal';
import { ChangePinModal } from './components/ChangePinModal';
import { isAdminSessionUnlocked, setAdminSessionUnlocked } from './utils/adminSecurity';

const STORAGE_KEY = 'pkg_tk_sukabumi_multischool_v2';

export default function App() {
  const [db, setDb] = useState<AppDatabase>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.schools && parsed.schools.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load saved PKG database:', e);
    }
    return INITIAL_DATABASE;
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return isAdminSessionUnlocked();
  });

  const [role, setRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('pkg_active_role');
      if (saved === 'pengawas') {
        if (isAdminSessionUnlocked()) {
          return 'pengawas';
        }
        return 'kepala_sekolah';
      }
      if (saved === 'kepala_sekolah') {
        return 'kepala_sekolah';
      }
    } catch (e) {}
    return 'kepala_sekolah';
  });

  const [currentTab, setCurrentTab] = useState<string>('menu');
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isRoleExplainerOpen, setIsRoleExplainerOpen] = useState<boolean>(false);
  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState<boolean>(false);
  const [isSchoolManagerOpen, setIsSchoolManagerOpen] = useState<boolean>(false);
  const [isAdminAccessModalOpen, setIsAdminAccessModalOpen] = useState<boolean>(false);
  const [isChangePinModalOpen, setIsChangePinModalOpen] = useState<boolean>(false);
  const [savedIndicator, setSavedIndicator] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save role to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pkg_active_role', role);
    } catch (e) {}
  }, [role]);

  // Auto-save database to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      setSavedIndicator(true);
      const timer = setTimeout(() => setSavedIndicator(false), 1500);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error('Failed to auto-save PKG database:', e);
    }
  }, [db]);

  // Role & Admin Security Handlers
  const handleRequestRole = (targetRole: UserRole) => {
    if (targetRole === 'pengawas') {
      if (isAdminUnlocked) {
        setRole('pengawas');
        if (['paedagogik', 'kepribadian', 'sosial', 'profesional', 'penunjang', 'rekan-sejawat', 'orang-tua', 'kehadiran'].includes(currentTab)) {
          setCurrentTab('menu');
        }
      } else {
        setIsAdminAccessModalOpen(true);
      }
    } else {
      setRole('kepala_sekolah');
      if (['rekap-kolektif'].includes(currentTab)) {
        setCurrentTab('menu');
      }
    }
  };

  const handleAdminUnlockSuccess = () => {
    setIsAdminUnlocked(true);
    setAdminSessionUnlocked(true);
    setIsAdminAccessModalOpen(false);
    setRole('pengawas');
    if (['paedagogik', 'kepribadian', 'sosial', 'profesional', 'penunjang', 'rekan-sejawat', 'orang-tua', 'kehadiran'].includes(currentTab)) {
      setCurrentTab('menu');
    }
  };

  const handleLockAdminMode = () => {
    setIsAdminUnlocked(false);
    setAdminSessionUnlocked(false);
    setRole('kepala_sekolah');
    setCurrentTab('menu');
  };

  // Active School and Active Teacher Resolution
  const activeSchool: SchoolRecord =
    db.schools.find((s) => s.id === db.activeSchoolId) || db.schools[0];

  const activeTeacher: TeacherPKGRecord =
    activeSchool.teachers.find((t) => t.id === db.activeTeacherId) ||
    activeSchool.teachers[0];

  // School actions
  const handleSelectSchool = (schoolId: string) => {
    const targetSchool = db.schools.find((s) => s.id === schoolId);
    if (!targetSchool) return;
    setDb((prev) => ({
      ...prev,
      activeSchoolId: schoolId,
      activeTeacherId: targetSchool.teachers[0]?.id || '',
    }));
  };

  const handleAddSchool = (newSekolah: DataSekolah) => {
    const defaultTeacher = createNewTeacherRecord(newSekolah.id, 'Guru Contoh, S.Pd');
    const newSchool: SchoolRecord = {
      id: newSekolah.id,
      sekolah: newSekolah,
      teachers: [defaultTeacher],
    };
    setDb((prev) => ({
      ...prev,
      schools: [...prev.schools, newSchool],
      activeSchoolId: newSchool.id,
      activeTeacherId: defaultTeacher.id,
    }));
  };

  const handleUpdateSchool = (schoolId: string, updated: Partial<DataSekolah>) => {
    setDb((prev) => ({
      ...prev,
      schools: prev.schools.map((s) => {
        if (s.id === schoolId) {
          return {
            ...s,
            sekolah: { ...s.sekolah, ...updated },
          };
        }
        return s;
      }),
    }));
  };

  const handleDeleteSchool = (schoolId: string) => {
    if (db.schools.length <= 1) {
      alert('Tidak dapat menghapus satu-satunya sekolah.');
      return;
    }
    const remaining = db.schools.filter((s) => s.id !== schoolId);
    setDb({
      schools: remaining,
      activeSchoolId: remaining[0].id,
      activeTeacherId: remaining[0].teachers[0]?.id || '',
    });
  };

  // Teacher actions
  const handleSelectTeacher = (teacherId: string) => {
    setDb((prev) => ({
      ...prev,
      activeTeacherId: teacherId,
    }));
  };

  const handleAddTeacher = (nama: string, nip: string, pangkat: string) => {
    const newTeacher = createNewTeacherRecord(activeSchool.id, nama, nip, pangkat);
    setDb((prev) => ({
      ...prev,
      schools: prev.schools.map((s) => {
        if (s.id === activeSchool.id) {
          return {
            ...s,
            teachers: [...s.teachers, newTeacher],
          };
        }
        return s;
      }),
      activeTeacherId: newTeacher.id,
    }));
  };

  const handleDuplicateTeacher = (teacherId: string) => {
    const target = activeSchool.teachers.find((t) => t.id === teacherId);
    if (!target) return;
    const duplicated: TeacherPKGRecord = JSON.parse(JSON.stringify(target));
    const newId = 'guru_' + Date.now();
    duplicated.id = newId;
    duplicated.guru.id = newId;
    duplicated.guru.namaGuru = `${target.guru.namaGuru} (Salinan)`;
    duplicated.updatedAt = new Date().toISOString();

    setDb((prev) => ({
      ...prev,
      schools: prev.schools.map((s) => {
        if (s.id === activeSchool.id) {
          return {
            ...s,
            teachers: [...s.teachers, duplicated],
          };
        }
        return s;
      }),
      activeTeacherId: duplicated.id,
    }));
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (activeSchool.teachers.length <= 1) {
      alert('Sekolah harus memiliki minimal satu guru.');
      return;
    }
    const remaining = activeSchool.teachers.filter((t) => t.id !== teacherId);
    setDb((prev) => ({
      ...prev,
      schools: prev.schools.map((s) => {
        if (s.id === activeSchool.id) {
          return {
            ...s,
            teachers: remaining,
          };
        }
        return s;
      }),
      activeTeacherId: remaining[0].id,
    }));
  };

  // Active Teacher Evaluation updater
  const handleUpdateActiveTeacher = (updatedFields: Partial<TeacherPKGRecord>) => {
    setDb((prev) => ({
      ...prev,
      schools: prev.schools.map((s) => {
        if (s.id === activeSchool.id) {
          return {
            ...s,
            teachers: s.teachers.map((t) => {
              if (t.id === activeTeacher.id) {
                return {
                  ...t,
                  ...updatedFields,
                  updatedAt: new Date().toISOString(),
                };
              }
              return t;
            }),
          };
        }
        return s;
      }),
    }));
  };

  // Adapting single-record PKGState view for the active evaluation
  const currentPkg: PKGState = {
    dataSekolah: {
      namaSekolah: activeSchool.sekolah.namaSekolah,
      npsn: activeSchool.sekolah.npsn,
      teleponFax: activeSchool.sekolah.teleponFax,
      alamat: activeSchool.sekolah.alamat,
      kelurahan: activeSchool.sekolah.kelurahan,
      kecamatan: activeSchool.sekolah.kecamatan,
      kota: activeSchool.sekolah.kota,
      provinsi: activeSchool.sekolah.provinsi,
    },
    dataGuru: activeTeacher.guru,
    dataKepalaSekolah: {
      namaKepalaSekolah: activeSchool.sekolah.namaKepalaSekolah,
      nip: activeSchool.sekolah.nipKepalaSekolah,
      nuptk: activeSchool.sekolah.nuptkKepalaSekolah,
      pangkatGol: activeSchool.sekolah.pangkatGolKepalaSekolah,
      jabatan: activeSchool.sekolah.jabatanKepalaSekolah,
      tahunPenilaian: activeSchool.sekolah.tahunPenilaian,
      periodePenilaian: activeSchool.sekolah.periodePenilaian,
      tanggalPenilaian: activeSchool.sekolah.tanggalPenilaian,
    },
    dataPengawas: {
      namaPengawas: activeSchool.sekolah.namaPengawas,
      nip: activeSchool.sekolah.nipPengawas,
    },
    paedagogik: activeTeacher.paedagogik,
    kepribadian: activeTeacher.kepribadian,
    sosial: activeTeacher.sosial,
    profesional: activeTeacher.profesional,
    penunjang: activeTeacher.penunjang,
    rekanSejawat: activeTeacher.rekanSejawat,
    orangTua: activeTeacher.orangTua,
    kehadiran: activeTeacher.kehadiran,
  };

  const handleUpdatePkgCompat = (updated: Partial<PKGState>) => {
    if (updated.dataSekolah || updated.dataKepalaSekolah || updated.dataPengawas) {
      handleUpdateSchool(activeSchool.id, {
        ...(updated.dataSekolah ? updated.dataSekolah : {}),
        ...(updated.dataKepalaSekolah
          ? {
              namaKepalaSekolah: updated.dataKepalaSekolah.namaKepalaSekolah,
              nipKepalaSekolah: updated.dataKepalaSekolah.nip,
              nuptkKepalaSekolah: updated.dataKepalaSekolah.nuptk,
              pangkatGolKepalaSekolah: updated.dataKepalaSekolah.pangkatGol,
              jabatanKepalaSekolah: updated.dataKepalaSekolah.jabatan,
              tahunPenilaian: updated.dataKepalaSekolah.tahunPenilaian,
              periodePenilaian: updated.dataKepalaSekolah.periodePenilaian,
              tanggalPenilaian: updated.dataKepalaSekolah.tanggalPenilaian,
            }
          : {}),
        ...(updated.dataPengawas
          ? {
              namaPengawas: updated.dataPengawas.namaPengawas,
              nipPengawas: updated.dataPengawas.nip,
            }
          : {}),
      });
    }

    if (updated.dataGuru) {
      handleUpdateActiveTeacher({ guru: updated.dataGuru });
    }
    if (updated.penunjang) {
      handleUpdateActiveTeacher({ penunjang: updated.penunjang });
    }
    if (updated.rekanSejawat) {
      handleUpdateActiveTeacher({ rekanSejawat: updated.rekanSejawat });
    }
    if (updated.orangTua) {
      handleUpdateActiveTeacher({ orangTua: updated.orangTua });
    }
    if (updated.kehadiran) {
      handleUpdateActiveTeacher({ kehadiran: updated.kehadiran });
    }
  };

  const handleKompetensiUpdate = (
    key: 'paedagogik' | 'kepribadian' | 'sosial' | 'profesional',
    updated: KompetensiSection
  ) => {
    handleUpdateActiveTeacher({
      [key]: updated,
    });
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Apakah Anda yakin ingin mengatur ulang basis data ke contoh awal Kota Sukabumi (3 sekolah & beberapa guru)?'
      )
    ) {
      setDb(INITIAL_DATABASE);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleExportData = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const fileName = `PKG_TK_KOTA_SUKABUMI_DATABASE_${new Date().toISOString().slice(0, 10)}.json`;
    downloadAnchor.setAttribute('download', fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.schools && Array.isArray(parsed.schools) && parsed.schools.length > 0) {
          setDb(parsed);
          alert('Basis data multi-sekolah berhasil diimpor!');
        } else if (parsed.dataSekolah && parsed.paedagogik) {
          // Single-school legacy import
          const convertedSchool = createNewSchoolRecord(
            parsed.dataSekolah.namaSekolah,
            parsed.dataSekolah.npsn
          );
          convertedSchool.sekolah = {
            ...convertedSchool.sekolah,
            ...parsed.dataSekolah,
            namaKepalaSekolah: parsed.dataKepalaSekolah?.namaKepalaSekolah || '',
            nipKepalaSekolah: parsed.dataKepalaSekolah?.nip || '',
          };
          if (parsed.dataGuru) {
            convertedSchool.teachers[0].guru = parsed.dataGuru;
            convertedSchool.teachers[0].paedagogik = parsed.paedagogik;
            convertedSchool.teachers[0].kepribadian = parsed.kepribadian;
            convertedSchool.teachers[0].sosial = parsed.sosial;
            convertedSchool.teachers[0].profesional = parsed.profesional;
            convertedSchool.teachers[0].penunjang = parsed.penunjang;
            convertedSchool.teachers[0].rekanSejawat = parsed.rekanSejawat;
            convertedSchool.teachers[0].orangTua = parsed.orangTua;
            convertedSchool.teachers[0].kehadiran = parsed.kehadiran;
          }
          setDb((prev) => ({
            ...prev,
            schools: [...prev.schools, convertedSchool],
            activeSchoolId: convertedSchool.id,
            activeTeacherId: convertedSchool.teachers[0].id,
          }));
          alert('Berkas PKG sekolah berhasil ditambahkan ke database!');
        } else {
          alert('Format berkas JSON tidak sesuai.');
        }
      } catch (err) {
        alert('Gagal memproses berkas JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Global Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
        onResetData={handleResetData}
        onExportData={handleExportData}
        onImportData={handleImportClick}
        savedIndicator={savedIndicator}
        schools={db.schools}
        activeSchool={activeSchool}
        activeTeacher={activeTeacher}
        onSelectSchool={handleSelectSchool}
        onSelectTeacher={handleSelectTeacher}
        onOpenSchoolManager={() => setIsSchoolManagerOpen(true)}
        role={role}
        isAdminUnlocked={isAdminUnlocked}
        onSelectRole={handleRequestRole}
        onLockAdmin={handleLockAdminMode}
        onOpenRoleExplainer={() => setIsRoleExplainerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentTab === 'menu' && (
          role === 'pengawas' ? (
            <AdminPengawasDashboard
              schools={db.schools}
              activeSchoolId={activeSchool.id}
              onSelectSchool={handleSelectSchool}
              onOpenSchoolManager={() => setIsSchoolManagerOpen(true)}
              onOpenRoleExplainer={() => setIsRoleExplainerOpen(true)}
              onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
              onLockAdmin={handleLockAdminMode}
              onOpenChangePin={() => setIsChangePinModalOpen(true)}
              onSwitchToKepalaSekolah={(schoolId) => {
                if (schoolId) handleSelectSchool(schoolId);
                setRole('kepala_sekolah');
                setCurrentTab('menu');
              }}
              onNavigate={setCurrentTab}
              onExportData={handleExportData}
              onImportData={handleImportClick}
            />
          ) : (
            <NavigationDashboard
              pkg={currentPkg}
              activeSchool={activeSchool}
              activeTeacher={activeTeacher}
              onNavigate={setCurrentTab}
              onOpenHelp={() => setIsHelpOpen(true)}
              onOpenSchoolManager={() => setIsSchoolManagerOpen(true)}
              onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
              onSwitchToPengawas={() => handleRequestRole('pengawas')}
              onOpenRoleExplainer={() => setIsRoleExplainerOpen(true)}
            />
          )
        )}

        {currentTab === 'daftar-guru' && (
          <TeacherDirectory
            school={activeSchool}
            activeTeacherId={activeTeacher.id}
            onSelectTeacher={handleSelectTeacher}
            onAddTeacher={handleAddTeacher}
            onDuplicateTeacher={handleDuplicateTeacher}
            onDeleteTeacher={handleDeleteTeacher}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'rekap-kolektif' && (
          <RekapKolektifCetak
            school={activeSchool}
            onNavigate={setCurrentTab}
            onPrint={handlePrint}
          />
        )}

        {currentTab === 'data-guru' && (
          <DataGuruForm
            pkg={currentPkg}
            onChange={handleUpdatePkgCompat}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'paedagogik' && (
          <KompetensiForm
            section={activeTeacher.paedagogik}
            onUpdate={(u) => handleKompetensiUpdate('paedagogik', u)}
            onNavigate={setCurrentTab}
            prevTab="data-guru"
            nextTab="kepribadian"
          />
        )}

        {currentTab === 'kepribadian' && (
          <KompetensiForm
            section={activeTeacher.kepribadian}
            onUpdate={(u) => handleKompetensiUpdate('kepribadian', u)}
            onNavigate={setCurrentTab}
            prevTab="paedagogik"
            nextTab="sosial"
          />
        )}

        {currentTab === 'sosial' && (
          <KompetensiForm
            section={activeTeacher.sosial}
            onUpdate={(u) => handleKompetensiUpdate('sosial', u)}
            onNavigate={setCurrentTab}
            prevTab="kepribadian"
            nextTab="profesional"
          />
        )}

        {currentTab === 'profesional' && (
          <KompetensiForm
            section={activeTeacher.profesional}
            onUpdate={(u) => handleKompetensiUpdate('profesional', u)}
            onNavigate={setCurrentTab}
            prevTab="sosial"
            nextTab="penunjang"
          />
        )}

        {currentTab === 'penunjang' && (
          <KegiatanPenunjangForm
            penunjang={activeTeacher.penunjang}
            onChange={(penunjang) => handleUpdateActiveTeacher({ penunjang })}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'rekan-sejawat' && (
          <Penilaian360Form
            type="rekan"
            pkg={currentPkg}
            onChange={handleUpdatePkgCompat}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'orang-tua' && (
          <Penilaian360Form
            type="ortu"
            pkg={currentPkg}
            onChange={handleUpdatePkgCompat}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'kehadiran' && (
          <KehadiranForm
            kehadiran={activeTeacher.kehadiran}
            guru={activeTeacher.guru}
            sekolah={activeSchool.sekolah}
            onChange={(kehadiran) => handleUpdateActiveTeacher({ kehadiran })}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'npkg' && (
          <NPKGSummary
            pkg={currentPkg}
            onNavigate={setCurrentTab}
            onPrint={handlePrint}
          />
        )}

        {currentTab === 'berita-acara' && (
          <BeritaAcara
            pkg={currentPkg}
            onNavigate={setCurrentTab}
            onPrint={handlePrint}
          />
        )}

        {['cover', 'identitas-cetak', 'form-cetak-guru', 'form-cetak-ortu', 'cetak-semua'].includes(currentTab) && (
          <PrintViews
            documentType={currentTab as any}
            pkg={currentPkg}
            onNavigate={setCurrentTab}
            onPrint={handlePrint}
          />
        )}
      </main>

      {/* School Manager Modal */}
      <SchoolManagerModal
        isOpen={isSchoolManagerOpen}
        onClose={() => setIsSchoolManagerOpen(false)}
        schools={db.schools}
        activeSchoolId={activeSchool.id}
        onSelectSchool={handleSelectSchool}
        onAddSchool={handleAddSchool}
        onUpdateSchool={handleUpdateSchool}
        onDeleteSchool={handleDeleteSchool}
      />

      {/* Petunjuk Modal */}
      <PetunjukModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Role Explainer Modal (Admin vs Kepala Sekolah) */}
      <RoleExplainerModal
        isOpen={isRoleExplainerOpen}
        onClose={() => setIsRoleExplainerOpen(false)}
        currentRole={role}
        onSelectRole={(newRole) => {
          handleRequestRole(newRole);
        }}
      />

      {/* Admin Access Code PIN Verification Modal */}
      <AdminAccessModal
        isOpen={isAdminAccessModalOpen}
        onClose={() => setIsAdminAccessModalOpen(false)}
        onSuccess={handleAdminUnlockSuccess}
      />

      {/* Change Admin PIN Modal */}
      <ChangePinModal
        isOpen={isChangePinModalOpen}
        onClose={() => setIsChangePinModalOpen(false)}
      />

      {/* Offline Connectivity Indicator */}
      <OfflineIndicator />

      {/* Publish & Multi-Device Guide Modal */}
      <PublishGuideModal
        isOpen={isPublishGuideOpen}
        onClose={() => setIsPublishGuideOpen(false)}
      />
    </div>
  );
}
