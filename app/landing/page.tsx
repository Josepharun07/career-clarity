"use client";

import { useRouter } from "next/navigation";
import { Shield, TrendingUp, Brain, ArrowRight, CheckCircle } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-12">
              <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">
                CAREER CLARITY
              </h1>
              <div className="hidden md:flex space-x-8">
                <a href="#platform" className="text-sm font-medium text-[#6B7280] hover:text-[#00A896] transition-colors">
                  PLATFORM
                </a>
                <a href="#solutions" className="text-sm font-medium text-[#6B7280] hover:text-[#00A896] transition-colors">
                  SOLUTIONS
                </a>
                <a href="#portfolio" className="text-sm font-medium text-[#6B7280] hover:text-[#00A896] transition-colors">
                  PORTFOLIO
                </a>
                <a href="#intelligence" className="text-sm font-medium text-[#6B7280] hover:text-[#00A896] transition-colors">
                  INTELLIGENCE
                </a>
              </div>
            </div>
            <button
              onClick={() => router.push("/login")}
              className="bg-[#00A896] text-white font-semibold px-6 py-2.5 rounded-md hover:bg-[#008C7A] transition-all duration-200"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm font-semibold text-[#00A896] tracking-wide mb-4">
              INTRODUCING THE FUTURE OF TALENT
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] leading-tight mb-6">
              Your True Potential, Verified.
            </h2>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
              Move beyond the limitations of static resumes. Career Clarity provides an architectural view of professional excellence through verified intelligence and live portfolios.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/login")}
                className="bg-[#00A896] text-white font-semibold px-8 py-3.5 rounded-md hover:bg-[#008C7A] transition-all duration-200 flex items-center gap-2"
              >
                EXPLORE SOLUTIONS
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => router.push("/login/employer")}
                className="bg-white text-[#1A1A1A] font-semibold px-8 py-3.5 rounded-md border-2 border-[#E5E7EB] hover:border-[#00A896] transition-all duration-200"
              >
                VIEW DEMO
              </button>
            </div>
          </div>

          {/* Right Image/Stats */}
          <div className="relative">
            <div className="bg-[#F7F9FB] rounded-lg p-8 border border-[#E5E7EB]">
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-md mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Brain size={64} className="mx-auto mb-4 text-[#00A896]" />
                  <p className="text-sm text-[#6B7280]">Professional Profile</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-[#E5E7EB] shadow-sm">
                <div className="text-5xl font-bold text-[#1A1A1A] mb-2">98%</div>
                <p className="text-sm text-[#6B7280] uppercase tracking-wide">
                  Placement Accuracy Through<br />Verified Intelligence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Section */}
      <section id="intelligence" className="bg-[#F7F9FB] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#00A896] tracking-wide mb-3">
              THE SYSTEM
            </p>
            <h3 className="text-4xl font-bold text-[#1A1A1A] mb-4">
              Intelligence Beyond the CV
            </h3>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              We dismantle traditional hiring barriers by mapping the invisible architecture of skill and intent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cognitive Mapping */}
            <div className="bg-white rounded-lg p-8 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E8F5F3] rounded-lg flex items-center justify-center mb-6">
                <Brain className="text-[#00A896]" size={24} />
              </div>
              <h4 className="text-xl font-bold text-[#1A1A1A] mb-3">
                Cognitive Mapping
              </h4>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Deep-dive assessment of problem-solving frameworks and architectural thinking beyond keyword matching.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <CheckCircle size={16} className="text-[#00A896] mt-0.5 flex-shrink-0" />
                  <span>Multi-dimensional skill analysis</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <CheckCircle size={16} className="text-[#00A896] mt-0.5 flex-shrink-0" />
                  <span>Pattern recognition assessment</span>
                </li>
              </ul>
            </div>

            {/* Verified Proofs */}
            <div className="bg-white rounded-lg p-8 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E8F5F3] rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-[#00A896]" size={24} />
              </div>
              <h4 className="text-xl font-bold text-[#1A1A1A] mb-3">
                Verified Proofs
              </h4>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Immutable verification of technical achievements and leadership impact through multi-point validation.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <CheckCircle size={16} className="text-[#00A896] mt-0.5 flex-shrink-0" />
                  <span>Blockchain-backed credentials</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <CheckCircle size={16} className="text-[#00A896] mt-0.5 flex-shrink-0" />
                  <span>Third-party skill validation</span>
                </li>
              </ul>
            </div>

            {/* Real-time Growth */}
            <div className="bg-white rounded-lg p-8 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E8F5F3] rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="text-[#00A896]" size={24} />
              </div>
              <h4 className="text-xl font-bold text-[#1A1A1A] mb-3">
                Real-time Growth
              </h4>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Dynamic tracking of professional trajectory and skill acquisition rates in live environments.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <CheckCircle size={16} className="text-[#00A896] mt-0.5 flex-shrink-0" />
                  <span>Live skill progression tracking</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <CheckCircle size={16} className="text-[#00A896] mt-0.5 flex-shrink-0" />
                  <span>Predictive career modeling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section id="portfolio" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <p className="text-sm font-semibold text-[#00A896] tracking-wide mb-3">
                PREVIEW
              </p>
              <h3 className="text-4xl font-bold text-[#1A1A1A] mb-6">
                Live Candidate Portfolio
              </h3>
              <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
                Experience a new dimension of talent. Our radar-based skill mapping allows for immediate identification of core competencies and cultural resonance.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#00A896] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Architectural Leadership Mapping</p>
                    <p className="text-sm text-[#6B7280]">Visual representation of strategic thinking patterns</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#00A896] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Technical Resilience Index</p>
                    <p className="text-sm text-[#6B7280]">Quantified problem-solving under constraints</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#00A896] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Impact-Adjusted Performance Data</p>
                    <p className="text-sm text-[#6B7280]">Real outcomes beyond traditional metrics</p>
                  </div>
                </li>
              </ul>
              <button
                onClick={() => router.push("/login")}
                className="bg-[#00A896] text-white font-semibold px-8 py-3.5 rounded-md hover:bg-[#008C7A] transition-all duration-200"
              >
                START YOUR ASSESSMENT
              </button>
            </div>

            {/* Right - Portfolio Card */}
            <div className="bg-[#F7F9FB] rounded-lg p-8 border border-[#E5E7EB]">
              <div className="bg-white rounded-lg p-6 border border-[#E5E7EB] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-[#1A1A1A] mb-1">Sarah Jenkins</h4>
                    <p className="text-sm text-[#6B7280]">SENIOR PRODUCT ARCHITECT</p>
                  </div>
                  <div className="text-xs text-[#6B7280]">VERIFIED LEVEL-9</div>
                </div>

                {/* Radar Chart Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-[#E8F5F3] to-[#F7F9FB] rounded-lg mb-6 flex items-center justify-center border border-[#E5E7EB]">
                  <div className="text-center">
                    <p className="text-sm text-[#6B7280] mb-2">Cognitive Profile</p>
                    <div className="w-48 h-48 relative">
                      {/* Simple pentagon visualization */}
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <polygon
                          points="100,20 180,80 150,170 50,170 20,80"
                          fill="#00A896"
                          fillOpacity="0.1"
                          stroke="#00A896"
                          strokeWidth="2"
                        />
                        <polygon
                          points="100,50 150,85 135,145 65,145 50,85"
                          fill="#00A896"
                          fillOpacity="0.3"
                          stroke="#00A896"
                          strokeWidth="2"
                        />
                        <text x="100" y="15" textAnchor="middle" fontSize="10" fill="#6B7280">STRATEGY</text>
                        <text x="185" y="85" textAnchor="start" fontSize="10" fill="#6B7280">DESIGN</text>
                        <text x="155" y="180" textAnchor="middle" fontSize="10" fill="#6B7280">LEADERSHIP</text>
                        <text x="45" y="180" textAnchor="middle" fontSize="10" fill="#6B7280">TECHNICAL</text>
                        <text x="10" y="85" textAnchor="end" fontSize="10" fill="#6B7280">EXECUTION</text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Strategy</span>
                    <span className="font-semibold text-[#1A1A1A]">92/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Design</span>
                    <span className="font-semibold text-[#1A1A1A]">88/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Leadership</span>
                    <span className="font-semibold text-[#1A1A1A]">95/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#00A896] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Discover Your True Potential?
          </h3>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of professionals who have unlocked their cognitive profile and connected with forward-thinking employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-[#00A896] font-semibold px-8 py-3.5 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              START AS JOB SEEKER
            </button>
            <button
              onClick={() => router.push("/login/employer")}
              className="bg-transparent text-white font-semibold px-8 py-3.5 rounded-md border-2 border-white hover:bg-white hover:text-[#00A896] transition-all duration-200"
            >
              I'M AN EMPLOYER
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F7F9FB] border-t border-[#E5E7EB] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">CAREER CLARITY</h3>
              <p className="text-sm text-[#6B7280]">
                Verified intelligence. Live portfolios. Real potential.
              </p>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="#" className="text-[#6B7280] hover:text-[#00A896]">Privacy Policy</a>
              <a href="#" className="text-[#6B7280] hover:text-[#00A896]">Terms of Service</a>
              <a href="#" className="text-[#6B7280] hover:text-[#00A896]">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#E5E7EB] text-center text-sm text-[#6B7280]">
            © 2026 Career Clarity. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}