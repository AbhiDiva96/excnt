// components/Footer.tsx
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
      <p>
        Made with ❤️ by{" "}
        <a
          href="https://github.com/abhidiva96"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-medium hover:underline hover:text-blue-400 transition-colors"
        >
          Abhidiva
        </a>
      </p>
      <p className="mt-1">
        © {new Date().getFullYear()} ExCnt. All rights reserved.
      </p>
    </footer>
  );
};
