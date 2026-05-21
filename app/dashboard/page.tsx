"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ArrowRight, Brain, FileText, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-3 border-[#E5E7EB] border-t-[#00A896] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.userType !== "jobseeker") {
    router.push("/landing");
    return null;
  }

  const hasAssessment = user.hasCompletedAssessment && user.assessmentResults;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1A1A1A]">CAREER CLARITY</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#6B7280]">{user.fullName}</span>
              <button
                onClick={() => router.push("/landing")}
                className="text-sm font-medium text-[#6B7280] hover:text-[#00A896]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-3">
            Welcome back, {user.fullName.split(" ")[0]}
          </h2>
          <p className="text-lg text-[#6B7280]">
            {hasAssessment
              ? "Your cognitive profile is ready. Continue building your professional presence."
              : "Complete your cognitive assessment to unlock your verified portfolio."}
          </p>
        </div>

        {hasAssessment ? (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Portfolio Card */}
            <div
              onClick={() => router.push("/portfolio")}
              className="bg-white rounded-lg border-2 border-[#E5E7EB] p-6 hover:border-[#00A896] hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-[#E8F5F3] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00A896] transition-colors">
                <FileText className="text-[#00A896] group-hover:text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Your Portfolio</h3>
              <p className="text-[#6B7280] mb-4">View and share your verified cognitive profile with employers.</p>
              <div className="flex items-center text-[#00A896] font-semibold group-hover:gap-2 transition-all">
                View Portfolio <ArrowRight size={18} className="ml-1" />
              </div>
            </div>

            {/* Assessment Card */}
            <div className="bg-[#F7F9FB] rounded-lg border border-[#E5E7EB] p-6">
              <div className="w-12 h-12 bg-[#E8F5F3] rounded-lg flex items-center justify-center mb-4">
                <Brain className="text-[#00A896]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Assessment Complete</h3>
              <p className="text-[#6B7280] mb-4">Your cognitive profile has been verified and is ready to share.</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-[#00A896] rounded-full" />
                <span className="text-[#00A896] font-semibold">Verified</span>
              </div>
            </div>

            {/* Growth Card */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="w-12 h-12 bg-[#E8F5F3] rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-[#00A896]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Profile Views</h3>
              <p className="text-[#6B7280] mb-4">Track how employers engage with your portfolio.</p>
              <div className="text-3xl font-bold text-[#1A1A1A]">0</div>
              <p className="text-sm text-[#6B7280]">views this week</p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#E8F5F3] to-white rounded-lg border border-[#E5E7EB] p-12 text-center">
            <div className="w-20 h-20 bg-[#00A896] rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="text-white" size={36} />
            </div>
            <h3 className="text-3xl font-bold text-[#1A1A1A] mb-4">
              Begin Your Cognitive Assessment
            </h3>
            <p className="text-lg text-[#6B7280] mb-8 max-w-2xl mx-auto">
              Unlock your verified portfolio by completing our scientifically-backed assessment. 
              Discover your unique cognitive strengths and connect with employers seeking your exact profile.
            </p>
            <button
              onClick={() => router.push("/assessment")}
              className="bg-[#00A896] text-white font-semibold px-8 py-4 rounded-md hover:bg-[#008C7A] transition-all duration-200 inline-flex items-center gap-2"
            >
              START ASSESSMENT NOW
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}