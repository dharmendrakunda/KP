import React, { useState } from 'react';
import { CLASSES_LIST } from '../data/initialData';
import { sendSingleResultWhatsApp } from '../utils/whatsapp';
import { downloadReportCardPDF } from '../utils/pdfGenerator';
import ReportCardModal from './ReportCardModal';
import { FileText, Award, Search, Eye, Download, MessageSquare, Edit3, X, CheckCircle, Printer } from 'lucide-react';

export default function ResultManager({ students, setStudents }) {
  const [selectedClass, setSelectedClass] = useState('Class 5');
  const [selectedTerm, setSelectedTerm] = useState('Half Yearly');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected student for Report Card Modal view
  const [viewingStudentCard, setViewingStudentCard] = useState(null);

  // Edit Marks Modal state
  const [editingMarksStudent, setEditingMarksStudent] = useState(null);
  const [marksInputState, setMarksInputState] = useState({
    Hindi: 80,
    English: 80,
    Mathematics: 80,
    Science: 80,
    SocialScience: 80,
    Computer: 80
  });

  // Filtered Students
  const classStudents = students.filter(st => {
    const matchesClass = selectedClass === 'All' || st.className === selectedClass;
    const matchesSearch = 
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // Open Edit Marks Modal
  const handleOpenEditMarks = (student) => {
    setEditingMarksStudent(student);
    const existing = student.marks && student.marks[selectedTerm] ? student.marks[selectedTerm] : null;
    if (existing) {
      setMarksInputState({
        Hindi: existing.Hindi?.obtained || 0,
        English: existing.English?.obtained || 0,
        Mathematics: existing.Mathematics?.obtained || 0,
        Science: existing.Science?.obtained || 0,
        SocialScience: existing.SocialScience?.obtained || 0,
        Computer: existing.Computer?.obtained || 0
      });
    } else {
      setMarksInputState({
        Hindi: 75,
        English: 75,
        Mathematics: 75,
        Science: 75,
        SocialScience: 75,
        Computer: 75
      });
    }
  };

  // Save Marks
  const handleSaveMarks = () => {
    if (!editingMarksStudent) return;

    setStudents(prev => prev.map(st => {
      if (st.id === editingMarksStudent.id) {
        const updatedMarks = {
          ...(st.marks || {}),
          [selectedTerm]: {
            Hindi: { max: 100, obtained: Number(marksInputState.Hindi) },
            English: { max: 100, obtained: Number(marksInputState.English) },
            Mathematics: { max: 100, obtained: Number(marksInputState.Mathematics) },
            Science: { max: 100, obtained: Number(marksInputState.Science) },
            SocialScience: { max: 100, obtained: Number(marksInputState.SocialScience) },
            Computer: { max: 100, obtained: Number(marksInputState.Computer) }
          }
        };

        return {
          ...st,
          marks: updatedMarks
        };
      }
      return st;
    }));

    setEditingMarksStudent(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-kp-navy font-serif flex items-center gap-2">
            <FileText className="w-7 h-7 text-amber-500" />
            Result & Marksheet Management System
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            View student results with instant <strong>Print Result</strong> and <strong>Download PDF</strong> buttons for every student.
          </p>
        </div>

        {/* Controls: Class & Term */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 text-xs font-semibold">
            <span className="text-slate-500">Term:</span>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-kp-navy focus:outline-none"
            >
              <option value="Half Yearly">Half Yearly Exam</option>
              <option value="Annual">Annual Examination</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5 text-xs font-semibold">
            <span className="text-slate-500">Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-amber-50 border border-amber-300 rounded-lg px-3 py-1.5 text-xs font-bold text-kp-navy focus:outline-none"
            >
              <option value="All">All Classes</option>
              {CLASSES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Search & Status Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search student by name or roll..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Showing <span className="text-kp-navy font-bold">{classStudents.length}</span> students for <span className="text-amber-600 font-bold">{selectedClass} ({selectedTerm})</span>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-kp-navy text-white font-bold uppercase text-[11px]">
                <th className="p-3">Roll No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Class</th>
                <th className="p-3 text-right">Total Marks</th>
                <th className="p-3 text-right">Percentage</th>
                <th className="p-3 text-center">Grade</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Result Actions & Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {classStudents.length > 0 ? (
                classStudents.map(st => {
                  const termMarks = st.marks && st.marks[selectedTerm] ? st.marks[selectedTerm] : null;
                  
                  let totalObtained = 0;
                  let totalMax = 0;
                  if (termMarks) {
                    Object.values(termMarks).forEach(m => {
                      totalObtained += m.obtained;
                      totalMax += m.max;
                    });
                  }

                  const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : '0';
                  let grade = '-';
                  if (termMarks) {
                    const pct = Number(percentage);
                    if (pct < 33) grade = 'F';
                    else if (pct < 50) grade = 'C';
                    else if (pct < 60) grade = 'B';
                    else if (pct < 75) grade = 'A';
                    else if (pct < 90) grade = 'A+';
                    else grade = 'O';
                  }

                  const isPassed = Number(percentage) >= 33;

                  return (
                    <tr key={st.id} className="hover:bg-amber-50/40 transition">
                      <td className="p-3 font-bold text-slate-700">{st.rollNo}</td>
                      <td className="p-3">
                        <span className="font-bold text-kp-navy block">{st.name}</span>
                        <span className="text-[10px] text-slate-500">Father: {st.fatherName}</span>
                      </td>
                      <td className="p-3 font-semibold text-slate-600">{st.className} - {st.section}</td>
                      <td className="p-3 text-right font-extrabold text-kp-navy">
                        {termMarks ? `${totalObtained} / ${totalMax}` : '-'}
                      </td>
                      <td className="p-3 text-right font-extrabold text-amber-700">
                        {termMarks ? `${percentage}%` : '-'}
                      </td>
                      <td className="p-3 text-center font-bold text-slate-800">
                        {grade}
                      </td>
                      <td className="p-3 text-center">
                        {termMarks ? (
                          isPassed ? (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              PASSED
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              NEEDS IMP.
                            </span>
                          )
                        ) : (
                          <span className="bg-slate-100 text-slate-500 text-[10px] font-medium px-2 py-0.5 rounded-full">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center space-x-1.5">
                          
                          {/* View & Print Report Card Button */}
                          <button
                            onClick={() => setViewingStudentCard(st)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg font-extrabold text-[11px] transition shadow"
                            title="View Report Card with Print & PDF options"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View & Print
                          </button>

                          {/* Edit Marks Button */}
                          <button
                            onClick={() => handleOpenEditMarks(st)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition"
                            title="Enter / Edit Marks"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Direct WhatsApp Result Button */}
                          <button
                            onClick={() => sendSingleResultWhatsApp(st, selectedTerm)}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                            title="Send Result via WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-500 font-medium">
                    No students found for {selectedClass}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Marks Modal */}
      {editingMarksStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-kp-navy font-serif">
                Enter Marks: {editingMarksStudent.name} ({selectedTerm})
              </h3>
              <button onClick={() => setEditingMarksStudent(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Roll No: {editingMarksStudent.rollNo} | Class: {editingMarksStudent.className} | Max Marks: 100 per subject
            </p>

            <div className="grid grid-cols-2 gap-4">
              {['Hindi', 'English', 'Mathematics', 'Science', 'SocialScience', 'Computer'].map(subj => (
                <div key={subj} className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">{subj} Marks:</label>
                  <input
                    type="number"
                    max="100"
                    min="0"
                    value={marksInputState[subj]}
                    onChange={(e) => setMarksInputState({ ...marksInputState, [subj]: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold text-kp-navy focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setEditingMarksStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMarks}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs shadow"
              >
                Save & Update Marks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Card Modal */}
      {viewingStudentCard && (
        <ReportCardModal
          student={viewingStudentCard}
          term={selectedTerm}
          onClose={() => setViewingStudentCard(null)}
        />
      )}

    </div>
  );
}
