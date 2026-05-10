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

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tech", tech);
      formData.append("link", link);
      formData.append("img", img);

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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleAddProject} className="space-y-4">

        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="React,Node" />

        <input type="file" onChange={(e) => setImg(e.target.files[0])} />

        <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Project link" />

        <button disabled={loading}>
          {loading ? "Uploading..." : "Add Project"}
        </button>

        <p>{message}</p>

      </form>
    </div>
  );
};

export default AdminPanel;