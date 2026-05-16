"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const isEmployer = user.userType === 'employer';

  return (
    <nav className="border-b border-[#E5E7EB] bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => router.push(isEmployer ? "/employer" : "/dashboard")}
            className="text-2xl font-bold text-[#1A1A1A] tracking-tight hover:text-[#00A896] transition-colors"
          >
            CAREER CLARITY
          </button>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* User Info */}
            <div className="text-right">
              <p className="text-sm font-medium text-[#1A1A1A]">{user.fullName}</p>
              <p className="text-xs text-[#6B7280]">
                {isEmployer ? user.companyName : 'Job Seeker'}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(isEmployer ? "/employer" : "/dashboard")}
                className="text-sm font-medium text-[#6B7280] hover:text-[#00A896] transition-colors px-3 py-2"
              >
                Dashboard
              </button>

              {!isEmployer && (
                <button
                  onClick={() => router.push("/portfolio")}
                  className="text-sm font-medium text-[#6B7280] hover:text-[#00A896] transition-colors px-3 py-2"
                >
                  Portfolio
                </button>
              )}

              <button
                onClick={logout}
                className="text-sm font-medium text-white bg-[#00A896] hover:bg-[#008C7A] transition-colors px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}