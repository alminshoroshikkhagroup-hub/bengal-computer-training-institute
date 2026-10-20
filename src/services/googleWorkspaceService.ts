// Google Workspace Service: Comprehensive REST API integration
// Covering Google Drive, Sheets, Docs, Gmail, Calendar, Slides, Tasks, Forms, Contacts, and Classroom

export interface WorkspaceDocument {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  webViewLink?: string;
  thumbnailLink?: string;
  size?: string;
}

// ---------------- Google Sheets ----------------
export const listSpreadsheets = async (accessToken: string): Promise<WorkspaceDocument[]> => {
  const query = "mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false";
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&fields=files(id,name,mimeType,modifiedTime,webViewLink,thumbnailLink)&pageSize=25&orderBy=modifiedTime desc`;

  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('Google Sheets তালিকা লোড করা যায়নি');
  const data = await response.json();
  return data.files || [];
};

export const createSpreadsheet = async (
  accessToken: string,
  title: string,
  initialRows?: any[][]
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  const url = 'https://sheets.googleapis.com/v4/spreadsheets';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ properties: { title } }),
  });

  if (!response.ok) throw new Error('গুগল স্প্রেডশিট তৈরি করতে ব্যর্থ হয়েছে');
  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  const spreadsheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  if (initialRows && initialRows.length > 0) {
    await appendSpreadsheetValues(accessToken, spreadsheetId, initialRows, 'Sheet1!A1');
  }

  return { spreadsheetId, spreadsheetUrl };
};

export const getSpreadsheetValues = async (
  accessToken: string,
  spreadsheetId: string,
  range = 'Sheet1!A1:Z50'
): Promise<any[][]> => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('স্প্রেডশিটের তথ্য লোড করা যায়নি');
  const data = await response.json();
  return data.values || [];
};

export const appendSpreadsheetValues = async (
  accessToken: string,
  spreadsheetId: string,
  values: any[][],
  range = 'Sheet1!A1'
): Promise<void> => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
  });

  if (!response.ok) throw new Error('স্প্রেডশিটে রো যুক্ত করা যায়নি');
};

// ---------------- Google Docs ----------------
export const listDocuments = async (accessToken: string): Promise<WorkspaceDocument[]> => {
  const query = "mimeType = 'application/vnd.google-apps.document' and trashed = false";
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&fields=files(id,name,mimeType,modifiedTime,webViewLink,thumbnailLink)&pageSize=25&orderBy=modifiedTime desc`;

  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('Google Docs তালিকা লোড করা যায়নি');
  const data = await response.json();
  return data.files || [];
};

export const createDocument = async (
  accessToken: string,
  title: string,
  initialText?: string
): Promise<{ documentId: string; documentUrl: string }> => {
  const url = 'https://docs.googleapis.com/v1/documents';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) throw new Error('গুগল ডকুমেন্ট তৈরি করতে ব্যর্থ হয়েছে');
  const data = await response.json();
  const documentId = data.documentId;
  const documentUrl = `https://docs.google.com/document/d/${documentId}/edit`;

  if (initialText && initialText.trim().length > 0) {
    await insertDocumentText(accessToken, documentId, initialText);
  }

  return { documentId, documentUrl };
};

export const insertDocumentText = async (
  accessToken: string,
  documentId: string,
  text: string
): Promise<void> => {
  const url = `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [{ insertText: { location: { index: 1 }, text } }],
    }),
  });

  if (!response.ok) throw new Error('ডকুমেন্টে টেক্সট যোগ করা যায়নি');
};

export const getDocumentContent = async (
  accessToken: string,
  documentId: string
): Promise<{ title: string; bodyText: string }> => {
  const url = `https://docs.googleapis.com/v1/documents/${documentId}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('ডকুমেন্ট পড়তে ব্যর্থ হয়েছে');

  const data = await response.json();
  const title = data.title || 'Untitled Document';
  let bodyText = '';
  if (data.body?.content) {
    for (const element of data.body.content) {
      if (element.paragraph?.elements) {
        for (const pElem of element.paragraph.elements) {
          if (pElem.textRun?.content) {
            bodyText += pElem.textRun.content;
          }
        }
      }
    }
  }

  return { title, bodyText };
};

// ---------------- Gmail API ----------------
export interface GmailMessageItem {
  id: string;
  snippet: string;
  subject?: string;
  from?: string;
  date?: string;
}

export const listGmailMessages = async (accessToken: string, maxResults = 10): Promise<GmailMessageItem[]> => {
  const listUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`;
  const response = await fetch(listUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('Gmail মেসেজ তালিকা লোড করা যায়নি');
  const data = await response.json();

  if (!data.messages || data.messages.length === 0) return [];

  // Fetch snippets & headers for first few messages
  const items: GmailMessageItem[] = [];
  for (const msg of data.messages.slice(0, 5)) {
    try {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (msgRes.ok) {
        const fullMsg = await msgRes.json();
        const headers = fullMsg.payload?.headers || [];
        const subject = headers.find((h: any) => h.name === 'Subject')?.value || '(কোনো বিষয় নেই)';
        const from = headers.find((h: any) => h.name === 'From')?.value || '';
        const date = headers.find((h: any) => h.name === 'Date')?.value || '';
        items.push({
          id: msg.id,
          snippet: fullMsg.snippet || '',
          subject,
          from,
          date,
        });
      }
    } catch {
      // Continue next message
    }
  }

  return items;
};

export const sendGmailMessage = async (
  accessToken: string,
  to: string,
  subject: string,
  body: string
): Promise<void> => {
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const messageParts = [
    `To: ${to}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    body,
  ];
  const message = messageParts.join('\r\n');
  const encodedMessage = btoa(unescape(encodeURIComponent(message)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: encodedMessage }),
  });

  if (!response.ok) throw new Error('Gmail মেসেজ প্রেরণ করতে ব্যর্থ হয়েছে');
};

// ---------------- Google Calendar API ----------------
export interface CalendarEventItem {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  htmlLink?: string;
}

export const listCalendarEvents = async (accessToken: string, maxResults = 10): Promise<CalendarEventItem[]> => {
  const timeMin = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(
    timeMin
  )}&singleEvents=true&orderBy=startTime&maxResults=${maxResults}`;

  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('Google Calendar ইভেন্ট লোড করা যায়নি');
  const data = await response.json();
  return data.items || [];
};

export const createCalendarEvent = async (
  accessToken: string,
  event: {
    summary: string;
    description?: string;
    startIso: string;
    endIso: string;
    location?: string;
  }
): Promise<{ id: string; htmlLink: string }> => {
  const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      summary: event.summary,
      description: event.description,
      location: event.location || 'জনতা ব্যাংক ভবন, সিঙ্গার মোড়, কুষ্টিয়া',
      start: { dateTime: event.startIso },
      end: { dateTime: event.endIso },
    }),
  });

  if (!response.ok) throw new Error('ক্যালেন্ডার ইভেন্ট তৈরি করতে ব্যর্থ হয়েছে');
  return response.json();
};

// ---------------- Google Slides API ----------------
export const listPresentations = async (accessToken: string): Promise<WorkspaceDocument[]> => {
  const query = "mimeType = 'application/vnd.google-apps.presentation' and trashed = false";
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&fields=files(id,name,mimeType,modifiedTime,webViewLink,thumbnailLink)&pageSize=25&orderBy=modifiedTime desc`;

  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('Google Slides তালিকা লোড করা যায়নি');
  const data = await response.json();
  return data.files || [];
};

export const createPresentation = async (
  accessToken: string,
  title: string
): Promise<{ presentationId: string; presentationUrl: string }> => {
  const url = 'https://slides.googleapis.com/v1/presentations';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) throw new Error('গুগল স্লাইডস প্রেজেন্টেশন তৈরি করতে ব্যর্থ হয়েছে');
  const data = await response.json();
  return {
    presentationId: data.presentationId,
    presentationUrl: `https://docs.google.com/presentation/d/${data.presentationId}/edit`,
  };
};

// ---------------- Google Tasks API ----------------
export interface GoogleTaskItem {
  id: string;
  title: string;
  notes?: string;
  status: 'needsAction' | 'completed';
  due?: string;
}

export const listTasks = async (accessToken: string): Promise<GoogleTaskItem[]> => {
  const url = 'https://tasks.googleapis.com/tasks/v1/lists/@default/tasks?maxResults=20';
  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('Google Tasks তালিকা লোড করা যায়নি');
  const data = await response.json();
  return data.items || [];
};

export const createGoogleTask = async (
  accessToken: string,
  title: string,
  notes?: string
): Promise<GoogleTaskItem> => {
  const url = 'https://tasks.googleapis.com/tasks/v1/lists/@default/tasks';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, notes }),
  });

  if (!response.ok) throw new Error('টাস্ক তৈরি করতে ব্যর্থ হয়েছে');
  return response.json();
};

// ---------------- Google Contacts API ----------------
export interface GoogleContactItem {
  resourceName: string;
  displayName: string;
  email?: string;
  phone?: string;
}

export const listContacts = async (accessToken: string): Promise<GoogleContactItem[]> => {
  const url = 'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers&pageSize=30';
  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('Google Contacts তালিকা লোড করা যায়নি');
  const data = await response.json();

  if (!data.connections) return [];
  return data.connections.map((c: any) => ({
    resourceName: c.resourceName,
    displayName: c.names?.[0]?.displayName || '(নাম নেই)',
    email: c.emailAddresses?.[0]?.value,
    phone: c.phoneNumbers?.[0]?.value,
  }));
};

// ---------------- Google Classroom API ----------------
export interface ClassroomCourseItem {
  id: string;
  name: string;
  section?: string;
  descriptionHeading?: string;
  alternateLink?: string;
  courseState?: string;
}

export const listClassroomCourses = async (accessToken: string): Promise<ClassroomCourseItem[]> => {
  const url = 'https://classroom.googleapis.com/v1/courses?pageSize=20';
  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error('Google Classroom কোর্স তালিকা লোড করা যায়নি');
  const data = await response.json();
  return data.courses || [];
};
