"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: string;
  fullName: string;
  email: string;
  userType: 'jobseeker' | 'employer';
  hasCompletedAssessment: boolean;
  assessmentResults?: {
    Logic: number;
    Adaptability: number;
    EQ: number;
    Spatial: number;
    Risk: number;
  };
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string, userType: 'jobseeker' | 'employer', companyName?: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("Loaded user from localStorage:", parsedUser);
          setUser(parsedUser);
        } catch (e) {
          console.error("Failed to parse stored user:", e);
          localStorage.removeItem("currentUser");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      console.log("Current user:", user);
      console.log("Current pathname:", pathname);
      
      const publicPaths = ["/login", "/login/employer", "/landing"];
      const isPublicPath = publicPaths.includes(pathname);

      // If on login/landing page and already logged in, redirect based on user type
      if (isPublicPath) {
        if (user.userType === 'employer') {
          console.log("Redirecting employer to /employer");
          router.push("/employer");
        } else {
          console.log("Redirecting job seeker to /dashboard");
          router.push("/dashboard");
        }
      }
      
      // If employer tries to access job seeker routes
      if (user.userType === 'employer' && (pathname === '/' || pathname === '/dashboard' || pathname === '/assessment' || pathname === '/portfolio')) {
        console.log("Employer trying to access job seeker route, redirecting to /employer");
        router.push("/employer");
      }
      
      // If job seeker tries to access employer route
      if (user.userType === 'jobseeker' && pathname === '/employer') {
        console.log("Job seeker trying to access employer route, redirecting to /dashboard");
        router.push("/dashboard");
      }
    } else if (!loading && !user) {
      // Not logged in
      const publicPaths = ["/login", "/login/employer", "/landing"];
      const isPublicPath = publicPaths.includes(pathname);
      
      if (!isPublicPath) {
        console.log("Not logged in, redirecting to /landing");
        router.push("/landing");
      }
    }
  }, [user, loading, pathname, router]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      const userData = data.user;
      console.log("Login successful, user data:", userData);
      
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      localStorage.setItem("userEmail", userData.email);

      // Route based on user type
      if (userData.userType === 'employer') {
        console.log("Logging in as employer, redirecting to /employer");
        router.push("/employer");
      } else {
        // Job seeker
        if (userData.hasCompletedAssessment) {
          console.log("Job seeker with completed assessment, redirecting to /dashboard");
          router.push("/dashboard");
        } else {
          console.log("Job seeker without assessment, redirecting to /assessment");
          router.push("/assessment");
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (
    fullName: string, 
    email: string, 
    password: string, 
    userType: 'jobseeker' | 'employer',
    companyName?: string
  ) => {
    try {
      console.log("Signing up with userType:", userType);
      
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, userType, companyName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      const userData = data.user;
      console.log("Signup successful, user data:", userData);
      
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      localStorage.setItem("userEmail", userData.email);

      // Route based on user type
      if (userData.userType === 'employer') {
        console.log("New employer signed up, redirecting to /employer");
        router.push("/employer");
      } else {
        console.log("New job seeker signed up, redirecting to /assessment");
        router.push("/assessment");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    console.log("Logging out");
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userEmail");
    router.push("/landing");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      console.log("Updating user:", updatedUser);
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}