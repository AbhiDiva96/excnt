// app/dashboard/page.tsx or pages/dashboard.tsx
'use client';

import { Footer } from "@/components/Footer";
import AddExamModal from "@/components/AddExamModal";
import ExamCard from "@/components/ExamCard";
import { useLocalStorage } from "@/hooks/useStorage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Exam = { id: string; name: string; date: string };

export default function Dashboard() {
  const [exams, setExams] = useLocalStorage<Exam[]>("exams", []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (exam: Omit<Exam, "id">) => {
    const newExam = { id: uuidv4(), ...exam };
    setExams([...exams, newExam]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setExams(exams.filter((e) => e.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Page Content */}
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-white">📚 ExCnt</h1>
          <button
            className="flex backdrop-blur-md bg-white/10 border border-white/20 p-2 md:px-5 md:py-2 rounded-2xl shadow-lg cursor-pointer transition hover:scale-105 hover:bg-white/20"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Exam
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} onDelete={handleDelete} />
          ))}
        </div>

        {isModalOpen && (
          <AddExamModal onSave={handleSave} onClose={() => setIsModalOpen(false)} />
        )}
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}
