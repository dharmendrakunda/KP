import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import NoticeBoard from './components/NoticeBoard';
import FeesManager from './components/FeesManager';
import ResultManager from './components/ResultManager';
import StudentManager from './components/StudentManager';
import LoginModal from './components/LoginModal';
import { INITIAL_STUDENTS, SCHOOL_INFO } from './data/initialData';
import { logoutApp } from './firebase';
import { Lock, ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Authenticated user state
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('kpps_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    return null;
  });

  // Students state with localStorage sync
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('kpps_students');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved students", e);
      }
    }
    return INITIAL_STUDENTS;
  });

  useEffect(() => {
    localStorage.setItem('kpps_students', JSON.stringify(students));
  }, [students]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('kpps_user', JSON.stringify(user));
  };

  const handleLogout = async () => {
    await logoutApp();
    setCurrentUser(null);
    setActiveTab('home');
  };

  const isProtectedTab = ['fees', 'results', 'students'].includes(activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Navbar Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        onOpenLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {activeTab === 'home' && <Hero setActiveTab={setActiveTab} students={students} />}
        {activeTab === 'about' && <About />}
        {activeTab === 'notices' && <NoticeBoard />}

        {/* Protected Views Guard */}
        {isProtectedTab && !currentUser ? (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto border-4 border-amber-300 shadow-lg">
              <Lock className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Restricted Access Portal
              </span>
              <h2 className="text-3xl font-extrabold text-kp-navy font-serif">
                Administrator & Faculty Login Required
              </h2>
              <p className="text-slate-600 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                Fees Management, Marks Entry, and Student Registration are restricted to authorized KP Public School administrators and staff.
              </p>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-8 py-3.5 rounded-2xl shadow-xl transition transform active:scale-95 text-sm"
              >
                <KeyRound className="w-5 h-5" />
                Sign In to Unlock Portal
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Public visitors can search, print, and download student results directly from the <button onClick={() => setActiveTab('home')} className="text-amber-700 underline font-bold">Home Page</button>.
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'fees' && <FeesManager students={students} setStudents={setStudents} />}
            {activeTab === 'results' && <ResultManager students={students} setStudents={setStudents} />}
            {activeTab === 'students' && <StudentManager students={students} setStudents={setStudents} />}
          </>
        )}
      </main>

      {/* Login & Forgot Password Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
