import React, { useEffect, useState } from "react";
import api from "../api/axios";
import AddProject from "./addProject";

const AdminDashboard = () => {

  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

      {/* Add Project Form */}
      {showForm && (
        <AddProject />
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mt-6">

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

              {projects.map((project) => (

                <tr
                  key={project._id}
                  className="border-b dark:border-gray-700"
                >

                  {/* Image */}
                  <td className="p-4">

                    <img
                      src={`https://my-portfolio-backend-9tku.onrender.com/uploads/${project.image}`}
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

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;