"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";


type Exam = {
  id: string;
  name: string;
  date: string;
};

export default function ExamCard({
  exam,
  onDelete,
}: {
  exam: Exam;
  onDelete: (id: string) => void;
}) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const target = new Date(exam.date).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Exam Started 🎉");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [exam.date]);

  return (
    <div className="relative">
      {/* Delete button */}
      <button
        onClick={(e) => {
          e.preventDefault(); // prevent navigating when clicking delete
          onDelete(exam.id);
        }}
        className="absolute top-2 right-2 p-1 rounded-full bg-red-500/80 hover:bg-red-600 text-white shadow-md z-10"
      >
      <MdDelete />
      </button>

      <Link href={`/leftdays/${exam.id}`}>
        <div className="relative backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg cursor-pointer transition hover:scale-105 hover:bg-white/20">
          {/* Gradient background circles */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-pink-500 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-purple-500 rounded-full blur-3xl opacity-30"></div>

          {/* Card content */}
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            {exam.name}
          </h3>
          <p className="text-gray-300 text-sm mb-2">
            📅 {new Date(exam.date).toLocaleString()}
          </p>
          <p className="text-lg font-semibold text-pink-200">{timeLeft}</p>
        </div>
      </Link>
    </div>
  );
}
