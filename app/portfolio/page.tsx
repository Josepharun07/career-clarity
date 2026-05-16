"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import Header from "@/components/Header";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function PortfolioPage() {
  const { user } = useAuth();
  const [linkCopied, setLinkCopied] = useState(false);

  const userStats = user?.assessmentResults
    ? Object.entries(user.assessmentResults).map(([trait, value]) => ({
        trait,
        value,
      }))
    : [
        { trait: "Logic", value: 85 },
        { trait: "Adaptability", value: 78 },
        { trait: "EQ", value: 92 },
        { trait: "Spatial", value: 80 },
        { trait: "Risk", value: 70 },
      ];

  const handleShare = () => {
    const shareableLink = `${window.location.origin}/portfolio/${user?.id || 'demo'}`;
    
    const textArea = document.createElement("textarea");
    textArea.value = shareableLink;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert(`Copy this link: ${shareableLink}`);
    }
    
    document.body.removeChild(textArea);
  };

  const averageScore = Math.round(
    userStats.reduce((acc, stat) => acc + stat.value, 0) / userStats.length
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-3">
            Your Talent Portfolio
          </h2>
          <p className="text-lg text-[#6B7280]">
            Cognitive profile verified and ready to share
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Profile Info */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-8 shadow-sm">
            {/* Avatar & Name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00A896] to-[#00C9A7] flex items-center justify-center text-white text-3xl">
                {user?.fullName?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-1">
                  {user?.fullName || "Your Name"}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span className="text-sm text-[#6B7280]">Verified by Career Clarity</span>
                </div>
              </div>
            </div>

            {/* Cognitive Strengths */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">
                Top Cognitive Strengths
              </h4>
              <div className="flex flex-wrap gap-2">
                {userStats
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 3)
                  .map((stat) => (
                    <span
                      key={stat.trait}
                      className="px-3 py-1.5 bg-[#E8F5F3] text-[#00A896] border border-[#00A896] rounded-full text-sm font-semibold"
                    >
                      {stat.trait}
                    </span>
                  ))}
              </div>
            </div>

            {/* Assessment Score */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">
                Overall Assessment Score
              </h4>
              <div className="text-5xl font-bold text-[#00A896]">
                {averageScore}<span className="text-2xl text-[#6B7280]">/100</span>
              </div>
              <p className="text-sm text-[#6B7280] mt-2">
                Based on verified cognitive assessment
              </p>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className={`w-full py-4 rounded-md font-semibold text-base transition-all duration-200 ${
                linkCopied
                  ? "bg-green-500 text-white"
                  : "bg-[#00A896] text-white hover:bg-[#008C7A]"
              }`}
            >
              {linkCopied ? "✓ Link Copied!" : "📋 Share Portfolio to Employers"}
            </button>

            {linkCopied && (
              <p className="mt-3 text-sm text-green-600 text-center font-medium">
                Portfolio link copied to clipboard!
              </p>
            )}
          </div>

          {/* Right: Radar Chart */}
          <div className="bg-[#F7F9FB] rounded-lg border border-[#E5E7EB] p-8">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 text-center">
              Cognitive Profile Analysis
            </h3>
            
            <div className="w-full h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={userStats}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis
                    dataKey="trait"
                    tick={{ fill: "#1A1A1A", fontSize: 14, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />
                  <Radar
                    name="Your Score"
                    dataKey="value"
                    stroke="#00A896"
                    fill="#00A896"
                    fillOpacity={0.4}
                    strokeWidth={3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Stat Breakdown */}
            <div className="space-y-3">
              {userStats.map((stat) => (
                <div
                  key={stat.trait}
                  className="flex justify-between items-center pb-3 border-b border-[#E5E7EB] last:border-0"
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

        {/* Additional Info Section */}
        <div className="mt-8 bg-[#E8F5F3] rounded-lg border border-[#00A896]/20 p-6 text-center">
          <p className="text-[#1A1A1A] font-medium mb-2">
            💡 Your portfolio is live and ready to share with potential employers
          </p>
          <p className="text-sm text-[#6B7280]">
            Employers can view your cognitive profile and verified strengths
          </p>
        </div>
      </div>
    </div>
  );
}