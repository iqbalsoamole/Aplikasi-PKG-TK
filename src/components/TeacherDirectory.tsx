import React, { useState } from 'react';
import { SchoolRecord, TeacherPKGRecord } from '../types/pkg';
import { hitungNPKGAkhir, hitungSkorKompetensi, hitungSkorPenunjang, hitungSkor360, hitungKehadiran } from '../utils/calculations';
import {
  UserPlus,
  Search,
  FileSpreadsheet,
  Award,
  Trash2,
  Copy,
  ExternalLink,
  Printer,
  Building,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface TeacherDirectoryProps {
  school: SchoolRecord;
  activeTeacherId: string;
  onSelectTeacher: (teacherId: string) => void;
  onAddTeacher: (nama: string, nip: string, pangkat: string) => void;
  onDuplicateTeacher: (teacherId: string) => void;
  onDeleteTeacher: (teacherId: string) => void;
  onNavigate: (tabId: string) => void;
}

export const TeacherDirectory: React.FC<TeacherDirectoryProps> = ({
  school,
  activeTeacherId,
  onSelectTeacher,
  onAddTeacher,
  onDuplicateTeacher,
  onDeleteTeacher,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newNama, setNewNama] = useState('');
  const [newNip, setNewNip] = useState('');
  const [newPangkat, setNewPangkat] = useState('Penata Muda / III.a');

  const filteredTeachers = school.teachers.filter(
    (t) =>
      t.guru.namaGuru.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.guru.nip.includes(searchTerm) ||
      t.guru.pangkatGol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compute stats for this school
  const evaluatedScores = school.teachers.map((t) => {
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
    return hitungNPKGAkhir(pkgCompat);
  });

  const avgSchoolNPKG =
    evaluatedScores.length > 0
      ? evaluatedScores.reduce((acc, curr) => acc + curr.nilaiPrestasiKerja, 0) /
        evaluatedScores.length
      : 0;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNama.trim()) {
      alert('Mohon isi nama lengkap guru');
      return;
    }
    onAddTeacher(newNama, newNip, newPangkat);
    setNewNama('');
    setNewNip('');
    setIsAddOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-700">
            <Building className="w-4 h-4" />
            <span>{school.sekolah.namaSekolah}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Daftar Penilaian Guru TK
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Kelola dan nilai seluruh guru di {school.sekolah.namaSekolah} (NPSN: {school.sekolah.npsn})
          </p>
        </div>

        {/* School Summary KPIs */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Jumlah Guru</div>
            <div className="text-xl font-black text-emerald-800 font-mono">
              {school.teachers.length}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">Rata-rata NPKG</div>
            <div className="text-xl font-black text-amber-800 font-mono tabular-nums">
              {avgSchoolNPKG.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => onNavigate('rekap-kolektif')}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Cetak Rekap Kolektif Sekolah</span>
          </button>

          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Tambah Guru Baru</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama guru, NIP, atau pangkat..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="text-slate-500 text-[11px]">
          Menampilkan <span className="font-bold text-slate-800">{filteredTeachers.length}</span> dari{' '}
          {school.teachers.length} guru
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white font-bold">
                <th className="py-3 px-3 w-10 text-center border-r border-slate-700">No</th>
                <th className="py-3 px-4 border-r border-slate-700">Identitas Guru</th>
                <th className="py-3 px-3 border-r border-slate-700 text-center w-28">Pangkat / Gol</th>
                <th className="py-3 px-3 border-r border-slate-700 text-center w-20">Pedagogik</th>
                <th className="py-3 px-3 border-r border-slate-700 text-center w-20">Kepribadian</th>
                <th className="py-3 px-3 border-r border-slate-700 text-center w-20">Sosial</th>
                <th className="py-3 px-3 border-r border-slate-700 text-center w-20">Profesional</th>
                <th className="py-3 px-3 border-r border-slate-700 text-center w-24">NPKG</th>
                <th className="py-3 px-3 border-r border-slate-700 text-center w-28">Sebutan</th>
                <th className="py-3 px-4 text-center w-48">Aksi Penilaian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.map((teacher, idx) => {
                const isActive = teacher.id === activeTeacherId;
                const pkgSingle = {
                  dataSekolah: school.sekolah,
                  dataGuru: teacher.guru,
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
                  paedagogik: teacher.paedagogik,
                  kepribadian: teacher.kepribadian,
                  sosial: teacher.sosial,
                  profesional: teacher.profesional,
                  penunjang: teacher.penunjang,
                  rekanSejawat: teacher.rekanSejawat,
                  orangTua: teacher.orangTua,
                  kehadiran: teacher.kehadiran,
                };

                const npkg = hitungNPKGAkhir(pkgSingle);
                const sPed = hitungSkorKompetensi(teacher.paedagogik);
                const sKep = hitungSkorKompetensi(teacher.kepribadian);
                const sSos = hitungSkorKompetensi(teacher.sosial);
                const sPro = hitungSkorKompetensi(teacher.profesional);

                return (
                  <tr
                    key={teacher.id}
                    className={`transition-colors ${
                      isActive ? 'bg-amber-50/70 ring-1 ring-inset ring-amber-400' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3 text-center font-bold text-slate-500 font-mono border-r border-slate-200">
                      {idx + 1}
                    </td>

                    <td className="py-3 px-4 border-r border-slate-200">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{teacher.guru.namaGuru}</span>
                            {isActive && (
                              <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 font-bold text-[9px] rounded-xs uppercase">
                                Aktif Dinilai
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                            NIP: {teacher.guru.nip || '-'} · {teacher.guru.jabatan}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center border-r border-slate-200 text-slate-700">
                      {teacher.guru.pangkatGol}
                    </td>

                    <td className="py-3 px-2 text-center font-mono font-medium border-r border-slate-200 tabular-nums">
                      {sPed.toFixed(0)}
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-medium border-r border-slate-200 tabular-nums">
                      {sKep.toFixed(0)}
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-medium border-r border-slate-200 tabular-nums">
                      {sSos.toFixed(0)}
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-medium border-r border-slate-200 tabular-nums">
                      {sPro.toFixed(0)}
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-black text-amber-700 border-r border-slate-200 tabular-nums text-sm">
                      {npkg.nilaiPrestasiKerja.toFixed(2)}
                    </td>

                    <td className="py-3 px-3 text-center border-r border-slate-200">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          npkg.sebutan === 'SANGAT BAIK'
                            ? 'bg-emerald-100 text-emerald-800'
                            : npkg.sebutan === 'BAIK'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {npkg.sebutan}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            onSelectTeacher(teacher.id);
                            onNavigate('menu');
                          }}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-bold text-[11px] shadow-2xs transition-colors"
                          title="Buka Instrumen Penilaian Guru Ini"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Buka PKG</span>
                        </button>

                        <button
                          onClick={() => onDuplicateTeacher(teacher.id)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
                          title="Duplikasi Data Guru Ini"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {school.teachers.length > 1 && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus data penilaian guru ${teacher.guru.namaGuru}?`)) {
                                onDeleteTeacher(teacher.id);
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md border border-rose-200 transition-colors"
                            title="Hapus Guru"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Teacher */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-600" />
                <span>Tambah Guru TK Yang Dinilai</span>
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama Lengkap Guru & Gelar
                </label>
                <input
                  type="text"
                  required
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                  placeholder="misal: Siti Maryam, S.Pd"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  NIP (Kosongkan jika Non-PNS)
                </label>
                <input
                  type="text"
                  value={newNip}
                  onChange={(e) => setNewNip(e.target.value)}
                  placeholder="198901012015012002 atau -"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Pangkat / Golongan
                </label>
                <input
                  type="text"
                  value={newPangkat}
                  onChange={(e) => setNewPangkat(e.target.value)}
                  placeholder="misal: Penata Muda / III.a"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
                >
                  Simpan & Tambahkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
