"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function RootPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in - go to landing page
        router.push("/landing");
      } else {
        // Logged in - route based on user type
        if (user.userType === "employer") {
          router.push("/employer");
        } else {
          router.push("/dashboard");
        }
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-[#E5E7EB] border-t-[#00A896] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#6B7280]">Loading...</p>
      </div>
    </div>
  );
}