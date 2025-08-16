"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Footer } from "@/components/Footer";

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Main content area */}
      <main className="flex-grow p-6 relative">
        {/* Gradient orb */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-30" />

        <Link href="/">
          <h1 className="flex justify-center items-center text-white text-lg uppercase md:text-2xl font-bold">
            {exam.name}
          </h1>
        </Link>

        <div className="flex justify-center items-center mt-45 mb-12">
          <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 w-full max-w-6xl">
            {timeLeft ? (
              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                <div className="flex flex-col items-center">
                  <p className="text-2xl sm:text-9xl font-bold text-pink-300">
                    {timeLeft.days}
                  </p>
                  <span className="text-sm sm:text-base text-gray-200">Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-2xl sm:text-9xl font-bold text-purple-300">
                    {timeLeft.hours}
                  </p>
                  <span className="text-sm sm:text-base text-gray-200">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-2xl sm:text-9xl font-bold text-blue-300">
                    {timeLeft.minutes}
                  </p>
                  <span className="text-sm sm:text-base text-gray-200">Min</span>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-2xl sm:text-9xl font-bold text-green-300">
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
          </div>
        </div>
      </main>

      {/* Always at the bottom */}
      <Footer />
    </div>
  );
}
