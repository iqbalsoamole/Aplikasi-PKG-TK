export type UserRole = 'pengawas' | 'kepala_sekolah';

export interface DataSekolah {
  id: string;
  namaSekolah: string;
  npsn: string;
  teleponFax: string;
  alamat: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  nuptkKepalaSekolah: string;
  pangkatGolKepalaSekolah: string;
  jabatanKepalaSekolah: string;
  namaPengawas: string;
  nipPengawas: string;
  tahunPenilaian: string;
  periodePenilaian: string;
  tanggalPenilaian: string;
}

export interface DataGuru {
  id: string;
  namaGuru: string;
  nip: string;
  nuptk: string;
  tempatTglLahir: string;
  pangkatGol: string;
  jabatan: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  pendTerakhir: string;
  statusPenilaian?: 'Belum Selesai' | 'Selesai';
}

export interface ButirKompetensi {
  no: number;
  indikator: string;
  butirPenilaian: string;
  buktiDukung: string;
  nilai: number; // 1 to 4
}

export interface RubrikLevel {
  level: number;
  deskripsi: string;
}

export interface KompetensiSection {
  id: 'paedagogik' | 'kepribadian' | 'sosial' | 'profesional';
  nama: string;
  deskripsiUmum: string;
  items: ButirKompetensi[];
  selectedLevel: number; // 1 to 5
  rubrikLevels: RubrikLevel[];
}

export interface PenunjangData {
  ijazah: {
    jenjang: string;
    skor: number;
  };
  tugasLain: {
    igtki: { role: string; skor: number };
    kkg: { role: string; skor: number };
    koordinator: { role: string; skor: number };
    tutorNarasumber: { role: string; skor: number };
  };
  penghargaan: {
    satyaLancana: { status: string; skor: number };
    guruPenggerak: { status: string; skor: number };
    guruBerprestasi: { status: string; skor: number };
    pelatihanPMM: { status: string; skor: number };
    pengembanganLuarPMM: { status: string; skor: number };
  };
}

export interface Responden360 {
  id: number;
  nama: string;
  items: number[]; // array of 20 scores (1-4)
}

export interface KehadiranBulan {
  bulan: string;
  terlambat: number; // menit
  pulangCepat: number; // menit
  tanpaKeterangan: number; // hari
  hariEfektif: number; // hari kerja dalam sebulan, default 20-23
}

export interface TeacherPKGRecord {
  id: string;
  schoolId: string;
  guru: DataGuru;
  paedagogik: KompetensiSection;
  kepribadian: KompetensiSection;
  sosial: KompetensiSection;
  profesional: KompetensiSection;
  penunjang: PenunjangData;
  rekanSejawat: Responden360[];
  orangTua: Responden360[];
  kehadiran: KehadiranBulan[];
  catatanPenilai?: string;
  updatedAt: string;
}

export interface SchoolRecord {
  id: string;
  sekolah: DataSekolah;
  teachers: TeacherPKGRecord[];
}

export interface AppDatabase {
  activeSchoolId: string;
  activeTeacherId: string;
  schools: SchoolRecord[];
}

// Backward compatibility alias for single-record views
export interface PKGState {
  dataSekolah: {
    namaSekolah: string;
    npsn: string;
    teleponFax: string;
    alamat: string;
    kelurahan: string;
    kecamatan: string;
    kota: string;
    provinsi: string;
  };
  dataGuru: DataGuru;
  dataKepalaSekolah: {
    namaKepalaSekolah: string;
    nip: string;
    nuptk: string;
    pangkatGol: string;
    jabatan: string;
    tahunPenilaian: string;
    periodePenilaian: string;
    tanggalPenilaian: string;
  };
  dataPengawas: {
    namaPengawas: string;
    nip: string;
  };
  paedagogik: KompetensiSection;
  kepribadian: KompetensiSection;
  sosial: KompetensiSection;
  profesional: KompetensiSection;
  penunjang: PenunjangData;
  rekanSejawat: Responden360[];
  orangTua: Responden360[];
  kehadiran: KehadiranBulan[];
}
