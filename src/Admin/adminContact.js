import React, { useState, useEffect } from "react";
import api from "../api/axios";

const AdminContact = () => {

  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);

  // Fetch messages
  useEffect(() => {

    api
      .get("/messages")
      .then((res) => {

        setMessages(res.data);
        setFilteredMessages(res.data);

      })
      .catch((err) => console.log(err));

  }, []);

  // Search filter
  useEffect(() => {

    const lowerSearch = search.toLowerCase();

    const filtered = messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(lowerSearch) ||
        msg.email.toLowerCase().includes(lowerSearch)
    );

    setFilteredMessages(filtered);

  }, [search, messages]);

  // Delete message
  const handleDelete = async (id) => {

    try {

      await api.delete(`/messages/${id}`);

      setMessages(messages.filter((msg) => msg._id !== id));

    } catch (err) {

      alert("Error deleting message");

    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-4 text-center">
        User Messages
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full mb-4 p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Messages */}
      <div className="space-y-4">

        {filteredMessages.length === 0 ? (

          <p>No messages found</p>

        ) : (

          filteredMessages.map((msg) => (

            <div
              key={msg._id}
              className="bg-white p-4 rounded shadow flex justify-between items-start"
            >

              <div>

                <p>
                  <strong>Name:</strong> {msg.name}
                </p>

                <p>
                  <strong>Email:</strong> {msg.email}
                </p>

                <p>
                  <strong>Message:</strong> {msg.message}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(msg.date).toLocaleString()}
                </p>

              </div>

              <button
                onClick={() => handleDelete(msg._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminContact;