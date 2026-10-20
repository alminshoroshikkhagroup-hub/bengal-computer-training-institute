export type BatchStatusType = 'enrolling' | 'full' | 'coming_soon';

export interface BatchEnrollmentData {
  status: BatchStatusType;
  batchCodeBn: string;
  batchCodeEn: string;
  enrolledStudents: number;
  totalSeats: number;
  startDateBn?: string;
  startDateEn?: string;
  scheduleBn?: string;
  scheduleEn?: string;
}

export interface Course {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'office' | 'ai' | 'freelancing' | 'coding' | 'language' | 'kids';
  durationBn: string;
  durationEn: string;
  level: string;
  fee: number;
  discountFee?: number;
  btebApproved: boolean;
  tagBn?: string;
  descriptionBn: string;
  descriptionEn: string;
  modules: string[];
  software: string[];
  careerPaths: string[];
  accentColor: string;
  iconName: string;
  batchInfo?: BatchEnrollmentData;
}

export interface StudentCertificate {
  certificateId: string;
  studentName: string;
  fatherName: string;
  courseNameBn: string;
  courseNameEn: string;
  btebRoll: string;
  regNo: string;
  session: string;
  grade: 'A+' | 'A' | 'A-' | 'B+' | 'B';
  cgpa: string;
  issueDate: string;
  status: 'Verified' | 'Pending' | 'Invalid';
  instituteCode: string;
}

export interface Notice {
  id: string;
  titleBn: string;
  date: string;
  isUrgent?: boolean;
  category: 'Admission' | 'Exam' | 'Scholarship' | 'Event';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  course: string;
  image: string;
  reviewBn: string;
  reviewEn?: string;
  earningsOrJob?: string;
  rating: number;
}

export interface RoadmapDay {
  day: string;
  title: string;
  titleBn?: string;
  titleEn?: string;
  desc: string;
  descBn?: string;
  descEn?: string;
  highlight: string;
  highlightBn?: string;
  highlightEn?: string;
  icon: string;
}
