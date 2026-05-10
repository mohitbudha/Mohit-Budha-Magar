import React, { useState } from "react";
import api from "../api/axios";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [image, setImg] = useState(null);
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("tech", tech);
      formData.append("link", link);
      formData.append("image", image);

      await api.post("/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✔ Project Added Successfully!");

      setTitle("");
      setDescription("");
      setTech("");
      setImg(null);
      setLink("");

    } catch (err) {

      console.log(err);

      setMessage("❌ Upload Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Add Project
        </h1>

        {message && (
          <p className="text-center mb-4 font-semibold text-green-500">
            {message}
          </p>
        )}

        <form onSubmit={handleAddProject} className="space-y-5">

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Technology */}
          <input
            type="text"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            placeholder="React, Node, MongoDB"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center">

            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              className="w-full dark:text-white"
            />

            {image && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {image.name}
              </p>
            )}

          </div>

          {/* Project Link */}
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://yourproject.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Project"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminPanel;