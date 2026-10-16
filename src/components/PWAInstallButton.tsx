import React, { useState } from 'react';
import { Download, Smartphone, CheckCircle, Share2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PublishGuideModal } from './PublishGuideModal';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (!outcome) {
        setIsGuideOpen(true);
      }
    } else {
      setIsGuideOpen(true);
    }
  };

  if (isInstalled) {
    return (
      <>
        <button
          onClick={() => setIsGuideOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition border border-emerald-300 ${className}`}
          title="Aplikasi telah terpasang di perangkat ini. Klik untuk panduan berbagi."
        >
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Aplikasi Terpasang</span>
        </button>
        <PublishGuideModal
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
          onTriggerInstall={handleInstallClick}
          isInstallable={isInstallable}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm border ${
          isInstallable
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-emerald-500 animate-pulse'
            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
        } ${className}`}
        title="Pasang aplikasi di HP Android atau PC Anda agar bisa dibuka kapan saja"
      >
        <Smartphone className={`w-3.5 h-3.5 ${isInstallable ? 'text-white' : 'text-blue-600'}`} />
        <span>
          {variant === 'full'
            ? '📱 Pasang di Android / PC'
            : isInstallable
            ? 'Pasang di HP/PC'
            : 'Cara Pasang di HP/PC'}
        </span>
      </button>

      <PublishGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onTriggerInstall={handleInstallClick}
        isInstallable={isInstallable}
      />
    </>
  );
};
