import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function CreateProject() {
  const navigate = useNavigate();
  const { id } = useParams(); // workspace id from route
  const { backendUrl, userData } = useContext(AppContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Not Started",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(
        `${backendUrl}/api/projects/create-project`,
        {
          ...form,
          workspaceId: id,
          createdBy: userData?.name || "Unknown",
        },
        { withCredentials: true }
      );
      if(data.success){
        toast.success("Project created successfully");
        navigate(`/hub/workspace/${id}`);

      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating project");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-xl border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Create New Project
        </h1>

        {/* Title */}
        <label className="block text-gray-700 mb-2 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 rounded-md mb-4 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none"
          required
        />

        {/* Description */}
        <label className="block text-gray-700 mb-2 font-medium">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 rounded-md mb-4 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none"
          required
        />

        {/* Status */}
        <label className="block text-gray-700 mb-2 font-medium">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-3 rounded-md mb-4 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none"
        >
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        {/* Dates */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-2 font-medium">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-2 font-medium">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition shadow-md"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

export default CreateProject;
