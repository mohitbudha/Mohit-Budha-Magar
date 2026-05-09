import React, { useState } from "react";
import api from "../api/axios";

const AdminPanel = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [img, setImg] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");

  const handleAddProject = async (e) => {

    e.preventDefault();

    try {

      await api.post("/projects", {
        title,
        description,
        tech: tech.split(","),
        img,
        link,
      });

      setMessage("✔ Project Added Successfully!");

    } catch (err) {

      setMessage("❌ Error adding project");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg">

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Add Project
        </h2>

        {message && (
          <p className="text-center mb-4 text-green-500 font-semibold">
            {message}
          </p>
        )}

        <form onSubmit={handleAddProject} className="space-y-4">

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="text"
            placeholder="Project Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Add Project
          </button>

        </form>

      </div>
    </div>
  );
};

export default AdminPanel;