
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowRight, Sparkles } from 'lucide-react'

const CallToAction = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <div id='cta' className='w-full max-w-5xl mx-auto px-4 sm:px-10 mt-28 mb-10'>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 px-8 sm:px-16 py-16 text-white text-center flex flex-col items-center gap-6">

        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        {/* Badge */}
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full w-fit">
          <Sparkles className="size-3.5" />
          AI-Powered Resume Builder
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold max-w-xl leading-tight">
          Build a Resume That Gets You <span className="text-green-200">Hired Faster</span>
        </h2>

        <p className="text-green-100 max-w-md text-sm leading-relaxed">
           Thousands of job seekers can built ATS-optimized resumes and land interviews at top companies.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 py-2">
          {[
            { value: '10,000+', label: 'Resumes can be Created' },
            { value: '4', label: 'Different Templates' },
            { value: '100%', label: 'Free to Start' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-green-200 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to={user ? '/app' : '/app?state=register'}
          className="flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-3 rounded-full transition-all active:scale-95 shadow-lg"
        >
          {user ? 'Go to Dashboard' : 'Get Started Free'}
          <ArrowRight className="size-4" />
        </Link>

        <p className="text-xs text-green-200">No credit card required · Free forever</p>
      </div>
    </div>
  )
}

export default CallToAction