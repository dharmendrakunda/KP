import React, { useState } from 'react';
import { CLASSES_LIST } from '../data/initialData';
import { Users, UserPlus, Search, Edit3, Trash2, Phone, MapPin, Calendar, X } from 'lucide-react';

export default function StudentManager({ students, setStudents }) {
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newStudent, setNewStudent] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    className: 'Class 5',
    section: 'A',
    rollNo: '',
    gender: 'Male',
    dob: '2016-01-01',
    mobile: '',
    address: 'Kunda, Pratapgarh',
    totalAnnualFee: '18000'
  });

  const filteredStudents = students.filter(st => {
    const matchesClass = selectedClass === 'All' || st.className === selectedClass;
    const matchesSearch = 
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.mobile.includes(searchTerm);
    return matchesClass && matchesSearch;
  });

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.rollNo || !newStudent.mobile) {
      alert("Please fill in Student Name, Roll No, and Mobile Number.");
      return;
    }

    const feeAmount = parseFloat(newStudent.totalAnnualFee) || 18000;

    const studentRecord = {
      id: `KP${Date.now().toString().slice(-6)}`,
      rollNo: newStudent.rollNo,
      name: newStudent.name,
      fatherName: newStudent.fatherName || 'Parent',
      motherName: newStudent.motherName || 'Parent',
      className: newStudent.className,
      section: newStudent.section,
      gender: newStudent.gender,
      dob: newStudent.dob,
      mobile: newStudent.mobile,
      address: newStudent.address,
      fee: {
        totalAnnualFee: feeAmount,
        paidAmount: 0,
        pendingAmount: feeAmount,
        status: 'Pending',
        dueDate: '2026-09-25',
        lastPaymentDate: '-'
      },
      marks: {}
    };

    setStudents(prev => [...prev, studentRecord]);
    setShowAddModal(false);
    setNewStudent({
      name: '',
      fatherName: '',
      motherName: '',
      className: 'Class 5',
      section: 'A',
      rollNo: '',
      gender: 'Male',
      dob: '2016-01-01',
      mobile: '',
      address: 'Kunda, Pratapgarh',
      totalAnnualFee: '18000'
    });
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student record?")) {
      setStudents(prev => prev.filter(st => st.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-kp-navy font-serif flex items-center gap-2">
            <Users className="w-7 h-7 text-amber-500" />
            Student Directory & Enrollment
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Register new students, update contact information, and manage class rosters for KP Public School.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl shadow transition transform active:scale-95 text-xs"
        >
          <UserPlus className="w-4 h-4" />
          Add New Student
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search name, roll no, mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <span className="text-slate-500">Filter Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-kp-navy focus:outline-none"
          >
            <option value="All">All Classes</option>
            {CLASSES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-kp-navy text-white font-bold uppercase text-[11px]">
                <th className="p-3">Student ID</th>
                <th className="p-3">Roll & Name</th>
                <th className="p-3">Class & Section</th>
                <th className="p-3">Father & Mother</th>
                <th className="p-3">Mobile No</th>
                <th className="p-3">Address</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(st => (
                  <tr key={st.id} className="hover:bg-amber-50/40 transition">
                    <td className="p-3 font-mono text-[11px] text-slate-500">{st.id}</td>
                    <td className="p-3">
                      <span className="font-bold text-kp-navy block">{st.name}</span>
                      <span className="text-[10px] text-slate-500">Roll: {st.rollNo} ({st.gender})</span>
                    </td>
                    <td className="p-3 font-semibold text-slate-700">{st.className} - {st.section}</td>
                    <td className="p-3">
                      <span className="block text-slate-700">{st.fatherName}</span>
                      <span className="text-[10px] text-slate-400">{st.motherName}</span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{st.mobile}</td>
                    <td className="p-3 text-slate-500 max-w-xs truncate">{st.address}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteStudent(st.id)}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                        title="Delete Student Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500 font-medium">
                    No students registered in this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-kp-navy font-serif">Add New Student Registration</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold text-kp-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Roll Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 105"
                    value={newStudent.rollNo}
                    onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold text-kp-navy focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Father's Name</label>
                  <input
                    type="text"
                    placeholder="Father Name"
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile / WhatsApp No *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9876543210"
                    value={newStudent.mobile}
                    onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold text-kp-navy focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Class</label>
                  <select
                    value={newStudent.className}
                    onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold focus:outline-none"
                  >
                    {CLASSES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Annual Fee (₹)</label>
                  <input
                    type="number"
                    value={newStudent.totalAnnualFee}
                    onChange={(e) => setNewStudent({ ...newStudent, totalAnnualFee: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Village / Town Name"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs shadow"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
