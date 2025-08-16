import { useState } from "react";

type Props = {
  onSave: (exam: { name: string; date: string }) => void;
  onClose: () => void;
};

export default function AddExamModal({ onSave, onClose }: Props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!name || !date) return;
    onSave({ name, date });
    setName("");
    setDate("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      {/* Glass card */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 
                      rounded-2xl shadow-xl p-6 w-96 overflow-hidden">
        
        {/* Gradient blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-12 -right-12 w-52 h-52 bg-purple-600 rounded-full blur-3xl opacity-40" />
        <div className="absolute -top-8 right-0 w-24 h-24 bg-indigo-500 rounded-full blur-2xl opacity-30" />

        {/* Modal Content */}
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-4 text-white">➕ Add Exam</h2>

          <input
            type="text"
            placeholder="Exam Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-white/30 bg-white/10 text-white 
                       w-full p-2 mb-3 rounded-lg placeholder-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-white/30 bg-white/10 text-white 
                       w-full p-2 mb-4 rounded-lg placeholder-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-white/20 text-gray-200 hover:bg-white/30 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 
                         text-white font-semibold shadow hover:scale-105 transition"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
