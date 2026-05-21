"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";

const mockQuestions = [
  {
    id: 1,
    question: "Which shape is different from the others?",
    options: ["🔴", "🔵", "🔺", "🔴"],
    correct: 2,
  },
  {
    id: 2,
    question: "Continue the pattern: 2, 4, 8, 16, ?",
    options: ["24", "32", "20", "28"],
    correct: 1,
  },
  {
    id: 3,
    question: "Which word doesn't belong?",
    options: ["Apple", "Banana", "Carrot", "Orange"],
    correct: 2,
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  const handleAnswer = async (optionIndex: number) => {
    console.log("Clicked option:", optionIndex);
    
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsProcessing(true);
      
      // Calculate mock results
      const results = {
        Logic: Math.floor(Math.random() * 30) + 70,
        Adaptability: Math.floor(Math.random() * 30) + 70,
        EQ: Math.floor(Math.random() * 30) + 70,
        Spatial: Math.floor(Math.random() * 30) + 70,
        Risk: Math.floor(Math.random() * 30) + 70,
      };

      try {
        // Save to database
        const response = await fetch("/api/assessment/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id,
            results,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          updateUser(data.user);
        }
      } catch (error) {
        console.error("Failed to save assessment:", error);
      }

      setTimeout(() => {
        router.push("/portfolio");
      }, 2000);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#00A896] animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            Analyzing Cognitive Data...
          </h2>
          <p className="text-[#6B7280]">Processing your responses</p>
        </div>
      </div>
    );
  }

  const question = mockQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-[#E5E7EB] h-2">
        <div
          className="h-full bg-gradient-to-r from-[#00A896] to-[#00C9A7] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Header />

      {/* Question Progress */}
      <div className="border-b border-[#E5E7EB] bg-[#F7F9FB]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <div>
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                Cognitive Assessment
              </h2>
              <p className="text-sm text-[#6B7280]">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-12">
            <h2 className="text-3xl font-bold text-center text-[#1A1A1A] mb-12">
              {question.question}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="bg-[#F7F9FB] border-2 border-[#E5E7EB] p-8 rounded-lg text-2xl font-bold text-[#1A1A1A] hover:border-[#00A896] hover:bg-[#E8F5F3] transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {option}
                </button>
              ))}
            </div>

            <p className="text-center mt-8 text-sm text-[#6B7280]">
              Click any option to continue
            </p>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {mockQuestions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentQuestion
                      ? "bg-[#00A896]"
                      : idx < currentQuestion
                      ? "bg-[#00A896] opacity-50"
                      : "bg-[#E5E7EB]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}