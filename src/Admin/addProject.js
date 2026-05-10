import React, { useState } from "react";
import api from "../api/axios";

const AdminPanel = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [img, setImg] = useState(null);
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Add Project
  export const addProject = async (req, res) => {
  try {
    const { title, description, tech, link } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newProject = await Project.create({
      title,
      description,
      tech: tech.split(","),
      img: image,
      link,
    });

    res.json({
      success: true,
      project: newProject,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg">

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Add Project
        </h2>

        {message && (
          <p className="text-center mb-4 font-semibold text-green-500">
            {message}
          </p>
        )}

        <form onSubmit={handleAddProject} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />

          {/* Technologies */}
          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            required
          />

          {/* Image Preview */}
          {img && (
            <img
              src={URL.createObjectURL(img)}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          {/* Project Link */}
          <input
            type="text"
            placeholder="Project Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Project"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default AdminPanel;