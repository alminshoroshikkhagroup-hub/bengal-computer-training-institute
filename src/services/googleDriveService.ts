export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  createdTime?: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  parents?: string[];
  shared?: boolean;
}

export interface DriveStorageInfo {
  limit?: string;
  usage?: string;
  usageInDrive?: string;
  usageInDriveTrash?: string;
  user?: {
    displayName: string;
    emailAddress: string;
    photoLink?: string;
  };
}

/**
 * List files from Google Drive v3 API
 */
export const listDriveFiles = async (
  accessToken: string,
  options?: {
    pageSize?: number;
    folderId?: string;
    mimeTypeFilter?: string;
    searchQuery?: string;
  }
): Promise<{ files: DriveFileItem[]; nextPageToken?: string }> => {
  const { pageSize = 30, folderId, mimeTypeFilter, searchQuery } = options || {};

  const queryParts: string[] = ['trashed = false'];

  if (folderId) {
    queryParts.push(`'${folderId}' in parents`);
  }

  if (mimeTypeFilter) {
    if (mimeTypeFilter === 'folder') {
      queryParts.push("mimeType = 'application/vnd.google-apps.folder'");
    } else if (mimeTypeFilter === 'document') {
      queryParts.push("(mimeType contains 'document' or mimeType contains 'text' or mimeType = 'application/pdf')");
    } else if (mimeTypeFilter === 'image') {
      queryParts.push("mimeType contains 'image/'");
    }
  }

  if (searchQuery && searchQuery.trim()) {
    const escaped = searchQuery.replace(/'/g, "\\'");
    queryParts.push(`name contains '${escaped}'`);
  }

  const q = queryParts.join(' and ');
  const fields = 'nextPageToken, files(id, name, mimeType, size, modifiedTime, createdTime, webViewLink, webContentLink, iconLink, thumbnailLink, parents, shared)';
  const url = `https://www.googleapis.com/drive/v3/files?pageSize=${pageSize}&q=${encodeURIComponent(q)}&fields=${encodeURIComponent(fields)}&orderBy=folder,modifiedTime desc`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch Google Drive files: ${res.statusText}`);
  }

  return res.json();
};

/**
 * Fetch storage details & user profile
 */
export const getDriveStorageInfo = async (accessToken: string): Promise<DriveStorageInfo> => {
  const res = await fetch(
    'https://www.googleapis.com/drive/v3/about?fields=storageQuota,user(displayName,emailAddress,photoLink)',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch Drive storage information');
  }

  const data = await res.json();
  return {
    limit: data.storageQuota?.limit,
    usage: data.storageQuota?.usage,
    usageInDrive: data.storageQuota?.usageInDrive,
    usageInDriveTrash: data.storageQuota?.usageInDriveTrash,
    user: data.user,
  };
};

/**
 * Create a new folder in Google Drive
 */
export const createDriveFolder = async (
  accessToken: string,
  folderName: string,
  parentFolderId?: string
): Promise<DriveFileItem> => {
  const metadata: Record<string, unknown> = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const res = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to create folder in Google Drive');
  }

  return res.json();
};

/**
 * Upload a raw File or Blob to Google Drive using multipart upload
 */
export const uploadFileToDrive = async (
  accessToken: string,
  file: File | Blob,
  fileName: string,
  parentFolderId?: string
): Promise<DriveFileItem> => {
  const metadata: Record<string, unknown> = {
    name: fileName,
    mimeType: file.type || 'application/octet-stream',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}`;
  const fileHeaderPart = `${delimiter}Content-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`;

  const metadataBlob = new Blob([metadataPart], { type: 'text/plain' });
  const fileHeaderBlob = new Blob([fileHeaderPart], { type: 'text/plain' });
  const closeBlob = new Blob([closeDelimiter], { type: 'text/plain' });

  const multipartBody = new Blob([metadataBlob, fileHeaderBlob, file, closeBlob], {
    type: `multipart/related; boundary=${boundary}`,
  });

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,thumbnailLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartBody,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to upload file to Google Drive');
  }

  return res.json();
};

/**
 * Delete a file or folder from Google Drive
 * CAUTION: Handled with explicit UI confirmation dialog as per mandatory skill instructions!
 */
export const deleteDriveFile = async (
  accessToken: string,
  fileId: string
): Promise<boolean> => {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to delete file from Google Drive');
  }

  return true;
};

/**
 * Fetch a content snippet or summary for supported text and document files
 */
export const getFileContentSnippet = async (
  accessToken: string,
  fileId: string,
  mimeType: string
): Promise<{ snippet: string; isSnippet: boolean; charCount?: number; wordCount?: number }> => {
  let url = '';

  // Google Docs: export as text/plain
  if (mimeType === 'application/vnd.google-apps.document') {
    url = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`;
  } else if (mimeType === 'application/vnd.google-apps.spreadsheet') {
    url = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/csv`;
  } else if (
    mimeType.startsWith('text/') ||
    mimeType === 'application/json' ||
    mimeType === 'application/javascript' ||
    mimeType === 'application/xml' ||
    mimeType === 'application/x-yaml'
  ) {
    url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  } else {
    return {
      snippet: '',
      isSnippet: false,
    };
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('কন্টেন্ট স্নিপেট লোড করা যায়নি');
  }

  const fullText = await res.text();
  const trimmed = fullText.trim();
  const maxLen = 3000;
  const isTruncated = trimmed.length > maxLen;
  const snippet = isTruncated ? trimmed.substring(0, maxLen) + '\n\n... [আরো পড়তে গুগল ড্রাইভে সম্পূর্ণ ফাইলটি খুলুন]' : trimmed;
  
  const words = trimmed.split(/\s+/).filter(Boolean).length;

  return {
    snippet,
    isSnippet: true,
    charCount: trimmed.length,
    wordCount: words,
  };
};

