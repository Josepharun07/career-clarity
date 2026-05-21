"use client";

import { X } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Candidate } from "@/lib/mockData";

interface CandidateModalProps {
  candidate: Candidate;
  matchScore: number;
  onClose: () => void;
}

export default function CandidateModal({
  candidate,
  matchScore,
  onClose,
}: CandidateModalProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-[#1A1A1A] border border-[#333333] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#1A1A1A] border-b border-[#333333] p-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">{candidate.name}</h2>
                <p className="text-[#A3A3A3]">{candidate.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#262626] rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Match Score Banner */}
            <div
              className={`mb-6 p-4 rounded-xl text-center ${
                matchScore >= 80
                  ? "bg-[#00FFC6]/20 border border-[#00FFC6]"
                  : matchScore >= 60
                  ? "bg-[#00D9FF]/20 border border-[#00D9FF]"
                  : "bg-[#262626] border border-[#444]"
              }`}
            >
              <div className="text-3xl font-bold mb-1 text-white">
                {matchScore}% Match
              </div>
              <p className="text-sm text-[#A3A3A3]">
                {matchScore >= 80
                  ? "Excellent fit for your requirements"
                  : matchScore >= 60
                  ? "Good potential match"
                  : "Moderate match"}
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Bio & Stats */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-[#00D9FF]">About</h3>
                  <p className="text-[#A3A3A3] leading-relaxed">
                    {candidate.bio}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 text-[#00D9FF]">
                    Cognitive Breakdown
                  </h3>
                  <div className="space-y-3">
                    {candidate.stats.map((stat) => (
                      <div key={stat.trait}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-white">{stat.trait}</span>
                          <span className="text-[#00D9FF] font-bold">
                            {stat.value}/100
                          </span>
                        </div>
                        <div className="h-3 bg-[#0A0A0A] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00D9FF] to-[#00FFC6] rounded-full transition-all duration-500"
                            style={{ width: `${stat.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Radar Chart */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-[#00D9FF] text-center">
                  Cognitive Profile
                </h3>
                <div className="w-full" style={{ height: "400px" }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={candidate.stats}>
                      <PolarGrid stroke="#333333" />
                      <PolarAngleAxis
                        dataKey="trait"
                        tick={{ fill: "#EDEDED", fontSize: 14, fontWeight: 600 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: "#A3A3A3", fontSize: 12 }}
                      />
                      <Radar
                        name={candidate.name}
                        dataKey="value"
                        stroke="#00D9FF"
                        fill="#00D9FF"
                        fillOpacity={0.4}
                        strokeWidth={3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Strengths */}
                <div className="mt-6">
                  <h4 className="font-semibold text-sm text-[#A3A3A3] mb-3 uppercase">
                    Top Strengths
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[...candidate.stats]
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 3)
                      .map((stat) => (
                        <span
                          key={stat.trait}
                          className="px-3 py-1 bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF] rounded-full text-sm font-medium"
                        >
                          {stat.trait} ({stat.value})
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-[#00D9FF] hover:bg-[#00FFC6] text-black font-semibold py-4 px-6 rounded-lg transition-all hover:scale-105">
                Send Interview Invite
              </button>
              <button className="flex-1 bg-[#262626] hover:bg-[#333] border border-[#444] text-white font-semibold py-4 px-6 rounded-lg transition-all">
                Add to Shortlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}