import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import Auth from "./components/Auth"; // 🔑 New Auth component

export default function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser"));

  // ✅ Initialize tasks directly from localStorage (prevents reset on refresh)
  const [tasks, setTasks] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      return JSON.parse(localStorage.getItem(`tasks_${savedUser}`)) || [];
    }
    return [];
  });

  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  // ✅ Update tasks when user changes
  useEffect(() => {
    if (currentUser) {
      const storedTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
      setTasks(storedTasks);
    } else {
      setTasks([]); // clear tasks if no user
    }
  }, [currentUser]);

  // ✅ Save tasks only for the logged-in user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
    }
  }, [tasks, currentUser]);

  // ✅ Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ✅ Add task
  const addTask = (title, description, dueDate) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // ✅ Update task
  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  // ✅ Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setTasks([]); // clear tasks on logout
  };

  // If no user is logged in → show Auth screen
  if (!currentUser) {
    return <Auth setCurrentUser={setCurrentUser} />;
  }

  return (
    <div
      className="relative min-h-screen flex justify-center items-center p-6 transition-colors duration-500 scroll-smooth"
      style={{
        backgroundImage: darkMode
          ? "url('https://images.unsplash.com/photo-1696384036025-c7d7b7f6584d?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0')"
          : "url('https://images.unsplash.com/photo-1719774552051-c190e5c74fc3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Floating background blobs */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-indigo-400 rounded-full opacity-30 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-56 h-56 bg-green-400 rounded-full opacity-30 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-400 rounded-full opacity-30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      {/* Main Container */}
      <div
        className="relative w-full max-w-2xl backdrop-blur-xl shadow-2xl rounded-3xl p-8 transition duration-500 border border-white/30 dark:border-gray-700 z-10"
        style={{
          backgroundColor: darkMode ? "#5D6C8C" : "#E8B7B4",
        }}
      >
        {/* Header with logout */}
        <div className="flex justify-between items-center mb-4">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>

        <TaskForm addTask={addTask} />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
