import React from 'react';
import { SCHOOL_INFO } from '../data/initialData';
import { Award, CheckCircle, Target, Heart, Shield, BookOpen, UserCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-kp-navy to-kp-blue text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">
        <img 
          src={SCHOOL_INFO.logo} 
          alt={SCHOOL_INFO.name} 
          className="w-28 h-28 object-contain rounded-full border-4 border-amber-400 bg-white p-1 shadow-lg"
        />
        <div className="space-y-2 text-center md:text-left">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
            About Our Institution
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold font-serif">{SCHOOL_INFO.name}</h1>
          <p className="text-amber-200 text-sm">{SCHOOL_INFO.fullAddress}</p>
          <p className="text-slate-300 text-xs italic">"{SCHOOL_INFO.tagline}"</p>
        </div>
      </div>

      {/* Director & Principal's Message */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-amber-200 text-amber-900 rounded-full flex items-center justify-center font-serif text-3xl font-extrabold mb-4 border-2 border-amber-400">
            DP
          </div>
          <h3 className="text-xl font-bold text-kp-navy">{SCHOOL_INFO.principal}</h3>
          <p className="text-xs font-bold text-amber-600 uppercase">Director & Principal</p>
          <p className="text-xs text-slate-500 mt-1">{SCHOOL_INFO.name}, Kunda-PBH</p>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-kp-navy font-serif flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-500" />
            Message from the Desk of Principal
          </h3>
          <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
            Welcome to <strong>K.P. Public School</strong>, Faredupur, Kunda-PBH. Since our inception in {SCHOOL_INFO.established}, our core mission has been to nurture young minds with quality education, academic discipline, and deep-rooted moral values.
          </p>
          <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
            We believe that every child possesses unique potential. Through our dedicated faculty, modern digital learning tools, computer education, and comprehensive co-curricular activities, we strive to build confidence and excellence in every student.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-kp-navy font-serif">Our Vision</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            To be a premier educational institution in Pratapgarh district that empowers students from all backgrounds with 21st-century knowledge, moral integrity, and leadership capabilities.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-blue-100 text-kp-blue rounded-xl flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-kp-navy font-serif">Our Mission</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            To provide an affordable, high-quality, disciplined learning environment where curiosity, critical thinking, sportsmanship, and character development flourish seamlessly.
          </p>
        </div>

      </div>

    </div>
  );
}
