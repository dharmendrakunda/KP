import { SCHOOL_INFO } from '../data/initialData';

/**
 * Format phone number to international WhatsApp format (e.g. 919919537035)
 */
export const formatWhatsAppNumber = (phone) => {
  if (!phone) return '919919537035';
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned;
};

/**
 * Open WhatsApp with pre-filled single student fee reminder
 */
export const sendSingleFeeReminder = (student) => {
  const number = formatWhatsAppNumber(student.mobile || SCHOOL_INFO.phone);
  const text = 
`🚩 *${SCHOOL_INFO.name}*
📍 *${SCHOOL_INFO.location}*
📧 ${SCHOOL_INFO.email}

*FEE REMINDER NOTICE*
---------------------------------------
Dear Parent of *${student.name}*
Class: *${student.className}* | Roll No: *${student.rollNo}*

This is a friendly reminder that school fee for *${student.name}* is pending.

💰 *Pending Amount:* ₹${student.fee.pendingAmount.toLocaleString()}
📅 *Due Date:* ${student.fee.dueDate}

Kindly deposit the pending fees at the school fee counter at the earliest.

If already paid, please ignore this message.

Thank You,
*Management*
*${SCHOOL_INFO.name}*
📞 ${SCHOOL_INFO.phone}`;

  const encodedText = encodeURIComponent(text);
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodedText}`;
  window.open(url, '_blank');
};

/**
 * Open WhatsApp with pre-filled student result summary
 */
export const sendSingleResultWhatsApp = (student, term = "Annual") => {
  const number = formatWhatsAppNumber(student.mobile || SCHOOL_INFO.phone);
  const scholasticList = student.scholastic || [];

  let totalObtained = 0;
  let totalMax = scholasticList.length * 200;
  let subjectSummary = "";

  scholasticList.forEach(item => {
    const obt = (item.pa1 || 0) + (item.pa2 || 0) + (item.halfYearly || 0) + (item.pa3 || 0) + (item.pa4 || 0) + (item.annual || 0);
    totalObtained += obt;
    subjectSummary += `• *${item.subject}:* ${obt}/200\n`;
  });

  const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : 0;
  let grade = 'A+';
  if (percentage < 33) grade = 'F';
  else if (percentage < 50) grade = 'C';
  else if (percentage < 60) grade = 'B';
  else if (percentage < 75) grade = 'B+';
  else if (percentage < 90) grade = 'A';
  else grade = 'A+';

  const text = 
`🎓 *${SCHOOL_INFO.name}*
📍 *${SCHOOL_INFO.location}*
📧 ${SCHOOL_INFO.email} | 📞 ${SCHOOL_INFO.phone}

*PROGRESS REPORT CARD (${term.toUpperCase()})*
---------------------------------------
Student Name: *${student.name}*
Father's Name: *${student.fatherName}*
Class: *${student.className}* | Roll No: *${student.rollNo}*
---------------------------------------
*SUBJECT MARKS BREAKDOWN:*
${subjectSummary}---------------------------------------
📊 *Grand Total Marks:* ${totalObtained} / ${totalMax}
📈 *Percentage:* ${percentage}%
🎖️ *Overall Grade:* ${grade}
🏆 *Class Rank:* ${student.rank || 1}
---------------------------------------

Congratulations on your academic performance!
Download your detailed printable report card on our school portal.

Warm Regards,
*Principal & Examination Cell*
*${SCHOOL_INFO.name}*`;

  const encodedText = encodeURIComponent(text);
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodedText}`;
  window.open(url, '_blank');
};

/**
 * Generate Class-wise Group WhatsApp Message
 */
export const generateClassFeeBroadcast = (className, pendingStudents) => {
  let listText = "";
  pendingStudents.forEach((st, idx) => {
    listText += `${idx + 1}. *${st.name}* (Roll: ${st.rollNo}) - Pending: ₹${st.fee.pendingAmount}\n`;
  });

  const message = 
`📣 *OFFICIAL ANNOUNCEMENT - ${SCHOOL_INFO.name}*
📍 *${SCHOOL_INFO.location}*
📧 ${SCHOOL_INFO.email}

*FEE DUE NOTICE FOR ${className.toUpperCase()}*
---------------------------------------
Respected Parents,
Greetings from KP Public School.

This is an urgent reminder for parents of *${className}* whose school fees are currently due. Please find the list of students with pending fee balances:

${listText}
---------------------------------------
Kindly ensure the pending amount is cleared before the due date to ensure smooth academic progress.

Fee Counter Timings: 08:00 AM - 02:00 PM (Mon-Sat)
Phone: ${SCHOOL_INFO.phone}

Thank you for your cooperation!
*Principal*
*${SCHOOL_INFO.name}*`;

  return message;
};
