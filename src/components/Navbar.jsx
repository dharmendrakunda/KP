import React from 'react';
import { SCHOOL_INFO } from '../data/initialData';
import { Phone, Mail, MapPin, ShieldCheck, DollarSign, FileText, Users, Home, Info, Bell, Lock, LogIn, LogOut, UserCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentUser, onOpenLogin, onLogout }) {
  const isProtectedTab = (tab) => ['fees', 'results', 'students'].includes(tab);

  const handleTabClick = (tab) => {
    if (isProtectedTab(tab) && !currentUser) {
      onOpenLogin();
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-amber-100">
      {/* Top Bar with School Info & User Status */}
      <div className="bg-gradient-to-r from-kp-navy via-kp-blue to-kp-navy text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4 text-amber-200">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {SCHOOL_INFO.fullAddress}
            </span>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {SCHOOL_INFO.affiliation}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a href={`tel:${SCHOOL_INFO.phone}`} className="flex items-center gap-1 hover:text-amber-300 transition">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              {SCHOOL_INFO.phone}
            </a>

            {/* Auth Indicator */}
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-bold text-amber-200 text-[11px]">
                  {currentUser.name}
                </span>
                <button
                  onClick={onLogout}
                  className="ml-1 text-[10px] text-red-300 hover:text-red-100 font-bold underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1 text-amber-300 hover:text-white font-bold transition text-[11px]"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                Staff Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header with Logo & Title */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="relative">
            <img 
              src={SCHOOL_INFO.logo} 
              alt={SCHOOL_INFO.name} 
              className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-full border-2 border-amber-400 shadow-md p-0.5 bg-white"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-kp-navy tracking-tight uppercase flex items-center gap-2 font-serif">
              {SCHOOL_INFO.name}
            </h1>
            <p className="text-xs md:text-sm font-semibold text-amber-600 tracking-wide uppercase">
              FAREDUPUR, KUNDA-PBH (PRATAPGARH)
            </p>
            <p className="text-[11px] text-slate-500 hidden sm:block italic">
              "{SCHOOL_INFO.tagline}"
            </p>
          </div>
        </div>

        {/* Action / Portal Shortcuts */}
        <div className="flex items-center space-x-2">
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('fees')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs md:text-sm rounded-lg shadow transition transform active:scale-95"
              >
                <DollarSign className="w-4 h-4" />
                Fees Portal
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-kp-blue hover:bg-kp-navy text-white font-bold text-xs md:text-sm rounded-lg shadow transition transform active:scale-95"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                Results Portal
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs md:text-sm rounded-xl shadow-lg transition transform active:scale-95"
            >
              <Lock className="w-4 h-4" />
              Admin Portal Login
            </button>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-slate-900 text-slate-200 text-sm font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md transition whitespace-nowrap ${
              activeTab === 'home' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md transition whitespace-nowrap ${
              activeTab === 'about' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Info className="w-4 h-4" />
            About School
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md transition whitespace-nowrap ${
              activeTab === 'notices' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Bell className="w-4 h-4" />
            Notice Board
          </button>

          <button
            onClick={() => handleTabClick('fees')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md transition whitespace-nowrap ${
              activeTab === 'fees' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Fees Management
            {!currentUser && <Lock className="w-3 h-3 text-amber-400 ml-0.5" />}
          </button>

          <button
            onClick={() => handleTabClick('results')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md transition whitespace-nowrap ${
              activeTab === 'results' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            Result Management
            {!currentUser && <Lock className="w-3 h-3 text-amber-400 ml-0.5" />}
          </button>

          <button
            onClick={() => handleTabClick('students')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md transition whitespace-nowrap ${
              activeTab === 'students' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Users className="w-4 h-4" />
            Student Directory
            {!currentUser && <Lock className="w-3 h-3 text-amber-400 ml-0.5" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
