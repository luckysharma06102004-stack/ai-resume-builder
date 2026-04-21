
import React from 'react'
import Title from './Title'
import { BookUserIcon, Sparkles, FileText, Target, Palette, Upload, Share2 } from 'lucide-react'

const Testimonial = () => {

    const featuresData = [
        {
            icon: <Sparkles className="size-6 stroke-violet-600" />,
            iconBg: 'bg-violet-100',
            iconBorder: 'border-violet-300',
            title: 'AI-Powered Writing',
            description: 'Enhance your professional summary and job descriptions instantly with AI that writes ATS-friendly content.',
        },
        {
            icon: <Target className="size-6 stroke-green-600" />,
            iconBg: 'bg-green-100',
            iconBorder: 'border-green-300',
            title: 'ATS Score Checker',
            description: 'Paste any job description and get an instant ATS score with matched keywords, missing skills, and improvement tips.',
        },
        {
            icon: <Palette className="size-6 stroke-orange-500" />,
            iconBg: 'bg-orange-100',
            iconBorder: 'border-orange-300',
            title: 'Beautiful Templates',
            description: 'Choose from multiple professionally designed templates and customize colors to match your personal brand.',
        },
        {
            icon: <Upload className="size-6 stroke-blue-600" />,
            iconBg: 'bg-blue-100',
            iconBorder: 'border-blue-300',
            title: 'Resume Import',
            description: 'Upload your existing resume and let AI automatically extract and populate all your information in seconds.',
        },
        {
            icon: <FileText className="size-6 stroke-rose-500" />,
            iconBg: 'bg-rose-100',
            iconBorder: 'border-rose-300',
            title: 'One-Click Download',
            description: 'Export your resume as a pixel-perfect PDF ready to send to employers with a single click.',
        },
        {
            icon: <Share2 className="size-6 stroke-teal-600" />,
            iconBg: 'bg-teal-100',
            iconBorder: 'border-teal-300',
            title: 'Public Share Link',
            description: 'Make your resume public and share a unique link directly with recruiters or on your portfolio.',
        },
    ];

    const FeatureCard = ({ feature }) => (
        <div className="p-5 rounded-xl mx-4 shadow hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 w-72 shrink-0 bg-white group cursor-pointer">
            <div className={`inline-flex items-center justify-center p-2.5 rounded-lg border ${feature.iconBg} ${feature.iconBorder} mb-4`}>
                {feature.icon}
            </div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1.5">{feature.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
        </div>
    );

    return (
        <>
            <div id='testimonials' className='flex flex-col items-center my-10 scroll-mt-12'>
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
                    <BookUserIcon className="size-4.5 stroke-green-600" />
                    <span>Features</span>
                </div>
                <Title title="Everything you need to land the job" description="Our platform is packed with powerful tools to help you build, optimize, and share a resume that stands out." />
            </div>

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...featuresData, ...featuresData].map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...featuresData, ...featuresData].map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>

            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }

                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }
            `}</style>
        </>
    )
}

export default Testimonial