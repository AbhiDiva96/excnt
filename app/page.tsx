"use client";
import AddExamModal from "@/components/AddExamModal";
import ExamCard from "@/components/ExamCard";
import { useLocalStorage } from "@/hooks/useStorage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";


type Exam = {
  id: string;
  name: string;
  date: string;
};

export default function Dashboard() {
  // directly use localStorage as state
  const [exams, setExams] = useLocalStorage<Exam[]>("exams", []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (exam: Omit<Exam, "id">) => {
    const newExam = { id: uuidv4(), ...exam };
    setExams([...exams, newExam]); // update localStorage
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setExams(exams.filter((exam) => exam.id !== id)); // update localStorage
  };  



  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-white">📚 My Exams Dashboard</h1>
    <button
      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition"
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
</div>
  );
}
