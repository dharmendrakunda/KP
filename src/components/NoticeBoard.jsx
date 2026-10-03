import React, { useState } from 'react';
import { INITIAL_NOTICES } from '../data/initialData';
import { Bell, Calendar, Tag, AlertCircle, FileText, Download } from 'lucide-react';

export default function NoticeBoard() {
  const [filter, setFilter] = useState('All');

  const filteredNotices = filter === 'All' 
    ? INITIAL_NOTICES 
    : INITIAL_NOTICES.filter(n => n.category === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-kp-navy font-serif flex items-center gap-2">
            <Bell className="w-6 h-6 text-amber-500" />
            Official School Notice Board
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Stay updated with official announcements, examination schedules, and circulars from KP Public School.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 text-xs font-semibold">
          {['All', 'Academic', 'Finance', 'Events'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg transition ${
                filter === cat ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map(notice => (
          <div key={notice.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition space-y-3">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div className="flex items-center space-x-2">
                <span className="bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Tag className="w-3 h-3 text-amber-500" />
                  {notice.category}
                </span>
                {notice.urgent && (
                  <span className="bg-red-100 text-red-700 font-bold text-xs px-2.5 py-1 rounded-md flex items-center gap-1 animate-pulse">
                    <AlertCircle className="w-3 h-3 text-red-600" />
                    URGENT
                  </span>
                )}
              </div>

              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {notice.date}
              </span>
            </div>

            <h3 className="text-lg font-bold text-kp-navy font-serif">{notice.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{notice.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
