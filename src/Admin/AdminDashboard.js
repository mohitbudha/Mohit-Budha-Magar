import React, { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {

  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // Fetch Projects
  // =========================
  const fetchProjects = async () => {

    try {

      const res = await api.get("/projects");

      setProjects(res.data.projects || res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchProjects();

  }, []);

  // =========================
  // Add Project
  // =========================
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

      // Refresh Table
      fetchProjects();

      // Success Message
      setMessage("✔ Project Added Successfully!");

      // Reset Form
      setTitle("");
      setDescription("");
      setTech("");
      setImage(null);
      setLink("");

      // Close Form
      setShowForm(false);

    } catch (err) {

      console.log(err);

      setMessage("❌ Upload Failed");

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // Delete Project
  // =========================
  const handleDelete = async (id) => {

    try {

      await api.delete(`/projects/${id}`);

      fetchProjects();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold"
        >
          {showForm ? "Close Form" : "Add Project"}
        </button>

      </div>

      {/* ========================= */}
      {/* Add Project Form */}
      {/* ========================= */}
      {showForm && (

        <div className="flex items-center justify-center px-4 py-6 mb-8">

          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">

            <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
              Add Project
            </h2>

            {message && (
              <p className="text-center mb-4 font-semibold text-green-500">
                {message}
              </p>
            )}

            <form
              onSubmit={handleAddProject}
              className="space-y-5"
            >

              {/* Title */}
              <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Description */}
              <textarea
                placeholder="Project Description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Technology */}
              <input
                type="text"
                placeholder="React, Node, MongoDB"
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center">

                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full dark:text-white"
                  required
                />

                {image && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {image.name}
                  </p>
                )}

              </div>

              {/* Link */}
              <input
                type="text"
                placeholder="https://yourproject.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Submit Button */}
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

      )}

      {/* ========================= */}
      {/* Projects Table */}
      {/* ========================= */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-blue-500 text-white">

              <tr>

                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Tech</th>
                <th className="p-4">Link</th>
                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {projects.length > 0 ? (

                projects.map((project) => (

                  <tr
                    key={project._id}
                    className="border-b dark:border-gray-700"
                  >

                    {/* Image */}
                    <td className="p-4">

                      <img
                        src={`https://my-portfolio-backend-9tku.onrender.com${project.image}`}
                        alt={project.title}
                        className="w-24 h-16 object-cover rounded-lg"
                      />

                    </td>

                    {/* Title */}
                    <td className="p-4 dark:text-white">
                      {project.title}
                    </td>

                    {/* Tech */}
                    <td className="p-4 dark:text-white">
                      {Array.isArray(project.tech)
                        ? project.tech.join(", ")
                        : project.tech}
                    </td>

                    {/* Link */}
                    <td className="p-4">

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        Visit
                      </a>

                    </td>

                    {/* Actions */}
                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleDelete(project._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500 dark:text-gray-300"
                  >
                    No Projects Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;