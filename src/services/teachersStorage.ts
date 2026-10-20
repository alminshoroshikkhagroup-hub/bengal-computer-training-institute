import { TEACHERS_LIST, Teacher } from '../data/teachersData';
import { 
  getPhotoFromIndexedDB, 
  savePhotoToIndexedDB, 
  processAndSaveTeacherPhoto 
} from './imageStorageService';

const STORAGE_KEY = 'bengal_teachers_custom_list_v3';

export function getStoredTeachers(): Teacher[] {
  if (typeof window === 'undefined') return TEACHERS_LIST;
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem('bengal_teachers_custom_list_v2');
    }
    if (!raw) {
      raw = localStorage.getItem('bengal_teachers_custom_list_v1');
    }

    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to read teachers from localStorage:', err);
  }
  return TEACHERS_LIST;
}

/**
 * Hydrate photos from IndexedDB if available
 */
export async function hydrateTeachersFromIndexedDB(
  currentTeachers: Teacher[]
): Promise<Teacher[]> {
  if (typeof window === 'undefined') return currentTeachers;

  const updated = await Promise.all(
    currentTeachers.map(async (teacher) => {
      const idbPhoto = await getPhotoFromIndexedDB(teacher.id);
      if (idbPhoto) {
        return { ...teacher, photoUrl: idbPhoto };
      }
      return teacher;
    })
  );

  return updated;
}

/**
 * Save teachers list to localStorage permanently
 */
export function saveTeachersToStorage(teachers: Teacher[]): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
    return true;
  } catch (err) {
    console.error('LocalStorage write failed:', err);
    // If quota is tight, keep only small data URLs in localStorage while IndexedDB holds the full photo
    try {
      const lightweight = teachers.map((t) => {
        // Save to IndexedDB in parallel
        if (t.photoUrl && t.photoUrl.startsWith('data:image')) {
          savePhotoToIndexedDB(t.id, t.photoUrl).catch(() => {});
        }
        return t;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweight));
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Process uploaded photo file, compress it, save to IndexedDB & Server, and return URL
 */
export async function uploadTeacherPhotoToServer(file: File, teacherId: string): Promise<string> {
  return await processAndSaveTeacherPhoto(file, teacherId);
}

export function resetTeachersToDefault(): Teacher[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('bengal_teachers_custom_list_v2');
    localStorage.removeItem('bengal_teachers_custom_list_v1');
  }
  return TEACHERS_LIST;
}
