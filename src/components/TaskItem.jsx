import React, { useState } from "react";

export default function TaskItem({ task, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [showConfirm, setShowConfirm] = useState(false); // ✅ state for modal

  const toggleComplete = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setShowConfirm(false);
  };

  const saveEdit = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, title: newTitle, description: newDescription }
          : t
      )
    );
    setIsEditing(false);
  };

  return (
    <div
      className={`relative p-3 mb-3 rounded-lg shadow flex justify-between items-start ${
        task.completed
          ? "bg-gray-200 dark:bg-gray-700"
          : "bg-gray-50 dark:bg-gray-800"
      }`}
    >
      <div>
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-2 py-1 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-2 py-1 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={saveEdit}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div
            onClick={toggleComplete}
            className={`cursor-pointer ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <h3 className="font-bold">{task.title}</h3>
            <p className="text-sm">{task.description}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 ml-3">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => setShowConfirm(true)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* ✅ Confirmation Modal */}
      {showConfirm && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-gray-800 dark:text-gray-200">
              Are you sure you want to delete{" "}
              <span className="font-bold">{task.title}</span>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 bg-gray-300 dark:bg-gray-600 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
