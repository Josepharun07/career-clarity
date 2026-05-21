import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Career Clarity - Your True Potential, Verified",
  description: "Cognitive-based hiring platform powered by neuroscience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-[#1A1A1A] antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}