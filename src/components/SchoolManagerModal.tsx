import React, { useState } from 'react';
import { SchoolRecord, DataSekolah } from '../types/pkg';
import { Building, Plus, Trash2, Edit3, Check, CheckCircle2, X } from 'lucide-react';

interface SchoolManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: SchoolRecord[];
  activeSchoolId: string;
  onSelectSchool: (schoolId: string) => void;
  onAddSchool: (sekolah: DataSekolah) => void;
  onUpdateSchool: (schoolId: string, updated: Partial<DataSekolah>) => void;
  onDeleteSchool: (schoolId: string) => void;
}

export const SchoolManagerModal: React.FC<SchoolManagerModalProps> = ({
  isOpen,
  onClose,
  schools,
  activeSchoolId,
  onSelectSchool,
  onAddSchool,
  onUpdateSchool,
  onDeleteSchool,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingSchoolId, setEditingSchoolId] = useState<string | null>(null);

  // New school form state
  const [namaSekolah, setNamaSekolah] = useState('');
  const [npsn, setNpsn] = useState('');
  const [alamat, setAlamat] = useState('');
  const [namaKepsek, setNamaKepsek] = useState('');
  const [nipKepsek, setNipKepsek] = useState('');
  const [namaPengawas, setNamaPengawas] = useState('Mulyanah, M.Pd');
  const [nipPengawas, setNipPengawas] = useState('196711222000122001');

  if (!isOpen) return null;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaSekolah.trim()) {
      alert('Nama Sekolah tidak boleh kosong');
      return;
    }

    const newId = 'sch_' + Date.now();
    const newSekolah: DataSekolah = {
      id: newId,
      namaSekolah,
      npsn: npsn || '20259999',
      teleponFax: '(0266) 221766',
      alamat: alamat || 'Jl. Pelabuhan II, Kota Sukabumi',
      kelurahan: 'Cikondang',
      kecamatan: 'Citamiang',
      kota: 'Sukabumi',
      provinsi: 'Jawa Barat',
      namaKepalaSekolah: namaKepsek || 'Kepala Sekolah, S.Pd',
      nipKepalaSekolah: nipKepsek || '-',
      nuptkKepalaSekolah: '',
      pangkatGolKepalaSekolah: 'Pembina / IV.a',
      jabatanKepalaSekolah: 'Kepala Sekolah',
      namaPengawas: namaPengawas || 'Mulyanah, M.Pd',
      nipPengawas: nipPengawas || '196711222000122001',
      tahunPenilaian: '2025',
      periodePenilaian: '02 Januari s.d 31 Desember 2025',
      tanggalPenilaian: '18 Mei 2025',
    };

    onAddSchool(newSekolah);
    setIsAdding(false);
    setNamaSekolah('');
    setNpsn('');
    setAlamat('');
    setNamaKepsek('');
    setNipKepsek('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Kelola Daftar Sekolah TK</h3>
              <p className="text-xs text-slate-400">
                Gunakan aplikasi ini untuk berbagai sekolah TK binaan di Kota Sukabumi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">
              Total {schools.length} Sekolah Terdaftar
            </span>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Sekolah Baru</span>
              </button>
            )}
          </div>

          {/* Form Add New School */}
          {isAdding && (
            <form onSubmit={handleAddSubmit} className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="font-bold text-emerald-950 text-sm">Form Pendaftaran Sekolah Baru</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Sekolah TK</label>
                  <input
                    type="text"
                    required
                    value={namaSekolah}
                    onChange={(e) => setNamaSekolah(e.target.value)}
                    placeholder="misal: TK Negeri Pembina II"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NPSN</label>
                  <input
                    type="text"
                    value={npsn}
                    onChange={(e) => setNpsn(e.target.value)}
                    placeholder="8 digit NPSN"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alamat Sekolah</label>
                <input
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Jl. ..."
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Kepala Sekolah</label>
                  <input
                    type="text"
                    value={namaKepsek}
                    onChange={(e) => setNamaKepsek(e.target.value)}
                    placeholder="Nama Kepala Sekolah & Gelar"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIP Kepala Sekolah</label>
                  <input
                    type="text"
                    value={nipKepsek}
                    onChange={(e) => setNipKepsek(e.target.value)}
                    placeholder="NIP atau -"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-emerald-200">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3.5 py-1.5 font-semibold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
                >
                  Simpan Sekolah
                </button>
              </div>
            </form>
          )}

          {/* School List */}
          <div className="space-y-2.5">
            {schools.map((s) => {
              const isSelected = s.id === activeSchoolId;
              return (
                <div
                  key={s.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{s.sekolah.namaSekolah}</h4>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Sedang Aktif
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      NPSN: <span className="font-mono">{s.sekolah.npsn}</span> · Kepala Sekolah:{' '}
                      <span className="font-semibold text-slate-700">
                        {s.sekolah.namaKepalaSekolah}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Jumlah Guru: <span className="font-bold text-emerald-700">{s.teachers.length} orang</span> · Pengawas: {s.sekolah.namaPengawas}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!isSelected && (
                      <button
                        onClick={() => {
                          onSelectSchool(s.id);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors"
                      >
                        Pilih Sekolah Ini
                      </button>
                    )}

                    {schools.length > 1 && (
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Hapus sekolah ${s.sekolah.namaSekolah} beserta seluruh data ${s.teachers.length} guru di dalamnya?`
                            )
                          ) {
                            onDeleteSchool(s.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
                        title="Hapus Sekolah"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
