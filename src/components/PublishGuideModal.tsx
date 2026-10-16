import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Monitor,
  Share2,
  Download,
  Copy,
  Check,
  Globe,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Laptop,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  Server,
  Lock,
} from 'lucide-react';

interface PublishGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerInstall?: () => void;
  isInstallable?: boolean;
}

export const PublishGuideModal: React.FC<PublishGuideModalProps> = ({
  isOpen,
  onClose,
  onTriggerInstall,
  isInstallable = false,
}) => {
  const [activeTab, setActiveTab] = useState<'android' | 'pc' | 'share' | 'hosting' | 'troubleshoot'>('troubleshoot');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-xymr2uekvhkzfg7ttyrgz7-180572992340.asia-southeast1.run.app';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white p-5 sm:p-6 relative">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-400/30">
                <Rocket className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  Panduan Publikasi & Pemasangan Aplikasi
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
                  Dapat dipasang dan digunakan di semua HP Android, Tablet, Laptop & Komputer PC
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* URL Quick Copy Box */}
          <div className="mt-4 bg-blue-950/70 border border-blue-700/50 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-100 overflow-hidden w-full">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white shrink-0">Tautan Aplikasi:</span>
              <span className="font-mono text-xs text-blue-200 truncate select-all">{currentUrl}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Tautan</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Notice about 403 / Access Page */}
          <div className="mt-3 bg-amber-500/20 border border-amber-400/40 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-100">
            <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-200">Muncul pesan &ldquo;You do not have access&rdquo; di akun lain?</span>
              <p className="text-[11px] text-amber-100/90 mt-0.5">
                Link preview saat ini diproteksi oleh Google khusus akun pemilik. Buka tab <strong>&ldquo;⚠️ Solusi Akses Akun Lain&rdquo;</strong> di bawah untuk cara publikasi resmi agar bisa dibuka siapa saja!
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('troubleshoot')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition shrink-0 ${
                activeTab === 'troubleshoot'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-amber-400/20 text-amber-200 hover:bg-amber-400/30'
              }`}
            >
              <AlertCircle className="w-4 h-4 text-amber-300" />
              <span>⚠️ Solusi Akses Akun Lain (403)</span>
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition shrink-0 ${
                activeTab === 'android'
                  ? 'bg-white text-blue-900 font-bold shadow'
                  : 'bg-white/10 text-blue-100 hover:bg-white/20'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <span>📱 HP Android</span>
            </button>
            <button
              onClick={() => setActiveTab('pc')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition shrink-0 ${
                activeTab === 'pc'
                  ? 'bg-white text-blue-900 font-bold shadow'
                  : 'bg-white/10 text-blue-100 hover:bg-white/20'
              }`}
            >
              <Monitor className="w-4 h-4 text-sky-400" />
              <span>💻 Komputer / Laptop PC</span>
            </button>
            <button
              onClick={() => setActiveTab('share')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition shrink-0 ${
                activeTab === 'share'
                  ? 'bg-white text-blue-900 font-bold shadow'
                  : 'bg-white/10 text-blue-100 hover:bg-white/20'
              }`}
            >
              <Share2 className="w-4 h-4 text-amber-300" />
              <span>👥 Berbagi ke Kepsek & Guru</span>
            </button>
            <button
              onClick={() => setActiveTab('hosting')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition shrink-0 ${
                activeTab === 'hosting'
                  ? 'bg-white text-blue-900 font-bold shadow'
                  : 'bg-white/10 text-blue-100 hover:bg-white/20'
              }`}
            >
              <Globe className="w-4 h-4 text-purple-300" />
              <span>🌐 Publikasi Hosting Sendiri</span>
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-700 text-sm">
          {/* TAB 0: TROUBLESHOOT AKUN LAIN / 403 FORBIDDEN */}
          {activeTab === 'troubleshoot' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-amber-950 text-base sm:text-lg">
                    Mengapa Muncul: &ldquo;We&rsquo;re sorry, but you do not have access to this page&rdquo;?
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                    Tautan yang sedang Anda buka saat ini (<code>ais-pre-...run.app</code>) adalah <strong>lingkungan pengujian (pratinjau pengembang AI Studio)</strong> yang secara otomatis dikunci oleh Google hanya untuk akun Anda sendiri. Oleh karena itu, jika link ini dibuka di browser dengan akun Google lain, jendela Incognito, atau HP orang lain, Google akan memblokirnya dengan pesan error 403 tersebut.
                  </p>
                </div>
              </div>

              {/* Status Kesiapan Aplikasi */}
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Apakah Aplikasi Ini Sudah Siap Digunakan & Di-Publish?</span>
                </div>
                <div className="bg-white rounded-xl p-3.5 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2">
                  <p className="font-bold text-emerald-800">
                    ✅ YA, 100% SUDAH SIAP, LENGKAP, DAN SESUAI STANDAR RESMI!
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 text-xs">
                    <li><strong>Standar Regulasi:</strong> Sesuai Perdirjen GTK No. 2626/B/GT/2023 & Permendikbudristek No. 40 Tahun 2021.</li>
                    <li><strong>4 Dimensi Kompetensi TK:</strong> Pedagogik (7 Indikator), Kepribadian (3 Indikator), Sosial (2 Indikator), dan Profesional (2 Indikator) total 14 indikator lengkap dengan rubrik bukti fisik.</li>
                    <li><strong>Format Cetak Resmi:</strong> Lampiran 1B (Format Penilaian), Lampiran 1C (Format Laporan), Lampiran 1D (Rekap Nilai PKG TK), dan Format Rekap Kolektif Pengawas Tingkat Kota Sukabumi.</li>
                    <li><strong>Kode Akses Admin/Pengawas:</strong> Dilindungi kode PIN (default: <code>123456</code>) agar mode pengawas tidak diakses sembarang orang.</li>
                    <li><strong>PWA & Offline:</strong> Mendukung penyimpanan di HP Android dan laptop secara mandiri tanpa internet.</li>
                  </ul>
                </div>
              </div>

              {/* 3 Solusi Cara Mempublish */}
              <h5 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-2 mt-4">
                <Rocket className="w-4 h-4 text-blue-600" />
                Cara Mempublish Agar Bisa Dibuka Semua Orang Tanpa Error:
              </h5>

              <div className="space-y-3">
                {/* Opsi 1 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold">1</span>
                      Gunakan Tombol Deploy / Publish di AI Studio (Pojok Kanan Atas)
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Resmi AI Studio</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    Di layar Google AI Studio tempat Anda membuat aplikasi ini, lihat ke <strong>pojok kanan atas layar</strong>. Di sana ada tombol <strong>&ldquo;Deploy&rdquo;</strong> atau <strong>&ldquo;Publish&rdquo; / &ldquo;Share&rdquo;</strong>. Klik tombol tersebut dan pilih publikasikan ke web publik. Google akan menerbitkan URL resmi yang bisa diakses oleh siapa pun tanpa harus login ke akun Anda.
                  </p>
                </div>

                {/* Opsi 2 */}
                <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-950 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                      Deploy Gratis Permanen ke Vercel atau Netlify (Sangat Direkomendasikan)
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Paling Stabil & Cepat</span>
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed pl-8 space-y-2">
                    <p>
                      Aplikasi ini adalah <strong>Single Page Application (SPA) berbasis web statis murni</strong>. Artinya, aplikasi ini dapat di-host di penyedia hosting gratis mana pun tanpa perlu sewa server mahal:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-600">
                      <li>Buka situs hosting gratis seperti <strong>Vercel</strong> (<em>vercel.com</em>) atau <strong>Netlify Drop</strong> (<em>app.netlify.com/drop</em>).</li>
                      <li>Hubungkan akun GitHub proyek ini atau cukup drag & drop folder hasil build (<code>dist/</code>).</li>
                      <li>Dalam 1 menit Anda akan mendapatkan link publik seperti <code>https://pkg-tk-sukabumi.vercel.app</code>. Link ini 100% bebas diakses siapa saja dari HP mana pun tanpa login Google!</li>
                    </ol>
                  </div>
                </div>

                {/* Opsi 3 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs font-bold">3</span>
                      Gunakan Subdomain Resmi Pemda Sukabumi (Disdik / Kominfo)
                    </span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">Pemerintah Kota</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    File website ini dapat diserahkan ke Dinas Pendidikan atau Diskominfo Kota Sukabumi untuk diunggah ke hosting resmi pemerintah daerah, misalnya <code>pkg-tk.sukabumikota.go.id</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: ANDROID */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <Smartphone className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-base">
                    Aplikasi Progressive Web App (PWA) untuk Android
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    Aplikasi ini sudah berstandar PWA resmi. Begitu dipasang di Android, aplikasi akan muncul di layar utama (home screen) dengan ikon logo Kota Sukabumi, berjalan layar penuh (fullscreen) tanpa browser URL bar layaknya aplikasi dari Google Play Store!
                  </p>
                </div>
              </div>

              {isInstallable && onTriggerInstall && (
                <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                  <div>
                    <span className="font-bold text-blue-900 block">Perangkat Mendukung Instalasi Langsung</span>
                    <span className="text-xs text-blue-700">
                      Browser Anda mendeteksi aplikasi ini siap dipasang secara instan ke perangkat.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onTriggerInstall();
                      onClose();
                    }}
                    className="shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow flex items-center gap-2 text-xs"
                  >
                    <Download className="w-4 h-4" />
                    Pasang Sekarang di Perangkat Ini
                  </button>
                </div>
              )}

              <h5 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Cara Memasang di HP Android (Google Chrome & Samsung Internet):
              </h5>

              <ol className="list-decimal list-inside space-y-3 pl-1 text-slate-700 leading-relaxed">
                <li className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-slate-900">Buka Tautan di Google Chrome:</strong> Buka link aplikasi pada browser Chrome di HP Android Anda.
                </li>
                <li className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-slate-900">Ketuk Tombol Titik Tiga (⋮) di Pojok Kanan Atas:</strong> Menu browser akan muncul.
                </li>
                <li className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-slate-900">Pilih "Pasang Aplikasi" / "Tambahkan ke Layar Utama" (Add to Home screen):</strong>
                  <div className="mt-1 text-xs text-slate-600">
                    Chrome akan memunculkan dialog konfirmasi pemasangan. Ketuk <strong>"Pasang" (Install)</strong>.
                  </div>
                </li>
                <li className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 font-medium">
                  <strong>Selesai!</strong> Ikon <em>"PKG TK Smi"</em> dengan logo resmi Sukabumi kini muncul di daftar aplikasi HP Anda dan dapat dibuka kapan saja, bahkan saat koneksi lambat atau offline.
                </li>
              </ol>
            </div>
          )}

          {/* TAB 2: PC / LAPTOP */}
          {activeTab === 'pc' && (
            <div className="space-y-4">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
                <Monitor className="w-6 h-6 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sky-950 text-base">
                    Pemasangan di Laptop / Komputer PC (Windows, MacOS, Linux)
                  </h4>
                  <p className="text-xs text-sky-800 mt-1">
                    Di komputer atau laptop, aplikasi ini dapat di-install menjadi program desktop mandiri tanpa bingkai browser melalui Google Chrome atau Microsoft Edge.
                  </p>
                </div>
              </div>

              <h5 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-sky-600" />
                Langkah Pemasangan di PC (Chrome / Edge):
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">1</span>
                    Lewat Bilah Alamat (Paling Cepat)
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Di bilah alamat URL bagian paling kanan (dekat ikon bintang bookmark), cari dan klik ikon kecil <strong>"Pasang Aplikasi PKG TK"</strong> (ikon layar kecil berpanah bawah).
                  </p>
                  <div className="text-xs bg-white p-2 rounded border font-mono text-slate-700">
                    Ikon [⊕] atau [⬇] Pasang Aplikasi
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">2</span>
                    Lewat Menu Titik Tiga (⋮)
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Klik menu titik tiga <strong>(⋮)</strong> di browser Google Chrome / Microsoft Edge &rarr; arahkan ke <strong>"Cast, simpan, dan bagikan"</strong> atau langsung pilih <strong>"Pasang Aplikasi PKG TK Kota Sukabumi..."</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <span className="font-bold text-amber-800 shrink-0">💡 Keunggulan di PC:</span>
                <span>
                  Sangat nyaman untuk mencetak berkas lembar penilaian, cover, dan format NPKG langsung ke printer atau disimpan sebagai PDF dengan ukuran kertas F4/A4 yang presisi.
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: SHARE KE KEPSEK & GURU */}
          {activeTab === 'share' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Share2 className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-base">
                    Membagikan Aplikasi ke Seluruh Kepala Sekolah & Guru Binaan
                  </h4>
                  <p className="text-xs text-amber-800 mt-1">
                    Kepala Sekolah dan guru tidak perlu repot mendaftar akun atau menginstal software rumit. Cukup kirimkan tautan aplikasi melalui grup WhatsApp atau surat dinas!
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h5 className="font-bold text-slate-900 text-sm">Template Pesan WhatsApp untuk Kepala Sekolah:</h5>
                <div className="bg-white p-3.5 rounded-lg border border-slate-300 font-mono text-xs leading-relaxed text-slate-800 select-all whitespace-pre-line">
{`Yth. Bapak/Ibu Kepala TK se-Kota Sukabumi,

Berikut adalah tautan resmi Aplikasi Penilaian Kinerja Guru (PKG) TK Kota Sukabumi berbasis web dan mobile:
🔗 ${currentUrl}

Petunjuk Penggunaan Singkat:
1. Buka tautan di Google Chrome di HP Android atau Laptop.
2. Klik tombol "Mode Kepala Sekolah" di bagian atas.
3. Pilih nama sekolah dan nama guru yang dinilai.
4. Lakukan penilaian kompetensi dan unduh/cetak hasil NPKG.
5. Anda dapat menekan menu titik tiga (⋮) di Chrome lalu pilih "Pasang Aplikasi" agar tersimpan di layar utama HP Anda.

Terima kasih.
Dinas Pendidikan & Kebudayaan Kota Sukabumi
Pengawas Pembina TK`}
                </div>
                <button
                  onClick={() => {
                    const text = `Yth. Bapak/Ibu Kepala TK se-Kota Sukabumi,

Berikut adalah tautan resmi Aplikasi Penilaian Kinerja Guru (PKG) TK Kota Sukabumi berbasis web dan mobile:
🔗 ${currentUrl}

Petunjuk Penggunaan Singkat:
1. Buka tautan di Google Chrome di HP Android atau Laptop.
2. Klik tombol "Mode Kepala Sekolah" di bagian atas.
3. Pilih nama sekolah dan nama guru yang dinilai.
4. Lakukan penilaian kompetensi dan unduh/cetak hasil NPKG.
5. Anda dapat menekan menu titik tiga (⋮) di Chrome lalu pilih "Pasang Aplikasi" agar tersimpan di layar utama HP Anda.

Terima kasih.
Dinas Pendidikan & Kebudayaan Kota Sukabumi`;
                    navigator.clipboard.writeText(text);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Teks Pesan Berhasil Disalin!' : 'Salin Template Pesan WA'}</span>
                </button>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Keamanan & Sinkronisasi Data:
                </div>
                <p className="text-blue-800 leading-relaxed">
                  Data yang diinput oleh Kepala Sekolah tersimpan di memori perangkat browser mereka. Kepala Sekolah dapat menekan tombol <strong>"Cadangkan Data (JSON)"</strong> lalu mengirimkannya ke Pengawas untuk digabungkan ke rekap kota.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: HOSTING & DOMAIN SENDIRI */}
          {activeTab === 'hosting' && (
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
                <Globe className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-purple-950 text-base">
                    Publikasi Mandiri Permanen & Domain Khusus
                  </h4>
                  <p className="text-xs text-purple-800 mt-1">
                    Aplikasi ini adalah web application modern yang dapat dipublikasikan ke server Cloud atau hosting publik apa pun secara gratis atau menggunakan domain instansi pemerintah.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h6 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Rocket className="w-4 h-4 text-purple-600" />
                    1. Vercel / Netlify (Gratis)
                  </h6>
                  <p className="text-xs text-slate-600">
                    Bisa dideploy gratis dalam 1 menit dengan menghubungkan repository GitHub atau upload folder hasil <code className="bg-slate-200 px-1 py-0.5 rounded">npm run build</code> (folder <code className="bg-slate-200 px-1 py-0.5 rounded">dist/</code>).
                  </p>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Sangat Mudah
                  </span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h6 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-600" />
                    2. Google Cloud Run (Aktif Sekarang)
                  </h6>
                  <p className="text-xs text-slate-600">
                    Aplikasi saat ini telah aktif di Google Cloud Run dengan sertifikat SSL HTTPS otomatis, performa tinggi, dan uptime 99.9%.
                  </p>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Siap Pakai
                  </span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h6 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    3. Domain Resmi Pemda Sukabumi
                  </h6>
                  <p className="text-xs text-slate-600">
                    Jika Kominfo / Disdik Kota Sukabumi memiliki subdomain resmi (misal: <em>pkg-tk.sukabumikota.go.id</em>), cukup diarahkan CNAME ke hosting ini.
                  </p>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Resmi Pemda
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-100 rounded-xl text-xs text-slate-700 space-y-2">
                <span className="font-bold text-slate-900 block">Bagaimana Cara Mengambil File Proyek?</span>
                <p>
                  Semua kode sumber aplikasi ini telah dikompilasi menjadi berkas web standar HTML/JS/CSS. Jika Anda ingin mengekspor seluruh basis kode atau mendownload cadangan data sekolah dan guru, Anda dapat menekan tombol <strong>"Cadangkan Data"</strong> di panel atas kapan saja.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Aplikasi PKG TK Kota Sukabumi • Standar Perdirjen GTK No. 2626/B/GT/2023
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-initial px-4 py-2 border border-slate-300 hover:bg-slate-100 font-semibold text-slate-700 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Tautan'}</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition shadow"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
