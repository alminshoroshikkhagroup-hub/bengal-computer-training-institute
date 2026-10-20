import React, { useState, useEffect } from 'react';
import { logout, initAuth, type User } from '../services/googleDriveAuth';
import { useLanguage } from '../context/LanguageContext';
import { LogOut, User as UserIcon, CheckCircle2 } from 'lucide-react';

export interface UserProfileProps {
  user?: User | null;
  onLogout?: () => void;
  className?: string;
  variant?: 'card' | 'compact' | 'pill';
  showAvatar?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user: initialUser,
  onLogout,
  className = '',
  variant = 'compact',
  showAvatar = true,
}) => {
  const [user, setUser] = useState<User | null>(initialUser ?? null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { language } = useLanguage();
  const isBn = language === 'bn';

  useEffect(() => {
    if (initialUser !== undefined) {
      setUser(initialUser);
      return;
    }

    const unsubscribe = initAuth(
      (currentUser) => setUser(currentUser),
      () => setUser(null),
      (currentUser) => setUser(currentUser)
    );
    return () => unsubscribe();
  }, [initialUser]);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setUser(null);
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const displayName = user.displayName || (isBn ? 'গুগল ব্যবহারকারী' : 'Google User');
  const email = user.email || (isBn ? 'ইমেইল অনুপলব্ধ' : 'No email available');
  const photoURL = user.photoURL;

  // 1. Compact Variant (Great for Header bars, Navbars & Action bars)
  if (variant === 'compact') {
    return (
      <div 
        className={`flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-900 border border-slate-800 p-1.5 pr-3 rounded-2xl shadow-sm transition-all ${className}`}
        data-testid="user-profile"
      >
        {showAvatar && (
          photoURL ? (
            <img
              src={photoURL}
              alt={displayName}
              className="w-8 h-8 rounded-xl object-cover border border-emerald-500/40 shadow-sm shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )
        )}

        <div className="text-left leading-tight min-w-0 max-w-[160px] sm:max-w-[200px]">
          <div className="flex items-center gap-1">
            <span className="font-bold text-white text-xs truncate block" title={displayName}>
              {displayName}
            </span>
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
          </div>
          <span className="text-slate-400 text-[10px] truncate block font-mono" title={email}>
            {email}
          </span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="ml-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50 shrink-0"
          title={isBn ? 'অ্যাকাউন্ট থেকে লগআউট করুন' : 'Log out from your Google account'}
          aria-label="Log out"
        >
          <LogOut className={`w-3.5 h-3.5 ${isLoggingOut ? 'animate-spin' : ''}`} />
          <span className="text-[11px] font-bold">
            {isLoggingOut ? (isBn ? 'লগআউট হচ্ছে...' : 'Logging out...') : (isBn ? 'লগআউট (Log out)' : 'Log out')}
          </span>
        </button>
      </div>
    );
  }

  // 2. Pill Variant (Slim inline pill)
  if (variant === 'pill') {
    return (
      <div 
        className={`inline-flex items-center gap-2 bg-slate-950/80 border border-slate-800/80 py-1 px-2.5 rounded-full shadow-inner ${className}`}
        data-testid="user-profile"
      >
        {showAvatar && (
          photoURL ? (
            <img
              src={photoURL}
              alt={displayName}
              className="w-5 h-5 rounded-full object-cover border border-emerald-400 shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <UserIcon className="w-4 h-4 text-emerald-400 shrink-0" />
          )
        )}
        <div className="flex items-center gap-1.5 text-xs min-w-0">
          <span className="font-semibold text-white truncate max-w-[120px]">{displayName}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 text-[11px] font-mono truncate max-w-[140px]">{email}</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="ml-1 px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
          title="Log out"
          aria-label="Log out"
        >
          <LogOut className="w-3 h-3" />
          <span>{isLoggingOut ? '...' : (isBn ? 'লগআউট' : 'Log out')}</span>
        </button>
      </div>
    );
  }

  // 3. Card Variant (Full detailed profile card, e.g. for student portals, dashboards or settings)
  return (
    <div 
      className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-3 ${className}`}
      data-testid="user-profile"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {showAvatar && (
            photoURL ? (
              <img
                src={photoURL}
                alt={displayName}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-md shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )
          )}

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-white text-sm sm:text-base truncate" title={displayName}>
                {displayName}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{isBn ? 'গুগল ভেরিফাইড' : 'Google Verified'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono truncate" title={email}>
              {email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="self-start sm:self-center px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700 hover:border-rose-500 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-sm disabled:opacity-50"
          aria-label="Log out"
        >
          <LogOut className={`w-3.5 h-3.5 ${isLoggingOut ? 'animate-spin' : ''}`} />
          <span>{isLoggingOut ? (isBn ? 'লগআউট হচ্ছে...' : 'Logging out...') : (isBn ? 'লগআউট (Log out)' : 'Log out')}</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
