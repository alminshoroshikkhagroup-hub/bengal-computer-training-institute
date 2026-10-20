import React, { useState, useEffect, useRef } from 'react';
import {
  initAuth,
  googleSignIn,
  logout,
  type User
} from '../services/googleDriveAuth';
import {
  listDriveFiles,
  getDriveStorageInfo,
  createDriveFolder,
  uploadFileToDrive,
  deleteDriveFile,
  getFileContentSnippet,
  type DriveFileItem,
  type DriveStorageInfo
} from '../services/googleDriveService';
import {
  listSpreadsheets,
  createSpreadsheet,
  getSpreadsheetValues,
  appendSpreadsheetValues,
  listDocuments,
  createDocument,
  getDocumentContent,
  insertDocumentText,
  listGmailMessages,
  sendGmailMessage,
  listCalendarEvents,
  createCalendarEvent,
  listPresentations,
  createPresentation,
  listTasks,
  createGoogleTask,
  listContacts,
  listClassroomCourses,
  type WorkspaceDocument,
  type GmailMessageItem,
  type CalendarEventItem,
  type GoogleTaskItem,
  type GoogleContactItem,
  type ClassroomCourseItem
} from '../services/googleWorkspaceService';
import {
  HardDrive,
  FolderPlus,
  Upload,
  RefreshCw,
  ExternalLink,
  Trash2,
  Folder,
  FileText,
  AlertTriangle,
  X,
  Lock,
  LogOut,
  Table,
  FileSpreadsheet,
  Plus,
  Eye,
  Mail,
  Calendar as CalendarIcon,
  Video,
  Presentation,
  CheckSquare,
  Users,
  GraduationCap,
  Send,
  Sparkles,
  CheckCircle2,
  Images,
  Clock,
  Copy,
  Check,
  Filter,
  Search,
  Grid,
  List,
  FolderOpen,
  ArrowLeft,
  Download,
  Share2,
  Layers,
  ChevronRight,
  Film,
  Music,
  BookOpen,
  AlignLeft,
  FileCode
} from 'lucide-react';

interface GoogleDrivePortalProps {
  onClose?: () => void;
}

type WorkspaceTab = 'drive' | 'photos' | 'sheets' | 'docs' | 'gmail' | 'calendar' | 'classroom' | 'contacts' | 'tasks';

export const GoogleDrivePortal: React.FC<GoogleDrivePortalProps> = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const formatStorageSize = (bytes?: string) => {
    if (!bytes) return '—';
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return '—';
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    if (num < 1024 * 1024 * 1024) return `${(num / (1024 * 1024)).toFixed(1)} MB`;
    return `${(num / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // Active Workspace Mode
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('drive');

  // Drive State
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [storageInfo, setStorageInfo] = useState<DriveStorageInfo | null>(null);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(undefined);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [drivePhotoOnly, setDrivePhotoOnly] = useState(false);

  // Enhanced Drive Navigation & Features State
  const [folderBreadcrumbs, setFolderBreadcrumbs] = useState<Array<{ id?: string; name: string }>>([
    { id: undefined, name: 'My Drive' }
  ]);
  const [driveSearchQuery, setDriveSearchQuery] = useState('');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [photoSearchQuery, setPhotoSearchQuery] = useState('');
  const [driveViewMode, setDriveViewMode] = useState<'grid' | 'list'>('grid');
  const [driveCategoryFilter, setDriveCategoryFilter] = useState<'all' | 'folders' | 'documents' | 'images' | 'spreadsheets'>('all');
  const [previewFile, setPreviewFile] = useState<DriveFileItem | null>(null);
  const [fileSnippetData, setFileSnippetData] = useState<{
    snippet: string;
    isSnippet: boolean;
    charCount?: number;
    wordCount?: number;
  } | null>(null);
  const [isLoadingSnippet, setIsLoadingSnippet] = useState(false);
  const [snippetError, setSnippetError] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'snippet' | 'details' | 'embed'>('snippet');
  const [isDragOverDrive, setIsDragOverDrive] = useState(false);
  const [isCreatingSmartFolders, setIsCreatingSmartFolders] = useState(false);
  const [copiedFileUrlId, setCopiedFileUrlId] = useState<string | null>(null);

  // Photos & Server Files State with Polling
  interface ServerPhotoItem {
    filename: string;
    path: string;
    size: number;
    createdAt: number;
  }
  const [serverPhotos, setServerPhotos] = useState<ServerPhotoItem[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [isPollingActive, setIsPollingActive] = useState(true);
  const [pollingIntervalSec, setPollingIntervalSec] = useState(10);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());
  const [copiedPhotoUrl, setCopiedPhotoUrl] = useState<string | null>(null);
  const [photoFilter, setPhotoFilter] = useState<'all' | 'teachers' | 'campus'>('all');
  const [isDeletingServerPhoto, setIsDeletingServerPhoto] = useState<string | null>(null);
  const photoUploadInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingServerPhoto, setIsUploadingServerPhoto] = useState(false);
  
  // Institute Cloud Storage Upload State
  const instituteFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingToCloud, setIsUploadingToCloud] = useState(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState<string | null>(null);

  // Sheets State
  const [sheetsList, setSheetsList] = useState<WorkspaceDocument[]>([]);
  const [isLoadingSheets, setIsLoadingSheets] = useState(false);
  const [showNewSheetModal, setShowNewSheetModal] = useState(false);
  const [newSheetTitle, setNewSheetTitle] = useState('');
  const [selectedSheetTemplate, setSelectedSheetTemplate] = useState<'roster' | 'fees' | 'blank'>('roster');
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [viewingSheet, setViewingSheet] = useState<{ id: string; title: string; rows: any[][] } | null>(null);
  const [isLoadingSheetRows, setIsLoadingSheetRows] = useState(false);
  const [newRowData, setNewRowData] = useState({ roll: '', name: '', course: '', phone: '', fee: '', status: 'পরিশোধিত' });

  // Docs & Slides State
  const [docsList, setDocsList] = useState<WorkspaceDocument[]>([]);
  const [presentationsList, setPresentationsList] = useState<WorkspaceDocument[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [selectedDocTemplate, setSelectedDocTemplate] = useState<'certificate' | 'admission' | 'blank'>('certificate');
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<{ id: string; title: string; body: string } | null>(null);
  const [isLoadingDocContent, setIsLoadingDocContent] = useState(false);
  const [docAppendText, setDocAppendText] = useState('');

  // Gmail State
  const [emails, setEmails] = useState<GmailMessageItem[]>([]);
  const [isLoadingEmails, setIsLoadingEmails] = useState(false);
  const [showComposeEmailModal, setShowComposeEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({ to: '', subject: '', body: '' });
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Calendar State
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({ summary: '', description: '', date: new Date().toISOString().split('T')[0], startTime: '10:00', endTime: '12:00' });
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  // Tasks State
  const [tasks, setTasks] = useState<GoogleTaskItem[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Contacts State
  const [contacts, setContacts] = useState<GoogleContactItem[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);

  // Classroom State
  const [classrooms, setClassrooms] = useState<ClassroomCourseItem[]>([]);
  const [isLoadingClassrooms, setIsLoadingClassrooms] = useState(false);

  // Init Auth listener on mount with session preservation
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken || null);
        setIsLoadingAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setIsLoadingAuth(false);
      },
      (currentUser) => {
        setUser(currentUser);
        setToken(null);
        setIsLoadingAuth(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch text/document snippet when a file is selected for preview
  useEffect(() => {
    if (!previewFile) {
      setFileSnippetData(null);
      setIsLoadingSnippet(false);
      setSnippetError(null);
      return;
    }

    let isMounted = true;
    const fetchSnippet = async () => {
      const mime = previewFile.mimeType || '';
      const name = previewFile.name || '';
      const isTextOrDoc = 
        mime.includes('document') ||
        mime.includes('spreadsheet') ||
        mime.startsWith('text/') ||
        mime.includes('json') ||
        mime.includes('javascript') ||
        mime.includes('xml') ||
        /\.(txt|csv|json|md|log|html|js|ts|jsx|tsx|css|xml|yaml|yml|pdf|docx?|xlsx?)$/i.test(name);

      if (!isTextOrDoc) {
        setFileSnippetData(null);
        setPreviewTab('details');
        return;
      }

      setPreviewTab('snippet');
      setIsLoadingSnippet(true);
      setSnippetError(null);

      try {
        if (token && previewFile.id) {
          const data = await getFileContentSnippet(token, previewFile.id, mime);
          if (isMounted) setFileSnippetData(data);
        } else if (previewFile.webViewLink?.startsWith('/') || previewFile.id?.startsWith('/')) {
          const path = previewFile.webViewLink || previewFile.id;
          const res = await fetch(path);
          if (res.ok) {
            const text = await res.text();
            const trimmed = text.trim();
            const maxLen = 3000;
            const isTruncated = trimmed.length > maxLen;
            const snippet = isTruncated ? trimmed.substring(0, maxLen) + '\n\n... [সম্পূর্ণ ফাইল দেখতে খুলুন]' : trimmed;
            const words = trimmed.split(/\s+/).filter(Boolean).length;
            if (isMounted) {
              setFileSnippetData({
                snippet,
                isSnippet: true,
                charCount: trimmed.length,
                wordCount: words,
              });
            }
          }
        }
      } catch {
        if (isMounted) {
          setSnippetError('কন্টেন্ট স্নিপেট লোড করা যায়নি (প্রয়োজনে সরাসরি ফাইলটি খুলুন)');
        }
      } finally {
        if (isMounted) setIsLoadingSnippet(false);
      }
    };

    fetchSnippet();
    return () => {
      isMounted = false;
    };
  }, [previewFile, token]);

  // Fetch photos from server (/api/list-photos)
  const fetchPhotos = async () => {
    setIsLoadingPhotos(true);
    try {
      const res = await fetch('/api/list-photos');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.photos)) {
          setServerPhotos(data.photos);
          setLastRefreshedAt(new Date());
        }
      }
    } catch (err) {
      console.warn('Failed to fetch photo list from server:', err);
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  // Re-fetch trigger for Refresh button
  const handleManualRefresh = async () => {
    await fetchPhotos();
    if (token && activeTab === 'drive') {
      await fetchDrive(token, currentFolderId);
    }
    showSuccess('ফটো ও ফাইলের তালিকা সফলভাবে রিফ্রেশ হয়েছে!');
  };

  // Delete photo from server
  const handleDeleteServerPhoto = async (filename: string) => {
    if (!window.confirm(`আপনি কি "${filename}" সার্ভার থেকে মুছে ফেলতে চান?`)) return;
    setIsDeletingServerPhoto(filename);
    try {
      const res = await fetch('/api/delete-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
      });
      if (res.ok) {
        setServerPhotos(prev => prev.filter(p => p.filename !== filename));
        showSuccess(`"${filename}" সফলভাবে মুছে ফেলা হয়েছে!`);
      }
    } catch {
      setErrorMsg('ছবি মুছতে ব্যর্থ হয়েছে');
    } finally {
      setIsDeletingServerPhoto(null);
    }
  };

  // Upload photo to server directly from portal
  const handleServerPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingServerPhoto(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const filename = `photo_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        const res = await fetch('/api/save-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, base64Data })
        });
        if (res.ok) {
          showSuccess(`"${file.name}" সফলভাবে আপলোড হয়েছে!`);
          await fetchPhotos();
        } else {
          setErrorMsg('ছবি আপলোড করা সম্ভব হয়নি');
        }
        setIsUploadingServerPhoto(false);
      };
      reader.onerror = () => {
        setIsUploadingServerPhoto(false);
        setErrorMsg('ফাইল পড়তে ব্যর্থ হয়েছে');
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUploadingServerPhoto(false);
      setErrorMsg('আপলোড প্রসেস ব্যর্থ হয়েছে');
    } finally {
      if (photoUploadInputRef.current) photoUploadInputRef.current.value = '';
    }
  };

  // Upload any file from local device to Institute Cloud Storage
  const handleInstituteCloudUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploadingToCloud(true);
    setUploadProgressMsg(`${selectedFiles.length}টি ফাইল আপলোড হচ্ছে...`);

    try {
      let uploadedCount = 0;
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        // 1. Upload to Institute Cloud Storage endpoint
        await new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async () => {
            try {
              const base64Data = reader.result as string;
              const sanitizedName = file.name.replace(/\s+/g, '_');
              const filename = `${Date.now()}_${sanitizedName}`;

              const res = await fetch('/api/upload-file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename, base64Data })
              });

              if (res.ok) {
                uploadedCount++;
              }
              resolve();
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = () => reject(new Error('ফাইল পড়তে ব্যর্থ হয়েছে'));
          reader.readAsDataURL(file);
        });

        // 2. Also upload to Google Drive if user is logged in
        if (token) {
          try {
            await uploadFileToDrive(token, file, file.name, currentFolderId);
          } catch (driveErr) {
            console.warn('Google Drive direct upload notice:', driveErr);
          }
        }
      }

      showSuccess(`"${selectedFiles[0].name}"${selectedFiles.length > 1 ? ` এবং আরো ${selectedFiles.length - 1}টি ফাইল` : ''} সফলভাবে ক্লাউড স্টোরেজে আপলোড হয়েছে!`);
      await handleManualRefresh();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'ফাইল আপলোড ব্যর্থ হয়েছে');
    } finally {
      setIsUploadingToCloud(false);
      setUploadProgressMsg(null);
      if (instituteFileInputRef.current) instituteFileInputRef.current.value = '';
    }
  };

  // Fetch functions
  const fetchDrive = async (accessToken: string, folderId?: string) => {
    setIsLoadingFiles(true);
    try {
      const data = await listDriveFiles(accessToken, { folderId, pageSize: 40 });
      setFiles(data.files);
      const storage = await getDriveStorageInfo(accessToken).catch(() => null);
      if (storage) setStorageInfo(storage);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'ফাইল লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Open folder navigation
  const handleOpenFolder = (folder: DriveFileItem) => {
    setCurrentFolderId(folder.id);
    setFolderBreadcrumbs(prev => [...prev, { id: folder.id, name: folder.name }]);
  };

  const handleNavigateBreadcrumb = (index: number) => {
    const target = folderBreadcrumbs[index];
    setFolderBreadcrumbs(prev => prev.slice(0, index + 1));
    setCurrentFolderId(target.id);
  };

  const handleGoBackFolder = () => {
    if (folderBreadcrumbs.length <= 1) return;
    const newBreadcrumbs = folderBreadcrumbs.slice(0, -1);
    const parentTarget = newBreadcrumbs[newBreadcrumbs.length - 1];
    setFolderBreadcrumbs(newBreadcrumbs);
    setCurrentFolderId(parentTarget.id);
  };

  // Create standard Institute folder structure in Drive with 1 click
  const handleCreateSmartFolders = async () => {
    if (!token) return;
    setIsCreatingSmartFolders(true);
    const defaultFolders = [
      '📁 ১. ভর্তি ও ছাত্রছাত্রী তথ্য (Admissions)',
      '📁 ২. ক্লাস রুটিন ও সিলেবাস (Routines)',
      '📁 ৩. শিক্ষক ও কর্মকর্তা প্রোফাইল (Faculty)',
      '📁 ৪. সার্টিফিকেট ও সনদপত্র (Certificates)',
      '📁 ৫. হিসাব ও ফি রসিদ (Accounts & Fees)'
    ];
    try {
      for (const name of defaultFolders) {
        await createDriveFolder(token, name, currentFolderId);
      }
      showSuccess('বেঙ্গল ইনস্টিটিউটের অফিসিয়াল ফোল্ডারসমূহ সফলভাবে ড্রাইভে তৈরি হয়েছে!');
      await fetchDrive(token, currentFolderId);
    } catch {
      setErrorMsg('ফোল্ডার বান্ডেল তৈরিতে ব্যর্থ হয়েছে');
    } finally {
      setIsCreatingSmartFolders(false);
    }
  };

  // Drag and drop upload for Drive
  const handleDriveDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverDrive(false);
    if (!token) return;
    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i];
        await uploadFileToDrive(token, file, file.name, currentFolderId);
      }
      showSuccess(`সফলভাবে ${droppedFiles.length}টি ফাইল ড্রাইভে আপলোড হয়েছে!`);
      await fetchDrive(token, currentFolderId);
    } catch {
      setErrorMsg('ড্রপ করা ফাইল আপলোড ব্যর্থ হয়েছে');
    } finally {
      setIsUploading(false);
    }
  };

  const getStoragePercentage = () => {
    if (!storageInfo?.usage || !storageInfo?.limit) return 0;
    const usage = parseInt(storageInfo.usage, 10);
    const limit = parseInt(storageInfo.limit, 10);
    if (isNaN(usage) || isNaN(limit) || limit === 0) return 0;
    return Math.min(Math.round((usage / limit) * 100), 100);
  };

  const fetchSheets = async (accessToken: string) => {
    setIsLoadingSheets(true);
    try {
      const list = await listSpreadsheets(accessToken);
      setSheetsList(list);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'স্প্রেডশিট লোড করা যায়নি');
    } finally {
      setIsLoadingSheets(false);
    }
  };

  const fetchDocsAndSlides = async (accessToken: string) => {
    setIsLoadingDocs(true);
    try {
      const [docs, slides] = await Promise.all([
        listDocuments(accessToken).catch(() => []),
        listPresentations(accessToken).catch(() => []),
      ]);
      setDocsList(docs);
      setPresentationsList(slides);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'ডকুমেন্ট ও স্লাইড লোড করা যায়নি');
    } finally {
      setIsLoadingDocs(false);
    }
  };

  const fetchGmail = async (accessToken: string) => {
    setIsLoadingEmails(true);
    try {
      const msgs = await listGmailMessages(accessToken);
      setEmails(msgs);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gmail লোড করা যায়নি');
    } finally {
      setIsLoadingEmails(false);
    }
  };

  const fetchCalendar = async (accessToken: string) => {
    setIsLoadingEvents(true);
    try {
      const evs = await listCalendarEvents(accessToken);
      setEvents(evs);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'ক্যালেন্ডার লোড করা যায়নি');
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const fetchTasksData = async (accessToken: string) => {
    setIsLoadingTasks(true);
    try {
      const tks = await listTasks(accessToken);
      setTasks(tks);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'টাস্ক লোড করা যায়নি');
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const fetchContactsData = async (accessToken: string) => {
    setIsLoadingContacts(true);
    try {
      const cts = await listContacts(accessToken);
      setContacts(cts);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'কন্টাক্টস লোড করা যায়নি');
    } finally {
      setIsLoadingContacts(false);
    }
  };

  const fetchClassroomData = async (accessToken: string) => {
    setIsLoadingClassrooms(true);
    try {
      const crs = await listClassroomCourses(accessToken);
      setClassrooms(crs);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'ক্লাসরুম লোড করা যায়নি');
    } finally {
      setIsLoadingClassrooms(false);
    }
  };

  // Switch tab loader
  useEffect(() => {
    if (activeTab === 'photos') {
      fetchPhotos();
      return;
    }
    if (!token) return;
    if (activeTab === 'drive') fetchDrive(token, currentFolderId);
    else if (activeTab === 'sheets') fetchSheets(token);
    else if (activeTab === 'docs') fetchDocsAndSlides(token);
    else if (activeTab === 'gmail') fetchGmail(token);
    else if (activeTab === 'calendar') fetchCalendar(token);
    else if (activeTab === 'tasks') fetchTasksData(token);
    else if (activeTab === 'contacts') fetchContactsData(token);
    else if (activeTab === 'classroom') fetchClassroomData(token);
  }, [token, activeTab, currentFolderId]);

  // Periodic polling interval to periodically update UI with new files from the server
  useEffect(() => {
    // Initial fetch of server photos
    fetchPhotos();

    if (!isPollingActive) return;

    const intervalId = setInterval(() => {
      fetchPhotos();
      if (token && activeTab === 'drive') {
        fetchDrive(token, currentFolderId);
      }
    }, pollingIntervalSec * 1000);

    return () => clearInterval(intervalId);
  }, [isPollingActive, pollingIntervalSec, token, activeTab, currentFolderId]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        showSuccess('গুগল অ্যাকাউন্ট সফলভাবে সংযুক্ত হয়েছে!');
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'সাইন-ইন সম্পন্ন হয়নি');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
  };

  // Safe delete with explicit confirmation dialog (MANDATORY per Workspace Integration skill)
  const handleConfirmDelete = async () => {
    if (!fileToDelete || !token) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(token, fileToDelete.id);
      setFileToDelete(null);
      showSuccess(`"${fileToDelete.name}" সফলভাবে ডিলিট করা হয়েছে`);
      await fetchDrive(token, currentFolderId);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'ফাইল ডিলিট করা যায়নি');
    } finally {
      setIsDeleting(false);
    }
  };

  // Send Email handler
  const handleSendEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !emailForm.to || !emailForm.subject) return;
    setIsSendingEmail(true);
    try {
      await sendGmailMessage(token, emailForm.to, emailForm.subject, emailForm.body);
      showSuccess('ইমেইল সফলভাবে পাঠানো হয়েছে!');
      setShowComposeEmailModal(false);
      setEmailForm({ to: '', subject: '', body: '' });
      await fetchGmail(token);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'ইমেইল পাঠানো যায়নি');
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Create Calendar Event handler
  const handleCreateEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !eventForm.summary) return;
    setIsCreatingEvent(true);
    try {
      const startIso = `${eventForm.date}T${eventForm.startTime}:00+06:00`;
      const endIso = `${eventForm.date}T${eventForm.endTime}:00+06:00`;
      await createCalendarEvent(token, {
        summary: eventForm.summary,
        description: eventForm.description,
        startIso,
        endIso,
      });
      showSuccess('ক্লাস / পরীক্ষা শিডিউল ক্যালেন্ডারে যুক্ত হয়েছে!');
      setShowNewEventModal(false);
      setEventForm({ summary: '', description: '', date: new Date().toISOString().split('T')[0], startTime: '10:00', endTime: '12:00' });
      await fetchCalendar(token);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'ক্যালেন্ডার ইভেন্ট তৈরি করা যায়নি');
    } finally {
      setIsCreatingEvent(false);
    }
  };

  // Create Task handler
  const handleCreateTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newTaskTitle.trim()) return;
    try {
      await createGoogleTask(token, newTaskTitle.trim(), 'বেঙ্গল কম্পিউটার ট্রেনিং ইনস্টিটিউট কুষ্টিয়া');
      setNewTaskTitle('');
      showSuccess('টাস্ক যুক্ত হয়েছে!');
      await fetchTasksData(token);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'টাস্ক তৈরি করা যায়নি');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Header & Auth Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500/20 via-emerald-500/20 to-blue-500/20 border border-emerald-500/30 text-emerald-400">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Google Workspace™ কমপ্লিট স্যুট</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                10+ Services Active
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              ড্রাইভ, স্প্রেডশিট, জিমেইল, ক্যালেন্ডার, মিট, ক্লাসরুম ও কন্টাক্টস
            </p>
          </div>
        </div>

        {/* User Account / Login State & Quick Upload */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => instituteFileInputRef.current?.click()}
            disabled={isUploadingToCloud}
            className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
            title="আপনার লোকাল ডিভাইস থেকে ফাইল নির্বাচন করে ক্লাউডে আপলোড করুন"
          >
            <Upload className={`w-3.5 h-3.5 ${isUploadingToCloud ? 'animate-bounce' : ''}`} />
            <span>{isUploadingToCloud ? (uploadProgressMsg || 'আপলোড হচ্ছে...') : 'Upload File'}</span>
          </button>

          {isLoadingAuth ? (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>চেক হচ্ছে...</span>
            </div>
          ) : user ? (
            <div className="flex items-center gap-2.5 bg-slate-950 p-1.5 pr-3 rounded-xl border border-slate-800">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-7 h-7 rounded-lg object-cover border border-slate-700"
                />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div className="text-left text-[11px] leading-tight max-w-[150px] truncate">
                <span className="font-semibold text-white block truncate">{user.displayName || 'গুগল ব্যবহারকারী'}</span>
                <span className="text-slate-400 text-[10px] block truncate">{user.email}</span>
              </div>

              {!token ? (
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="py-1 px-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 shadow-sm cursor-pointer ml-1"
                  title="গুগল সেশনটি পুনরায় কানেক্ট করুন"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoggingIn ? 'animate-spin' : ''}`} />
                  <span>{isLoggingIn ? 'কানেক্ট হচ্ছে...' : 'রিকানেক্ট'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors ml-1 cursor-pointer"
                  title="লগআউট"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:opacity-95 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <HardDrive className="w-3.5 h-3.5 text-slate-950" />
              <span>{isLoggingIn ? 'সাইন-ইন হচ্ছে...' : 'Sign in with Google'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Workspace Service Nav Pills */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('drive')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'drive' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Folder className="w-3.5 h-3.5" />
          <span>Drive</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('photos')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'photos' ? 'bg-cyan-500 text-slate-950 shadow-sm font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Images className="w-3.5 h-3.5" />
          <span>ফটো ও মিডিয়া</span>
          {serverPhotos.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px] font-mono text-cyan-200">
              {serverPhotos.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sheets')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'sheets' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Sheets</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('docs')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'docs' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Docs & Slides</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gmail')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'gmail' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Gmail</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('calendar')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'calendar' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Calendar & Meet</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('classroom')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'classroom' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Classroom</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contacts')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'contacts' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Contacts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tasks')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'tasks' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Tasks</span>
        </button>
      </div>

      {/* Hidden File Input for Device Upload to Institute Cloud Storage */}
      <input
        ref={instituteFileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleInstituteCloudUpload}
      />

      {/* Global Refresh Bar with Auto-Polling Status, Upload File & Real-time Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs shadow-inner">
        <div className="flex flex-wrap items-center gap-2">
          {/* Upload File Button */}
          <button
            type="button"
            onClick={() => instituteFileInputRef.current?.click()}
            disabled={isUploadingToCloud}
            className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
            title="আপনার ডিভাইস থেকে ফাইল নির্বাচন করে ইনস্টিটিউটের ক্লাউড স্টোরেজে আপলোড করুন"
          >
            <Upload className={`w-3.5 h-3.5 ${isUploadingToCloud ? 'animate-bounce' : ''}`} />
            <span>{isUploadingToCloud ? (uploadProgressMsg || 'আপলোড হচ্ছে...') : 'ফাইল আপলোড (Upload File)'}</span>
          </button>

          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={isLoadingFiles || isLoadingPhotos || isUploadingToCloud}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
            title="সার্ভার থেকে ফটো ও ফাইল তালিকা রিফ্রেশ করুন"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles || isLoadingPhotos ? 'animate-spin' : ''}`} />
            <span>রিফ্রেশ</span>
          </button>

          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] hidden sm:flex">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>শেষ আপডেট: {lastRefreshedAt.toLocaleTimeString('bn-BD')}</span>
          </div>
        </div>

        {/* Real-time Filename Search Input Field */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setGlobalSearchQuery(val);
              setDriveSearchQuery(val);
              setPhotoSearchQuery(val);
            }}
            placeholder="ফাইলের নাম লিখে রিয়েল-টাইমে খুঁজুন..."
            className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {globalSearchQuery && (
            <button
              type="button"
              onClick={() => {
                setGlobalSearchQuery('');
                setDriveSearchQuery('');
                setPhotoSearchQuery('');
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              title="সার্চ ক্লিয়ার করুন"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Polling Interval Indicator & Frequency Selector */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPollingActive(!isPollingActive)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              isPollingActive 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title={isPollingActive ? "অটো-পোলিং বিরতি দিন" : "অটো-পোলিং চালু করুন"}
          >
            <span className={`w-2 h-2 rounded-full ${isPollingActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span>{isPollingActive ? `লাইভ পোলিং সক্রিয় (${pollingIntervalSec}s)` : 'পোলিং পজড'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>বিরতি:</span>
            <select
              value={pollingIntervalSec}
              onChange={(e) => setPollingIntervalSec(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 rounded-md px-2 py-0.5 text-[11px] text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value={5}>৫ সে.</option>
              <option value={10}>১০ সে.</option>
              <option value={20}>২০ সে.</option>
              <option value={30}>৩০ সে.</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Unauthenticated or Reconnect Needed View */}
      {!token && activeTab !== 'photos' && (
        <div className="py-12 px-4 rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-3">
          <Lock className="w-10 h-10 text-slate-500 mx-auto" />
          <h4 className="text-white font-bold text-base">
            {user ? 'গুগল সেশনটি পুনরায় সংযুক্ত করুন (Session Reconnect Needed)' : 'Google Workspace সংযোগ প্রয়োজন'}
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            {user 
              ? `আপনার অ্যাকাউন্ট "${user.email}" সংযুক্ত আছে। ক্লাউড ফাইল, স্প্রেডশিট ও জিমেইল তথ্যের নিরাপত্তা বজায় রাখতে নিচে ক্লিক করে গুগল ওয়ার্কস্পেস সেশনটি রিকানেক্ট করুন।`
              : 'বেঙ্গল ইনস্টিটিউটের ক্লাউড ফাইল, স্প্রেডশিট, জিমেইল নোটিফিকেশন, ক্যালেন্ডার শিডিউল ও ক্লাসরুম সুবিধা ব্যবহার করতে আপনার গুগল অ্যাকাউন্ট দিয়ে সাইন-ইন করুন।'}
          </p>
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {user ? <RefreshCw className={`w-4 h-4 ${isLoggingIn ? 'animate-spin' : ''}`} /> : <HardDrive className="w-4 h-4" />}
            <span>{isLoggingIn ? 'সংযুক্ত হচ্ছে...' : user ? 'পুনরায় সংযুক্ত করুন (Reconnect Session)' : 'Sign in with Google'}</span>
          </button>
        </div>
      )}

      {/* TAB: PHOTOS & SERVER MEDIA (Always accessible with auto-polling & manual refresh) */}
      {activeTab === 'photos' && (
        <div className="space-y-4">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={photoUploadInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleServerPhotoUpload}
              />
              <button
                type="button"
                onClick={() => photoUploadInputRef.current?.click()}
                disabled={isUploadingServerPhoto}
                className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploadingServerPhoto ? 'আপলোড হচ্ছে...' : 'নতুন ছবি আপলোড'}</span>
              </button>

              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={isLoadingPhotos}
                className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="সার্ভার থেকে ফটো তালিকা রিফ্রেশ করুন"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingPhotos ? 'animate-spin' : ''}`} />
                <span>রিফ্রেশ (Re-fetch)</span>
              </button>
            </div>

            {/* Real-time Search Field for Photos */}
            <div className="relative min-w-[180px] flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={photoSearchQuery}
                onChange={(e) => {
                  setPhotoSearchQuery(e.target.value);
                  setGlobalSearchQuery(e.target.value);
                }}
                placeholder="ছবির ফাইলনেম খুঁজুন..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
              />
              {photoSearchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setPhotoSearchQuery('');
                    setGlobalSearchQuery('');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  title="ক্লিয়ার করুন"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setPhotoFilter('all')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  photoFilter === 'all' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                সকল ({serverPhotos.length})
              </button>
              <button
                type="button"
                onClick={() => setPhotoFilter('teachers')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  photoFilter === 'teachers' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                শিক্ষক ({serverPhotos.filter(p => p.filename.startsWith('teacher_') || p.filename.startsWith('founder-')).length})
              </button>
              <button
                type="button"
                onClick={() => setPhotoFilter('campus')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  photoFilter === 'campus' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                ক্যাম্পাস ও অন্যান্য ({serverPhotos.filter(p => !p.filename.startsWith('teacher_') && !p.filename.startsWith('founder-')).length})
              </button>
            </div>
          </div>

          {/* Real-time search feedback indicator if search query exists */}
          {photoSearchQuery.trim() && (
            <div className="p-2.5 px-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>
                  রিয়েল-টাইম অনুসন্ধান: <span className="font-bold text-white">"{photoSearchQuery}"</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPhotoSearchQuery('');
                  setGlobalSearchQuery('');
                }}
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>ক্লিয়ার</span>
              </button>
            </div>
          )}

          {/* Photos Grid */}
          {isLoadingPhotos && serverPhotos.length === 0 ? (
            <div className="py-14 text-center space-y-3 bg-slate-950 rounded-2xl border border-slate-800">
              <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400">সার্ভার থেকে ফটো তালিকা লোড হচ্ছে...</p>
            </div>
          ) : serverPhotos.length === 0 ? (
            <div className="py-12 text-center space-y-3 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800 p-6">
              <Images className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">কোনো ফটো পাওয়া যায়নি</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                সার্ভারে এখনো কোনো ছবি আপলোড করা হয়নি। "নতুন ছবি আপলোড" বাটনে ক্লিক করে প্রথম ছবি আপলোড করুন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {serverPhotos
                .filter((p) => {
                  if (photoSearchQuery.trim() && !p.filename.toLowerCase().includes(photoSearchQuery.toLowerCase())) {
                    return false;
                  }
                  if (photoFilter === 'teachers') return p.filename.startsWith('teacher_') || p.filename.startsWith('founder-');
                  if (photoFilter === 'campus') return !p.filename.startsWith('teacher_') && !p.filename.startsWith('founder-');
                  return true;
                })
                .map((photo) => {
                  const isCopied = copiedPhotoUrl === photo.path;
                  const formattedSize = photo.size < 1024 * 1024 
                    ? `${(photo.size / 1024).toFixed(1)} KB` 
                    : `${(photo.size / (1024 * 1024)).toFixed(1)} MB`;

                  return (
                    <div
                      key={photo.filename}
                      className="group rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 p-2 space-y-2 flex flex-col justify-between overflow-hidden shadow-md transition-all"
                    >
                      {/* Image Thumbnail */}
                      <div 
                        onClick={() => setPreviewFile({
                          id: photo.path,
                          name: photo.filename,
                          mimeType: 'image/jpeg',
                          webViewLink: photo.path,
                          size: String(photo.size),
                          modifiedTime: new Date(photo.createdAt).toISOString()
                        })}
                        className="relative aspect-square rounded-lg overflow-hidden bg-slate-900 border border-slate-800/80 cursor-pointer"
                        title="ক্লিক করে প্রিভিউ ও বিবরণী দেখুন"
                      >
                        <img
                          src={photo.path}
                          alt={photo.filename}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-[9px] font-mono text-emerald-400 font-semibold">
                          {formattedSize}
                        </span>
                      </div>

                      {/* Info & Filename */}
                      <div 
                        onClick={() => setPreviewFile({
                          id: photo.path,
                          name: photo.filename,
                          mimeType: 'image/jpeg',
                          webViewLink: photo.path,
                          size: String(photo.size),
                          modifiedTime: new Date(photo.createdAt).toISOString()
                        })}
                        className="space-y-0.5 cursor-pointer"
                      >
                        <p className="text-[11px] font-bold text-white truncate hover:text-emerald-400 transition-colors" title={photo.filename}>
                          {photo.filename}
                        </p>
                        <p className="text-[9px] text-slate-500 font-mono">
                          {new Date(photo.createdAt).toLocaleDateString('bn-BD')}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="pt-1.5 border-t border-slate-900 flex items-center justify-between gap-1">
                        <button
                          type="button"
                          onClick={() => setPreviewFile({
                            id: photo.path,
                            name: photo.filename,
                            mimeType: 'image/jpeg',
                            webViewLink: photo.path,
                            size: String(photo.size),
                            modifiedTime: new Date(photo.createdAt).toISOString()
                          })}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="প্রিভিউ ও বিস্তারিত দেখুন"
                        >
                          <Eye className="w-3 h-3 text-cyan-400" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const full = typeof window !== 'undefined' ? `${window.location.origin}${photo.path}` : photo.path;
                            navigator.clipboard.writeText(full);
                            setCopiedPhotoUrl(photo.path);
                            showSuccess('ছবির URL কপি হয়েছে!');
                            setTimeout(() => setCopiedPhotoUrl(null), 2000);
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="লিংক কপি করুন"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                        </button>

                        <a
                          href={photo.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                          title="ব্রাউজারে বড় করে দেখুন"
                        >
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>

                        <button
                          type="button"
                          disabled={isDeletingServerPhoto === photo.filename}
                          onClick={() => handleDeleteServerPhoto(photo.filename)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                          title="সার্ভার থেকে মুছে ফেলুন"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* TAB: DRIVE (Advanced Cloud File Manager) */}
      {token && activeTab === 'drive' && (
        <div className="space-y-4">
          
          {/* Top Storage Bar & Smart Actions */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-inner">
            <div className="flex-1 min-w-[200px] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                  <span>গুগল ড্রাইভ স্টোরেজ</span>
                </span>
                {storageInfo && (
                  <span className="text-[11px] font-mono text-slate-400">
                    <span className="text-emerald-400 font-bold">{formatStorageSize(storageInfo.usage)}</span> / {formatStorageSize(storageInfo.limit)} ({getStoragePercentage()}%)
                  </span>
                )}
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    getStoragePercentage() > 85 ? 'bg-rose-500' : getStoragePercentage() > 65 ? 'bg-amber-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  }`}
                  style={{ width: `${Math.max(getStoragePercentage(), 3)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isCreatingSmartFolders}
                onClick={handleCreateSmartFolders}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                title="বেঙ্গল ইনস্টিটিউটের জন্য ৫টি স্ট্যান্ডার্ড অফিসিয়াল ফোল্ডার স্বয়ংক্রিয়ভাবে তৈরি করুন"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isCreatingSmartFolders ? 'তৈরি হচ্ছে...' : '⚡ ইনস্টিটিউট ফোল্ডার বান্ডেল'}</span>
              </button>
            </div>
          </div>

          {/* Breadcrumb Navigation & Back Button */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              {folderBreadcrumbs.length > 1 && (
                <button
                  type="button"
                  onClick={handleGoBackFolder}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors mr-1"
                  title="পূর্ববর্তী ফোল্ডারে ফিরে যান"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>পিছনে</span>
                </button>
              )}

              {folderBreadcrumbs.map((crumb, idx) => {
                const isLast = idx === folderBreadcrumbs.length - 1;
                return (
                  <div key={crumb.id || 'root'} className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleNavigateBreadcrumb(idx)}
                      className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 font-bold ${
                        isLast 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 pointer-events-none' 
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer'
                      }`}
                    >
                      {idx === 0 ? <HardDrive className="w-3 h-3" /> : <Folder className="w-3 h-3 text-amber-400" />}
                      <span>{crumb.name}</span>
                    </button>
                    {!isLast && <ChevronRight className="w-3 h-3 text-slate-600" />}
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              মোট: <span className="text-white font-bold">{files.length}</span>টি ফাইল/ফোল্ডার
            </div>
          </div>

          {/* Action Toolbar: Upload, New Folder, Refresh, Search & View Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
            {/* Left Upload & Folder Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                multiple
                onChange={async (e) => {
                  const selectedFiles = e.target.files;
                  if (!selectedFiles || selectedFiles.length === 0 || !token) return;
                  setIsUploading(true);
                  try {
                    for (let i = 0; i < selectedFiles.length; i++) {
                      await uploadFileToDrive(token, selectedFiles[i], selectedFiles[i].name, currentFolderId);
                    }
                    showSuccess(`"${selectedFiles[0].name}"${selectedFiles.length > 1 ? ` এবং আরো ${selectedFiles.length - 1}টি ফাইল` : ''} আপলোড সম্পন্ন হয়েছে!`);
                    await fetchDrive(token, currentFolderId);
                  } catch {
                    setErrorMsg('ফাইল আপলোড করা যায়নি');
                  } finally {
                    setIsUploading(false);
                  }
                }} 
                className="hidden" 
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'আপলোড হচ্ছে...' : 'ফাইল আপলোড'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowNewFolderModal(true)}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5 text-amber-400" />
                <span>নতুন ফোল্ডার</span>
              </button>

              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={isLoadingFiles}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                title="ড্রাইভ ফাইল ও ছবি রিফ্রেশ করুন"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                <span>রিফ্রেশ</span>
              </button>
            </div>

            {/* Right Search & View Switcher */}
            <div className="flex flex-wrap items-center gap-2 flex-1 sm:flex-initial justify-end">
              <div className="relative min-w-[190px] flex-1 sm:flex-initial">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={driveSearchQuery}
                  onChange={(e) => {
                    setDriveSearchQuery(e.target.value);
                    setGlobalSearchQuery(e.target.value);
                  }}
                  placeholder="ফাইলের নাম লিখে রিয়েল-টাইমে খুঁজুন..."
                  className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
                />
                {driveSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setDriveSearchQuery('');
                      setGlobalSearchQuery('');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                    title="ক্লিয়ার করুন"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* View Mode Toggle: Grid vs List */}
              <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setDriveViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    driveViewMode === 'grid' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="গ্রিড কার্ড ভিউ"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDriveViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    driveViewMode === 'list' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="লিস্ট ভিউ"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" />
              <span>ফিল্টার:</span>
            </span>
            <button
              type="button"
              onClick={() => setDriveCategoryFilter('all')}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                driveCategoryFilter === 'all' 
                  ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                  : 'bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              সকল ফাইল ({files.length})
            </button>
            <button
              type="button"
              onClick={() => setDriveCategoryFilter('folders')}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                driveCategoryFilter === 'folders' 
                  ? 'bg-amber-500 text-slate-950 shadow-sm' 
                  : 'bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              📁 ফোল্ডার ({files.filter(f => f.mimeType === 'application/vnd.google-apps.folder').length})
            </button>
            <button
              type="button"
              onClick={() => setDriveCategoryFilter('images')}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                driveCategoryFilter === 'images' 
                  ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                  : 'bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              🖼️ ছবি ও ফটো ({files.filter(f => f.mimeType.includes('image/') || /\.(jpe?g|png|webp|svg|gif)$/i.test(f.name)).length})
            </button>
            <button
              type="button"
              onClick={() => setDriveCategoryFilter('documents')}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                driveCategoryFilter === 'documents' 
                  ? 'bg-sky-500 text-slate-950 shadow-sm' 
                  : 'bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              📄 ডকুমেন্টস / PDF ({files.filter(f => f.mimeType.includes('document') || f.mimeType.includes('pdf') || /\.(docx?|pdf|txt)$/i.test(f.name)).length})
            </button>
            <button
              type="button"
              onClick={() => setDriveCategoryFilter('spreadsheets')}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                driveCategoryFilter === 'spreadsheets' 
                  ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                  : 'bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              📊 স্প্রেডশিট ({files.filter(f => f.mimeType.includes('spreadsheet') || /\.(xlsx?|csv)$/i.test(f.name)).length})
            </button>
          </div>

          {/* Real-time search feedback indicator for Drive */}
          {driveSearchQuery.trim() && (
            <div className="p-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>
                  রিয়েল-টাইম অনুসন্ধান: <span className="font-bold text-white">"{driveSearchQuery}"</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDriveSearchQuery('');
                  setGlobalSearchQuery('');
                }}
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>ক্লিয়ার</span>
              </button>
            </div>
          )}

          {/* Drag-and-Drop Area & Files Grid/List */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOverDrive(true); }}
            onDragLeave={() => setIsDragOverDrive(false)}
            onDrop={handleDriveDrop}
            className={`relative rounded-2xl transition-all duration-300 ${
              isDragOverDrive ? 'ring-2 ring-emerald-500 bg-emerald-500/10' : ''
            }`}
          >
            {isDragOverDrive && (
              <div className="absolute inset-0 z-30 bg-emerald-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-emerald-400 text-emerald-300 space-y-2 pointer-events-none">
                <Upload className="w-10 h-10 animate-bounce text-emerald-400" />
                <p className="text-sm font-bold">ফাইলগুলো গুগল ড্রাইভে আপলোড করতে এখানে ড্রপ করুন</p>
              </div>
            )}

            {isLoadingFiles ? (
              <div className="py-16 text-center space-y-3 bg-slate-950 rounded-2xl border border-slate-800">
                <RefreshCw className="w-7 h-7 text-emerald-400 animate-spin mx-auto" />
                <p className="text-xs text-slate-400">ড্রাইভ ফাইল লোড হচ্ছে...</p>
              </div>
            ) : files.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800 p-8">
                <FolderOpen className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-300">এই ফোল্ডারে কোনো ফাইল নেই</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  উপরের "ফাইল আপলোড" বাটনে ক্লিক করে অথবা সরাসরি যেকোনো ফাইল টেনে এনে এখানে ড্রপ করে আপলোড করুন।
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Upload className="w-4 h-4" />
                    <span>ফাইল আপলোড করুন</span>
                  </button>
                </div>
              </div>
            ) : (
              (() => {
                // Filter files by category & search query
                const filtered = files.filter((file) => {
                  if (driveSearchQuery.trim()) {
                    if (!file.name.toLowerCase().includes(driveSearchQuery.toLowerCase())) return false;
                  }
                  if (driveCategoryFilter === 'folders') return file.mimeType === 'application/vnd.google-apps.folder';
                  if (driveCategoryFilter === 'images') return file.mimeType.includes('image/') || /\.(jpe?g|png|webp|svg|gif)$/i.test(file.name);
                  if (driveCategoryFilter === 'documents') return file.mimeType.includes('document') || file.mimeType.includes('pdf') || /\.(docx?|pdf|txt)$/i.test(file.name);
                  if (driveCategoryFilter === 'spreadsheets') return file.mimeType.includes('spreadsheet') || /\.(xlsx?|csv)$/i.test(file.name);
                  return true;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="py-12 text-center text-xs text-slate-400 bg-slate-950 rounded-2xl border border-slate-800">
                      ফিল্টারের সাথে মেলে এমন কোনো ফাইল পাওয়া যায়নি।
                    </div>
                  );
                }

                // GRID VIEW
                if (driveViewMode === 'grid') {
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[500px] overflow-y-auto pr-1">
                      {filtered.map((file) => {
                        const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                        const isImage = file.mimeType.includes('image/') || /\.(jpe?g|png|webp|svg|gif)$/i.test(file.name);
                        const isSpreadsheet = file.mimeType.includes('spreadsheet') || /\.(xlsx?|csv)$/i.test(file.name);
                        const isDoc = file.mimeType.includes('document') || file.mimeType.includes('pdf') || /\.(docx?|pdf|txt)$/i.test(file.name);
                        const isCopied = copiedFileUrlId === file.id;

                        return (
                          <div
                            key={file.id}
                            onDoubleClick={() => isFolder && handleOpenFolder(file)}
                            className="group rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 p-3 space-y-2 flex flex-col justify-between overflow-hidden shadow-lg transition-all hover:-translate-y-0.5"
                          >
                            {/* Visual Thumbnail / Icon Header */}
                            <div 
                              onClick={() => isFolder ? handleOpenFolder(file) : setPreviewFile(file)}
                              className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80 flex items-center justify-center cursor-pointer"
                            >
                              {isImage ? (
                                file.thumbnailLink ? (
                                  <img src={file.thumbnailLink} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                ) : (
                                  <Images className="w-8 h-8 text-cyan-400" />
                                )
                              ) : isFolder ? (
                                <Folder className="w-10 h-10 text-amber-400 group-hover:scale-110 transition-transform" />
                              ) : isSpreadsheet ? (
                                <FileSpreadsheet className="w-10 h-10 text-emerald-400" />
                              ) : isDoc ? (
                                <FileText className="w-10 h-10 text-sky-400" />
                              ) : (
                                <HardDrive className="w-8 h-8 text-slate-400" />
                              )}

                              {isFolder && (
                                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-500/30">
                                  ফোল্ডার
                                </span>
                              )}
                            </div>

                            {/* File Name & Info */}
                            <div className="space-y-0.5">
                              <p 
                                onClick={() => isFolder ? handleOpenFolder(file) : setPreviewFile(file)}
                                className="text-xs font-bold text-white truncate cursor-pointer hover:text-emerald-400 transition-colors" 
                                title={file.name}
                              >
                                {file.name}
                              </p>
                              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                <span>{file.size ? formatStorageSize(file.size) : isFolder ? 'Folder' : '—'}</span>
                                {file.modifiedTime && (
                                  <span>{new Date(file.modifiedTime).toLocaleDateString('bn-BD', { month: 'short', day: 'numeric' })}</span>
                                )}
                              </div>
                            </div>

                            {/* Quick Action Icons */}
                            <div className="pt-2 border-t border-slate-900 flex items-center justify-between gap-1">
                              {isFolder ? (
                                <button
                                  type="button"
                                  onClick={() => handleOpenFolder(file)}
                                  className="flex-1 py-1 px-2 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <FolderOpen className="w-3 h-3" />
                                  <span>খুলুন</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setPreviewFile(file)}
                                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="প্রিভিউ ও বিস্তারিত দেখুন"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
                                  title="গুগল ড্রাইভে খুলুন"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}

                              {file.webViewLink && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(file.webViewLink!);
                                    setCopiedFileUrlId(file.id);
                                    showSuccess('ড্রাইভ লিংক ক্লিপবোর্ডে কপি হয়েছে!');
                                    setTimeout(() => setCopiedFileUrlId(null), 2000);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="লিংক কপি করুন"
                                >
                                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => setFileToDelete(file)}
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
                                title="মুছে ফেলুন"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                // LIST VIEW
                return (
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 divide-y divide-slate-800/80 max-h-[500px] overflow-y-auto">
                    {filtered.map((file) => {
                      const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                      const isImage = file.mimeType.includes('image/') || /\.(jpe?g|png|webp|svg|gif)$/i.test(file.name);
                      const isSpreadsheet = file.mimeType.includes('spreadsheet') || /\.(xlsx?|csv)$/i.test(file.name);
                      const isDoc = file.mimeType.includes('document') || file.mimeType.includes('pdf') || /\.(docx?|pdf|txt)$/i.test(file.name);
                      const isCopied = copiedFileUrlId === file.id;

                      return (
                        <div
                          key={file.id}
                          className="p-3 hover:bg-slate-900/60 flex items-center justify-between gap-3 text-xs transition-colors"
                        >
                          <div 
                            onClick={() => isFolder ? handleOpenFolder(file) : setPreviewFile(file)}
                            className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                          >
                            {isImage ? (
                              file.thumbnailLink ? (
                                <img src={file.thumbnailLink} alt="" className="w-7 h-7 rounded-lg object-cover border border-slate-700 shrink-0" />
                              ) : (
                                <Images className="w-5 h-5 text-cyan-400 shrink-0" />
                              )
                            ) : isFolder ? (
                              <Folder className="w-5 h-5 text-amber-400 shrink-0" />
                            ) : isSpreadsheet ? (
                              <FileSpreadsheet className="w-5 h-5 text-emerald-400 shrink-0" />
                            ) : isDoc ? (
                              <FileText className="w-5 h-5 text-sky-400 shrink-0" />
                            ) : (
                              <HardDrive className="w-5 h-5 text-slate-400 shrink-0" />
                            )}
                            
                            <div className="min-w-0">
                              <span className="font-bold text-slate-200 hover:text-emerald-400 transition-colors truncate block">
                                {file.name}
                              </span>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                <span>{isFolder ? 'ফোল্ডার' : file.size ? formatStorageSize(file.size) : 'File'}</span>
                                {file.modifiedTime && (
                                  <>
                                    <span>•</span>
                                    <span>{new Date(file.modifiedTime).toLocaleDateString('bn-BD')}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {isFolder ? (
                              <button
                                type="button"
                                onClick={() => handleOpenFolder(file)}
                                className="py-1 px-2.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <FolderOpen className="w-3.5 h-3.5" />
                                <span>খুলুন</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setPreviewFile(file)}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                title="প্রিভিউ দেখুন"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
                                title="গুগল ড্রাইভে খুলুন"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {file.webViewLink && (
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(file.webViewLink!);
                                  setCopiedFileUrlId(file.id);
                                  showSuccess('ড্রাইভ লিংক ক্লিপবোর্ডে কপি হয়েছে!');
                                  setTimeout(() => setCopiedFileUrlId(null), 2000);
                                }}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                title="লিংক কপি করুন"
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => setFileToDelete(file)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()
            )}
          </div>
        </div>
      )}

      {/* TAB: SHEETS */}
      {token && activeTab === 'sheets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">গুগল স্প্রেডশিট পোর্টাল (ভর্তি ও ফি রেজিস্টার)</span>
            <button
              type="button"
              onClick={() => setShowNewSheetModal(true)}
              className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>নতুন স্প্রেডশিট</span>
            </button>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800 max-h-72 overflow-y-auto">
            {isLoadingSheets ? (
              <div className="py-8 text-center text-xs text-slate-400">স্প্রেডশিট লোড হচ্ছে...</div>
            ) : sheetsList.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">কোনো স্প্রেডশিট পাওয়া যায়নি</div>
            ) : (
              sheetsList.map((sheet) => (
                <div key={sheet.id} className="p-3 hover:bg-slate-900 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Table className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-white">{sheet.name}</span>
                  </div>
                  <a
                    href={sheet.webViewLink || `https://docs.google.com/spreadsheets/d/${sheet.id}/edit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Sheets-এ খুলুন</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB: GMAIL */}
      {token && activeTab === 'gmail' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">Gmail ইনবক্স ও ইমেইল প্রেরণ</span>
            <button
              type="button"
              onClick={() => setShowComposeEmailModal(true)}
              className="py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>ইমেইল পাঠান</span>
            </button>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800 max-h-72 overflow-y-auto">
            {isLoadingEmails ? (
              <div className="py-8 text-center text-xs text-slate-400">ইমেইল লোড হচ্ছে...</div>
            ) : emails.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">কোনো ইমেইল পাওয়া যায়নি</div>
            ) : (
              emails.map((msg) => (
                <div key={msg.id} className="p-3 hover:bg-slate-900 flex flex-col gap-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{msg.from || 'Google User'}</span>
                    <span className="text-[10px] text-slate-500">{msg.date}</span>
                  </div>
                  <span className="font-medium text-emerald-400">{msg.subject}</span>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{msg.snippet}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB: CALENDAR & MEET */}
      {token && activeTab === 'calendar' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">ক্লাস সময়সূচি ও Google Meet ভিডিও মিটিং</span>
            <div className="flex items-center gap-2">
              <a
                href="https://meet.google.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1"
              >
                <Video className="w-3 h-3" />
                <span>নতুন Meet মিটিং</span>
              </a>
              <button
                type="button"
                onClick={() => setShowNewEventModal(true)}
                className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>ক্লাস শিডিউল</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800 max-h-72 overflow-y-auto">
            {isLoadingEvents ? (
              <div className="py-8 text-center text-xs text-slate-400">ক্যালেন্ডার লোড হচ্ছে...</div>
            ) : events.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">কোনো আসন্ন ইভেন্ট নেই</div>
            ) : (
              events.map((ev) => (
                <div key={ev.id} className="p-3 hover:bg-slate-900 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{ev.summary}</span>
                    <span className="text-[10px] text-slate-400">
                      {ev.start.dateTime ? new Date(ev.start.dateTime).toLocaleString() : ev.start.date}
                    </span>
                  </div>
                  {ev.htmlLink && (
                    <a href={ev.htmlLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1 text-[11px]">
                      <span>Calendar</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB: CLASSROOM */}
      {token && activeTab === 'classroom' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">Google Classroom™ ব্যাচ ও অ্যাসাইনমেন্ট</span>
            <a
              href="https://classroom.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 text-xs font-bold hover:underline flex items-center gap-1"
            >
              <span>Classroom খুলুন</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800 max-h-72 overflow-y-auto">
            {isLoadingClassrooms ? (
              <div className="py-8 text-center text-xs text-slate-400">ক্লাসরুম কোর্স লোড হচ্ছে...</div>
            ) : classrooms.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">কোনো সক্রিয় ক্লাসরুম কোর্স পাওয়া যায়নি</div>
            ) : (
              classrooms.map((cr) => (
                <div key={cr.id} className="p-3 hover:bg-slate-900 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{cr.name}</span>
                    <span className="text-[10px] text-slate-400">{cr.section || 'রেগুলার ব্যাচ'}</span>
                  </div>
                  {cr.alternateLink && (
                    <a href={cr.alternateLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]">
                      <span>কোর্সে যান</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB: CONTACTS */}
      {token && activeTab === 'contacts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">শিক্ষার্থী ও শিক্ষক কন্টাক্ট ডিরেক্টরি</span>
            <a href="https://contacts.google.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 text-xs font-bold hover:underline flex items-center gap-1">
              <span>Google Contacts</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800 max-h-72 overflow-y-auto">
            {isLoadingContacts ? (
              <div className="py-8 text-center text-xs text-slate-400">কন্টাক্টস লোড হচ্ছে...</div>
            ) : contacts.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">কোনো কন্টাক্ট পাওয়া যায়নি</div>
            ) : (
              contacts.map((c, i) => (
                <div key={i} className="p-3 hover:bg-slate-900 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{c.displayName}</span>
                    <span className="text-[10px] text-slate-400">{c.phone || c.email || '—'}</span>
                  </div>
                  {c.phone && (
                    <a href={`tel:${c.phone}`} className="text-emerald-400 font-bold hover:underline text-[11px]">
                      কল করুন
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB: TASKS */}
      {token && activeTab === 'tasks' && (
        <div className="space-y-4">
          <form onSubmit={handleCreateTaskSubmit} className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="নতুন হোমওয়ার্ক বা অ্যাসাইনমেন্ট টাস্ক..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer shadow-md"
            >
              টাস্ক যোগ করুন
            </button>
          </form>

          <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800 max-h-72 overflow-y-auto">
            {isLoadingTasks ? (
              <div className="py-8 text-center text-xs text-slate-400">টাস্ক লোড হচ্ছে...</div>
            ) : tasks.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">কোনো পেন্ডিং টাস্ক নেই</div>
            ) : (
              tasks.map((t) => (
                <div key={t.id} className="p-3 hover:bg-slate-900 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                    <span className="text-slate-200 font-medium">{t.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{t.status === 'completed' ? 'সম্পন্ন' : 'চলমান'}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* COMPOSE EMAIL MODAL */}
      {showComposeEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Mail className="w-5 h-5 text-rose-400" />
                <span>নতুন ইমেইল পাঠান (Gmail)</span>
              </h4>
              <button onClick={() => setShowComposeEmailModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendEmailSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">প্রাপক ইমেইল:</label>
                <input
                  type="email"
                  required
                  value={emailForm.to}
                  onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
                  placeholder="student@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">বিষয় (Subject):</label>
                <input
                  type="text"
                  required
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  placeholder="বেঙ্গল কম্পিউটার ইনস্টিটিউট - ভর্তি নিশ্চয়তা"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">বার্তা (Message Body):</label>
                <textarea
                  rows={4}
                  required
                  value={emailForm.body}
                  onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })}
                  placeholder="প্রিয় শিক্ষার্থী, আপনার কোর্সের ক্লাস শুরু হবে আগামী..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowComposeEmailModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSendingEmail ? 'পাঠানো হচ্ছে...' : 'ইমেইল পাঠান'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-400" />
                <span>নতুন ক্লাস / পরীক্ষা শিডিউল</span>
              </h4>
              <button onClick={() => setShowNewEventModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEventSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">ক্লাসের শিরোনাম:</label>
                <input
                  type="text"
                  required
                  value={eventForm.summary}
                  onChange={(e) => setEventForm({ ...eventForm, summary: e.target.value })}
                  placeholder="যেমন: ব্যাচ-৪২ প্র্যাকটিক্যাল ল্যাব টেস্ট"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">তারিখ:</label>
                <input
                  type="date"
                  required
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">শুরুর সময়:</label>
                  <input
                    type="time"
                    required
                    value={eventForm.startTime}
                    onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">শেষের সময়:</label>
                  <input
                    type="time"
                    required
                    value={eventForm.endTime}
                    onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isCreatingEvent}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  {isCreatingEvent ? 'যুক্ত হচ্ছে...' : 'ক্যালেন্ডারে যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SAFE DELETE CONFIRMATION MODAL */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-bold text-white text-base">ফাইল ডিলিট নিশ্চিতকরণ</h4>
            </div>
            <p className="text-xs text-slate-300">
              আপনি কি নিশ্চিত যে <span className="font-bold text-white">"{fileToDelete.name}"</span> মুছে ফেলতে চান?
            </p>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'ডিলিট হচ্ছে...' : 'হ্যাঁ, ডিলিট করুন'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FILE PREVIEW, SUMMARY & CONTENT SNIPPET MODAL */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 max-w-2xl w-full max-h-[90vh] flex flex-col space-y-4 shadow-2xl animate-in fade-in">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                  {previewFile.mimeType.includes('image/') ? (
                    <Images className="w-5 h-5 text-cyan-400" />
                  ) : previewFile.mimeType.includes('spreadsheet') ? (
                    <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                  ) : previewFile.mimeType.includes('presentation') ? (
                    <Presentation className="w-5 h-5 text-amber-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-sky-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-white text-sm sm:text-base truncate" title={previewFile.name}>
                    {previewFile.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span className="text-emerald-400 font-semibold">{previewFile.size ? formatStorageSize(previewFile.size) : 'Cloud Document'}</span>
                    <span>•</span>
                    <span className="truncate max-w-[200px]">{previewFile.mimeType}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewFile(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 text-xs">
              <button
                type="button"
                onClick={() => setPreviewTab('snippet')}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  previewTab === 'snippet'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>কন্টেন্ট স্নিপেট ও সারাংশ</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTab('details')}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  previewTab === 'details'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>ফাইলের বিবরণী</span>
              </button>

              {previewFile.id && !previewFile.id.startsWith('/') && previewFile.webViewLink && (
                <button
                  type="button"
                  onClick={() => setPreviewTab('embed')}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    previewTab === 'embed'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>ড্রাইভ প্রিভিউ ফ্রেম</span>
                </button>
              )}
            </div>

            {/* Modal Body / Tab Content */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              
              {/* TAB 1: SNIPPET & SUMMARY */}
              {previewTab === 'snippet' && (
                <div className="space-y-3">
                  {/* Image Preview if applicable */}
                  {(previewFile.mimeType.includes('image/') || /\.(jpe?g|png|webp|svg|gif)$/i.test(previewFile.name)) ? (
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-2">
                      <img
                        src={previewFile.thumbnailLink ? previewFile.thumbnailLink.replace(/=s\d+/, '=s1000') : previewFile.webViewLink || ''}
                        alt={previewFile.name}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  ) : isLoadingSnippet ? (
                    <div className="py-14 text-center space-y-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <RefreshCw className="w-7 h-7 text-emerald-400 animate-spin mx-auto" />
                      <p className="text-xs text-slate-300 font-semibold">ডকুমেন্টের কন্টেন্ট স্নিপেট প্রস্তুত হচ্ছে...</p>
                      <p className="text-[11px] text-slate-500">গুগল ক্লাউড থেকে ফাইলটি প্রসেস করা হচ্ছে</p>
                    </div>
                  ) : fileSnippetData?.isSnippet && fileSnippetData.snippet ? (
                    <div className="space-y-2.5">
                      {/* Snippet Stats Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                        <div className="flex items-center gap-3 text-slate-300">
                          <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>ডকুমেন্ট সামারি</span>
                          </span>
                          {fileSnippetData.wordCount !== undefined && (
                            <span className="text-slate-400 font-mono">
                              মোট শব্দ: <strong className="text-white">{fileSnippetData.wordCount.toLocaleString('bn-BD')}</strong>
                            </span>
                          )}
                          {fileSnippetData.charCount !== undefined && (
                            <span className="text-slate-400 font-mono hidden sm:inline">
                              অক্ষর: <strong className="text-white">{fileSnippetData.charCount.toLocaleString('bn-BD')}</strong>
                            </span>
                          )}
                          {fileSnippetData.wordCount !== undefined && (
                            <span className="text-slate-400 font-mono hidden md:inline">
                              পড়ার সময়: ~{Math.max(1, Math.ceil(fileSnippetData.wordCount / 200))} মিনিট
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(fileSnippetData.snippet);
                            showSuccess('কন্টেন্ট স্নিপেট ক্লিপবোর্ডে কপি হয়েছে!');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="সম্পূর্ণ স্নিপেট কপি করুন"
                        >
                          <Copy className="w-3 h-3" />
                          <span>স্নিপেট কপি</span>
                        </button>
                      </div>

                      {/* Content Snippet Text Viewer */}
                      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 max-h-72 overflow-y-auto font-mono text-xs leading-relaxed text-slate-200 whitespace-pre-wrap selection:bg-emerald-500/30">
                        {fileSnippetData.snippet}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                      <AlignLeft className="w-10 h-10 text-slate-600 mx-auto" />
                      <h5 className="text-sm font-bold text-slate-300">ডকুমেন্ট সারাংশ</h5>
                      <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                        {snippetError || (
                          previewFile.mimeType.includes('pdf') 
                            ? 'এটি একটি পিডিএফ (PDF) ডকুমেন্ট। সম্পূর্ণ বিষয়বস্তু দেখতে ড্রাইভ ভিউয়ার ফ্রেম বা গুগল ড্রাইভে ফাইলটি ওপেন করুন।'
                            : previewFile.mimeType.includes('presentation')
                            ? 'এটি একটি প্রেজেন্টেশন স্লাইড। স্লাইডসমূহ দেখতে নিচের বাটনে ক্লিক করে সরাসরি গুগলে খুলুন।'
                            : 'এই ফাইল টাইপটির সরাসরি টেক্সট স্নিপেট প্রিভিউ তৈরি করা সম্ভব হয়নি। ফাইলটি পড়তে বা এডিট করতে গুগল ড্রাইভে খুলুন।'
                        )}
                      </p>
                      {previewFile.webViewLink && (
                        <div className="pt-2">
                          <a
                            href={previewFile.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-md"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>গুগল ড্রাইভে ফাইলটি পড়ুন</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: METADATA DETAILS */}
              {previewTab === 'details' && (
                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-900">
                    <span className="text-slate-500">ফাইলের নাম:</span>
                    <span className="font-semibold text-white truncate max-w-[280px]">{previewFile.name}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-900">
                    <span className="text-slate-500">MIME ধরন:</span>
                    <span className="font-mono text-slate-300 truncate max-w-[280px]">{previewFile.mimeType}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-900">
                    <span className="text-slate-500">ফাইলের আকার:</span>
                    <span className="font-mono text-emerald-400 font-bold">{previewFile.size ? formatStorageSize(previewFile.size) : 'Cloud Resource'}</span>
                  </div>
                  {previewFile.modifiedTime && (
                    <div className="flex justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-500">সর্বশেষ পরিবর্তন:</span>
                      <span className="text-slate-300">{new Date(previewFile.modifiedTime).toLocaleString('bn-BD')}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">ক্লাউড ফাইল আইডি:</span>
                    <span className="font-mono text-[10px] text-slate-400 truncate max-w-[240px]">{previewFile.id}</span>
                  </div>
                </div>
              )}

              {/* TAB 3: GOOGLE DRIVE EMBED PREVIEW */}
              {previewTab === 'embed' && previewFile.id && (
                <div className="relative aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                  <iframe
                    src={`https://drive.google.com/file/d/${previewFile.id}/preview`}
                    title={previewFile.name}
                    className="w-full h-full border-0"
                    allow="autoplay"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {previewFile.webViewLink && (
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(previewFile.webViewLink!);
                      showSuccess('ড্রাইভ লিংক কপি করা হয়েছে!');
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>লিংক কপি</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const toDel = previewFile;
                    setPreviewFile(null);
                    setFileToDelete(toDel);
                  }}
                  className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>মুছুন</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewFile(null)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  বন্ধ করুন
                </button>

                {previewFile.webViewLink && (
                  <a
                    href={previewFile.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-lg"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>গুগল ড্রাইভে খুলুন</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
