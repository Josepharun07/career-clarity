"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { mockCandidates } from "@/lib/mockData";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function EmployerPage() {
  const { user } = useAuth();
  const router = useRouter();

  // If not an employer, redirect
  if (user && user.userType !== 'employer') {
    router.push('/dashboard');
    return null;
  }

  const [sliderValues, setSliderValues] = useState({
    Logic: 50,
    Adaptability: 50,
    EQ: 50,
    Spatial: 50,
    Risk: 50,
  });

  const calculateMatch = (candidate: any) => {
    let totalDiff = 0;
    candidate.stats.forEach((stat: any) => {
      const sliderValue = sliderValues[stat.trait as keyof typeof sliderValues];
      const diff = Math.abs(stat.value - sliderValue);
      totalDiff += diff;
    });
    const maxPossibleDiff = 100 * 5;
    const matchPercentage = 100 - (totalDiff / maxPossibleDiff) * 100;
    return Math.round(matchPercentage);
  };

  const sortedCandidates = [...mockCandidates]
    .map((candidate) => ({
      ...candidate,
      matchScore: calculateMatch(candidate),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  const [selectedCandidate, setSelectedCandidate] = useState(sortedCandidates[0]);

  const handleSliderChange = (trait: string, value: number) => {
    setSliderValues({
      ...sliderValues,
      [trait]: value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <div className="flex" style={{ height: "calc(100vh - 80px)" }}>
        {/* Left Sidebar - Sliders */}
        <div className="w-80 bg-[#F7F9FB] border-r border-[#E5E7EB] p-6 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
              Find Your Match
            </h2>
            <p className="text-sm text-[#6B7280]">
              Adjust cognitive traits to filter candidates
            </p>
          </div>

          {/* Sliders */}
          {Object.keys(sliderValues).map((trait) => (
            <div key={trait} className="mb-8">
              <div className="flex justify-between mb-3">
                <label className="text-sm font-semibold text-[#1A1A1A]">
                  {trait}
                </label>
                <span className="text-sm font-bold text-[#00A896] min-w-[45px] text-right">
                  {sliderValues[trait as keyof typeof sliderValues]}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValues[trait as keyof typeof sliderValues]}
                onChange={(e) => handleSliderChange(trait, parseInt(e.target.value))}
                className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#00A896]"
                style={{
                  background: `linear-gradient(to right, #00A896 0%, #00A896 ${
                    sliderValues[trait as keyof typeof sliderValues]
                  }%, #E5E7EB ${sliderValues[trait as keyof typeof sliderValues]}%, #E5E7EB 100%)`,
                }}
              />
            </div>
          ))}

          {/* Reset Button */}
          <button
            onClick={() =>
              setSliderValues({
                Logic: 50,
                Adaptability: 50,
                EQ: 50,
                Spatial: 50,
                Risk: 50,
              })
            }
            className="w-full py-3 bg-white border-2 border-[#E5E7EB] rounded-md text-[#1A1A1A] text-sm font-semibold hover:border-[#00A896] hover:text-[#00A896] transition-all"
          >
            Reset Filters
          </button>
        </div>

        {/* Right Side - Split View */}
        <div className="flex-1 flex flex-col">
          {/* Top Half - Candidate Grid */}
          <div className="flex-1 p-8 overflow-y-auto border-b border-[#E5E7EB]">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">
              Matching Candidates ({sortedCandidates.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate)}
                  className={`rounded-lg p-5 cursor-pointer transition-all ${
                    selectedCandidate.id === candidate.id
                      ? "bg-[#E8F5F3] border-2 border-[#00A896]"
                      : "bg-white border-2 border-[#E5E7EB] hover:border-[#00A896]/50"
                  }`}
                >
                  {/* Match Score Badge */}
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                      candidate.matchScore >= 80
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : candidate.matchScore >= 60
                        ? "bg-[#E8F5F3] text-[#00A896] border border-[#00A896]"
                        : "bg-gray-100 text-gray-600 border border-gray-300"
                    }`}
                  >
                    {candidate.matchScore}% Match
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-full border-2 border-[#E5E7EB]"
                    />
                    <div>
                      <h4 className="font-bold text-[#1A1A1A] text-sm">
                        {candidate.name}
                      </h4>
                      <p className="text-xs text-[#6B7280]">{candidate.title}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#6B7280] line-clamp-2">
                    {candidate.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Half - Selected Candidate Detail */}
          {selectedCandidate && (
            <div className="flex-1 p-8 bg-[#F7F9FB] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left - Candidate Info */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={selectedCandidate.avatar}
                      alt={selectedCandidate.name}
                      className="w-20 h-20 rounded-full border-4 border-[#00A896]"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-1">
                        {selectedCandidate.name}
                      </h3>
                      <p className="text-[#6B7280] mb-2">
                        {selectedCandidate.title}
                      </p>
                      <div
                        className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
                          selectedCandidate.matchScore >= 80
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-[#E8F5F3] text-[#00A896] border border-[#00A896]"
                        }`}
                      >
                        {selectedCandidate.matchScore}% Match
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#6B7280] mb-2">About</h4>
                    <p className="text-[#1A1A1A] leading-relaxed">{selectedCandidate.bio}</p>
                  </div>

                  <button className="w-full py-3 bg-[#00A896] text-white font-semibold rounded-md hover:bg-[#008C7A] transition-all">
                    Contact Candidate
                  </button>
                </div>

                {/* Right - Radar Chart */}
                <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                  <h4 className="text-lg font-bold text-[#1A1A1A] mb-4 text-center">
                    Cognitive Profile
                  </h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={selectedCandidate.stats}>
                      <PolarGrid stroke="#E5E7EB" />
                      <PolarAngleAxis dataKey="trait" tick={{ fill: "#1A1A1A", fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#6B7280" }} />
                      <Radar
                        name="Candidate"
                        dataKey="value"
                        stroke="#00A896"
                        fill="#00A896"
                        fillOpacity={0.4}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>

                  <div className="mt-6 space-y-3">
                    {selectedCandidate.stats.map((stat: any) => (
                      <div
                        key={stat.trait}
                        className="flex justify-between pb-3 border-b border-[#E5E7EB] last:border-0"
                      >
                        <span className="text-sm font-medium text-[#1A1A1A]">{stat.trait}</span>
                        <span className="text-sm font-bold text-[#00A896]">
                          {stat.value}/100
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}