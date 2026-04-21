

import React, { useState } from 'react';
import { Zap, Sparkles, Target, Palette, Upload, Share2, FileText, CheckCircle } from 'lucide-react';
import Title from './Title';

const features = [
  {
    icon: <Sparkles className="size-5 stroke-violet-600" />,
    iconBg: 'bg-violet-100 border-violet-200',
    tag: 'AI Powered',
    tagColor: 'bg-violet-100 text-violet-700',
    title: 'AI Writing Assistant',
    description:
      'Struggling with words? Our AI instantly generates compelling professional summaries and job descriptions tailored to your experience — ATS-friendly and recruiter-approved.',
    points: ['Enhance professional summary', 'Improve job descriptions', 'Action verbs & metrics suggested'],
    color: 'violet',
  },
  {
    icon: <Target className="size-5 stroke-green-600" />,
    iconBg: 'bg-green-100 border-green-200',
    tag: 'Smart Analysis',
    tagColor: 'bg-green-100 text-green-700',
    title: 'Resume Health & ATS Scorer',
    description:
      'One click gives you a full breakdown — ATS score, health score, section-by-section feedback, missing keywords, and your top priority fixes.',
    points: ['ATS & health score out of 100', 'Section-by-section feedback', 'Industry keyword suggestions'],
    color: 'green',
  },
  {
    icon: <Palette className="size-5 stroke-orange-500" />,
    iconBg: 'bg-orange-100 border-orange-200',
    tag: 'Templates',
    tagColor: 'bg-orange-100 text-orange-700',
    title: 'Beautiful Templates & Colors',
    description:
      'Choose from professionally designed templates — Classic, Modern, Minimal — and personalize your accent color to match your personal brand.',
    points: ['4 professional templates', 'Custom accent colors', 'Live real-time preview'],
    color: 'orange',
  },
  {
    icon: <Upload className="size-5 stroke-blue-600" />,
    iconBg: 'bg-blue-100 border-blue-200',
    tag: 'Import',
    tagColor: 'bg-blue-100 text-blue-700',
    title: 'Import Existing Resume',
    description:
      'Already have a resume? Paste it in and our AI automatically extracts all your information and populates every section in seconds.',
    points: ['Auto-extract all sections', 'Supports any resume format', 'Saves hours of manual entry'],
    color: 'blue',
  },
  {
    icon: <FileText className="size-5 stroke-rose-500" />,
    iconBg: 'bg-rose-100 border-rose-200',
    tag: 'Export',
    tagColor: 'bg-rose-100 text-rose-700',
    title: 'Download as PDF',
    description:
      'Export your polished resume as a clean, print-ready PDF with a single click — ready to attach to any job application.',
    points: ['One-click PDF download', 'Print-ready formatting', 'Clean layout preserved'],
    color: 'rose',
  },
  {
    icon: <Share2 className="size-5 stroke-teal-600" />,
    iconBg: 'bg-teal-100 border-teal-200',
    tag: 'Share',
    tagColor: 'bg-teal-100 text-teal-700',
    title: 'Public Share Link',
    description:
      'Make your resume public and get a shareable link — perfect for sending to recruiters, adding to your LinkedIn bio, or embedding on a portfolio.',
    points: ['Toggle public / private', 'Unique shareable URL', 'Live view for recruiters'],
    color: 'teal',
  },
];

const colorMap = {
  violet: { border: 'border-violet-200', bg: 'hover:bg-violet-50', active: 'bg-violet-50 border-violet-300', dot: 'bg-violet-500' },
  green:  { border: 'border-green-200',  bg: 'hover:bg-green-50',  active: 'bg-green-50 border-green-300',  dot: 'bg-green-500'  },
  orange: { border: 'border-orange-200', bg: 'hover:bg-orange-50', active: 'bg-orange-50 border-orange-300', dot: 'bg-orange-500' },
  blue:   { border: 'border-blue-200',   bg: 'hover:bg-blue-50',   active: 'bg-blue-50 border-blue-300',    dot: 'bg-blue-500'   },
  rose:   { border: 'border-rose-200',   bg: 'hover:bg-rose-50',   active: 'bg-rose-50 border-rose-300',    dot: 'bg-rose-500'   },
  teal:   { border: 'border-teal-200',   bg: 'hover:bg-teal-50',   active: 'bg-teal-50 border-teal-300',    dot: 'bg-teal-500'   },
};

const Features = () => {
  const [active, setActive] = useState(0);
  const current = features[active];
  const c = colorMap[current.color];

  return (
    <div id="features" className="flex flex-col items-center my-20 scroll-mt-12 px-4">

      {/* Tag */}
      <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100 rounded-full px-6 py-1.5">
        <Zap width={14} />
        <span>Simple Process</span>
      </div>

      <Title
        title="Everything You Need to Land the Job"
        description="From building to optimizing to sharing — our platform covers every step of your job application journey."
      />

      <div className="mt-12 w-full max-w-6xl grid lg:grid-cols-12 gap-6">

        {/* ── Left: Feature List ── */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          {features.map((f, i) => {
            const fc = colorMap[f.color];
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all duration-200 cursor-pointer
                  ${isActive ? `${fc.active}` : `border-gray-100 bg-white ${fc.bg}`}`}
              >
                <div className={`p-2 rounded-lg border ${f.iconBg} shrink-0`}>
                  {f.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">{f.title}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${f.tagColor} shrink-0`}>{f.tag}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{f.description.split('—')[0].trim()}</p>
                </div>
                <div className={`w-1.5 h-8 rounded-full shrink-0 transition-all ${isActive ? fc.dot : 'bg-transparent'}`} />
              </button>
            );
          })}
        </div>

        {/* ── Right: Feature Detail ── */}
        <div className={`lg:col-span-7 rounded-2xl border-2 p-8 flex flex-col justify-between transition-all duration-300 ${c.active}`}>
          <div>
            {/* Icon + Tag */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`p-3 rounded-xl border ${current.iconBg}`}>
                {current.icon}
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${current.tagColor}`}>
                {current.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{current.title}</h3>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6">{current.description}</p>

            {/* Points */}
            <ul className="space-y-2.5">
              {current.points.map((pt, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle className={`size-4 shrink-0 ${
                    current.color === 'violet' ? 'stroke-violet-500' :
                    current.color === 'green'  ? 'stroke-green-500'  :
                    current.color === 'orange' ? 'stroke-orange-500' :
                    current.color === 'blue'   ? 'stroke-blue-500'   :
                    current.color === 'rose'   ? 'stroke-rose-500'   :
                    'stroke-teal-500'
                  }`} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center gap-1.5 mt-8">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? `w-6 h-2 ${colorMap[features[i].color].dot}` : 'w-2 h-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default Features;