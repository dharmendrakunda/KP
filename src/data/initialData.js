export const SCHOOL_INFO = {
  name: "K.P. PUBLIC SCHOOL",
  tagline: "Inspiring Excellence, Nurturing Values & Empowering Futures",
  location: "FAREDUPUR, KUNDA-PBH (PRATAPGARH)",
  fullAddress: "FAREDUPUR, KUNDA-PBH (PRATAPGARH)",
  phone: "+91 9919537035",
  whatsapp: "919919537035",
  email: "kppublicschool84@gmail.com",
  code: "KPPS-UP-230204",
  principal: "Mr. D. Patel",
  established: "2012",
  affiliation: "Recognized by U.P. Board & CBSE Pattern Education",
  logo: "/logo.jpg"
};

export const INITIAL_NOTICES = [
  {
    id: "N1",
    date: "2026-09-10",
    title: "Half-Yearly & Annual Examination Results Declared",
    category: "Academic",
    urgent: true,
    description: "The official progress report cards for Nursery to Class X have been declared. Students can search their roll number to view, print, or download PDF report cards."
  },
  {
    id: "N2",
    date: "2026-09-05",
    title: "School Fee Clearance Notice",
    category: "Finance",
    urgent: true,
    description: "Parents are requested to clear all pending fees before September 25th. Contact Fee Office: +91 9919537035."
  },
  {
    id: "N3",
    date: "2026-08-28",
    title: "Annual Sports Meet & Cultural Fest Registrations",
    category: "Events",
    urgent: false,
    description: "Registrations are open for the upcoming Inter-House Sports Meet. Interested students can submit their names to class teachers."
  }
];

export const CLASSES_LIST = [
  "K.G - A", "Playgroup", "Nursery", "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"
];

export const INITIAL_STUDENTS = [
  {
    id: "SR-101",
    rollNo: "18",
    name: "PALLVI",
    fatherName: "CHETAN KUMAR",
    motherName: "ROSHANI",
    className: "K.G - A",
    section: "A",
    gender: "Female",
    dob: "07/08/2019",
    mobile: "7985121534",
    address: "FAREDUPUR, KUNDA-PBH (PRATAPGARH)",
    pen: "1234",
    srNo: "101",
    rank: 1,
    remark: "Excellent",
    fee: {
      totalAnnualFee: 18000,
      paidAmount: 18000,
      pendingAmount: 0,
      status: "Paid",
      dueDate: "2026-09-25",
      lastPaymentDate: "2026-09-01"
    },
    scholastic: [
      { subject: "HINDI", pa1: 18, pa2: 20, halfYearly: 60, pa3: 20, pa4: 20, annual: 60 },
      { subject: "ENGLISH", pa1: 20, pa2: 20, halfYearly: 60, pa3: 20, pa4: 20, annual: 60 },
      { subject: "MATHEMATICS", pa1: 19, pa2: 19, halfYearly: 59, pa3: 20, pa4: 20, annual: 59 },
      { subject: "ENGLISH WRITING", pa1: 19, pa2: 20, halfYearly: 57, pa3: 20, pa4: 20, annual: 60 },
      { subject: "ENGLISH ORAL", pa1: 16, pa2: 15, halfYearly: 52, pa3: 16, pa4: 20, annual: 50 },
      { subject: "HINDI WRITTEN", pa1: 15, pa2: 19, halfYearly: 60, pa3: 20, pa4: 20, annual: 60 },
      { subject: "HINDI ORAL", pa1: 18, pa2: 20, halfYearly: 52, pa3: 20, pa4: 20, annual: 55 },
      { subject: "E.V.S", pa1: 19, pa2: 20, halfYearly: 60, pa3: 20, pa4: 20, annual: 60 }
    ],
    coscholastic: [
      { subject: "CONVERSATION", term1: "A+", term2: "A+" },
      { subject: "ART & CRAFT", term1: "A+", term2: "A+" },
      { subject: "ENGLISH RHYMES", term1: "A+", term2: "A+" },
      { subject: "HINDI RHYMES", term1: "A+", term2: "A+" },
      { subject: "P.T.", term1: "A", term2: "A+" }
    ]
  },
  {
    id: "SR-102",
    rollNo: "16",
    name: "MOHD AZLAN",
    fatherName: "NADEEM AHMAD",
    motherName: "RABIYA BANO",
    className: "K.G - A",
    section: "A",
    gender: "Male",
    dob: "06/01/2020",
    mobile: "9506333484",
    address: "FAREDUPUR, KUNDA-PBH (PRATAPGARH)",
    pen: "1",
    srNo: "102",
    rank: 2,
    remark: "Excellent",
    fee: {
      totalAnnualFee: 18000,
      paidAmount: 12000,
      pendingAmount: 6000,
      status: "Pending",
      dueDate: "2026-09-25",
      lastPaymentDate: "2026-06-10"
    },
    scholastic: [
      { subject: "HINDI", pa1: 19, pa2: 19, halfYearly: 59, pa3: 20, pa4: 20, annual: 60 },
      { subject: "ENGLISH", pa1: 20, pa2: 19, halfYearly: 58, pa3: 18, pa4: 20, annual: 59 },
      { subject: "MATHEMATICS", pa1: 19, pa2: 19, halfYearly: 60, pa3: 19, pa4: 20, annual: 56 },
      { subject: "ENGLISH WRITING", pa1: 19, pa2: 20, halfYearly: 56, pa3: 17, pa4: 18, annual: 59 },
      { subject: "ENGLISH ORAL", pa1: 15, pa2: 15, halfYearly: 50, pa3: 17, pa4: 16, annual: 48 },
      { subject: "HINDI WRITTEN", pa1: 19, pa2: 18, halfYearly: 57, pa3: 20, pa4: 20, annual: 59 },
      { subject: "HINDI ORAL", pa1: 18, pa2: 20, halfYearly: 56, pa3: 20, pa4: 19, annual: 56 },
      { subject: "E.V.S", pa1: 20, pa2: 19, halfYearly: 58, pa3: 19, pa4: 19, annual: 60 }
    ],
    coscholastic: [
      { subject: "CONVERSATION", term1: "A+", term2: "A+" },
      { subject: "ART & CRAFT", term1: "A+", term2: "A+" },
      { subject: "ENGLISH RHYMES", term1: "A+", term2: "A+" },
      { subject: "HINDI RHYMES", term1: "A+", term2: "A+" },
      { subject: "P.T.", term1: "A+", term2: "A" }
    ]
  },
  {
    id: "SR-103",
    rollNo: "7",
    name: "AYUSH MISHRA",
    fatherName: "RADHEY SHYAM MISHRA",
    motherName: "VANDANA DEVI",
    className: "K.G - A",
    section: "A",
    gender: "Male",
    dob: "10/10/2019",
    mobile: "9794980300",
    address: "FAREDUPUR, KUNDA-PBH (PRATAPGARH)",
    pen: "1",
    srNo: "103",
    rank: 3,
    remark: "Excellent",
    fee: {
      totalAnnualFee: 18000,
      paidAmount: 9000,
      pendingAmount: 9000,
      status: "Pending",
      dueDate: "2026-09-20",
      lastPaymentDate: "2026-04-15"
    },
    scholastic: [
      { subject: "HINDI", pa1: 19, pa2: 19, halfYearly: 60, pa3: 20, pa4: 20, annual: 60 },
      { subject: "ENGLISH", pa1: 20, pa2: 17, halfYearly: 55, pa3: 19, pa4: 19, annual: 58 },
      { subject: "MATHEMATICS", pa1: 18, pa2: 20, halfYearly: 57, pa3: 20, pa4: 20, annual: 55 },
      { subject: "ENGLISH WRITING", pa1: 19, pa2: 19, halfYearly: 56, pa3: 18, pa4: 19, annual: 52 },
      { subject: "ENGLISH ORAL", pa1: 17, pa2: 16, halfYearly: 50, pa3: 20, pa4: 20, annual: 45 },
      { subject: "HINDI WRITTEN", pa1: 18, pa2: 20, halfYearly: 58, pa3: 19, pa4: 20, annual: 54 },
      { subject: "HINDI ORAL", pa1: 18, pa2: 20, halfYearly: 55, pa3: 20, pa4: 20, annual: 59 },
      { subject: "E.V.S", pa1: 20, pa2: 18, halfYearly: 59, pa3: 19, pa4: 18, annual: 57 }
    ],
    coscholastic: [
      { subject: "CONVERSATION", term1: "A+", term2: "A+" },
      { subject: "ART & CRAFT", term1: "A+", term2: "A+" },
      { subject: "ENGLISH RHYMES", term1: "A", term2: "A+" },
      { subject: "HINDI RHYMES", term1: "A", term2: "A+" },
      { subject: "P.T.", term1: "A", term2: "A+" }
    ]
  }
];
