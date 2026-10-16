import React, { useState } from 'react';
import {
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  X,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import {
  verifyAdminPin,
  updateAdminPin,
  resetAdminPinToDefault,
  DEFAULT_ADMIN_PIN,
} from '../utils/adminSecurity';

interface ChangePinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePinModal: React.FC<ChangePinModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!currentPin.trim()) {
      setErrorMsg('Masukkan kode akses admin yang berlaku saat ini.');
      return;
    }

    if (!verifyAdminPin(currentPin)) {
      setErrorMsg('Kode akses saat ini tidak cocok.');
      return;
    }

    if (newPin.trim().length < 4) {
      setErrorMsg('Kode akses baru minimal harus 4 karakter/angka.');
      return;
    }

    if (newPin !== confirmPin) {
      setErrorMsg('Konfirmasi kode akses baru tidak sama.');
      return;
    }

    const success = updateAdminPin(newPin);
    if (success) {
      setSuccessMsg('Kode akses Admin berhasil diubah!');
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 1500);
    } else {
      setErrorMsg('Gagal menyimpan kode akses baru. Coba lagi.');
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Yakin ingin mereset kode akses kembali ke bawaan (${DEFAULT_ADMIN_PIN})?`)) {
      resetAdminPinToDefault();
      setSuccessMsg(`Kode akses telah direset ke bawaan (${DEFAULT_ADMIN_PIN})`);
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-scale-in my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/80 text-amber-300 rounded-xl border border-indigo-400/40">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                Pengaturan Keamanan
              </div>
              <h2 className="text-base sm:text-lg font-bold">
                Ubah Kode Akses Admin / Pengawas
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Ganti kode akses ini secara berkala agar mode pengawasan dan kelola sekolah tidak dapat diakses oleh pihak yang tidak berwenang.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Current PIN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kode Akses Saat Ini:
              </label>
              <div className="relative">
                <input
                  type={showCurrentPin ? 'text' : 'password'}
                  value={currentPin}
                  onChange={(e) => {
                    setCurrentPin(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Masukkan PIN saat ini (cth: 123456)"
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:bg-white rounded-xl text-sm font-mono text-slate-900 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPin(!showCurrentPin)}
                  className="absolute right-2 top-2.5 p-1 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New PIN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kode Akses Baru (Min. 4 Angka/Karakter):
              </label>
              <div className="relative">
                <input
                  type={showNewPin ? 'text' : 'password'}
                  value={newPin}
                  onChange={(e) => {
                    setNewPin(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Ketik kode baru (cth: 202588)"
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:bg-white rounded-xl text-sm font-mono text-slate-900 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPin(!showNewPin)}
                  className="absolute right-2 top-2.5 p-1 text-slate-400 hover:text-slate-600"
                >
                  {showNewPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New PIN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ulangi Kode Akses Baru:
              </label>
              <input
                type={showNewPin ? 'text' : 'password'}
                value={confirmPin}
                onChange={(e) => {
                  setConfirmPin(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Ketik ulang kode baru"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:bg-white rounded-xl text-sm font-mono text-slate-900 outline-none transition"
              />
            </div>

            {/* Messages */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Simpan Kode Baru</span>
              </button>
            </div>
          </form>

          {/* Reset Action */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Ingin kembali ke pengaturan awal?</span>
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-indigo-700 hover:text-indigo-900 font-bold hover:underline inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ke {DEFAULT_ADMIN_PIN}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
