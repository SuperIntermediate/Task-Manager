import React from "react";
import { motion } from "framer-motion";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <motion.header
      className="flex justify-between items-center mb-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Title with hover animation */}
      <motion.h1
        className="text-3xl font-extrabold cursor-pointer select-none"
        whileHover={{
          scale: 1.1,
          rotate: 2,
          color: darkMode ? "#FFD700" : "#2C7A7B",
          textShadow: "0px 0px 12px rgba(0,0,0,0.4)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Task Manager ✨
      </motion.h1>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg"
        style={{
          backgroundColor: darkMode ? "#E8B7B4" : "#5D6C8C",
          color: darkMode ? "#1A202C" : "#F7FAFC",
        }}
      >
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>
    </motion.header>
  );
}
