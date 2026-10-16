import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  X,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import {
  verifyAdminPin,
  resetAdminPinToDefault,
  DEFAULT_ADMIN_PIN,
  getAdminPin,
} from '../utils/adminSecurity';

interface AdminAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAccessModal: React.FC<AdminAccessModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotConfirm, setShowForgotConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setErrorMsg('');
      setShowForgotConfirm(false);
      setResetSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin.trim()) {
      setErrorMsg('Silakan ketikkan kode akses admin.');
      return;
    }

    if (verifyAdminPin(pin)) {
      setErrorMsg('');
      onSuccess();
    } else {
      setErrorMsg('Kode akses salah! Silakan periksa kembali atau gunakan kode bawaan.');
      setPin('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (num: string) => {
    if (pin.length < 12) {
      setPin((prev) => prev + num);
      setErrorMsg('');
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleClear = () => {
    setPin('');
    setErrorMsg('');
    inputRef.current?.focus();
  };

  const handleUseDefault = () => {
    setPin(DEFAULT_ADMIN_PIN);
    setErrorMsg('');
  };

  const handleResetToDefault = () => {
    resetAdminPinToDefault();
    setResetSuccess(true);
    setShowForgotConfirm(false);
    setPin(DEFAULT_ADMIN_PIN);
    setTimeout(() => {
      setResetSuccess(false);
    }, 3000);
  };

  const isCustomPinSet = getAdminPin() !== DEFAULT_ADMIN_PIN;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-scale-in my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/80 text-amber-300 rounded-xl border border-indigo-400/40">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                Keamanan & Otorisasi
              </div>
              <h2 className="text-base sm:text-lg font-bold">
                Kode Akses Admin / Pengawas
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Batal / Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Halaman <strong>Admin / Pengawas</strong> memuat kewenangan mengubah data sekolah, data pembina, dan monitoring se-Kota Sukabumi. Masukkan kode akses keamanan untuk melanjutkan.
          </p>

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-3">
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ketik Kode Akses / PIN:
              </label>
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type={showPin ? 'text' : 'password'}
                  inputMode="numeric"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Ketik PIN di sini..."
                  autoComplete="off"
                  className="w-full pl-4 pr-24 py-3 bg-slate-50 border-2 border-slate-300 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-xl text-center text-lg font-mono font-bold tracking-widest text-slate-900 outline-none transition-all"
                />

                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
                    title={showPin ? 'Sembunyikan PIN' : 'Tampilkan PIN'}
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Reset Success Message */}
            {resetSuccess && (
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Kode akses berhasil di-reset kembali ke bawaan ({DEFAULT_ADMIN_PIN}).</span>
              </div>
            )}

            {/* Quick Touch Keypad for Android/Tablets */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center justify-between">
                <span>Papan Angka Cepat (HP / Tablet):</span>
                {pin && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-[10px] text-rose-600 font-bold hover:underline"
                  >
                    Hapus Semua
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleKeyPress(num.toString())}
                    className="py-2.5 bg-white hover:bg-indigo-50 active:bg-indigo-100 text-slate-800 font-bold text-base rounded-lg border border-slate-200 shadow-2xs transition active:scale-95"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleClear}
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-600 text-xs font-bold rounded-lg border border-slate-200 transition"
                  title="Clear"
                >
                  C
                </button>
                <button
                  type="button"
                  onClick={() => handleKeyPress('0')}
                  className="py-2.5 bg-white hover:bg-indigo-50 active:bg-indigo-100 text-slate-800 font-bold text-base rounded-lg border border-slate-200 shadow-2xs transition active:scale-95"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-600 text-xs font-bold rounded-lg border border-slate-200 transition flex items-center justify-center"
                  title="Backspace"
                >
                  ⌫
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Batal (Tetap Kepala Sekolah)
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4 text-amber-300" />
                <span>Buka Mode Admin</span>
              </button>
            </div>
          </form>

          {/* Default PIN Banner / Assistance */}
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-indigo-950">
              <div className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-semibold">Kode Akses Bawaan (Default):</span>
              </div>
              <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-indigo-200 text-indigo-800">
                {DEFAULT_ADMIN_PIN}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-indigo-100">
              <span>{isCustomPinSet ? 'Anda telah mengubah kode akses.' : 'Gunakan kode default untuk masuk pertama kali.'}</span>
              <button
                type="button"
                onClick={handleUseDefault}
                className="text-indigo-700 hover:text-indigo-900 font-bold underline"
              >
                Pakai {DEFAULT_ADMIN_PIN}
              </button>
            </div>
          </div>

          {/* Reset PIN Helper for Admin */}
          <div className="text-center pt-1">
            {!showForgotConfirm ? (
              <button
                type="button"
                onClick={() => setShowForgotConfirm(true)}
                className="text-xs text-slate-500 hover:text-indigo-700 hover:underline inline-flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Lupa kode akses atau ingin reset ke 123456?</span>
              </button>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left space-y-2">
                <div className="text-xs text-amber-900 font-semibold">
                  Reset kode akses kembali ke bawaan ({DEFAULT_ADMIN_PIN})?
                </div>
                <div className="text-[11px] text-amber-800">
                  Tindakan ini akan mengembalikan PIN ke {DEFAULT_ADMIN_PIN} sehingga pengawas dapat kembali masuk.
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition"
                  >
                    Ya, Reset ke {DEFAULT_ADMIN_PIN}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgotConfirm(false)}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
