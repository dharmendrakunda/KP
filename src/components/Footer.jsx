import React from 'react';
import { SCHOOL_INFO } from '../data/initialData';
import { MapPin, Phone, Mail, Globe, Award, Shield, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t-4 border-amber-500 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src={SCHOOL_INFO.logo} alt="KPPS Logo" className="w-12 h-12 rounded-full border-2 border-amber-400 bg-white p-0.5" />
            <div>
              <h3 className="text-lg font-bold text-white font-serif tracking-wider">{SCHOOL_INFO.name}</h3>
              <p className="text-xs text-amber-400 font-semibold uppercase">Faredupur, Kunda-PBH</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Providing quality education, moral values, and modern computer learning to empower students of Faredupur, Kunda, and surrounding regions.
          </p>
          <div className="flex items-center space-x-2 text-xs text-amber-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Est. {SCHOOL_INFO.established} | Reg. No: {SCHOOL_INFO.code}</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition">Home & Overview</button></li>
            <li><button onClick={() => setActiveTab('about')} className="hover:text-amber-400 transition">About School & Principal</button></li>
            <li><button onClick={() => setActiveTab('notices')} className="hover:text-amber-400 transition">Latest Announcements</button></li>
            <li><button onClick={() => setActiveTab('fees')} className="hover:text-amber-400 transition">Fees Structure & Portal</button></li>
            <li><button onClick={() => setActiveTab('results')} className="hover:text-amber-400 transition">Examination Results</button></li>
          </ul>
        </div>

        {/* Col 3: Contact Details */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Contact Information
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{SCHOOL_INFO.fullAddress}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-amber-400">{SCHOOL_INFO.phone}</a>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-amber-400">{SCHOOL_INFO.email}</a>
            </li>
          </ul>
        </div>

        {/* Col 4: Affiliation & Timings */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            School Timings
          </h4>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Summer Timings:</span>
              <span className="font-semibold text-amber-400">07:30 AM - 01:30 PM</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Winter Timings:</span>
              <span className="font-semibold text-amber-400">08:30 AM - 02:30 PM</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Fee Counter:</span>
              <span className="font-semibold text-emerald-400">08:00 AM - 02:00 PM</span>
            </div>
            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800">
              Sunday & Public Holidays Closed
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} {SCHOOL_INFO.name}, Faredupur, Kunda-PBH. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for Quality School Education
        </p>
      </div>
    </footer>
  );
}
