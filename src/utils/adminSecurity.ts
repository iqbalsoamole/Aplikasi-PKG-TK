/**
 * Utilitas Keamanan Akses Mode Admin / Pengawas
 * PKG TK Kota Sukabumi
 */

const PIN_STORAGE_KEY = 'pkg_admin_access_code';
const SESSION_UNLOCK_KEY = 'pkg_admin_session_unlocked';
export const DEFAULT_ADMIN_PIN = '123456';

/**
 * Mengambil kode akses admin aktif (dari localStorage atau default)
 */
export function getAdminPin(): string {
  try {
    const saved = localStorage.getItem(PIN_STORAGE_KEY);
    if (saved && saved.trim().length > 0) {
      return saved.trim();
    }
  } catch (e) {
    console.error('Gagal membaca PIN dari localStorage:', e);
  }
  return DEFAULT_ADMIN_PIN;
}

/**
 * Memverifikasi apakah input PIN cocok dengan kode akses admin
 */
export function verifyAdminPin(inputPin: string): boolean {
  const currentPin = getAdminPin();
  return inputPin.trim() === currentPin;
}

/**
 * Memperbarui kode akses admin baru
 */
export function updateAdminPin(newPin: string): boolean {
  try {
    if (!newPin || newPin.trim().length < 4) {
      return false;
    }
    localStorage.setItem(PIN_STORAGE_KEY, newPin.trim());
    return true;
  } catch (e) {
    console.error('Gagal menyimpan PIN baru ke localStorage:', e);
    return false;
  }
}

/**
 * Mengembalikan kode akses ke bawaan (123456)
 */
export function resetAdminPinToDefault(): void {
  try {
    localStorage.setItem(PIN_STORAGE_KEY, DEFAULT_ADMIN_PIN);
  } catch (e) {
    console.error('Gagal mereset PIN ke default:', e);
  }
}

/**
 * Mengecek apakah sesi admin saat ini sedang terbuka
 */
export function isAdminSessionUnlocked(): boolean {
  try {
    return sessionStorage.getItem(SESSION_UNLOCK_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Mengatur status pembukaan sesi admin
 */
export function setAdminSessionUnlocked(unlocked: boolean): void {
  try {
    if (unlocked) {
      sessionStorage.setItem(SESSION_UNLOCK_KEY, 'true');
    } else {
      sessionStorage.removeItem(SESSION_UNLOCK_KEY);
    }
  } catch (e) {
    console.error('Gagal mengubah status sesi admin:', e);
  }
}
