import React from 'react';
import { PenunjangData } from '../types/pkg';
import { hitungSkorPenunjang } from '../utils/calculations';
import { ArrowLeft, ArrowRight, Award, HelpCircle } from 'lucide-react';

interface KegiatanPenunjangFormProps {
  penunjang: PenunjangData;
  onChange: (updated: PenunjangData) => void;
  onNavigate: (tabId: string) => void;
}

export const KegiatanPenunjangForm: React.FC<KegiatanPenunjangFormProps> = ({
  penunjang,
  onChange,
  onNavigate,
}) => {
  const result = hitungSkorPenunjang(penunjang);

  const handleIjazahChange = (jenjang: string, skor: number) => {
    onChange({
      ...penunjang,
      ijazah: { jenjang, skor },
    });
  };

  const handleTugasLainChange = (
    key: keyof PenunjangData['tugasLain'],
    role: string,
    skor: number
  ) => {
    onChange({
      ...penunjang,
      tugasLain: {
        ...penunjang.tugasLain,
        [key]: { role, skor },
      },
    });
  };

  const handlePenghargaanChange = (
    key: keyof PenunjangData['penghargaan'],
    status: string,
    skor: number
  ) => {
    onChange({
      ...penunjang,
      penghargaan: {
        ...penunjang.penghargaan,
        [key]: { status, skor },
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700">
            Komponen Tambahan PKG TK
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">5. KEGIATAN PENUNJANG</h2>
          <p className="text-xs text-slate-500 mt-1">
            Penilaian gelar ijazah, tugas relevan fungsi PAUD/TK (IGTKI, KKG, P5), dan sertifikat penghargaan
          </p>
        </div>

        {/* Score & Predicate Card */}
        <div className="flex items-center gap-4 bg-amber-50 border border-amber-200 p-3.5 rounded-xl shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-500">Total Skor</div>
            <div className="text-2xl font-black text-amber-700 font-mono tabular-nums leading-none">
              {result.totalSkor.toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Rata-rata 3 Aspek</div>
          </div>
          <div className="h-8 w-px bg-amber-200" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-500">Nilai / Predikat</div>
            <div className="text-sm font-extrabold text-amber-900 uppercase">
              {result.sebutan}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold">Tercatat di NPKG</div>
          </div>
        </div>
      </div>

      {/* Main Official Penunjang Table matching Page 14 */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white font-bold">
                <th className="py-3 px-4 w-1/4 border-r border-slate-700">BUTIR PENILAIAN</th>
                <th className="py-3 px-4 border-r border-slate-700">INDIKATOR BUKTI FISIK</th>
                <th className="py-3 px-4 w-44 border-r border-slate-700 text-center">KONDISI</th>
                <th className="py-3 px-4 w-28 text-center">SKOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* 1. Memperoleh gelar/ijazah */}
              <tr className="bg-slate-50/50">
                <td className="py-4 px-4 font-bold text-slate-900 border-r border-slate-200 align-top">
                  Memperoleh gelar/ ijazah.
                </td>
                <td className="py-4 px-4 border-r border-slate-200 text-slate-700 align-top">
                  Ijazah S1 / D4 Kependidikan PAUD/PGTK yang relevan
                </td>
                <td className="py-4 px-4 border-r border-slate-200 text-center align-top">
                  <select
                    value={penunjang.ijazah.jenjang}
                    onChange={(e) => {
                      const val = e.target.value;
                      let skor = 71.43;
                      if (val === 'S2 / S3') skor = 100;
                      if (val === 'D3') skor = 50;
                      handleIjazahChange(val, skor);
                    }}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md font-medium text-slate-800 bg-white"
                  >
                    <option value="S1/ D4">S1/ D4 (Skor: 71,43)</option>
                    <option value="S2 / S3">S2 / S3 (Skor: 100,00)</option>
                    <option value="D3">D3 (Skor: 50,00)</option>
                  </select>
                </td>
                <td className="py-4 px-4 text-center font-mono font-bold text-slate-900 align-top tabular-nums">
                  {penunjang.ijazah.skor.toFixed(2)}
                </td>
              </tr>

              {/* 2. Tugas Lain Relevan */}
              <tr>
                <td
                  rowSpan={4}
                  className="py-4 px-4 font-bold text-slate-900 border-r border-slate-200 align-top bg-amber-50/30"
                >
                  <div>Melaksanakan tugas lain yang relevan dengan fungsi sekolah/ Bidang Pendidikan</div>
                  <div className="mt-2 text-[11px] font-mono text-amber-800 font-semibold">
                    Sub-skor: {result.skorTugasLain.toFixed(2)}
                  </div>
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-slate-700">
                  SK pengurus dan atau kartu anggota IGTKI
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-center">
                  <select
                    value={penunjang.tugasLain.igtki.role}
                    onChange={(e) => {
                      const role = e.target.value;
                      const skor = role === 'Ketua' ? 100 : role === 'Pengurus' ? 75 : role === 'Anggota' ? 50 : 0;
                      handleTugasLainChange('igtki', role, skor);
                    }}
                    className="w-full px-2 py-1 border border-slate-300 rounded-md text-xs bg-white font-medium"
                  >
                    <option value="Ketua">Ketua (100)</option>
                    <option value="Pengurus">Pengurus (75)</option>
                    <option value="Anggota">Anggota (50)</option>
                    <option value="Tidak ada">Tidak ada (0)</option>
                  </select>
                </td>
                <td rowSpan={4} className="py-4 px-4 text-center font-mono font-bold text-slate-900 align-middle tabular-nums bg-amber-50/20">
                  {result.skorTugasLain.toFixed(2)}
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-r border-slate-200 text-slate-700">
                  SK pengurus dan atau Kartu anggota KKG
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-center">
                  <select
                    value={penunjang.tugasLain.kkg.role}
                    onChange={(e) => {
                      const role = e.target.value;
                      const skor = role === 'Ketua' ? 100 : role === 'Pengurus' ? 75 : role === 'Anggota' ? 50 : 0;
                      handleTugasLainChange('kkg', role, skor);
                    }}
                    className="w-full px-2 py-1 border border-slate-300 rounded-md text-xs bg-white font-medium"
                  >
                    <option value="Ketua">Ketua (100)</option>
                    <option value="Pengurus">Pengurus (75)</option>
                    <option value="Anggota">Anggota (50)</option>
                    <option value="Tidak ada">Tidak ada (0)</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-r border-slate-200 text-slate-700">
                  SK/ Surat Tugas Koordinator kegiatan (P5, Outing Class, dll)
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-center">
                  <select
                    value={penunjang.tugasLain.koordinator.role}
                    onChange={(e) => {
                      const role = e.target.value;
                      const skor = role === 'Ketua' ? 100 : role === 'Anggota' ? 75 : 0;
                      handleTugasLainChange('koordinator', role, skor);
                    }}
                    className="w-full px-2 py-1 border border-slate-300 rounded-md text-xs bg-white font-medium"
                  >
                    <option value="Ketua">Ketua (100)</option>
                    <option value="Anggota">Anggota (75)</option>
                    <option value="Tidak ada">Tidak ada (0)</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-r border-slate-200 text-slate-700">
                  Sertifikat Tutor/Pelatih/Instruktur/ Nara Sumber
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-center">
                  <select
                    value={penunjang.tugasLain.tutorNarasumber.role}
                    onChange={(e) => {
                      const role = e.target.value;
                      const skor = role === 'Nasional' ? 100 : role === 'Provinsi' ? 80 : role === 'Kota' ? 60 : 0;
                      handleTugasLainChange('tutorNarasumber', role, skor);
                    }}
                    className="w-full px-2 py-1 border border-slate-300 rounded-md text-xs bg-white font-medium"
                  >
                    <option value="Nasional">Nasional (100)</option>
                    <option value="Provinsi">Provinsi (80)</option>
                    <option value="Kota">Kota (60)</option>
                    <option value="Tidak ada">Tidak ada (0)</option>
                  </select>
                </td>
              </tr>

              {/* 3. Penghargaan */}
              <tr>
                <td
                  rowSpan={5}
                  className="py-4 px-4 font-bold text-slate-900 border-r border-slate-200 align-top bg-emerald-50/30"
                >
                  <div>Memperoleh Penghargaan</div>
                  <div className="mt-2 text-[11px] font-mono text-emerald-800 font-semibold">
                    Sub-skor: {result.skorPenghargaan.toFixed(2)}
                  </div>
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-slate-700">
                  Tanda Jasa Satya Lancana / Bakti Karya dari Yayasan
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-center">
                  <select
                    value={penunjang.penghargaan.satyaLancana.status}
                    onChange={(e) => {
                      const st = e.target.value;
                      const skor = st === 'Nasional' ? 100 : st === 'Daerah' ? 80 : 0;
                      handlePenghargaanChange('satyaLancana', st, skor);
                    }}
                    className="w-full px-2 py-1 border border-slate-300 rounded-md text-xs bg-white font-medium"
                  >
                    <option value="Nasional">Nasional (100)</option>
                    <option value="Daerah">Daerah (80)</option>
                    <option value="Tidak ada">Tidak ada (0)</option>
                  </select>
                </td>
                <td rowSpan={5} className="py-4 px-4 text-center font-mono font-bold text-slate-900 align-middle tabular-nums bg-emerald-50/20">
                  {result.skorPenghargaan.toFixed(2)}
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-r border-slate-200 text-slate-700">
                  Sertifikat Guru Penggerak
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-center">
                  <select
                    value={penunjang.penghargaan.guruPenggerak.status}
                    onChange={(e) => {
                      const st = e.target.value;
                      const skor = st === 'Ada' ? 100 : 0;
                      handlePenghargaanChange('guruPenggerak', st, skor);
                    }}
                    className="w-full px-2 py-1 border border-slate-300 rounded-md text-xs bg-white font-medium"
                  >
                    <option value="Ada">Ada (100)</option>
                    <option value="Tidak ada">Tidak ada (0)</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-r border-slate-200 text-slate-700">
                  Sertifikat Guru Berprestasi (contoh : literasi, hiber, dll)
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-center">
                  <select
                    value={penunjang.penghargaan.guruBerprestasi.status}
                    onChange={(e) => {
                      const st = e.target.value;
                      const skor = st === 'Nasional' ? 100 : st === 'Provinsi' ? 80 : st === 'Kota' ? 60 : 0;
                      handlePenghargaanChange('guruBerprestasi', st, skor);
                    }}
                    className="w-full px-2 py-1 border border-slate-300 rounded-md text-xs bg-white font-medium"
                  >
                    <option value="Nasional">Nasional (100)</option>
                    <option value="Provinsi">Provinsi (80)</option>
                    <option value="Kota">Kota (60)</option>
                    <option value="Tidak ada">Tidak ada (0)</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-r border-slate-200 text-slate-700">
                  Sertifikat Pelatihan Mandiri PMM / Ruang GTK
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-center">
                  <select
                    value={penunjang.penghargaan.pelatihanPMM.status}
                    onChange={(e) => {
                      const st = e.target.value;
                      const skor = st === '≥ 4' ? 100 : st === '2-3' ? 75 : st === '1' ? 50 : 0;
                      handlePenghargaanChange('pelatihanPMM', st, skor);
                    }}
                    className="w-full px-2 py-1 border border-slate-300 rounded-md text-xs bg-white font-medium"
                  >
                    <option value="≥ 4">≥ 4 Sertifikat (100)</option>
                    <option value="2-3">2 - 3 Sertifikat (75)</option>
                    <option value="1">1 Sertifikat (50)</option>
                    <option value="0">0 (0)</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-4 border-r border-slate-200 text-slate-700">
                  Sertifikat Pengembangan Kompetensi di Luar PMM
                </td>
                <td className="py-3 px-4 border-r border-slate-200 text-center">
                  <select
                    value={penunjang.penghargaan.pengembanganLuarPMM.status}
                    onChange={(e) => {
                      const st = e.target.value;
                      const skor = st === '≥ 4' ? 100 : st === '2-3' ? 75 : st === '1' ? 50 : 0;
                      handlePenghargaanChange('pengembanganLuarPMM', st, skor);
                    }}
                    className="w-full px-2 py-1 border border-slate-300 rounded-md text-xs bg-white font-medium"
                  >
                    <option value="≥ 4">≥ 4 Sertifikat (100)</option>
                    <option value="2-3">2 - 3 Sertifikat (75)</option>
                    <option value="1">1 Sertifikat (50)</option>
                    <option value="0">0 (0)</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-extrabold text-slate-900 border-t-2 border-slate-300">
                <td colSpan={3} className="py-3 px-4 text-right border-r border-slate-200 uppercase tracking-wider">
                  SKOR AKHIR KEGIATAN PENUNJANG
                </td>
                <td className="py-3 px-4 text-center font-mono text-base text-amber-700 tabular-nums">
                  {result.totalSkor.toFixed(2)}
                </td>
              </tr>
              <tr className="bg-amber-100/70 font-extrabold text-amber-950">
                <td colSpan={3} className="py-2.5 px-4 text-right border-r border-amber-200 uppercase tracking-wider text-xs">
                  PREDIKAT / NILAI
                </td>
                <td className="py-2.5 px-4 text-center font-bold text-xs uppercase tracking-wider">
                  {result.sebutan}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => onNavigate('profesional')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali: 4. Profesional</span>
        </button>

        <button
          onClick={() => onNavigate('rekan-sejawat')}
          className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
        >
          <span>Lanjut: Penilaian Rekan Sejawat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
