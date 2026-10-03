import React from 'react';
import { SCHOOL_INFO } from '../data/initialData';
import { downloadReportCardPDF } from '../utils/pdfGenerator';
import { sendSingleResultWhatsApp } from '../utils/whatsapp';
import { Printer, Download, MessageSquare, X, Award, ArrowLeft, User } from 'lucide-react';

export default function ReportCardModal({ student, onClose }) {
  if (!student) return null;

  // Extract or fallback scholastic rows
  const scholasticRows = student.scholastic || [
    { subject: "HINDI", pa1: 18, pa2: 20, halfYearly: 60, pa3: 20, pa4: 20, annual: 60 },
    { subject: "ENGLISH", pa1: 20, pa2: 20, halfYearly: 60, pa3: 20, pa4: 20, annual: 60 },
    { subject: "MATHEMATICS", pa1: 19, pa2: 19, halfYearly: 59, pa3: 20, pa4: 20, annual: 59 },
    { subject: "ENGLISH WRITING", pa1: 19, pa2: 20, halfYearly: 57, pa3: 20, pa4: 20, annual: 60 },
    { subject: "ENGLISH ORAL", pa1: 16, pa2: 15, halfYearly: 52, pa3: 16, pa4: 20, annual: 50 },
    { subject: "HINDI WRITTEN", pa1: 15, pa2: 19, halfYearly: 60, pa3: 20, pa4: 20, annual: 60 },
    { subject: "HINDI ORAL", pa1: 18, pa2: 20, halfYearly: 52, pa3: 20, pa4: 20, annual: 55 },
    { subject: "E.V.S", pa1: 19, pa2: 20, halfYearly: 60, pa3: 20, pa4: 20, annual: 60 }
  ];

  // Co-scholastic fallback
  const coscholasticRows = student.coscholastic || [
    { subject: "CONVERSATION", term1: "A+", term2: "A+" },
    { subject: "ART & CRAFT", term1: "A+", term2: "A+" },
    { subject: "ENGLISH RHYMES", term1: "A+", term2: "A+" },
    { subject: "HINDI RHYMES", term1: "A+", term2: "A+" },
    { subject: "P.T.", term1: "A", term2: "A+" }
  ];

  // Calculations
  let sumPa1 = 0, sumPa2 = 0, sumHalfYearly = 0, sumTerm1Obt = 0;
  let sumPa3 = 0, sumPa4 = 0, sumAnnual = 0, sumTerm2Obt = 0, sumGrandTotal = 0;

  const processedScholastic = scholasticRows.map(row => {
    const t1Obt = (row.pa1 || 0) + (row.pa2 || 0) + (row.halfYearly || 0);
    const t2Obt = (row.pa3 || 0) + (row.pa4 || 0) + (row.annual || 0);
    const grandTotal = t1Obt + t2Obt;

    sumPa1 += row.pa1 || 0;
    sumPa2 += row.pa2 || 0;
    sumHalfYearly += row.halfYearly || 0;
    sumTerm1Obt += t1Obt;
    sumPa3 += row.pa3 || 0;
    sumPa4 += row.pa4 || 0;
    sumAnnual += row.annual || 0;
    sumTerm2Obt += t2Obt;
    sumGrandTotal += grandTotal;

    return { ...row, t1Obt, t2Obt, grandTotal };
  });

  const totalMaxPossible = scholasticRows.length * 200;
  const percentage = totalMaxPossible > 0 ? ((sumGrandTotal / totalMaxPossible) * 100).toFixed(2) : "0.00";

  let overallGrade = 'A+';
  const pctNum = Number(percentage);
  if (pctNum < 33) overallGrade = 'F';
  else if (pctNum < 50) overallGrade = 'C';
  else if (pctNum < 60) overallGrade = 'B';
  else if (pctNum < 75) overallGrade = 'B+';
  else if (pctNum < 90) overallGrade = 'A';
  else overallGrade = 'A+';

  const isPassed = pctNum >= 33;
  const currentDateStr = new Date().toLocaleDateString('en-GB');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    downloadReportCardPDF('printable-report-card', student.name, 'Annual_Report');
  };

  const handleWhatsApp = () => {
    sendSingleResultWhatsApp(student, 'Annual');
  };

  // Helper for short subject codes in bar chart
  const getSubjectCode = (subj) => {
    if (subj.includes('HINDI WRITTEN')) return 'H.W';
    if (subj.includes('HINDI ORAL')) return 'H.O';
    if (subj.includes('HINDI')) return 'HIN';
    if (subj.includes('ENGLISH WRITING')) return 'E.W';
    if (subj.includes('ENGLISH ORAL')) return 'E.O';
    if (subj.includes('ENGLISH')) return 'ENG';
    if (subj.includes('MATH')) return 'MATHS';
    if (subj.includes('E.V.S')) return 'EVS';
    return subj.slice(0, 4);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden my-4 sm:my-8">
        
        {/* Action Header (No Print) */}
        <div className="no-print bg-slate-900 text-white p-4 flex flex-wrap justify-between items-center gap-3 border-b border-amber-500/40">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm md:text-base font-serif">
              Official Progress Report Card: {student.name} ({student.className})
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold transition shadow border border-amber-400/30"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              🖨️ Print Result
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold transition shadow-lg transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              📥 Download PDF Result
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow"
            >
              <MessageSquare className="w-4 h-4" />
              💬 Send to WhatsApp
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Card Content Area */}
        <div id="printable-report-card" className="p-4 sm:p-6 bg-white text-slate-900 font-sans border-[8px] border-[#0066cc] m-1 sm:m-2 space-y-3">
          
          {/* Header Banner - Dead Centralized Title */}
          <div className="flex flex-row items-center justify-between gap-2 pb-1 text-center">
            {/* Left Logo */}
            <div className="w-20 sm:w-28 h-20 sm:h-28 flex-shrink-0 flex items-center justify-center">
              <img 
                src={SCHOOL_INFO.logo} 
                alt={SCHOOL_INFO.name} 
                className="w-full h-full object-contain rounded-full border-2 border-amber-500 p-0.5"
              />
            </div>

            {/* Centralized Text Header */}
            <div className="text-center flex-1 space-y-1 mx-auto px-2">
              <h1 className="text-3xl sm:text-5xl font-black text-[#1e3a8a] font-serif tracking-tight uppercase leading-none text-center w-full">
                {SCHOOL_INFO.name}
              </h1>
              <h2 className="text-sm sm:text-xl font-black text-black font-serif uppercase tracking-wider pt-0.5 text-center w-full">
                FAREDUPUR KUNDA PRATAPGARH U.P
              </h2>
              <p className="text-xs sm:text-base font-black text-black font-serif tracking-tight pt-0.5 text-center w-full">
                kppublicschool84@gmail.com | +91 9919537035
              </p>
            </div>

            {/* Invisible Right Spacer to Balance Logo and Keep Title Dead-Centered */}
            <div className="w-20 sm:w-28 h-20 sm:h-28 flex-shrink-0 hidden sm:block"></div>
          </div>

          {/* Student Profile Info Grid */}
          <div className="flex justify-between items-start pt-1 gap-4 text-xs sm:text-sm font-extrabold text-black">
            <div className="grid grid-cols-2 flex-1 gap-x-6 gap-y-1">
              <div>NAME : <span className="uppercase">{student.name}</span></div>
              <div>ROLL NO. : <span>{student.rollNo}</span></div>
              <div>FATHER`S NAME : <span className="uppercase">{student.fatherName}</span></div>
              <div>MOBILE NO : <span>{student.mobile || '9919537035'}</span></div>
              <div>MOTHER`S NAME : <span className="uppercase">{student.motherName || 'ROSHANI'}</span></div>
              <div>DOB : <span>{student.dob || '07/08/2019'}</span></div>
              <div>SR NO: <span>{student.srNo || '101'}</span></div>
              <div>CLASS : <span>{student.className}</span></div>
              <div>PEN: <span>{student.pen || '1234'}</span></div>
            </div>

            <div className="w-20 sm:w-24 h-24 sm:h-28 border-2 border-black p-0.5 flex flex-col items-center justify-center bg-slate-50 text-[10px] text-slate-500 font-semibold text-center flex-shrink-0">
              <User className="w-10 h-10 text-slate-400 mb-1" />
              <span>PHOTO</span>
            </div>
          </div>

          {/* Scholastic Area Table */}
          <div className="overflow-x-auto border-2 border-slate-900">
            <table className="w-full text-center text-[10px] sm:text-[11px] border-collapse">
              <thead>
                <tr className="bg-[#fbe5d6] font-extrabold border-b border-slate-900 text-slate-900 uppercase">
                  <th colSpan="1" className="p-1 border-r border-slate-900">SCHOLASTIC AREA</th>
                  <th colSpan="4" className="p-1 border-r border-slate-900">TERM1</th>
                  <th colSpan="4" className="p-1 border-r border-slate-900">TERM2</th>
                  <th colSpan="1" className="p-1">GRAND TOTAL</th>
                </tr>
                <tr className="bg-[#fbe5d6] font-bold border-b border-slate-900 text-slate-900">
                  <th className="p-1 border-r border-slate-900 text-left w-1/4">SUBJECTS</th>
                  <th className="p-0.5 border-r border-slate-900">P.A-1<br/>(20)</th>
                  <th className="p-0.5 border-r border-slate-900">P.A-2<br/>(20)</th>
                  <th className="p-0.5 border-r border-slate-900">HALF YEARLY<br/>(60)</th>
                  <th className="p-0.5 border-r border-slate-900">Marks Obt.<br/>(100)</th>
                  <th className="p-0.5 border-r border-slate-900">P.A-3<br/>(20)</th>
                  <th className="p-0.5 border-r border-slate-900">P.A-4<br/>(20)</th>
                  <th className="p-0.5 border-r border-slate-900">ANNUAL<br/>(60)</th>
                  <th className="p-0.5 border-r border-slate-900">Marks Obt.<br/>(100)</th>
                  <th className="p-0.5 font-extrabold">(200)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 font-bold text-slate-900">
                {processedScholastic.map((row, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/50">
                    <td className="p-1 border-r border-slate-900 text-left font-bold uppercase">{row.subject}</td>
                    <td className="p-0.5 border-r border-slate-900">
                      <div className="w-7 mx-auto rounded border border-slate-700 bg-white py-0.5">{row.pa1}</div>
                    </td>
                    <td className="p-0.5 border-r border-slate-900">
                      <div className="w-7 mx-auto rounded border border-slate-700 bg-white py-0.5">{row.pa2}</div>
                    </td>
                    <td className="p-0.5 border-r border-slate-900">
                      <div className="w-7 mx-auto rounded border border-slate-700 bg-white py-0.5">{row.halfYearly}</div>
                    </td>
                    <td className="p-0.5 border-r border-slate-900">
                      <div className="w-9 mx-auto rounded border border-slate-900 bg-amber-50/80 font-black py-0.5">{row.t1Obt}</div>
                    </td>
                    <td className="p-0.5 border-r border-slate-900">
                      <div className="w-7 mx-auto rounded border border-slate-700 bg-white py-0.5">{row.pa3}</div>
                    </td>
                    <td className="p-0.5 border-r border-slate-900">
                      <div className="w-7 mx-auto rounded border border-slate-700 bg-white py-0.5">{row.pa4}</div>
                    </td>
                    <td className="p-0.5 border-r border-slate-900">
                      <div className="w-7 mx-auto rounded border border-slate-700 bg-white py-0.5">{row.annual}</div>
                    </td>
                    <td className="p-0.5 border-r border-slate-900">
                      <div className="w-9 mx-auto rounded border border-slate-900 bg-amber-50/80 font-black py-0.5">{row.t2Obt}</div>
                    </td>
                    <td className="p-0.5">
                      <div className="w-9 mx-auto rounded border border-slate-900 bg-amber-100 font-black py-0.5">{row.grandTotal}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#fbe5d6] font-black text-slate-950 border-t-2 border-slate-900">
                  <td className="p-1 border-r border-slate-900 text-left">Total</td>
                  <td className="p-0.5 border-r border-slate-900">{sumPa1}</td>
                  <td className="p-0.5 border-r border-slate-900">{sumPa2}</td>
                  <td className="p-0.5 border-r border-slate-900">{sumHalfYearly}</td>
                  <td className="p-0.5 border-r border-slate-900">{sumTerm1Obt}</td>
                  <td className="p-0.5 border-r border-slate-900">{sumPa3}</td>
                  <td className="p-0.5 border-r border-slate-900">{sumPa4}</td>
                  <td className="p-0.5 border-r border-slate-900">{sumAnnual}</td>
                  <td className="p-0.5 border-r border-slate-900">{sumTerm2Obt}</td>
                  <td className="p-0.5 font-black">{sumGrandTotal}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Co-Scholastic Area Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-slate-900 text-[11px] font-bold">
            <div className="p-2 border-b md:border-b-0 md:border-r border-slate-900 bg-[#fbe5d6]/30 flex flex-col justify-center text-center">
              <h4 className="text-xs font-serif font-extrabold text-slate-950 uppercase border-b border-slate-400 pb-1 mb-2">
                Grade Scale
              </h4>
              <p className="text-xs font-extrabold text-slate-900">
                Co-Scholastic Areas
              </p>
            </div>

            <div>
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#fbe5d6] border-b border-slate-900 text-[10px] uppercase font-extrabold">
                    <th className="p-1 border-r border-slate-900 text-left w-1/2">Subjects</th>
                    <th className="p-1 border-r border-slate-900">Half Yearly</th>
                    <th className="p-1">Annual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 font-extrabold text-slate-900 text-[10px]">
                  {coscholasticRows.map((co, idx) => (
                    <tr key={idx}>
                      <td className="p-1 border-r border-slate-900 text-left uppercase">{co.subject}</td>
                      <td className="p-1 border-r border-slate-900">{co.term1}</td>
                      <td className="p-1">{co.term2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overall Summary Cards Grid */}
          <div className="space-y-1.5 text-xs font-bold">
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
              <div className="flex border border-slate-900 rounded overflow-hidden">
                <span className="bg-[#fbe5d6] px-2 py-1 w-1/2 flex items-center justify-center uppercase border-r border-slate-900 text-[11px]">Over All Marks</span>
                <span className="bg-white px-2 py-1 w-1/2 flex items-center justify-center font-black text-xs">Total: {sumGrandTotal}/{totalMaxPossible}</span>
              </div>

              <div className="flex border border-slate-900 rounded overflow-hidden">
                <span className="bg-[#fbe5d6] px-2 py-1 w-1/2 flex items-center justify-center uppercase border-r border-slate-900 text-[11px]">Over All Grade</span>
                <span className="bg-white px-2 py-1 w-1/2 flex items-center justify-center font-black text-xs">Grade: {overallGrade}</span>
              </div>

              <div className="flex border border-slate-900 rounded overflow-hidden">
                <span className="bg-[#fbe5d6] px-2 py-1 w-1/2 flex items-center justify-center uppercase border-r border-slate-900 text-[11px]">Class Rank</span>
                <span className="bg-white px-2 py-1 w-1/2 flex items-center justify-center font-black text-xs">{student.rank || 1}</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
              <div className="flex border border-slate-900 rounded overflow-hidden">
                <span className="bg-[#fbe5d6] px-2 py-1 w-1/2 flex items-center justify-center uppercase border-r border-slate-900 text-[11px]">Percentage</span>
                <span className="bg-white px-2 py-1 w-1/2 flex items-center justify-center font-black text-xs">{percentage}</span>
              </div>

              <div className="flex border border-slate-900 rounded overflow-hidden">
                <span className="bg-[#fbe5d6] px-2 py-1 w-1/2 flex items-center justify-center uppercase border-r border-slate-900 text-[11px]">Result</span>
                <span className="bg-white px-2 py-1 w-1/2 flex items-center justify-center font-black text-xs text-emerald-800">{isPassed ? 'PASSED' : 'NEEDS IMP.'}</span>
              </div>

              <div className="flex border border-slate-900 rounded overflow-hidden">
                <span className="bg-[#fbe5d6] px-2 py-1 w-1/2 flex items-center justify-center uppercase border-r border-slate-900 text-[11px]">Result Date</span>
                <span className="bg-white px-2 py-1 w-1/2 flex items-center justify-center font-black text-xs">{currentDateStr}</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex border border-slate-900 rounded overflow-hidden max-w-xl mx-auto">
              <span className="bg-[#fbe5d6] px-4 py-1 w-1/2 text-center uppercase border-r border-slate-900 text-[11px]">Teacher's Remark</span>
              <span className="bg-white px-4 py-1 w-1/2 text-center font-black uppercase text-xs">{student.remark || 'Excellent'}</span>
            </div>

          </div>

          {/* Bar Chart Box */}
          <div className="border-2 border-amber-300 p-2 bg-white space-y-1 rounded-lg">
            <div className="flex justify-center items-center text-[10px] font-extrabold space-x-6 border-b border-amber-200 pb-0.5">
              <span className="flex items-center gap-1">
                <span className="w-3 h-2.5 bg-[#66cdaa] border border-slate-400 inline-block rounded-sm"></span> Term-1
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-2.5 bg-[#008080] border border-slate-600 inline-block rounded-sm"></span> Term-2
              </span>
            </div>

            {/* Bars */}
            <div className="h-28 flex items-end justify-between px-2 pt-4 gap-2 border-b border-slate-300">
              {processedScholastic.map((row, idx) => {
                const t1HeightPct = Math.max(12, Math.min(100, row.t1Obt));
                const t2HeightPct = Math.max(12, Math.min(100, row.t2Obt));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div className="flex items-end space-x-1 h-full w-full justify-center">
                      <div 
                        style={{ height: `${t1HeightPct}%` }} 
                        className="w-1/2 bg-[#66cdaa] border border-slate-400 rounded-t-sm flex items-start justify-center"
                      >
                        <span className="text-[7px] font-black text-slate-900 -mt-3">{row.t1Obt}</span>
                      </div>
                      <div 
                        style={{ height: `${t2HeightPct}%` }} 
                        className="w-1/2 bg-[#008080] border border-slate-700 rounded-t-sm flex items-start justify-center"
                      >
                        <span className="text-[7px] font-black text-white -mt-3">{row.t2Obt}</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-extrabold text-slate-800 mt-1 uppercase text-center">
                      {getSubjectCode(row.subject)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Signatures Footer Area - Extremely Clear & Always Visible */}
          <div className="mt-4 pt-4 grid grid-cols-3 gap-2 text-center text-xs font-extrabold text-slate-900 border-2 border-slate-900 p-3 bg-slate-50/80">
            <div className="flex flex-col justify-end">
              <div className="h-6"></div>
              <p className="border-t-2 border-slate-900 pt-1 font-black uppercase text-[11px]">Parent Signature</p>
            </div>

            <div className="flex flex-col justify-end">
              <div className="h-6"></div>
              <p className="border-t-2 border-slate-900 pt-1 font-black uppercase text-[11px]">Class Teacher Signature</p>
            </div>

            <div className="flex flex-col justify-end">
              <div className="h-6 flex items-center justify-center">
                <span className="font-serif italic text-blue-950 font-black text-sm sm:text-base">CH</span>
              </div>
              <p className="border-t-2 border-slate-900 pt-1 font-black uppercase text-[11px]">Principal Signature</p>
            </div>
          </div>

        </div>

        {/* Footer Actions (No Print) */}
        <div className="no-print bg-slate-100 p-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results List
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl text-xs font-bold transition shadow"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              Print Result Card
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-extrabold transition shadow"
            >
              <Download className="w-4 h-4" />
              Download Result PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
