import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 text-white px-4 py-2.5 text-xs font-semibold shadow-xl border border-amber-400 animate-bounce">
      <WifiOff className="w-4 h-4 text-amber-200" />
      <span>Mode Offline — Aplikasi tetap berjalan lancar menggunakan data tersimpan di perangkat.</span>
    </div>
  );
};
