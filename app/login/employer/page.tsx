"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Building2 } from "lucide-react";

export default function EmployerLoginPage() {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords don't match!");
        }
        await signup(formData.fullName, formData.email, formData.password, 'employer', formData.companyName);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col">
      {/* Header */}
      <nav className="border-b border-[#E5E7EB] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push("/landing")}
              className="flex items-center gap-2 text-[#6B7280] hover:text-[#00A896] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Home</span>
            </button>
            <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">
              CAREER CLARITY
            </h1>
            <div className="w-32" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Employer Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#00A896] rounded-lg flex items-center justify-center">
              <Building2 className="text-white" size={20} />
            </div>
            <span className="text-sm font-semibold text-[#00A896] uppercase tracking-wide">
              Employer Portal
            </span>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
                {isSignup ? "Create Employer Account" : "Employer Sign In"}
              </h2>
              <p className="text-[#6B7280]">
                {isSignup
                  ? "Find the perfect candidates for your team"
                  : "Access your employer dashboard"}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignup && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      placeholder="Acme Corporation"
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:border-transparent transition-all"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="hiring@company.com"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:border-transparent transition-all"
                />
              </div>

              {isSignup && (
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A896] focus:border-transparent transition-all"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00A896] text-white font-semibold py-3.5 rounded-md hover:bg-[#008C7A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <span>{isSignup ? "Create Account" : "Sign In"}</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#6B7280]">
                {isSignup ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError("");
                  }}
                  className="text-[#00A896] font-semibold hover:text-[#008C7A] transition-colors"
                >
                  {isSignup ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E5E7EB] text-center">
              <p className="text-sm text-[#6B7280]">
                Are you a job seeker?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-[#00A896] font-semibold hover:text-[#008C7A] transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}