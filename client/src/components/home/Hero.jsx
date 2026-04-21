
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Palette, FileDown, Share2, Upload } from 'lucide-react';

const Hero = () => {

    const { user } = useSelector(state => state.auth)
    const [menuOpen, setMenuOpen] = React.useState(false);

    const featurePills = [
        { icon: <Sparkles className="size-3.5" />, label: 'AI Writing' },
        { icon: <Target className="size-3.5" />, label: 'ATS Scorer' },
        { icon: <Palette className="size-3.5" />, label: '4 Templates' },
        { icon: <Upload className="size-3.5" />, label: 'Resume Import' },
        { icon: <FileDown className="size-3.5" />, label: 'PDF Export' },
        { icon: <Share2 className="size-3.5" />, label: 'Share Link' },
    ]

    return (
        <>
        <div className="min-h-screen pb-20">

            {/* ── Navbar ── */}
            <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                <Link to='/'>
                    <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
                </Link>

                <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
                    <a href="#" className="hover:text-green-600 transition">Home</a>
                    <a href="#features" className="hover:text-green-600 transition">Simple Process</a>
                    <a href="#testimonials" className="hover:text-green-600 transition">Features</a>
                    <a href="#cta" className="hover:text-green-600 transition">Contact</a>
                </div>

                <div className="flex gap-2">
                    {!user ? (
                        <>
                            <Link to='/app?state=register' className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-600 active:scale-95 transition-all rounded-full text-white font-medium">
                                Get started
                            </Link>
                            <Link to='/app?state=login' className="hidden md:block px-6 py-2 border border-gray-300 active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700">
                                Login
                            </Link>
                        </>
                    ) : (
                        <Link to='/app' className='hidden md:block px-8 py-2 bg-green-500 hover:bg-green-600 active:scale-95 transition-all rounded-full text-white font-medium'>
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 5h16M4 12h16M4 19h16" />
                    </svg>
                </button>
            </nav>

            {/* ── Mobile Menu ── */}
            <div className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <a href="#" onClick={() => setMenuOpen(false)} className="text-white font-medium">Home</a>
                <a href="#features" onClick={() => setMenuOpen(false)} className="text-white font-medium">Simple Process</a>
                <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-white font-medium">Features</a>
                <a href="#cta" onClick={() => setMenuOpen(false)} className="text-white font-medium">Contact</a>
                <button
                    onClick={() => setMenuOpen(false)}
                    className="mt-4 size-10 flex items-center justify-center bg-green-600 hover:bg-green-700 transition text-white rounded-full text-sm font-bold"
                >✕</button>
            </div>

            {/* ── Hero Section ── */}
            <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-40 text-black">

                {/* Background glow */}
                <div className="absolute top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-[500px] bg-green-300 blur-[120px] opacity-25 pointer-events-none" />
                <div className="absolute top-40 -z-10 right-1/4 size-48 sm:size-64 bg-emerald-200 blur-[100px] opacity-20 pointer-events-none" />

                {/* ── Headline ── */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl text-center mt-24 leading-tight tracking-tight">
                    Land your dream job with{' '}
                    <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                        AI-powered
                    </span>{' '}
                    resumes.
                </h1>

                <p className="max-w-lg text-center text-base text-slate-500 mt-5 leading-relaxed">
                    Build, optimize, and share professional resumes in minutes — with AI writing assistance, real-time ATS scoring, and beautiful templates.
                </p>

                {/* ── CTA Buttons ── */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                    <Link
                        to={user ? '/app' : '/app?state=register'}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 h-12 flex items-center gap-2 font-medium ring-2 ring-green-300 ring-offset-2 transition-all active:scale-95 shadow-lg shadow-green-200"
                    >
                        {user ? 'Go to Dashboard' : 'Get started free'}
                        <ArrowRight className="size-4" />
                    </Link>
                    <a
                        href="#features"
                        className="flex items-center gap-2 border border-slate-300 hover:border-green-400 hover:bg-green-50 transition-all rounded-full px-7 h-12 text-slate-700 font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
                        See how it works
                    </a>
                </div>

                <p className="text-xs text-slate-400 mt-3">No credit card required · Free to start</p>

                {/* ── Feature pills ── */}
                <div className="flex flex-wrap justify-center gap-2 mt-12 max-w-2xl">
                    {featurePills.map(({ icon, label }, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-green-300 hover:text-green-700 transition-all">
                            <span className="text-green-500">{icon}</span>
                            {label}
                        </div>
                    ))}
                </div>

                {/* ── Stats strip ── */}
                <div className="flex flex-wrap justify-center gap-10 mt-16 py-6 border-t border-dashed border-gray-200 w-full max-w-2xl">
                    {[
                        { value: '10,000+', label: 'Resumes can be Created' },
                        { value: '4',       label: 'Pro Templates' },
                        { value: '95%',     label: 'ATS Pass Rate' },
                        { value: '< 5 min', label: 'Avg Build Time' },
                    ].map(({ value, label }) => (
                        <div key={label} className="text-center">
                            <p className="text-2xl font-bold text-slate-800">{value}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>

        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
            * { font-family: 'Poppins', sans-serif; }
        `}</style>
        </>
    )
}

export default Hero