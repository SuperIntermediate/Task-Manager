import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Auth({ setCurrentUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Password rules: 8+ chars, 1 uppercase, 1 number, 1 special char
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?~,-./])[A-Za-z\d!@#$%^&*()_+{}:"<>?~,-./]{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("⚠️ Please fill all fields");
      return;
    }

    // ✅ Validate only on signup
    if (!isLogin && !passwordRegex.test(password)) {
      setError(
        "⚠️ Password must be 8+ chars, include uppercase, number & special char"
      );
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (isLogin) {
      // 🔑 Login
      if (users[username] && users[username] === password) {
        localStorage.setItem("currentUser", username);
        setCurrentUser(username);
      } else {
        setError("❌ Invalid username or password");
      }
    } else {
      // 🆕 Signup
      if (users[username]) {
        setError("⚠️ Username already exists");
      } else {
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", username);
        setCurrentUser(username);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:from-gray-900 dark:via-purple-900 dark:to-black">
      {/* 🔹 Animated Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full opacity-30 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400 rounded-full opacity-30 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      {/* 🔹 Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md backdrop-blur-xl bg-white/10 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700 rounded-3xl shadow-2xl p-8 z-10"
      >
        <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-md mb-6">
          {isLogin ? "Welcome Back 👋" : "Create an Account 🚀"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/20 dark:bg-gray-700/50 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {/* 🔹 Password Input with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 dark:bg-gray-700/50 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 text-sm"
            >
              {showPassword ? "🙈 Hide" : "👁 Show"}
            </button>
          </div>

          {/* 🔹 Live password hint (only on signup) */}
          {!isLogin && password && !passwordRegex.test(password) && (
            <p className="text-yellow-300 text-xs">
              Password must be 8+ chars, include uppercase, number & special char
            </p>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm"
            >
              {error}
            </motion.p>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition shadow-lg"
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-200">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-yellow-300 font-semibold hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
