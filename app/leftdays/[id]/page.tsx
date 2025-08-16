"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type Exam = {
  id: string;
  name: string;
  date: string;
};

export default function LeftDaysPage() {
  const { id } = useParams();
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("exams");
    if (saved) {
      const exams: Exam[] = JSON.parse(saved);
      const found = exams.find((e) => e.id === id);
      if (found) setExam(found);
      else router.push("/");
    }
  }, [id, router]);

  useEffect(() => {
    if (!exam) return;
    const calc = () => {
      const diff = +new Date(exam.date) - +new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [exam]);

  if (!exam) return <p className="text-center text-white">Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      {/* Gradient orbs */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-30"></div>

      {/* Glass card */}
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white drop-shadow-lg">
          {exam.name} Countdown
        </h1>

        {timeLeft ? (
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            <div className="flex flex-col items-center">
              <p className="text-2xl sm:text-4xl font-bold text-pink-300">
                {timeLeft.days}
              </p>
              <span className="text-sm sm:text-base text-gray-200">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl sm:text-4xl font-bold text-purple-300">
                {timeLeft.hours}
              </p>
              <span className="text-sm sm:text-base text-gray-200">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl sm:text-4xl font-bold text-blue-300">
                {timeLeft.minutes}
              </p>
              <span className="text-sm sm:text-base text-gray-200">Min</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl sm:text-4xl font-bold text-green-300">
                {timeLeft.seconds}
              </p>
              <span className="text-sm sm:text-base text-gray-200">Sec</span>
            </div>
          </div>
        ) : (
          <p className="text-red-400 font-semibold text-lg">
            🚨 Exam time is over!
          </p>
        )}

        <button
          onClick={() => router.push("/")}
          className="mt-8 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md hover:scale-105 transition"
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </main>
  );
}
