import { PKGState, KompetensiSection } from '../types/pkg';

export function hitungSkorKompetensi(kompetensi: KompetensiSection): number {
  if (!kompetensi.items || kompetensi.items.length === 0) return 0;
  const total = kompetensi.items.reduce((acc, curr) => acc + (curr.nilai || 0), 0);
  const maxScore = kompetensi.items.length * 4;
  return Number(((total / maxScore) * 100).toFixed(2));
}

export function getLevelKompetensi(skor: number): { level: number; label: string } {
  if (skor >= 90) return { level: 5, label: 'Level 5' };
  if (skor >= 80) return { level: 4, label: 'Level 4' };
  if (skor >= 70) return { level: 3, label: 'Level 3' };
  if (skor >= 60) return { level: 2, label: 'Level 2' };
  return { level: 1, label: 'Level 1' };
}

export function hitungSkorPenunjang(penunjang: PKGState['penunjang']): {
  skorIjazah: number;
  skorTugasLain: number;
  skorPenghargaan: number;
  totalSkor: number;
  sebutan: string;
} {
  const skorIjazah = penunjang.ijazah.skor;
  
  const tugasList = [
    penunjang.tugasLain.igtki.skor,
    penunjang.tugasLain.kkg.skor,
    penunjang.tugasLain.koordinator.skor,
    penunjang.tugasLain.tutorNarasumber.skor,
  ];
  const skorTugasLain = tugasList.reduce((a, b) => a + b, 0) / tugasList.length;

  const penghargaanList = [
    penunjang.penghargaan.satyaLancana.skor,
    penunjang.penghargaan.guruPenggerak.skor,
    penunjang.penghargaan.guruBerprestasi.skor,
    penunjang.penghargaan.pelatihanPMM.skor,
    penunjang.penghargaan.pengembanganLuarPMM.skor,
  ];
  const skorPenghargaan = penghargaanList.reduce((a, b) => a + b, 0) / penghargaanList.length;

  const totalSkor = Number(((skorIjazah + skorTugasLain + skorPenghargaan) / 3).toFixed(2));

  let sebutan = 'KURANG';
  if (totalSkor >= 90) sebutan = 'AMAT BAIK';
  else if (totalSkor >= 76) sebutan = 'BAIK';
  else if (totalSkor >= 60) sebutan = 'CUKUP';
  else if (totalSkor >= 50) sebutan = 'SEDANG';

  return {
    skorIjazah,
    skorTugasLain: Number(skorTugasLain.toFixed(2)),
    skorPenghargaan: Number(skorPenghargaan.toFixed(2)),
    totalSkor,
    sebutan,
  };
}

export function hitungSkor360(pkg: PKGState): {
  skorRekan: number;
  skorOrtu: number;
  totalSkor: number;
  level: string;
  sebutan: string;
} {
  // Rekan Sejawat
  const skorPerRekan = pkg.rekanSejawat.map((r) => {
    const sum = r.items.reduce((a, b) => a + b, 0);
    return (sum / 80) * 100;
  });
  const avgRekan = skorPerRekan.length ? skorPerRekan.reduce((a, b) => a + b, 0) / skorPerRekan.length : 0;

  // Orang Tua
  const skorPerOrtu = pkg.orangTua.map((o) => {
    const sum = o.items.reduce((a, b) => a + b, 0);
    return (sum / 80) * 100;
  });
  const avgOrtu = skorPerOrtu.length ? skorPerOrtu.reduce((a, b) => a + b, 0) / skorPerOrtu.length : 0;

  const totalSkor = Number(((avgRekan + avgOrtu) / 2).toFixed(2));

  let level = 'Level 5';
  let sebutan = 'Amat Baik';
  if (totalSkor >= 90) {
    level = 'Level 5';
    sebutan = 'Amat Baik';
  } else if (totalSkor >= 80) {
    level = 'Level 4';
    sebutan = 'Baik';
  } else if (totalSkor >= 70) {
    level = 'Level 3';
    sebutan = 'Cukup';
  } else if (totalSkor >= 60) {
    level = 'Level 2';
    sebutan = 'Sedang';
  } else {
    level = 'Level 1';
    sebutan = 'Kurang';
  }

  return {
    skorRekan: Number(avgRekan.toFixed(2)),
    skorOrtu: Number(avgOrtu.toFixed(2)),
    totalSkor,
    level,
    sebutan,
  };
}

export function hitungKehadiran(kehadiran: PKGState['kehadiran']) {
  const rekapBulan = kehadiran.map((k) => {
    const jumlahMenit = (k.terlambat || 0) + (k.pulangCepat || 0);
    const konversiHari = Number((jumlahMenit / 450).toFixed(2));
    const jumlahTidakHadirHari = Number((konversiHari + (k.tanpaKeterangan || 0)).toFixed(2));
    const pctTidakHadir = Number(((jumlahTidakHadirHari / (k.hariEfektif || 22)) * 100).toFixed(2));
    const pctHadir = Number(Math.max(0, 100 - pctTidakHadir).toFixed(2));
    return {
      ...k,
      jumlahMenit,
      konversiHari,
      jumlahTidakHadirHari,
      pctTidakHadir,
      pctHadir,
    };
  });

  const totalTerlambat = rekapBulan.reduce((a, b) => a + b.terlambat, 0);
  const totalPulangCepat = rekapBulan.reduce((a, b) => a + b.pulangCepat, 0);
  const totalJumlahMenit = rekapBulan.reduce((a, b) => a + b.jumlahMenit, 0);
  const totalKonversiHari = Number(rekapBulan.reduce((a, b) => a + b.konversiHari, 0).toFixed(2));
  const totalTanpaKeterangan = rekapBulan.reduce((a, b) => a + b.tanpaKeterangan, 0);
  const totalJumlahTidakHadirHari = Number(rekapBulan.reduce((a, b) => a + b.jumlahTidakHadirHari, 0).toFixed(2));
  
  const avgPctTidakHadir = Number((rekapBulan.reduce((a, b) => a + b.pctTidakHadir, 0) / rekapBulan.length).toFixed(2));
  const avgPctHadir = Number((rekapBulan.reduce((a, b) => a + b.pctHadir, 0) / rekapBulan.length).toFixed(2));

  let kategori = 'Amat Baik';
  if (avgPctHadir >= 91) kategori = 'Amat Baik';
  else if (avgPctHadir >= 76) kategori = 'Baik';
  else if (avgPctHadir >= 61) kategori = 'Cukup';
  else if (avgPctHadir >= 51) kategori = 'Sedang';
  else kategori = 'Kurang';

  return {
    rekapBulan,
    totalTerlambat,
    totalPulangCepat,
    totalJumlahMenit,
    totalKonversiHari,
    totalTanpaKeterangan,
    totalJumlahTidakHadirHari,
    avgPctTidakHadir,
    avgPctHadir,
    kategori,
  };
}

export function hitungNPKGAkhir(pkg: PKGState) {
  const skorPaedagogik = hitungSkorKompetensi(pkg.paedagogik);
  const skorKepribadian = hitungSkorKompetensi(pkg.kepribadian);
  const skorSosial = hitungSkorKompetensi(pkg.sosial);
  const skorProfesional = hitungSkorKompetensi(pkg.profesional);
  const data360 = hitungSkor360(pkg);
  const dataPenunjang = hitungSkorPenunjang(pkg.penunjang);
  const dataKehadiran = hitungKehadiran(pkg.kehadiran);

  const komponen = [
    { no: 1, nama: 'Kompetensi Paedagogik', score: skorPaedagogik, level: `Level ${pkg.paedagogik.selectedLevel || getLevelKompetensi(skorPaedagogik).level}` },
    { no: 2, nama: 'Kompetensi Kepribadian', score: skorKepribadian, level: `Level ${pkg.kepribadian.selectedLevel || getLevelKompetensi(skorKepribadian).level}` },
    { no: 3, nama: 'Kompetensi Sosial', score: skorSosial, level: `Level ${pkg.sosial.selectedLevel || getLevelKompetensi(skorSosial).level}` },
    { no: 4, nama: 'Kompetensi Profesional', score: skorProfesional, level: `Level ${pkg.profesional.selectedLevel || getLevelKompetensi(skorProfesional).level}` },
    { no: 5, nama: 'Penilaian 360', score: data360.totalSkor, level: data360.level },
    { no: 6, nama: 'Kegiatan Penunjang', score: dataPenunjang.totalSkor, level: dataPenunjang.sebutan },
    { no: 7, nama: 'Kehadiran', score: dataKehadiran.avgPctHadir, level: dataKehadiran.kategori },
  ];

  const jumlahSkor = Number(komponen.reduce((a, b) => a + b.score, 0).toFixed(2));
  const nilaiPrestasiKerja = Number((jumlahSkor / 7).toFixed(2));

  let sebutan = 'KURANG';
  if (nilaiPrestasiKerja >= 90) sebutan = 'SANGAT BAIK';
  else if (nilaiPrestasiKerja >= 76) sebutan = 'BAIK';
  else if (nilaiPrestasiKerja >= 60) sebutan = 'CUKUP';
  else if (nilaiPrestasiKerja >= 50) sebutan = 'SEDANG';

  return {
    komponen,
    jumlahSkor,
    nilaiPrestasiKerja,
    sebutan,
  };
}
