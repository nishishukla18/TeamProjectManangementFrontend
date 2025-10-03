import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function CreateWorkspace() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const {backendUrl} = useContext(AppContext)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post(`${backendUrl}/api/workspace/create-workspace`,form,{
        withCredentials:true
      })
      console.log(data);
      if(data.success){
        toast.success(data.message || "Workspace created successfully");
        navigate("/hub/workspaces");
      }else{
        toast.error(data.message || "Failed to create workspace");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Workspace</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Workspace Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />


        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Workspace
        </button>
      </form>
    </div>
  );
}

export default CreateWorkspace;
