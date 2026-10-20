import { Course, StudentCertificate, Notice, Testimonial, RoadmapDay } from '../types';

export const INSTITUTE_INFO = {
  nameBn: 'বেঙ্গল ইনস্টিটিউট',
  nameEn: 'Bengal Institute',
  brandName: 'BENGAL INSTITUTE',
  sloganBn: 'কুষ্টিয়ায় আধুনিক প্রযুক্তি, কৃত্রিম বুদ্ধিমত্তা (AI) ও শতভাগ প্র্যাকটিক্যাল প্রশিক্ষণ প্রদানকারী কম্পিউটার ট্রেনিং ইনস্টিটিউট।',
  sloganEn: 'Skill Today, Better Tomorrow',
  descriptionBn: 'কুষ্টিয়ায় আধুনিক প্রযুক্তি, কৃত্রিম বুদ্ধিমত্তা (AI) ও শতভাগ প্র্যাকটিক্যাল প্রশিক্ষণ প্রদানকারী কম্পিউটার ট্রেনিং ইনস্টিটিউট।',
  established: 2016,
  btebCode: '27117',
  btebName: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড অনুমোদিত',
  phone1: '01782-824582',
  phone2: '01870-707715',
  phone3: '01717-687036',
  email: 'bengalonetechsolution@gmail.com',
  altEmail: 'bengalonetechsolution@gmail.com',
  addressBn: 'আজিজুর রহমান সুপার মার্কেট, ১ম তলা (জনতা ব্যাংক লিমিটেডের প্রধান শাখার উপরে), সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া-৭০০০',
  addressEn: 'Azizur Rahman Super Market, 1st Floor (Above Principal Branch of Janata Bank Ltd), Singer Mor, NS Road, Kushtia-7000',
  landmark: 'সিঙ্গার মোড়, জনতা ব্যাংক লিমিটেডের প্রধান শাখার উপরে ১ম তলা',
  workingHoursBn: 'শনিবার–বৃহস্পতিবার: সকাল ৮টা–রাত ৯টা',
  googleMapsUrl: 'https://maps.app.goo.gl/VUxBM8qDHkSxwKUH7',
};

export const INSTITUTE_STATISTICS = {
  courseCount: 8,
  averagePlacementRate: '92.9%',
  averageCourseDuration: '3.7 মাস',
  successfulStudents: '4420+',
  btebApprovedCourses: 5,
};

export const SPECIAL_OFFER = {
  target: 'HSC পরীক্ষার্থী',
  discount: '৫০%',
  couponCode: 'HSC50',
  offerPeriod: 'এপ্রিল–জুন ২০২৬ সেশন',
};

export const COURSES_DATA: Course[] = [
  {
    id: 'office-app',
    titleBn: 'প্রফেশনাল কম্পিউটার অফিস অ্যাপ্লিকেশন (BTEB)',
    titleEn: 'Professional Computer Office Application',
    category: 'office',
    durationBn: '৩ মাস / ৬ মাস মেয়াদী',
    durationEn: '3 Months / 6 Months',
    level: 'বেসিক থেকে অ্যাডভান্সড',
    fee: 4500,
    discountFee: 2999,
    btebApproved: true,
    tagBn: 'BTEB অনুমোদিত শীর্ষ কোর্স',
    descriptionBn: 'অফিসের কাজ এখন আরও সহজ ও স্মার্ট! মাইক্রোসফট ওয়ার্ড, এক্সেল, পাওয়ারপয়েন্ট, অ্যাক্সেস ও দ্রুতগতির বাংলা-ইংরেজি টাইপিংয়ের পূর্ণাঙ্গ প্র্যাকটিক্যাল প্রশিক্ষণ। সরকারি ও বেসরকারি চাকরির উপযোগী।',
    descriptionEn: 'Master Microsoft Word, Excel, PowerPoint, Access, Database Management & Bangla/English fast typing for office readiness.',
    modules: [
      'MS Word: ডকুমেন্ট ড্রাফটিং, অফিশিয়াল লেটার, টেবিল ও ফরম্যাটিং',
      'MS Excel: ডাটা এন্ট্রি, ফাংশন ও ফর্মুলা, স্যালারি শিট, পাইভট টেবিল',
      'MS PowerPoint: ডাইনামিক প্রেজেন্টেশন ও অ্যানিমেশন',
      'MS Access: রিলেশনাল ডাটাবেজ তৈরি ও কোয়েরি ম্যানেজমেন্ট',
      'বাংলা ও ইংরেজি দ্রুত টাইপিং (বিজয় বায়ান্ন ও অভ্র)',
      'ইন্টারনেট ব্রাউজিং, প্রফেশনাল ইমেইলিং ও গুগল ক্লাউড ড্রাইভ'
    ],
    software: ['Microsoft 365', 'Bijoy 52', 'Avro Keyboard', 'Google Docs & Sheets'],
    careerPaths: ['অফিস এক্সিকিউটিভ', 'ডাটা এন্ট্রি অপারেটর', 'কম্পিউটার অপারেটর (সরকারি/বেসরকারি)', 'হিসাব সহকারী'],
    accentColor: 'blue',
    iconName: 'FileSpreadsheet',
    batchInfo: {
      status: 'enrolling',
      batchCodeBn: 'ব্যাচ ৬৪ (সকাল ও বিকাল)',
      batchCodeEn: 'Batch 64 (Morning/Evening)',
      enrolledStudents: 24,
      totalSeats: 30,
      startDateBn: '১০ মে ২০২৬',
      startDateEn: 'May 10, 2026',
      scheduleBn: 'রবি, মঙ্গল, বৃহস্পতি (সকাল ১০টা ও বিকাল ৪টা)',
      scheduleEn: 'Sun, Tue, Thu (10 AM & 4 PM)'
    }
  },
  {
    id: 'ai-prompt-freelancing',
    titleBn: 'কম্পিউটার প্রশিক্ষণ এআই ও ফ্রিল্যান্সিং কোর্স',
    titleEn: 'Computer Training AI & Freelancing Masterclass',
    category: 'ai',
    durationBn: '৩ মাস মেয়াদী',
    durationEn: '3 Months',
    level: 'আধুনিক ও প্রফেশনাল',
    fee: 6500,
    discountFee: 3999,
    btebApproved: true,
    tagBn: 'সময়োপযোগী ট্রেন্ডিং কোর্স',
    descriptionBn: 'কৃত্রিম বুদ্ধিমত্তা (AI) ব্যবহার করে স্মার্ট কম্পিউটার অপারেশন, প্রম্পট ইঞ্জিনিয়ারিং, ডিজিটাল কন্টেন্ট তৈরি এবং আন্তর্জাতিক মার্কেটপ্লেসে (Fiverr, Upwork) আয় করার পরিপূর্ণ গাইডলাইন।',
    descriptionEn: 'Learn AI tools (ChatGPT, Gemini, Midjourney/Canva AI), prompt engineering, office automation, and freelancing on Fiverr/Upwork.',
    modules: [
      'আধুনিক এআই টুলস পরিচিতি ও বাস্তবমুখী ব্যবহার (ChatGPT, Claude, Gemini)',
      'প্রম্পট ইঞ্জিনিয়ারিং: সঠিক প্রম্পট লিখে জটিল কাজ সেকেন্ডে সমাধান',
      'এআই দিয়ে কন্টেন্ট রাইটিং, বিজনেস প্রেজেন্টেশন ও ডাটা অ্যানালাইসিস',
      'এআই গ্রাফিক ও ইমেজ প্রম্পটিং (ক্যানভা এআই ও ইমেজ টুলস)',
      'ফ্রিল্যান্সিং মার্কেটপ্লেস প্রোফাইল তৈরি (Fiverr & Upwork)',
      'ক্লায়েন্ট হ্যান্ডলিং, বিডিং টেকনিক ও বৈধ উপায়ে ব্যাংক অ্যাকাউন্টে ডলার উত্তোলন'
    ],
    software: ['ChatGPT', 'Google Gemini', 'Canva AI', 'Fiverr', 'Upwork', 'Payoneer'],
    careerPaths: ['এআই স্পেশালিস্ট', 'ফ্রিল্যান্স কনটেন্ট ক্রিয়েটর', 'ভার্চুয়াল অ্যাসিস্ট্যান্ট', 'ডিজিটাল প্রডিউসার'],
    accentColor: 'emerald',
    iconName: 'Sparkles',
    batchInfo: {
      status: 'enrolling',
      batchCodeBn: 'ব্যাচ ১৫ (এআই স্পেশাল)',
      batchCodeEn: 'Batch 15 (AI Special)',
      enrolledStudents: 22,
      totalSeats: 25,
      startDateBn: '১২ মে ২০২৬',
      startDateEn: 'May 12, 2026',
      scheduleBn: 'শনি, সোম, বুধ (বিকাল ৫টা)',
      scheduleEn: 'Sat, Mon, Wed (5 PM)'
    }
  },
  {
    id: 'hsc-ict',
    titleBn: 'এইচএসসি আইসিটি স্পেশাল ব্যাচ (৫০% ছাড়)',
    titleEn: 'HSC ICT Special Program & Practical Coding',
    category: 'coding',
    durationBn: 'এইচএসসি পরীক্ষার আগ পর্যন্ত / ৩ মাস',
    durationEn: '3 Months / Exam Preparation',
    level: 'একাদশ ও দ্বাদশ শ্রেণি',
    fee: 4000,
    discountFee: 2000,
    btebApproved: true,
    tagBn: '৫০% বিশেষ ছাড়',
    descriptionBn: 'এইচএসসি আইসিটিতে নিশ্চিত A+ পাওয়ার সম্পূর্ণ প্রস্তুতি! সংখ্যা পদ্ধতি, লজিক গেট, এইচটিএমএল ওয়েব ডিজাইন, সি প্রোগ্রামিং ও ডাটাবেজ ম্যানেজমেন্ট প্র্যাকটিক্যাল ল্যাবসহ সহজে শিখুন।',
    descriptionEn: 'Complete HSC ICT syllabus with hands-on HTML, C Programming, Number Systems, Logic Gates, and Board Question practice.',
    modules: [
      'অধ্যায় ১ ও ২: তথ্য ও যোগাযোগ প্রযুক্তি বিশ্ব ও বাংলাদেশ প্রেক্ষিত, কমিউনিকেশন সিস্টেমস',
      'অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস (লজিক গেট, বুলিয়ান অ্যালজেবরা)',
      'অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি ও প্র্যাকটিক্যাল HTML কোডিং',
      'অধ্যায় ৫: প্রোগ্রামিং ভাষা (সি প্রোগ্রামিং থিওরি ও কম্পিউটার ল্যাব প্র্যাকটিস)',
      'অধ্যায় ৬: ডাটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS) ও SQL বেসিক',
      'বোর্ড প্রশ্ন সমাধান, মডেল টেস্ট ও বিশেষ সাজেশন'
    ],
    software: ['Code::Blocks', 'Notepad++', 'Chrome DevTools', 'MS Access'],
    careerPaths: ['এইচএসসি বোর্ড পরীক্ষায় A+', 'ভবিষ্যতের সিএসই/আইটি ইঞ্জিনিয়ারিং ফাউন্ডেশন'],
    accentColor: 'amber',
    iconName: 'GraduationCap',
    batchInfo: {
      status: 'enrolling',
      batchCodeBn: 'এইচএসসি ক্র্যাশ ব্যাচ ২৪',
      batchCodeEn: 'HSC Crash Batch 24',
      enrolledStudents: 28,
      totalSeats: 30,
      startDateBn: 'চলমান ব্যাচে আসন খালি',
      startDateEn: 'Immediate Admission',
      scheduleBn: 'প্রতিদিন সকাল ৮টা ও বিকাল ৩টা',
      scheduleEn: 'Daily 8 AM & 3 PM'
    }
  },
  {
    id: 'cyber-security',
    titleBn: 'সাইবার সিকিউরিটি ও এথিক্যাল হ্যাকিং কোর্স',
    titleEn: 'Cyber Security & Ethical Hacking Essentials',
    category: 'coding',
    durationBn: '৪ মাস মেয়াদী',
    durationEn: '4 Months',
    level: 'ইন্টারমিডিয়েট টু অ্যাডভান্সড',
    fee: 8000,
    discountFee: 4999,
    btebApproved: false,
    tagBn: 'হাই-ডিমান্ড সিকিউরিটি কোর্স',
    descriptionBn: 'ডিজিটাল নিরাপত্তা, নেটওয়ার্ক সুরক্ষা, সাইবার অ্যাটাক প্রতিরোধ ও এথিক্যাল হ্যাকিংয়ের বাস্তবসম্মত প্রশিক্ষণ। নিজের ও প্রতিষ্ঠানের সাইবার সুরক্ষায় নির্ভরযোগ্য স্কিল।',
    descriptionEn: 'Learn network security, vulnerability assessment, Linux command line, system hardening, and ethical penetration testing.',
    modules: [
      'সাইবার সিকিউরিটির মৌলিক ভিত্তি ও লিনাক্স ওএস (Kali Linux)',
      'কম্পিউটার নেটওয়ার্কিং (IP, DNS, Port, Firewall, Wi-Fi Security)',
      'ওয়েব অ্যাপ্লিকেশন ভালনারেবিলিটি ও সেফগার্ডস',
      'সোশ্যাল ইঞ্জিনিয়ারিং, ফিশিং ও ম্যালওয়্যার অ্যাটাক প্রতিরোধ',
      'পাসওয়ার্ড ক্র্যাকিং মেকানিজম ও মাল্টি-ফ্যাক্টর সিকিউরিটি সিস্টেম',
      'সাইবার সিকিউরিটি ক্যারিয়ার গাইড ও ফ্রিল্যান্স বাউন্টি প্রোগ্রাম'
    ],
    software: ['Kali Linux', 'Wireshark', 'Burp Suite', 'VirtualBox', 'Nmap'],
    careerPaths: ['সাইবার সিকিউরিটি অ্যানালিস্ট', 'আইটি সাপোর্ট স্পেশালিস্ট', 'নেটওয়ার্ক অ্যাডমিনিস্ট্রেটর', 'বাগ হান্টার'],
    accentColor: 'indigo',
    iconName: 'ShieldAlert',
    batchInfo: {
      status: 'full',
      batchCodeBn: 'ব্যাচ ০৮ (সিকিউরিটি ল্যাব)',
      batchCodeEn: 'Batch 08 (Security Lab)',
      enrolledStudents: 20,
      totalSeats: 20,
      startDateBn: 'পরবর্তী ব্যাচ নিবন্ধন চলমান',
      startDateEn: 'Waitlist Open for Next Batch',
      scheduleBn: 'শুক্রবার ও শনিবার ইনটেনসিভ ল্যাব',
      scheduleEn: 'Fri & Sat Intensive Lab'
    }
  },
  {
    id: 'graphic-design',
    titleBn: 'গ্রাফিক ডিজাইন ও ডিজিটাল মিডিয়া আর্ট',
    titleEn: 'Professional Graphic Design & Brand Identity',
    category: 'freelancing',
    durationBn: '৩ মাস / ৬ মাস মেয়াদী',
    durationEn: '3 Months / 6 Months',
    level: 'প্রফেশনাল',
    fee: 6000,
    discountFee: 3800,
    btebApproved: true,
    tagBn: 'মার্কেটপ্লেস রেডি কোর্স',
    descriptionBn: 'অ্যাডোবি ফটোশপ ও ইলাস্ট্রেটরের সাহায্যে লোগো ডিজাইন, সোশ্যাল মিডিয়া ব্যানার, ব্র্যান্ডিং মেটেরিয়াল ও প্রিন্ট মিডিয়া ডিজাইন শিখুন। আন্তর্জাতিক মার্কেটপ্লেসে উপার্জনের সেরা সুযোগ।',
    descriptionEn: 'Master Adobe Photoshop, Illustrator, logo design, vector art, social media creative design, and portfolio creation.',
    modules: [
      'Adobe Photoshop: ফটো রিটাচিং, ব্যাকগ্রাউন্ড রিমুভাল, কালার কারেকশন',
      'Adobe Illustrator: ভেক্টর আর্ট, লোগো ডিজাইন, আইকন মেকিং',
      'সোশ্যাল মিডিয়া ব্যানার ও ফেসবুক অ্যাড ডিজাইন',
      'ব্র্যান্ড আইডেন্টিটি, ভিজিটিং কার্ড, ফ্লায়ার ও ব্রোশিউর ডিজাইন',
      'ডিজাইন থিওরি, টাইপোগ্রাফি ও কালার সাইকোলজি',
      'Behance ও Freelancer/Fiverr পোর্টফোলিও সেটআপ'
    ],
    software: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva Pro', 'Figma Basics'],
    careerPaths: ['গ্রাফিক ডিজাইনার', 'ব্র্যান্ড আইডেন্টিটি ডিজাইনার', 'ফ্রিল্যান্স ডিজাইনার', 'বিজ্ঞাপনী সংস্থা ক্রিয়েটিভ আর্ট'],
    accentColor: 'rose',
    iconName: 'Palette',
    batchInfo: {
      status: 'enrolling',
      batchCodeBn: 'ব্যাচ ৫২ (ডিজাইন ল্যাব)',
      batchCodeEn: 'Batch 52 (Design Lab)',
      enrolledStudents: 18,
      totalSeats: 25,
      startDateBn: '১৫ মে ২০২৬',
      startDateEn: 'May 15, 2026',
      scheduleBn: 'রবি, মঙ্গল, বৃহস্পতি (সন্ধ্যা ৬টা)',
      scheduleEn: 'Sun, Tue, Thu (6 PM)'
    }
  },
  {
    id: 'web-design',
    titleBn: 'রেসপন্সিভ ওয়েব ডিজাইন ও ডেভেলপমেন্ট',
    titleEn: 'Responsive Web Design & Modern Frontend',
    category: 'coding',
    durationBn: '৪ মাস মেয়াদী',
    durationEn: '4 Months',
    level: 'বেসিক থেকে প্রফেশনাল',
    fee: 7500,
    discountFee: 4500,
    btebApproved: true,
    tagBn: 'আইটি ইঞ্জিনিয়ারিং পাথওয়ে',
    descriptionBn: 'আধুনিক ওয়েবসাইট তৈরির সম্পূর্ণ কোর্স! HTML5, CSS3, Tailwind CSS, JavaScript এবং লাইভ প্রজেক্ট ডেভেলপমেন্ট। মোবাইল, ট্যাবলেট ও পিসির জন্য রেসপন্সিভ ওয়েবসাইট তৈরি শিখুন।',
    descriptionEn: 'Learn modern web crafting with HTML5, CSS3, responsive layouts, modern JavaScript, and live portfolio project launches.',
    modules: [
      'HTML5 সিম্যান্টিক স্ট্রাকচার ও আধুনিক ওয়েব এলিমেন্টস',
      'CSS3 স্টাইলিং, ফ্লেক্সবক্স, সিএসএস গ্রিড ও ডাইনামিক অ্যানিমেশন',
      'রেসপন্সিভ ওয়েব ডিজাইন ও ফ্রেমওয়ার্ক পরিচিতি',
      'জাভাস্ক্রিপ্ট (JavaScript) বেসিক টু ইন্টারমিডিয়েট লজিক',
      'গিট (Git) ও গিটহাব (GitHub) কোড ম্যানেজমেন্ট',
      'ডোমেন, হোস্টিং ও লাইভ প্রজেক্ট পাবলিশিং'
    ],
    software: ['VS Code', 'GitHub', 'Tailwind CSS', 'Chrome DevTools', 'Netlify / Vercel'],
    careerPaths: ['ওয়েব ডিজাইনার', 'ফ্রন্টএন্ড ডেভেলপার', 'ফ্রিল্যান্স ওয়েব এক্সপার্ট', 'ওয়ার্ডপ্রেস কাস্টমাইজার'],
    accentColor: 'cyan',
    iconName: 'Code',
    batchInfo: {
      status: 'full',
      batchCodeBn: 'ব্যাচ ২৯ (ওয়েব ডেভ)',
      batchCodeEn: 'Batch 29 (Web Dev)',
      enrolledStudents: 20,
      totalSeats: 20,
      startDateBn: 'পরবর্তী ব্যাচ: জুন ২০২৬',
      startDateEn: 'Next Batch: June 2026',
      scheduleBn: 'শনি, সোম, বুধ (সন্ধ্যা ৭টা)',
      scheduleEn: 'Sat, Mon, Wed (7 PM)'
    }
  },
  {
    id: 'spoken-english',
    titleBn: 'স্পোকেন ইংলিশ ও ক্যারিয়ার কমিউনিকেশন',
    titleEn: 'Spoken English & Career Communication',
    category: 'language',
    durationBn: '২ মাস / ৩ মাস মেয়াদী',
    durationEn: '2 Months / 3 Months',
    level: 'সকলের জন্য উন্মুক্ত',
    fee: 3500,
    discountFee: 2200,
    btebApproved: false,
    tagBn: 'ক্যারিয়ার বুস্টার',
    descriptionBn: 'ইংরেজি কথা বলায় জড়তা দূর করে সাবলীল ও স্পষ্ট উচ্চারণে কথা বলা শিখুন। বিদেশি ক্লায়েন্টদের সাথে কথা বলা, চাকরির ইন্টারভিউ ও দৈনন্দিন কথোপকথনের জন্য উপযুক্ত।',
    descriptionEn: 'Overcome fear and speak fluent English. Practical conversational sessions, corporate communication, and international client meeting skills.',
    modules: [
      'প্রতিদিনের ইংরেজি কথোপকথন ও ফ্লুয়েন্সি ডেভেলপমেন্ট',
      'শুদ্ধ উচ্চারণ (Pronunciation & Accent Improvement)',
      'ভয় ও জড়তা দূরীকরণে অডিও-ভিজ্যুয়াল প্র্যাকটিস ল্যাব',
      'ফ্রিল্যান্সারদের জন্য বিদেশি বায়ার মিটিং ও ইন্টারভিউ স্কিলস',
      'প্রফেশনাল ইমেইল লেখা ও বিজনেস কমিউনিকেশন'
    ],
    software: ['Audio Practice Lab', 'Pronunciation Guide Software', 'Zoom / Google Meet'],
    careerPaths: ['ফ্রিল্যান্সিং ক্লায়েন্ট কমিউনিকেশন', 'কর্পোরেট জব ইন্টারভিউ', 'উচ্চশিক্ষা ও আইইএলটিএস ফাউন্ডেশন'],
    accentColor: 'teal',
    iconName: 'MessageSquare',
    batchInfo: {
      status: 'coming_soon',
      batchCodeBn: 'গ্রীষ্মকালীন বিশেষ ব্যাচ',
      batchCodeEn: 'Summer Special Batch',
      enrolledStudents: 4,
      totalSeats: 25,
      startDateBn: '১ জুন ২০২৬',
      startDateEn: 'June 1, 2026',
      scheduleBn: 'শুক্র ও শনিবার (সকাল ৯টা)',
      scheduleEn: 'Fri & Sat (9 AM)'
    }
  },
  {
    id: 'kids-computer-coding',
    titleBn: 'কিডস কম্পিউটার ও স্ক্র্যাচ কোডিং (৬-১২ বছর)',
    titleEn: "Kids Computer, English & Scratch Coding",
    category: 'kids',
    durationBn: '৩ মাস মেয়াদী (উইকেন্ড ও সান্ধ্যকালীন)',
    durationEn: '3 Months (Weekend & Evening)',
    level: 'শিশু ও কিশোরদের জন্য',
    fee: 4000,
    discountFee: 2500,
    btebApproved: false,
    tagBn: 'ভবিষ্যতের স্মার্ট প্রজন্ম',
    descriptionBn: 'ছোট থেকেই শিশুদের প্রযুক্তিপ্রেমী ও সৃজনশীল করে তুলতে কম্পিউটার শিক্ষা, টাইপিং গেম, ডিজিটাল আর্ট এবং ব্লক-বেজড স্ক্র্যাচ কোডিং প্রোগ্রামিং।',
    descriptionEn: 'Fun and interactive computer literacy, typing games, safe internet habits, digital drawing, and Scratch block coding for kids.',
    modules: [
      'কম্পিউটারের সাথে মজার বন্ধুত্ব ও নিরাপদ ব্যবহার',
      'মজার টাইপিং গেমস ও কি-বোর্ড স্পিড প্র্যাকটিস',
      'পেইন্ট ও ডিজিটাল ড্রয়িং (MS Paint & Kids Art)',
      'স্ক্র্যাচ প্রোগ্রামিং দিয়ে কার্টুন ও গেম তৈরি (Scratch 3.0)',
      'শিশুদের বেসিক স্পোকেন ইংলিশ ও আত্মবিশ্বাস বৃদ্ধি'
    ],
    software: ['Scratch 3.0', 'Tux Typing', 'MS Paint', 'Educational Kids Apps'],
    careerPaths: ['লজিক্যাল চিন্তাশক্তি বৃদ্ধি', 'ছোট থেকেই প্রোগ্রামিং ফাউন্ডেশন', 'স্মার্ট স্কুল পারফরম্যান্স'],
    accentColor: 'purple',
    iconName: 'Smile',
    batchInfo: {
      status: 'coming_soon',
      batchCodeBn: 'কিডস সামার কোডিং ব্যাচ',
      batchCodeEn: 'Kids Summer Coding Batch',
      enrolledStudents: 2,
      totalSeats: 15,
      startDateBn: '৫ জুন ২০২৬',
      startDateEn: 'June 5, 2026',
      scheduleBn: 'শুক্রবার সকাল ৯:৩০টা',
      scheduleEn: 'Friday 9:30 AM'
    }
  }
];

export const TEN_DAY_ROADMAP: RoadmapDay[] = [
  {
    day: 'Day 01',
    title: 'কম্পিউটার হার্ডওয়্যার, উইন্ডোজ ও সিস্টেম পরিচিতি',
    titleBn: 'কম্পিউটার হার্ডওয়্যার, উইন্ডোজ ও সিস্টেম পরিচিতি',
    titleEn: 'Computer Hardware, Windows & System Architecture',
    desc: 'পিসি চালু ও বন্ধ, কি-বোর্ড ও মাউস নিখুঁত গ্রিপ, Windows 11 সেটিংস ও ফাইল ম্যানেজমেন্ট।',
    descBn: 'পিসি চালু ও বন্ধ, কি-বোর্ড ও মাউস নিখুঁত গ্রিপ, Windows 11 সেটিংস ও ফাইল ম্যানেজমেন্ট।',
    descEn: 'PC startup/shutdown, master keyboard & mouse grips, Windows 11 configuration and modern folder & file hierarchy.',
    highlight: 'বেসিক বুট ক্যাম্প',
    highlightBn: 'বেসিক বুট ক্যাম্প',
    highlightEn: 'Basic Boot Camp',
    icon: 'Monitor'
  },
  {
    day: 'Day 02',
    title: 'দ্রুত টাইピング ও বাংলা লেখার আধুনিক কলাকৌশল',
    titleBn: 'দ্রুত টাইピング ও বাংলা লেখার আধুনিক কলাকৌশল',
    titleEn: 'Fast Touch Typing & Bilingual Bengali Typing Rules',
    desc: 'ইংরেজি টাচ টাইピング ও বিজয় বায়ান্ন/অভ্র কিবোর্ডের যুক্তবর্ণ লেখার ম্যাজিক রুলস।',
    descBn: 'ইংরেজি টাচ টাইピング ও বিজয় বায়ান্ন/অভ্র কিবোর্ডের যুক্তবর্ণ লেখার ম্যাজিক রুলস।',
    descEn: 'English touch typing rhythm and Bijoy 52 / Avro phonetic compound conjunct letter mechanics.',
    highlight: 'টাইপিং স্পিড বুস্টার',
    highlightBn: 'টাইপিং স্পিড বুস্টার',
    highlightEn: 'Typing Speed Booster',
    icon: 'Keyboard'
  },
  {
    day: 'Day 03',
    title: 'এমএস ওয়ার্ড ও অফিসিয়াল ডকুমেন্ট ফরম্যাটিং',
    titleBn: 'এমএস ওয়ার্ড ও অফিসিয়াল ডকুমেন্ট ফরম্যাটিং',
    titleEn: 'MS Word & Professional Document Formatting',
    desc: 'লেটারহেড, টেবিল ডিজাইন, প্রফেশনাল বায়োডাটা ও জীবনবৃত্তান্ত (CV) তৈরি।',
    descBn: 'লেটারহেড, টেবিল ডিজাইন, প্রফেশনাল বায়োডাটা ও জীবনবৃত্তান্ত (CV) তৈরি।',
    descEn: 'Crafting official letterheads, custom tables, professional bio-data, and modern CV layouts.',
    highlight: 'ডকুমেন্টেশন মাস্টার',
    highlightBn: 'ডকুমেন্টেশন মাস্টার',
    highlightEn: 'Documentation Master',
    icon: 'FileText'
  },
  {
    day: 'Day 04',
    title: 'এমএস এক্সেল ও স্বয়ংক্রিয় হিসাব-নিকাশ ফর্মুলা',
    titleBn: 'এমএস এক্সেল ও স্বয়ংক্রিয় হিসাব-নিকাশ ফর্মুলা',
    titleEn: 'MS Excel & Automated Calculation Formulas',
    desc: 'SUM, AVERAGE, IF, VLOOKUP ফর্মুলা, ব্যালান্স শিট ও স্যালারি শিট ক্যালকুলেশন।',
    descBn: 'SUM, AVERAGE, IF, VLOOKUP ফর্মুলা, ব্যালান্স শিট ও স্যালারি শিট ক্যালকুলেশন।',
    descEn: 'Essential formulas (SUM, IF, VLOOKUP, AVERAGE), balance sheet structures, and salary payroll calculations.',
    highlight: 'ডাটা অ্যানালাইটিক্স',
    highlightBn: 'ডাটা অ্যানালাইটিক্স',
    highlightEn: 'Data Analytics',
    icon: 'Table'
  },
  {
    day: 'Day 05',
    title: 'এমএস পাওয়ারপয়েন্ট ও আকর্ষক প্রেজেন্টেশন ডিজাইন',
    titleBn: 'এমএস পাওয়ারপয়েন্ট ও আকর্ষক প্রেজেন্টেশন ডিজাইন',
    titleEn: 'MS PowerPoint & Engaging Presentation Decks',
    desc: 'মর্ডান স্লাইড মাস্টার, ইনফোগ্রাফিক্স, ট্রানজিশন ও ব্যবসায়িক প্রেজেন্টেশন ডেক।',
    descBn: 'মর্ডান স্লাইড মাস্টার, ইনফোগ্রাফিক্স, ট্রানজিশন ও ব্যবসায়িক প্রেজেন্টেশন ডেক।',
    descEn: 'Modern slide master workflows, custom infographics, transitions, and executive pitch decks.',
    highlight: 'ভিজ্যুয়াল স্টোরিটেলিং',
    highlightBn: 'ভিজ্যুয়াল স্টোরিটেলিং',
    highlightEn: 'Visual Storytelling',
    icon: 'Presentation'
  },
  {
    day: 'Day 06',
    title: 'গুগল ক্লাউড, ড্রাইভ ও ইন্টারনেট স্মার্ট সার্চিং',
    titleBn: 'গুগল ক্লাউড, ড্রাইভ ও ইন্টারনেট স্মার্ট সার্চিং',
    titleEn: 'Google Cloud, Drive Backup & Smart Web Research',
    desc: 'Google Docs, Sheets, Drive ব্যাকআপ, প্রাতিষ্ঠানিক ইমেইল শিষ্টাচার ও বুকমার্কিং।',
    descBn: 'Google Docs, Sheets, Drive ব্যাকআপ, প্রাতিষ্ঠানিক ইমেইল শিষ্টাচার ও বুকমার্কিং।',
    descEn: 'Google Docs, Sheets, real-time Cloud Drive synchronizations, email etiquette, and research techniques.',
    highlight: 'ক্লাউড কম্পিউটিং',
    highlightBn: 'ক্লাউড কম্পিউটিং',
    highlightEn: 'Cloud Computing',
    icon: 'Cloud'
  },
  {
    day: 'Day 07',
    title: 'কৃত্রিম বুদ্ধিমত্তা (AI) টুলসের বাস্তবসম্মত প্রয়োগ',
    titleBn: 'কৃত্রিম বুদ্ধিমত্তা (AI) টুলসের বাস্তবসম্মত প্রয়োগ',
    titleEn: 'Practical AI Tools & Prompt Engineering',
    desc: 'ChatGPT ও Google Gemini ব্যবহার করে মিনিটের মধ্যে অফিসিয়াল চিঠি, অনুবাদ ও সামারি তৈরি।',
    descBn: 'ChatGPT ও Google Gemini ব্যবহার করে মিনিটের মধ্যে অফিসিয়াল চিঠি, অনুবাদ ও সামারি তৈরি।',
    descEn: 'Leveraging ChatGPT & Google Gemini to generate official correspondence, translations, and executive summaries in seconds.',
    highlight: 'এআই প্রোডাক্টিভিটি',
    highlightBn: 'এআই প্রোডাক্টিভিটি',
    highlightEn: 'AI Productivity',
    icon: 'Cpu'
  },
  {
    day: 'Day 08',
    title: 'ডিজিটাল ডিজাইন ও ক্যানভা দিয়ে পোস্টার মেকিং',
    titleBn: 'ডিজিটাল ডিজাইন ও ক্যানভা দিয়ে পোস্টার মেকিং',
    titleEn: 'Digital Graphic Design & Poster Crafting in Canva',
    desc: 'সোশ্যাল মিডিয়া ব্যানার, আইডি কার্ড, ফ্লায়ার ও সার্টিফিকেট তৈরি ও প্রিন্ট রেডি আউটপুট।',
    descBn: 'সোশ্যাল মিডিয়া ব্যানার, আইডি কার্ড, ফ্লায়ার ও সার্টিফিকেট তৈরি ও প্রিন্ট রেডি আউটপুট।',
    descEn: 'Social media banners, student ID cards, promotional flyers, and certificates ready for print.',
    highlight: 'ক্রিয়েটিভ ডিজাইন',
    highlightBn: 'ক্রিয়েটিভ ডিজাইন',
    highlightEn: 'Creative Design',
    icon: 'Image'
  },
  {
    day: 'Day 09',
    title: 'সাইবার নিরাপত্তা, ভাইরাস প্রোটেকশন ও ডাটা ব্যাকআপ',
    titleBn: 'সাইবার নিরাপত্তা, ভাইরাস প্রোটেকশন ও ডাটা ব্যাকআপ',
    titleEn: 'Cyber Security, Malware Defense & Data Safeguards',
    desc: 'নিরাপদ পাসওয়ার্ড পলিসি, ফিশিং লিংকের ফাঁদ থেকে রক্ষা ও পেনড্রাইভ ডাটা রিকভারি।',
    descBn: 'নিরাপদ পাসওয়ার্ড পলিসি, ফিশিং লিংকের ফাঁদ থেকে রক্ষা ও পেনড্রাইভ ডাটা রিকভারি।',
    descEn: 'Robust password management, phishing trap prevention, antivirus setups, and pen-drive data recovery.',
    highlight: 'ডিজিটাল নিরাপত্তা',
    highlightBn: 'ডিজিটাল নিরাপত্তা',
    highlightEn: 'Digital Security',
    icon: 'ShieldCheck'
  },
  {
    day: 'Day 10',
    title: 'অনলাইন মার্কেটপ্লেস ও ফ্রিল্যান্সিং ক্যারিয়ার শুরুর প্রস্তুতি',
    titleBn: 'অনলাইন মার্কেটপ্লেস ও ফ্রিল্যান্সিং ক্যারিয়ার শুরুর প্রস্তুতি',
    titleEn: 'Online Marketplaces & Freelancing Career Launch',
    desc: 'Fiverr / Upwork প্রোফাইল গাইড, পোর্টফোলিও গোছানো ও চূড়ান্ত মূল্যায়ন পরীক্ষা।',
    descBn: 'Fiverr / Upwork প্রোফাইল গাইড, পোর্টফোলিও গোছানো ও চূড়ান্ত মূল্যায়ন পরীক্ষা।',
    descEn: 'Fiverr & Upwork profile onboarding, portfolio setup, and comprehensive course assessment.',
    highlight: 'ক্যারিয়ার লঞ্চপ্যাড',
    highlightBn: 'ক্যারিয়ার লঞ্চপ্যাড',
    highlightEn: 'Career Launchpad',
    icon: 'Award'
  }
];

export const MOCK_CERTIFICATES: Record<string, StudentCertificate> = {
  'BCTI-2024-101': {
    certificateId: 'BCTI-2024-101',
    studentName: 'মোঃ তানভীর আহমেদ',
    fatherName: 'মোঃ আব্দুল খালেক',
    courseNameBn: 'কম্পিউটার অফিস অ্যাপ্লিকেশন (৬ মাস মেয়াদী)',
    courseNameEn: 'Computer Office Application (6 Months)',
    btebRoll: '482910',
    regNo: '191028374',
    session: 'জানুয়ারি - জুন ২০২৪',
    grade: 'A+',
    cgpa: '4.00 (A+)',
    issueDate: '১৫ জুলাই, ২০২৪',
    status: 'Verified',
    instituteCode: '27117'
  },
  'BCTI-2025-248': {
    certificateId: 'BCTI-2025-248',
    studentName: 'মোছাঃ নুসরাত জাহান রিমা',
    fatherName: 'মোঃ রফিকুল ইসলাম',
    courseNameBn: 'কম্পিউটার প্রশিক্ষণ এআই ও ফ্রিল্যান্সিং কোর্স',
    courseNameEn: 'AI & Freelancing Masterclass',
    btebRoll: '519022',
    regNo: '202319482',
    session: 'জুলাই - ডিসেম্বর ২০২৪',
    grade: 'A+',
    cgpa: '4.00 (A+)',
    issueDate: '১০ জানুয়ারি, ২০২৫',
    status: 'Verified',
    instituteCode: '27117'
  },
  'BCTI-2026-007': {
    certificateId: 'BCTI-2026-007',
    studentName: 'সাব্বির হোসেন শুভ',
    fatherName: 'মোঃ আক্তারুজ্জামান',
    courseNameBn: 'প্রফেশনাল গ্রাফিক ডিজাইন ও ফ্রিল্যান্সিং',
    courseNameEn: 'Professional Graphic Design & Freelancing',
    btebRoll: '538104',
    regNo: '202491823',
    session: 'অক্টোবর ২০২৫ - মার্চ ২০২৬',
    grade: 'A+',
    cgpa: '3.95 (A+)',
    issueDate: '১৮ এপ্রিল, ২০২৬',
    status: 'Verified',
    instituteCode: '27117'
  },
  'BTEB-27117-092': {
    certificateId: 'BTEB-27117-092',
    studentName: 'ফারজানা আক্তার মিতু',
    fatherName: 'মোঃ শফিকুল ইসলাম',
    courseNameBn: 'এইচএসসি আইসিটি স্পেশাল ও ওয়েব প্রোগ্রামিং',
    courseNameEn: 'HSC ICT Special Program',
    btebRoll: '592019',
    regNo: '202509182',
    session: '২০২৫-২০২৬',
    grade: 'A+',
    cgpa: '5.00 (GPA 5)',
    issueDate: '১ মে, ২০২৬',
    status: 'Verified',
    instituteCode: '27117'
  }
};

export const NOTICES_DATA: Notice[] = [
  {
    id: 'n1',
    titleBn: 'নতুন সেশন (এপ্রিল-জুন ২০২৬) ভর্তি চলছে! সিট সংখ্যা সীমিত।',
    date: '২০২৬-০৩-২০',
    isUrgent: true,
    category: 'Admission'
  },
  {
    id: 'n2',
    titleBn: 'এইচএসসি পরীক্ষার্থীদের জন্য ৫০% বিশেষ ছাড়ে আইসিটি ও স্পোকেন ইংলিশ ব্যাচ শুরু হতে যাচ্ছে।',
    date: '২০২৬-০৩-২২',
    isUrgent: true,
    category: 'Scholarship'
  },
  {
    id: 'n3',
    titleBn: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড (BTEB) এর জানুয়ারি-জুন সেশনের বোর্ড পরীক্ষার সময়সূচি প্রকাশিত হয়েছে।',
    date: '২০২৬-০৩-১৫',
    category: 'Exam'
  },
  {
    id: 'n4',
    titleBn: 'সিঙ্গার মোড় আজিজুর রহমান সুপার মার্কেটস্থ নতুন অত্যাধুনিক ল্যাব ও জনতা ব্যাংক ভবনের ১ম তলায় নিয়মিত ক্লাস কার্যক্রম অব্যাহত রয়েছে।',
    date: '২০২৬-০৩-১০',
    category: 'Event'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'তানভীর আহমেদ',
    role: 'অফিস এক্সিকিউটিভ, কুষ্টিয়া ডিসি কোর্ট রোড',
    course: 'প্রফেশনাল কম্পিউটার অফিস অ্যাপ্লিকেশন (BTEB)',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    reviewBn: 'বেঙ্গল ইনস্টিটিউটের হাতে-কলমে প্র্যাকটিক্যাল শিক্ষা আমার চাকরির পরীক্ষায় কম্পিউটার টেস্টে প্রথম হতে সাহায্য করেছে। কারিগরি শিক্ষা বোর্ডের সনদ পাওয়ায় সরকারি চাকরির ভাইভায় বাড়তি মূল্যায়ন পেয়েছি।',
    reviewEn: 'Hands-on training at Bengal Institute helped me secure top position in my job practical exam. Having a BTEB certified degree provided immense value in government viva exams.',
    earningsOrJob: 'সরকারি প্রজেক্টে কর্মরত',
    rating: 5
  },
  {
    id: 't2',
    name: 'ফারহানা ইয়াসমিন',
    role: 'টপ-রেটেড ফ্রিল্যান্সার (Upwork & Fiverr)',
    course: 'কম্পিউটার প্রশিক্ষণ এআই ও ফ্রিল্যান্সিং কোর্স',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    reviewBn: 'এআই টুলস দিয়ে কীভাবে দ্রুত ও নিখুঁত কাজ করা যায়, তা কুষ্টিয়ায় বেঙ্গল ইনস্টিটিউট ছাড়া এত সুন্দর কেউ শেখায় না। আজ আমি ঘরে বসেই বিদেশি ক্লায়েন্টদের প্রজেক্ট করছি।',
    reviewEn: 'How to deliver speed and precision using AI tools is taught best here in Kushtia. Today I successfully work with international clients remotely from home.',
    earningsOrJob: 'মাসিক গড়ে $৭৫০+ আয়',
    rating: 5
  },
  {
    id: 't3',
    name: 'মেহেদী হাসান রিয়াদ',
    role: 'এইচএসসি পরীক্ষার্থী, কুষ্টিয়া সরকারি কলেজ',
    course: 'এইচএসসি আইসিটি স্পেশাল ব্যাচ',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    reviewBn: 'সি প্রোগ্রামিং আর লজিক গেট আমার কাছে আতঙ্কের মতো ছিল। কিন্তু বেঙ্গল স্যারের সহজ উপস্থাপনা আর ল্যাবে লাইভ কোড রান করে দেখানোর পর এখন আইসিটি সবচেয়ে সহজ লাগে!',
    reviewEn: 'C Programming and logic gates used to terrify me. But the lucid teaching method and live lab execution made ICT my easiest and highest-scoring subject!',
    earningsOrJob: 'টেস্ট পরীক্ষায় আইসিটিতে ৯৮ নম্বর',
    rating: 5
  }
];

export const CAMPUS_FACILITIES = [
  {
    titleBn: '১ জন ১টি কম্পিউটার গ্যারান্টি',
    titleEn: '1 PC Per Student Guarantee',
    descBn: 'কোনো শেয়ারিং নেই, প্রতিটি শিক্ষার্থীর জন্য নির্ধারিত আধুনিক কোর আই ৫/৭ পিসি ও ফুল এইচডি মনিটর।',
    descEn: 'Zero sharing. Dedicated modern Core i5/i7 PC and Full HD monitor for every student.',
    icon: 'MonitorCheck'
  },
  {
    titleBn: 'উচ্চগতির অপটিক্যাল ফাইবার ওয়াইফাই',
    titleEn: 'High-Speed Optical Fiber WiFi',
    descBn: 'সার্বক্ষণিক হাই-স্পিড ব্রডব্যান্ড ইন্টারনেট এবং ব্যাকআপ জেনারেটরের নিশ্চয়তা।',
    descEn: 'Uninterrupted high-speed broadband network and dedicated backup electricity generator.',
    icon: 'Wifi'
  },
  {
    titleBn: 'মাল্টিমিডিয়া প্রজেক্টর ও স্মার্ট ল্যাব',
    titleEn: 'Multimedia Projector & Smart Lab',
    descBn: 'বড় স্ক্রিনে ইন্টার‍্যাক্টিভ ক্লাস, লাইভ ডেমো ও ডিজিটাল কনটেন্ট দিয়ে সহজে পাঠদান।',
    descEn: 'Interactive widescreen projector displays, live demonstrations, and intuitive multimedia curriculum.',
    icon: 'Tv'
  },
  {
    titleBn: 'বিটিইবি সরকারি সনদ (কোড: ২৭১১৭)',
    titleEn: 'BTEB Govt. Certificate (Code: 27117)',
    descBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের কারিগরি শিক্ষা বোর্ড অনুমোদিত ভ্যালিড সার্টিফিকেট।',
    descEn: 'Officially recognized certificates approved by Bangladesh Technical Education Board.',
    icon: 'ShieldCheck'
  },
  {
    titleBn: 'দক্ষ ও পেশাদার ট্রেইনার প্যানেল',
    titleEn: 'Expert Industry Mentors Panel',
    descBn: 'দীর্ঘ অভিজ্ঞতাসম্পন্ন সফটওয়্যার প্রফেশনাল ও সনদপ্রাপ্ত শিক্ষক দ্বারা সার্বক্ষণিক মেন্টরিং।',
    descEn: 'Continuous guidance by experienced software professionals and certified educators.',
    icon: 'Users'
  },
  {
    titleBn: 'আজীবন ল্যাব প্র্যাকটিস ও সাপোর্ট',
    titleEn: 'Lifetime Lab Practice & Support',
    descBn: 'কোর্স শেষ হওয়ার পরেও ফ্রি রিভিশন ক্লাস এবং ফ্রিল্যান্সিং ক্যারিয়ার মেন্টরশিপ।',
    descEn: 'Post-course free revision sessions, open lab hours, and freelancing career consultations.',
    icon: 'Headphones'
  }
];
