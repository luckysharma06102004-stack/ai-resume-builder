import React, { useState } from 'react';
import {
  Target, Loader2, ChevronDown, ChevronUp,
  CheckCircle, XCircle, Lightbulb, Zap, Star,
  AlertTriangle, FileText, BarChart2, Tag, BookOpen
} from 'lucide-react';
import api from '../configs/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// ── Circular score ring ───────────────────────────────────────────────────────
const ScoreRing = ({ score, size = 90, label, color }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const colors = {
    green:  { stroke: '#22c55e', text: '#16a34a', bg: '#f0fdf4' },
    amber:  { stroke: '#f59e0b', text: '#d97706', bg: '#fffbeb' },
    red:    { stroke: '#ef4444', text: '#dc2626', bg: '#fef2f2' },
    violet: { stroke: '#8b5cf6', text: '#7c3aed', bg: '#f5f3ff' },
    blue:   { stroke: '#3b82f6', text: '#2563eb', bg: '#eff6ff' },
  };

  const c = colors[color] || colors.green;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="7" />
        <circle
          cx="45" cy="45" r={radius} fill="none"
          stroke={c.stroke} strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="45" y="45" textAnchor="middle" dy="0.35em"
          fontSize="16" fontWeight="700" fill={c.text}>
          {score}
        </text>
      </svg>
      {label && <span className="text-xs font-medium text-gray-500 text-center leading-tight">{label}</span>}
    </div>
  );
};

// ── Horizontal progress bar ───────────────────────────────────────────────────
const Bar = ({ score, showScore = true }) => {
  const color = score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-amber-400' : 'bg-red-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
      </div>
      {showScore && <span className="text-xs font-semibold text-gray-500 w-7 text-right">{score}</span>}
    </div>
  );
};

// ── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    strong:  'bg-green-100 text-green-700 border-green-200',
    average: 'bg-amber-100 text-amber-700 border-amber-200',
    weak:    'bg-red-100 text-red-600 border-red-200',
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${map[status] || map.average}`}>
      {status}
    </span>
  );
};

// ── Collapsible card ──────────────────────────────────────────────────────────
const Card = ({ icon, title, score, scoreColor, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-all"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xs font-semibold text-gray-700">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {score !== undefined && (
            <span className={`text-xs font-bold ${scoreColor || 'text-gray-600'}`}>{score}/100</span>
          )}
          {open ? <ChevronUp className="size-3.5 text-gray-400" /> : <ChevronDown className="size-3.5 text-gray-400" />}
        </div>
      </button>
      {open && <div className="px-4 py-3 space-y-2.5 bg-white">{children}</div>}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const ATSScoreChecker = ({ resumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(
        '/api/ai/analyze-resume',
        { resumeData },
        { headers: { Authorization: token } }
      );
      setResult(data.analysisResult);
      setPanelOpen(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Analysis failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const getColor = (s) => s >= 75 ? 'green' : s >= 50 ? 'amber' : 'red';
  const getTextColor = (s) => s >= 75 ? 'text-green-600' : s >= 50 ? 'text-amber-600' : 'text-red-500';
  const getLabel = (s) => s >= 75 ? 'Great' : s >= 50 ? 'Needs Work' : 'Poor';

  return (
    <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">

      {/* ── Header ── */}
      <div className="px-4 py-3 bg-gradient-to-r from-violet-50 to-purple-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="size-4 text-violet-600" />
          <span className="text-sm font-semibold text-violet-700">Resume Analyzer</span>
          {result && (
            <span className={`text-xs font-bold ml-1 ${getTextColor(result.ats_score)}`}>
              · ATS {result.ats_score}/100
            </span>
          )}
        </div>
        <button onClick={() => setPanelOpen(!panelOpen)} className="text-violet-400 hover:text-violet-600 transition">
          {panelOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
      </div>

      {panelOpen && (
        <div className="p-4 bg-white space-y-4">

          {/* ── Analyze button ── */}
          <button
            onClick={analyze}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-medium py-2.5 rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-60 shadow-sm"
          >
            {loading
              ? <><Loader2 className="size-4 animate-spin" /> Analyzing your resume...</>
              : <><Zap className="size-4" /> Analyze My Resume</>
            }
          </button>

          {loading && (
            <div className="text-center py-6 space-y-2">
              <div className="flex justify-center gap-1">
                {['Checking completeness', 'Scanning keywords', 'Scoring content', 'Reviewing readability'].map((t, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
              <p className="text-xs text-gray-400">Running deep analysis...</p>
            </div>
          )}

          {/* ── Results ── */}
          {result && !loading && (
            <div className="space-y-4">

              {/* ── Score overview ── */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                <div className="flex flex-col items-center gap-2">
                  <ScoreRing score={result.ats_score} color={getColor(result.ats_score)} />
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-700">ATS Score</p>
                    <p className={`text-[11px] font-semibold ${getTextColor(result.ats_score)}`}>{getLabel(result.ats_score)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ScoreRing score={result.health_score} color={getColor(result.health_score)} />
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-700">Health Score</p>
                    <p className={`text-[11px] font-semibold ${getTextColor(result.health_score)}`}>{getLabel(result.health_score)}</p>
                  </div>
                </div>
              </div>

              {/* ── Sub scores quick bar ── */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-1">
                {[
                  { label: 'Completeness', score: result.completeness?.score },
                  { label: 'Content Quality', score: result.content_quality?.score },
                  { label: 'Keywords', score: result.industry_keywords?.score },
                  { label: 'Readability', score: result.readability?.score },
                ].map(({ label, score }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[10px] text-gray-500">{label}</span>
                      <span className={`text-[10px] font-semibold ${getTextColor(score)}`}>{score}</span>
                    </div>
                    <Bar score={score} showScore={false} />
                  </div>
                ))}
              </div>

              {/* ── Priority Fixes ── */}
              {result.priority_fixes?.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                  <p className="text-xs font-semibold text-red-700 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="size-3.5" /> Top Priority Fixes
                  </p>
                  <ol className="space-y-1.5">
                    {result.priority_fixes.map((fix, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-red-700">
                        <span className="font-bold shrink-0">{i + 1}.</span>
                        {fix}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* ── Strengths ── */}
              {result.top_strengths?.length > 0 && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                  <p className="text-xs font-semibold text-green-700 flex items-center gap-1.5 mb-2">
                    <Star className="size-3.5" /> Your Strengths
                  </p>
                  <ul className="space-y-1">
                    {result.top_strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-green-700">
                        <CheckCircle className="size-3 mt-0.5 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── Section Feedback ── */}
              <Card
                icon={<FileText className="size-3.5 text-blue-500" />}
                title="Section-by-Section Feedback"
                scoreColor="text-blue-600"
              >
                {result.section_feedback?.map((s, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 py-1.5 border-b border-gray-50 last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-gray-700">{s.section}</span>
                        <StatusBadge status={s.status} />
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{s.tip}</p>
                    </div>
                  </div>
                ))}
              </Card>

              {/* ── Completeness ── */}
              <Card
                icon={<BarChart2 className="size-3.5 text-violet-500" />}
                title="Completeness"
                score={result.completeness?.score}
                scoreColor={getTextColor(result.completeness?.score)}
              >
                <p className="text-[11px] text-gray-500 italic">{result.completeness?.verdict}</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <p className="text-[10px] font-semibold text-green-600 mb-1">✓ Filled</p>
                    {result.completeness?.filled_sections?.map((s, i) => (
                      <p key={i} className="text-[11px] text-gray-600 flex items-center gap-1">
                        <CheckCircle className="size-2.5 text-green-500 shrink-0" /> {s}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-red-500 mb-1">✗ Missing</p>
                    {result.completeness?.missing_sections?.length > 0
                      ? result.completeness.missing_sections.map((s, i) => (
                          <p key={i} className="text-[11px] text-gray-600 flex items-center gap-1">
                            <XCircle className="size-2.5 text-red-400 shrink-0" /> {s}
                          </p>
                        ))
                      : <p className="text-[11px] text-green-600">All sections filled!</p>
                    }
                  </div>
                </div>
              </Card>

              {/* ── Content Quality ── */}
              <Card
                icon={<BookOpen className="size-3.5 text-orange-500" />}
                title="Content Quality"
                score={result.content_quality?.score}
                scoreColor={getTextColor(result.content_quality?.score)}
              >
                <div className="flex gap-4 mb-2">
                  <div className={`flex items-center gap-1 text-[11px] font-medium ${result.content_quality?.action_verbs_used ? 'text-green-600' : 'text-red-500'}`}>
                    {result.content_quality?.action_verbs_used
                      ? <CheckCircle className="size-3" /> : <XCircle className="size-3" />}
                    Action Verbs
                  </div>
                  <div className={`flex items-center gap-1 text-[11px] font-medium ${result.content_quality?.has_quantifiable_results ? 'text-green-600' : 'text-red-500'}`}>
                    {result.content_quality?.has_quantifiable_results
                      ? <CheckCircle className="size-3" /> : <XCircle className="size-3" />}
                    Quantified Results
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Summary: <span className="font-semibold capitalize text-gray-700">{result.content_quality?.summary_quality}</span>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {result.content_quality?.feedback?.map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                      <Lightbulb className="size-3 text-amber-500 mt-0.5 shrink-0" /> {tip}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* ── Industry Keywords ── */}
              <Card
                icon={<Tag className="size-3.5 text-teal-500" />}
                title={`Keywords · ${result.industry_keywords?.job_title || 'Detected Role'}`}
                score={result.industry_keywords?.score}
                scoreColor={getTextColor(result.industry_keywords?.score)}
              >
                <p className="text-[11px] text-gray-500 italic mb-2">{result.industry_keywords?.verdict}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] font-semibold text-green-600 mb-1">Present in your resume</p>
                    <div className="flex flex-wrap gap-1">
                      {result.industry_keywords?.present_keywords?.map((kw, i) => (
                        <span key={i} className="text-[10px] bg-green-50 text-green-700 border border-green-200 rounded px-2 py-0.5">{kw}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-amber-600 mb-1">Add these to boost your score</p>
                    <div className="flex flex-wrap gap-1">
                      {result.industry_keywords?.suggested_keywords?.map((kw, i) => (
                        <span key={i} className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded px-2 py-0.5">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* ── Readability ── */}
              <Card
                icon={<FileText className="size-3.5 text-pink-500" />}
                title="Readability & Format"
                score={result.readability?.score}
                scoreColor={getTextColor(result.readability?.score)}
              >
                <p className="text-[11px] text-gray-500 italic mb-2">{result.readability?.verdict}</p>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {[
                    { label: 'Length', value: result.readability?.resume_length, good: result.readability?.resume_length === 'optimal' },
                    { label: 'Dates', value: result.readability?.dates_consistent ? 'Consistent' : 'Inconsistent', good: result.readability?.dates_consistent },
                    { label: 'Contact', value: result.readability?.contact_complete ? 'Complete' : 'Incomplete', good: result.readability?.contact_complete },
                  ].map(({ label, value, good }) => (
                    <div key={label} className={`text-center p-2 rounded-lg border ${good ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <p className="text-[9px] text-gray-500 mb-0.5">{label}</p>
                      <p className={`text-[10px] font-semibold capitalize ${good ? 'text-green-700' : 'text-red-600'}`}>{value}</p>
                    </div>
                  ))}
                </div>
                {result.readability?.issues?.length > 0 && (
                  <ul className="space-y-1">
                    {result.readability.issues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] text-red-600">
                        <AlertTriangle className="size-3 mt-0.5 shrink-0" /> {issue}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>

              {/* ── Re-analyze ── */}
              <button
                onClick={analyze}
                className="w-full text-xs text-violet-500 hover:text-violet-700 py-1.5 border border-violet-200 rounded-lg hover:bg-violet-50 transition-all"
              >
                Re-analyze after edits
              </button>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ATSScoreChecker;