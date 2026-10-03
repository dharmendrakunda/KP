import React, { useState } from 'react';
import { SCHOOL_INFO, CLASSES_LIST } from '../data/initialData';
import ReportCardModal from './ReportCardModal';
import { Award, BookOpen, Monitor, Bus, Trophy, ShieldCheck, ArrowRight, Bell, DollarSign, FileText, CheckCircle2, Sparkles, Search } from 'lucide-react';

export default function Hero({ setActiveTab, students }) {
  const [searchRollNo, setSearchRollNo] = useState('');
  const [searchClass, setSearchClass] = useState('Class 5');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [searchError, setSearchError] = useState('');

  const handleSearchResult = (e) => {
    e.preventDefault();
    if (!searchRollNo.trim()) {
      setSearchError('Please enter Roll Number.');
      return;
    }

    const found = (students || []).find(st => 
      st.className === searchClass && st.rollNo.trim() === searchRollNo.trim()
    );

    if (found) {
      setSearchedStudent(found);
      setSearchError('');
    } else {
      setSearchedStudent(null);
      setSearchError(`No student found for Roll No ${searchRollNo} in ${searchClass}.`);
    }
  };

  return (
    <div className="space-y-12">
      {/* Live Announcement Ticker */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 flex items-center shadow-inner text-xs md:text-sm font-semibold">
        <div className="flex items-center gap-2 bg-slate-950 text-amber-400 px-3 py-1 rounded-md text-xs uppercase font-extrabold flex-shrink-0">
          <Bell className="w-3.5 h-3.5 animate-bounce" />
          Latest Notice
        </div>
        <marquee className="ml-3 font-medium text-slate-900">
          🚩 Admissions Open for Academic Session 2026-27 (Playgroup to Class X) &nbsp;|&nbsp; 
           Half-Yearly Examinations results declared! Search your roll number below to Print or Download PDF &nbsp;|&nbsp;
           Clear 2nd Quarter Pending Fees to avoid late charges. Contact Fee Office: {SCHOOL_INFO.phone}
        </marquee>
      </div>

      {/* Hero Section Banner */}
      <section className="relative bg-gradient-to-br from-kp-navy via-kp-blue to-slate-900 text-white py-14 px-4 rounded-2xl mx-4 shadow-2xl overflow-hidden border border-amber-400/30">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          
          {/* Left Column: Hero Content */}
          <div className="space-y-6 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Admissions Open 2026-27 | Playgroup to Class X
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold font-serif leading-tight text-white">
              Welcome to <br />
              <span className="text-amber-400 drop-shadow-md">{SCHOOL_INFO.name}</span>
            </h1>

            <p className="text-amber-100/90 text-sm md:text-base max-w-xl leading-relaxed">
              Providing holistic education, strong values, disciplined learning, and computer education to shape bright futures in Faredupur, Kunda-PBH.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveTab('fees')}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg hover:shadow-amber-500/20 transition transform active:scale-95 text-sm"
              >
                <DollarSign className="w-5 h-5" />
                Pay & Manage Fees
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('results')}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl border border-white/30 backdrop-blur-sm shadow hover:shadow-white/10 transition transform active:scale-95 text-sm"
              >
                <FileText className="w-5 h-5 text-amber-400" />
                Check & Print Results
              </button>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-amber-200/90 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                UP Board & CBSE Pattern
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Smart Digital Classes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                100% Board Result Record
              </span>
            </div>
          </div>

          {/* Right Column: Hero Logo Card */}
          <div className="flex-shrink-0 relative group">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-b from-amber-400/20 to-amber-600/10 rounded-full p-4 flex items-center justify-center border-4 border-amber-400/40 shadow-2xl backdrop-blur-md relative">
              <img
                src={SCHOOL_INFO.logo}
                alt={SCHOOL_INFO.name}
                className="w-full h-full object-contain rounded-full shadow-inner bg-white p-2 border-4 border-kp-navy transform group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Online Student Result Search Widget Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 p-1 rounded-3xl shadow-xl">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[22px] space-y-6">
            <div className="text-center space-y-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Online Marksheet Portal
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold font-serif text-white">
                Check, Print & Download Student Result
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Enter Roll Number and Class below to instantly generate your printable & downloadable PDF Report Card.
              </p>
            </div>

            <form onSubmit={handleSearchResult} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-amber-300 block mb-1">Select Class:</label>
                <select
                  value={searchClass}
                  onChange={(e) => setSearchClass(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-400 focus:outline-none"
                >
                  {CLASSES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300 block mb-1">Enter Roll No:</label>
                <input
                  type="text"
                  placeholder="e.g. 101"
                  value={searchRollNo}
                  onChange={(e) => setSearchRollNo(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition transform active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  View & Download Result
                </button>
              </div>
            </form>

            {searchError && (
              <p className="text-xs text-red-400 font-semibold text-center bg-red-950/50 p-2 rounded-lg border border-red-800/50">
                {searchError}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:border-amber-400 transition">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-kp-navy">1200+</h3>
            <p className="text-xs text-slate-500 font-semibold uppercase mt-1">Enrolled Students</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:border-amber-400 transition">
            <div className="w-12 h-12 bg-blue-100 text-kp-blue rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-kp-navy">45+</h3>
            <p className="text-xs text-slate-500 font-semibold uppercase mt-1">Qualified Faculty</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:border-amber-400 transition">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-kp-navy">100%</h3>
            <p className="text-xs text-slate-500 font-semibold uppercase mt-1">Pass Percentage</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:border-amber-400 transition">
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-kp-navy">14+</h3>
            <p className="text-xs text-slate-500 font-semibold uppercase mt-1">Years of Excellence</p>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Our Infrastructure
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-kp-navy mt-2 font-serif">
            Why Choose K.P. Public School?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-2">
            Modern facilities designed to provide a rich academic, physical, and digital learning environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-kp-navy mb-2">Smart Digital Classrooms</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Equipped with audio-visual smart boards to make complex science and math concepts easy and engaging for students.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 bg-blue-50 text-kp-blue rounded-xl flex items-center justify-center mb-4 group-hover:bg-kp-blue group-hover:text-white transition">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-kp-navy mb-2">Modern Computer & Science Labs</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Dedicated computer lab with high-speed internet and practical science equipment for physics, chemistry, and biology experiments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Bus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-kp-navy mb-2">Safe School Transport</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Fleet of buses and vans covering Faredupur, Kunda town, and neighboring villages with GPS tracking and trained drivers.
            </p>
          </div>
        </div>
      </section>

      {/* Searched Report Card Modal */}
      {searchedStudent && (
        <ReportCardModal
          student={searchedStudent}
          term="Half Yearly"
          onClose={() => setSearchedStudent(null)}
        />
      )}
    </div>
  );
}
