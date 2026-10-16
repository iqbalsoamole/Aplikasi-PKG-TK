import React from 'react';
import { PKGState } from '../types/pkg';
import { Save, ArrowLeft, ArrowRight, Building, User, Award, ShieldCheck } from 'lucide-react';

interface DataGuruFormProps {
  pkg: PKGState;
  onChange: (updated: Partial<PKGState>) => void;
  onNavigate: (tabId: string) => void;
}

export const DataGuruForm: React.FC<DataGuruFormProps> = ({ pkg, onChange, onNavigate }) => {
  const handleSekolahChange = (field: keyof PKGState['dataSekolah'], value: string) => {
    onChange({
      dataSekolah: { ...pkg.dataSekolah, [field]: value },
    });
  };

  const handleGuruChange = (field: keyof PKGState['dataGuru'], value: string) => {
    onChange({
      dataGuru: { ...pkg.dataGuru, [field]: value },
    });
  };

  const handleKepsekChange = (field: keyof PKGState['dataKepalaSekolah'], value: string) => {
    onChange({
      dataKepalaSekolah: { ...pkg.dataKepalaSekolah, [field]: value },
    });
  };

  const handlePengawasChange = (field: keyof PKGState['dataPengawas'], value: string) => {
    onChange({
      dataPengawas: { ...pkg.dataPengawas, [field]: value },
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Bagian 0
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            0. Data Guru dan Penilai
          </h2>
          <p className="text-xs text-slate-500">
            Identitas sekolah, data guru yang dinilai, kepala sekolah penilai, dan pengawas pembina
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('menu')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Menu</span>
          </button>
          <button
            onClick={() => onNavigate('paedagogik')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <span>Lanjut: Pedagogik</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* A. Data Sekolah */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base border-b border-slate-100 pb-2">
            <Building className="w-5 h-5 text-emerald-600" />
            <h3>A. Data Sekolah</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Sekolah TK</label>
              <input
                type="text"
                value={pkg.dataSekolah.namaSekolah}
                onChange={(e) => handleSekolahChange('namaSekolah', e.target.value)}
                placeholder="misal: TK Pembina Kota Sukabumi"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">NPSN</label>
                <input
                  type="text"
                  value={pkg.dataSekolah.npsn}
                  onChange={(e) => handleSekolahChange('npsn', e.target.value)}
                  placeholder="NPSN Sekolah"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Telepon / Fax</label>
                <input
                  type="text"
                  value={pkg.dataSekolah.teleponFax}
                  onChange={(e) => handleSekolahChange('teleponFax', e.target.value)}
                  placeholder="(0266) ..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Alamat Lengkap</label>
              <input
                type="text"
                value={pkg.dataSekolah.alamat}
                onChange={(e) => handleSekolahChange('alamat', e.target.value)}
                placeholder="Jl. ..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kelurahan</label>
                <input
                  type="text"
                  value={pkg.dataSekolah.kelurahan}
                  onChange={(e) => handleSekolahChange('kelurahan', e.target.value)}
                  placeholder="Kelurahan"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kecamatan</label>
                <input
                  type="text"
                  value={pkg.dataSekolah.kecamatan}
                  onChange={(e) => handleSekolahChange('kecamatan', e.target.value)}
                  placeholder="Kecamatan"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kota / Kabupaten</label>
                <input
                  type="text"
                  value={pkg.dataSekolah.kota}
                  onChange={(e) => handleSekolahChange('kota', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Provinsi</label>
                <input
                  type="text"
                  value={pkg.dataSekolah.provinsi}
                  onChange={(e) => handleSekolahChange('provinsi', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* B. Data Guru Yang Dinilai */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base border-b border-slate-100 pb-2">
            <User className="w-5 h-5 text-indigo-600" />
            <h3>B. Data Guru Yang Dinilai</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
              <input
                type="text"
                value={pkg.dataGuru.namaGuru}
                onChange={(e) => handleGuruChange('namaGuru', e.target.value)}
                placeholder="Nama guru yang dinilai"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-medium outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">NIP</label>
                <input
                  type="text"
                  value={pkg.dataGuru.nip}
                  onChange={(e) => handleGuruChange('nip', e.target.value)}
                  placeholder="NIP guru (atau - jika non-PNS)"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">NUPTK</label>
                <input
                  type="text"
                  value={pkg.dataGuru.nuptk}
                  onChange={(e) => handleGuruChange('nuptk', e.target.value)}
                  placeholder="NUPTK 16 digit"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tempat, Tgl Lahir</label>
                <input
                  type="text"
                  value={pkg.dataGuru.tempatTglLahir}
                  onChange={(e) => handleGuruChange('tempatTglLahir', e.target.value)}
                  placeholder="Sukabumi, 12 Juni 1985"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jenis Kelamin</label>
                <select
                  value={pkg.dataGuru.jenisKelamin}
                  onChange={(e) =>
                    handleGuruChange('jenisKelamin', e.target.value as 'Laki-laki' | 'Perempuan')
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                >
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki">Laki-laki</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pangkat / Golongan</label>
                <input
                  type="text"
                  value={pkg.dataGuru.pangkatGol}
                  onChange={(e) => handleGuruChange('pangkatGol', e.target.value)}
                  placeholder="misal: Penata Tk. 1 / IV.a"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jabatan</label>
                <input
                  type="text"
                  value={pkg.dataGuru.jabatan}
                  onChange={(e) => handleGuruChange('jabatan', e.target.value)}
                  placeholder="Guru Kelas TK"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pendidikan Terakhir</label>
              <input
                type="text"
                value={pkg.dataGuru.pendTerakhir}
                onChange={(e) => handleGuruChange('pendTerakhir', e.target.value)}
                placeholder="misal: S1 / D4 PAUD"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* C. Data Kepala Sekolah */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base border-b border-slate-100 pb-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3>C. Data Kepala Sekolah (Penilai)</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Kepala Sekolah & Gelar</label>
              <input
                type="text"
                value={pkg.dataKepalaSekolah.namaKepalaSekolah}
                onChange={(e) => handleKepsekChange('namaKepalaSekolah', e.target.value)}
                placeholder="Nama Kepala Sekolah"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">NIP Kepala Sekolah</label>
                <input
                  type="text"
                  value={pkg.dataKepalaSekolah.nip}
                  onChange={(e) => handleKepsekChange('nip', e.target.value)}
                  placeholder="NIP"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-mono outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">NUPTK</label>
                <input
                  type="text"
                  value={pkg.dataKepalaSekolah.nuptk}
                  onChange={(e) => handleKepsekChange('nuptk', e.target.value)}
                  placeholder="NUPTK"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-mono outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pangkat / Golongan</label>
                <input
                  type="text"
                  value={pkg.dataKepalaSekolah.pangkatGol}
                  onChange={(e) => handleKepsekChange('pangkatGol', e.target.value)}
                  placeholder="Pembina / IV.a"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jabatan</label>
                <input
                  type="text"
                  value={pkg.dataKepalaSekolah.jabatan}
                  onChange={(e) => handleKepsekChange('jabatan', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tahun Penilaian</label>
                <input
                  type="text"
                  value={pkg.dataKepalaSekolah.tahunPenilaian}
                  onChange={(e) => handleKepsekChange('tahunPenilaian', e.target.value)}
                  placeholder="2025"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-mono outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Periode Penilaian</label>
                <input
                  type="text"
                  value={pkg.dataKepalaSekolah.periodePenilaian}
                  onChange={(e) => handleKepsekChange('periodePenilaian', e.target.value)}
                  placeholder="02 Januari s.d 31 Desember 2025"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tanggal Surat / Penilaian</label>
              <input
                type="text"
                value={pkg.dataKepalaSekolah.tanggalPenilaian}
                onChange={(e) => handleKepsekChange('tanggalPenilaian', e.target.value)}
                placeholder="misal: 18 Mei 2025"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* D. Data Pengawas Sekolah */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base border-b border-slate-100 pb-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            <h3>D. Data Pengawas Sekolah (Pengawas Pembina)</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Pengawas Sekolah & Gelar</label>
              <input
                type="text"
                value={pkg.dataPengawas.namaPengawas}
                onChange={(e) => handlePengawasChange('namaPengawas', e.target.value)}
                placeholder="misal: Mulyanah, M.Pd"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">NIP Pengawas Sekolah</label>
              <input
                type="text"
                value={pkg.dataPengawas.nip}
                onChange={(e) => handlePengawasChange('nip', e.target.value)}
                placeholder="196711222000122001"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 font-mono outline-none"
              />
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-sky-900 mt-4">
              <div className="font-semibold mb-1">Informasi Pengesahan</div>
              <p className="text-[11px] leading-relaxed">
                Data identitas ini akan dicantumkan secara otomatis pada lembar Cover, Identitas Guru dan Penilai, Lembar NPKG, Berita Acara, serta seluruh instrumen cetak fisik.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
