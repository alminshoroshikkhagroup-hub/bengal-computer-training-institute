import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  UploadedPhotoItem,
  getRecentlyUploadedPhotos,
  deleteUploadedPhotoFromStorage,
  clearAllUploadedPhotosFromStorage,
  processAndSaveTeacherPhoto
} from '../services/imageStorageService';
import {
  Images,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Upload,
  AlertCircle,
  X,
  RefreshCw,
  HardDrive,
  Calendar,
  Sparkles
} from 'lucide-react';

interface RecentlyUploadedPhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto?: (url: string) => void;
}

export const RecentlyUploadedPhotosModal: React.FC<RecentlyUploadedPhotosModalProps> = ({
  isOpen,
  onClose,
  onSelectPhoto,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [photos, setPhotos] = useState<UploadedPhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Load photos
  const loadPhotos = async () => {
    setIsLoading(true);
    try {
      const list = await getRecentlyUploadedPhotos();
      setPhotos(list);
    } catch (err) {
      console.error('Failed to load recent photos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadPhotos();
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Delete a single photo
  const handleDeletePhoto = async (photo: UploadedPhotoItem) => {
    const confirmMsg = isBn 
      ? `আপনি কি নিশ্চিতভাবে এই ছবিটি স্টোরেজ থেকে চিরতরে মুছে ফেলতে চান? (${photo.filename})`
      : `Are you sure you want to permanently delete this photo from storage? (${photo.filename})`;
    
    if (!window.confirm(confirmMsg)) return;

    setDeletingId(photo.id);
    try {
      await deleteUploadedPhotoFromStorage(photo.id, photo.url);
      setPhotos(prev => prev.filter(p => p.id !== photo.id));
      showToast(isBn ? '✓ ছবিটি স্টোরেজ থেকে সফলভাবে মুছে ফেলা হয়েছে।' : '✓ Photo deleted from storage.');
    } catch (err) {
      console.error('Error deleting photo:', err);
      showToast(isBn ? '❌ ছবিটি মুছতে সমস্যা হয়েছে।' : '❌ Failed to delete photo.');
    } finally {
      setDeletingId(null);
    }
  };

  // Clear all photos
  const handleClearAll = async () => {
    if (photos.length === 0) return;

    const confirmMsg = isBn
      ? `আপনি কি স্টোরেজে থাকা সকল (${photos.length}টি) আপলোড করা ছবি মুছে ফেলতে চান?`
      : `Are you sure you want to clear all (${photos.length}) uploaded photos from storage?`;

    if (!window.confirm(confirmMsg)) return;

    setIsLoading(true);
    try {
      await clearAllUploadedPhotosFromStorage();
      setPhotos([]);
      showToast(isBn ? '✓ সকল আপলোডকৃত ছবি স্টোরেজ থেকে পরিষ্কার করা হয়েছে।' : '✓ All uploaded photos cleared from storage.');
    } catch (err) {
      console.error('Failed to clear photos:', err);
      showToast(isBn ? '❌ ছবি পরিষ্কার করতে সমস্যা হয়েছে।' : '❌ Failed to clear photos.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy URL
  const handleCopyUrl = (photo: UploadedPhotoItem) => {
    const fullUrl = photo.url.startsWith('/') && typeof window !== 'undefined'
      ? `${window.location.origin}${photo.url}`
      : photo.url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(photo.id);
    showToast(isBn ? '✓ ছবির সরাসরি URL ক্লিপবোর্ডে কপি হয়েছে!' : '✓ Direct Image URL copied!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Upload new photo directly from gallery
  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const savedUrl = await processAndSaveTeacherPhoto(file, `gallery_${Date.now()}`);
      await loadPhotos();
      showToast(isBn ? '✓ নতুন ছবি সফলভাবে আপলোড ও যুক্ত হয়েছে!' : '✓ New photo uploaded successfully!');
    } catch (err) {
      console.error('Gallery direct upload failed:', err);
      showToast(isBn ? '❌ ছবি আপলোডে ব্যর্থ হয়েছে।' : '❌ Photo upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-5 sm:p-7 max-h-[90vh] flex flex-col my-4">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Images className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {isBn ? 'সম্প্রতি আপলোড করা ছবির গ্যালারি' : 'Recently Uploaded Photos'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                  {photos.length}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn 
                  ? 'সার্ভার ও ব্রাউজার স্টোরেজে সংরক্ষিত ছবি। যেকোনো ছবি মুছতে "মুছুন" বাটনে ক্লিক করুন।' 
                  : 'Photos stored in server & browser storage. Click Delete to clear from storage.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {photos.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Clear all photos from storage"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isBn ? 'সব মুছুন' : 'Clear All'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-in fade-in flex items-center justify-center gap-2 shrink-0">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Upload Action Bar */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <HardDrive className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {isBn 
                ? 'ছবিগুলো স্বয়ংক্রিয়ভাবে IndexedDB ও সার্ভার ডিস্কে স্থায়ীভাবে সংরক্ষিত রয়েছে।' 
                : 'Photos are stored permanently in IndexedDB and server disk.'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadPhotos}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Refresh list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isBn ? 'রিফ্রেশ' : 'Refresh'}</span>
            </button>

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md transition-all disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? (isBn ? 'আপলোড হচ্ছে...' : 'Uploading...') : (isBn ? 'নতুন ছবি আপলোড' : 'Upload Photo')}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleDirectUpload}
            />
          </div>
        </div>

        {/* Photos Grid Container (Scrollable) */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {isLoading && photos.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400">{isBn ? 'ছবি লোড হচ্ছে...' : 'Loading photos...'}</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="py-16 text-center space-y-4 border-2 border-dashed border-slate-800 rounded-3xl p-8 bg-slate-950/40">
              <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <Images className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-200">
                  {isBn ? 'বর্তমানে কোনো আপলোডকৃত ছবি নেই' : 'No Uploaded Photos Found'}
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {isBn 
                    ? 'আপনি যখনই শিক্ষক বা পরিচালকের নতুন ছবি আপলোড করবেন, সেগুলো এখানে তালিকাভুক্ত হবে এবং এখান থেকে যেকোনো সময় মুছতে পারবেন।'
                    : 'When you upload photos for teachers, they will be listed here and can be deleted anytime.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer transition-colors shadow-lg"
              >
                <Upload className="w-4 h-4" />
                <span>{isBn ? 'প্রথম ছবি আপলোড করুন' : 'Upload First Photo'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {photos.map((photo) => {
                const isDeleting = deletingId === photo.id;
                const isCopied = copiedId === photo.id;
                const formattedDate = new Date(photo.uploadedAt).toLocaleString(isBn ? 'bn-BD' : 'en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div
                    key={photo.id}
                    className="relative group rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all p-3 space-y-3 flex flex-col justify-between overflow-hidden shadow-lg"
                  >
                    {/* Image Preview & Badges */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                      <img
                        src={photo.url}
                        alt={photo.filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Source Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-emerald-400 font-bold">
                          {photo.url.startsWith('/') ? 'Server Disk' : 'IndexedDB'}
                        </span>
                      </div>

                      {/* Delete Quick Button (Hover Overlay) */}
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => handleDeletePhoto(photo)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-500/90 hover:bg-rose-500 text-white shadow-lg transition-all cursor-pointer opacity-90 hover:opacity-100 hover:scale-110"
                        title={isBn ? 'স্টোরেজ থেকে মুছুন (Delete)' : 'Delete from storage'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="truncate max-w-[150px] font-medium text-slate-300" title={photo.filename}>
                          {photo.filename}
                        </span>
                        {photo.sizeBytes && (
                          <span className="font-mono text-[10px] text-slate-400">
                            {Math.round(photo.sizeBytes / 1024)} KB
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 border-t border-slate-900 grid grid-cols-2 gap-2">
                      {/* Copy URL */}
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(photo)}
                        className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        title="Copy direct web link"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>{isBn ? 'URL কপি' : 'Copy URL'}</span>
                          </>
                        )}
                      </button>

                      {/* Select Photo for Teacher if callback provided, else Delete */}
                      {onSelectPhoto ? (
                        <button
                          type="button"
                          onClick={() => {
                            onSelectPhoto(photo.url);
                            onClose();
                          }}
                          className="py-1.5 px-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          <span>{isBn ? 'বাছাই করুন' : 'Select'}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDeletePhoto(photo)}
                          className="py-1.5 px-2 rounded-lg bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{isDeleting ? (isBn ? 'মুছছে...' : 'Deleting...') : (isBn ? 'মুছে ফেলুন' : 'Delete')}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>
            {isBn 
              ? '💡 টিপ: কোনো ছবি মুছে ফেললে তা স্থায়ীভাবে ডিস্ক ও ব্রাউজার মেমোরি থেকে মুছে যায়।' 
              : '💡 Tip: Deleting a photo clears it permanently from storage.'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
