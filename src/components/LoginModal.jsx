import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/initialData';
import { loginWithEmailOrUsername, handleForgotPassword, DEMO_ADMIN } from '../firebase';
import { Lock, Mail, User, KeyRound, ArrowLeft, ShieldCheck, X, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login' | 'forgot'
  const [identifier, setIdentifier] = useState('admin@kppublicschool.edu.in');
  const [password, setPassword] = useState('admin123');
  const [forgotEmail, setForgotEmail] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identifier || !password) {
      setErrorMessage('Please enter both Username/Email and Password.');
      return;
    }

    setLoading(true);
    const result = await loginWithEmailOrUsername(identifier, password);
    setLoading(false);

    if (result.success) {
      onLoginSuccess(result.user);
      onClose();
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!forgotEmail) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setLoading(true);
    const result = await handleForgotPassword(forgotEmail);
    setLoading(false);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-kp-navy via-kp-blue to-slate-900 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={SCHOOL_INFO.logo}
            alt={SCHOOL_INFO.name}
            className="w-16 h-16 object-contain rounded-full border-2 border-amber-400 bg-white p-0.5 mx-auto mb-2 shadow-lg"
          />

          <h2 className="text-xl font-bold font-serif uppercase text-white">
            {SCHOOL_INFO.name}
          </h2>
          <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider mt-0.5">
            Admin & Staff Portal Login
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          
          {/* Messages */}
          {errorMessage && (
            <div className="bg-red-50 text-red-700 text-xs font-semibold p-3 rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {view === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Username/Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Username or Email Address:</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="admin or admin@kppublicschool.edu.in"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 block">Password:</label>
                  <button
                    type="button"
                    onClick={() => {
                      setView('forgot');
                      setForgotEmail(identifier);
                      setErrorMessage('');
                      setSuccessMessage('');
                    }}
                    className="text-[11px] text-amber-700 font-bold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Demo Hint Banner */}
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1 text-amber-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Demo Admin Credentials:
                </p>
                <p><strong>Username / Email:</strong> <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[10px]">admin@kppublicschool.edu.in</code> or <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[10px]">admin</code></p>
                <p><strong>Password:</strong> <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[10px]">admin123</code></p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                {loading ? 'Authenticating...' : 'Sign In to Portal'}
              </button>

            </form>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Registered Email Address:</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="your-email@kppublicschool.edu.in"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  We will dispatch a secure password reset link to your email address.
                </p>
              </div>

              <div className="flex justify-between items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setView('login');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow transition"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
