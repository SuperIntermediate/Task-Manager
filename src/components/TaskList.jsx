import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TaskList({ tasks, setTasks }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null); // ✅ For modal

  // ✅ Toggle Complete (Local only)
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ✅ Delete Task (Local only)
  const deleteTask = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((task) => task.id !== taskToDelete.id));
      setTaskToDelete(null);
    }
  };

  // ✅ Save Edited Task (Local only)
  const saveEdit = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title: editTitle, description: editDescription }
          : task
      )
    );
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const renderTask = (task) => (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className={`p-4 mb-3 rounded-xl shadow-md transition ${
        task.completed
          ? "bg-green-100 dark:bg-green-800 text-gray-600"
          : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      }`}
    >
      {editingTaskId === task.id ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => saveEdit(task.id)}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditingTaskId(null)}
              className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2
            className={`font-bold text-lg ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h2>
          <p
            className={`text-sm mb-1 ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.description}
          </p>

          {/* ✅ Show Due Date if available */}
          {task.dueDate && (
            <p
              className={`text-sm italic mb-2 ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              📅 Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => startEditing(task)}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              Edit
            </button>
            <button
              onClick={() => toggleComplete(task.id)}
              className={`px-3 py-1 rounded-lg transition ${
                task.completed
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {task.completed ? "Undo" : "Mark Done"}
            </button>
            <button
              onClick={() => setTaskToDelete(task)} // ✅ Open modal
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="relative space-y-6">
      {/* ✅ Pending Tasks */}
      <div>
        <motion.h2
          className="text-xl font-bold mb-3 text-indigo-600 dark:text-indigo-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Pending Tasks
        </motion.h2>
        {tasks.filter((t) => !t.completed).length === 0 ? (
          <p className="text-gray-500 italic">No pending tasks 🎉</p>
        ) : (
          tasks.filter((t) => !t.completed).map(renderTask)
        )}
      </div>

      {/* ✅ Completed Tasks */}
      <div>
        <motion.h2
          className="text-xl font-bold mb-3 text-indigo-600 dark:text-indigo-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Completed Tasks
        </motion.h2>
        {tasks.filter((t) => t.completed).length === 0 ? (
          <p className="text-gray-500 italic">No tasks completed yet ✅</p>
        ) : (
          tasks.filter((t) => t.completed).map(renderTask)
        )}
      </div>

      {/* ✅ Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm w-full text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-medium text-red-600">
                "{taskToDelete.title}"
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setTaskToDelete(null)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={deleteTask}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
