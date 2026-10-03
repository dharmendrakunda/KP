import React, { useState } from 'react';
import { CLASSES_LIST } from '../data/initialData';
import { sendSingleFeeReminder, generateClassFeeBroadcast } from '../utils/whatsapp';
import { DollarSign, MessageSquare, Users, Search, Filter, CheckCircle2, Clock, AlertCircle, Copy, ExternalLink, Edit3, X } from 'lucide-react';

export default function FeesManager({ students, setStudents }) {
  const [selectedClass, setSelectedClass] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [activePaymentStudent, setActivePaymentStudent] = useState(null);
  const [paymentAmountInput, setPaymentAmountInput] = useState('');
  const [showClassBroadcastModal, setShowClassBroadcastModal] = useState(false);
  const [copiedBroadcast, setCopiedBroadcast] = useState(false);

  // Filter student list
  const filteredStudents = students.filter(st => {
    const matchesClass = selectedClass === 'All' || st.className === selectedClass;
    const matchesStatus = statusFilter === 'All' || st.fee.status === statusFilter;
    const matchesSearch = 
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.fatherName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesStatus && matchesSearch;
  });

  // Summary Metrics
  const totalExpected = students.reduce((sum, st) => sum + (st.fee.totalAnnualFee || 0), 0);
  const totalCollected = students.reduce((sum, st) => sum + (st.fee.paidAmount || 0), 0);
  const totalPending = students.reduce((sum, st) => sum + (st.fee.pendingAmount || 0), 0);
  const defaultersCount = students.filter(st => st.fee.pendingAmount > 0).length;

  // Class-wise pending list for broadcast modal
  const classPendingStudents = students.filter(st => 
    (selectedClass === 'All' ? true : st.className === selectedClass) && st.fee.pendingAmount > 0
  );

  const broadcastText = generateClassFeeBroadcast(
    selectedClass === 'All' ? 'All Classes' : selectedClass,
    classPendingStudents
  );

  // Payment Recording
  const handleSavePayment = () => {
    if (!activePaymentStudent) return;
    const payment = parseFloat(paymentAmountInput);
    if (isNaN(payment) || payment <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    setStudents(prev => prev.map(st => {
      if (st.id === activePaymentStudent.id) {
        const newPaid = st.fee.paidAmount + payment;
        const newPending = Math.max(0, st.fee.totalAnnualFee - newPaid);
        let newStatus = 'Paid';
        if (newPending > 0 && newPaid > 0) newStatus = 'Partial';
        else if (newPending > 0) newStatus = 'Pending';

        return {
          ...st,
          fee: {
            ...st.fee,
            paidAmount: newPaid,
            pendingAmount: newPending,
            status: newStatus,
            lastPaymentDate: new Date().toISOString().split('T')[0]
          }
        };
      }
      return st;
    }));

    setActivePaymentStudent(null);
    setPaymentAmountInput('');
  };

  const handleCopyBroadcast = () => {
    navigator.clipboard.writeText(broadcastText);
    setCopiedBroadcast(true);
    setTimeout(() => setCopiedBroadcast(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-kp-navy font-serif flex items-center gap-2">
            <DollarSign className="w-7 h-7 text-amber-500" />
            School Fees Management Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track student fee balances, collect payments, and send instant WhatsApp fee reminders (single or class broadcast).
          </p>
        </div>

        <button
          onClick={() => setShowClassBroadcastModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl shadow transition transform active:scale-95 text-xs"
        >
          <MessageSquare className="w-4 h-4" />
          Send Class WhatsApp Group Message
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-500 text-[11px] font-bold uppercase">Total Expected Annual Fee</span>
          <p className="text-2xl font-black text-kp-navy">₹{totalExpected.toLocaleString()}</p>
        </div>

        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-emerald-700 text-[11px] font-bold uppercase">Total Fee Collected</span>
          <p className="text-2xl font-black text-emerald-700">₹{totalCollected.toLocaleString()}</p>
        </div>

        <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm space-y-1">
          <span className="text-red-700 text-[11px] font-bold uppercase">Total Pending Fee Balance</span>
          <p className="text-2xl font-black text-red-700">₹{totalPending.toLocaleString()}</p>
        </div>

        <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 shadow-sm space-y-1">
          <span className="text-amber-800 text-[11px] font-bold uppercase">Pending Defaulters Count</span>
          <p className="text-2xl font-black text-amber-800">{defaultersCount} Students</p>
        </div>

      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search student name, roll no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
        </div>

        {/* Class & Status Selectors */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div className="flex items-center space-x-1.5 text-xs font-semibold">
            <span className="text-slate-500">Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-kp-navy focus:outline-none"
            >
              <option value="All">All Classes</option>
              {CLASSES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex items-center space-x-1.5 text-xs font-semibold">
            <span className="text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-kp-navy focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid Only</option>
              <option value="Pending">Pending Only</option>
              <option value="Partial">Partial Only</option>
            </select>
          </div>

        </div>

      </div>

      {/* Student Fees Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-kp-navy text-white font-bold uppercase text-[11px]">
                <th className="p-3">Roll & Name</th>
                <th className="p-3">Class</th>
                <th className="p-3">Parent & Contact</th>
                <th className="p-3 text-right">Total Fee</th>
                <th className="p-3 text-right">Paid</th>
                <th className="p-3 text-right">Pending</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Due Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(st => {
                  const isPending = st.fee.pendingAmount > 0;
                  return (
                    <tr key={st.id} className="hover:bg-amber-50/40 transition">
                      <td className="p-3">
                        <span className="font-bold text-kp-navy block">{st.name}</span>
                        <span className="text-[10px] text-slate-500">Roll: {st.rollNo}</span>
                      </td>
                      <td className="p-3 font-semibold text-slate-700">
                        {st.className} ({st.section})
                      </td>
                      <td className="p-3">
                        <span className="block text-slate-700">{st.fatherName}</span>
                        <span className="text-[10px] text-slate-500">{st.mobile}</span>
                      </td>
                      <td className="p-3 text-right font-medium">₹{st.fee.totalAnnualFee.toLocaleString()}</td>
                      <td className="p-3 text-right font-semibold text-emerald-700">₹{st.fee.paidAmount.toLocaleString()}</td>
                      <td className="p-3 text-right font-extrabold text-red-600">₹{st.fee.pendingAmount.toLocaleString()}</td>
                      <td className="p-3 text-center">
                        {st.fee.status === 'Paid' && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            PAID
                          </span>
                        )}
                        {st.fee.status === 'Pending' && (
                          <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-red-600" />
                            PENDING
                          </span>
                        )}
                        {st.fee.status === 'Partial' && (
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            PARTIAL
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center text-slate-600 font-medium">
                        {st.fee.dueDate}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center space-x-2">
                          
                          {/* Record Payment Button */}
                          <button
                            onClick={() => {
                              setActivePaymentStudent(st);
                              setPaymentAmountInput(st.fee.pendingAmount.toString());
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-kp-navy rounded-lg transition"
                            title="Collect Fee / Record Payment"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* WhatsApp Reminder Button */}
                          {isPending ? (
                            <button
                              onClick={() => sendSingleFeeReminder(st)}
                              className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition shadow"
                              title="Send WhatsApp Fee Reminder"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              WhatsApp
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">Clear</span>
                          )}

                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-slate-500 font-medium">
                    No student records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {activePaymentStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-kp-navy font-serif">Record Fee Payment</h3>
              <button onClick={() => setActivePaymentStudent(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-xl">
              <p><strong>Student:</strong> {activePaymentStudent.name} (Class {activePaymentStudent.className})</p>
              <p><strong>Father:</strong> {activePaymentStudent.fatherName}</p>
              <p><strong>Total Annual Fee:</strong> ₹{activePaymentStudent.fee.totalAnnualFee}</p>
              <p><strong>Currently Paid:</strong> ₹{activePaymentStudent.fee.paidAmount}</p>
              <p className="text-red-600 font-bold"><strong>Current Pending:</strong> ₹{activePaymentStudent.fee.pendingAmount}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Payment Amount Received (₹):</label>
              <input
                type="number"
                value={paymentAmountInput}
                onChange={(e) => setPaymentAmountInput(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-bold text-kp-navy focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setActivePaymentStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePayment}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs shadow"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Class WhatsApp Group Broadcast Modal */}
      {showClassBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full border border-slate-200 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-kp-navy font-serif">
                  Class WhatsApp Group Announcement ({selectedClass})
                </h3>
              </div>
              <button onClick={() => setShowClassBroadcastModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Formatted notice listing all <strong>{classPendingStudents.length} pending fee students</strong> for {selectedClass}. You can copy this message or launch WhatsApp.
            </p>

            <textarea
              readOnly
              value={broadcastText}
              rows={12}
              className="w-full p-3 bg-slate-900 text-amber-200 rounded-xl text-xs font-mono border border-slate-700 focus:outline-none"
            />

            <div className="flex flex-wrap justify-between items-center gap-2 pt-2">
              <button
                onClick={handleCopyBroadcast}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
              >
                <Copy className="w-4 h-4 text-slate-600" />
                {copiedBroadcast ? 'Copied to Clipboard!' : 'Copy Announcement Text'}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowClassBroadcastModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Close
                </button>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(broadcastText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open WhatsApp Web / App
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
