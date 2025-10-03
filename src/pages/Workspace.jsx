import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { FiUsers, FiPlus ,FiFolder} from "react-icons/fi";

function Workspace() {
  const navigate = useNavigate()
  const { id } = useParams();
  const { backendUrl, userData } = useContext(AppContext);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch projects under this workspace
  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const { data } = await axios.get(
        `${backendUrl}/api/projects/get-projects/${id}`,
        { withCredentials: true }
      );
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Run fetchProjects when workspace id changes
  useEffect(() => {
    if (id) {
      fetchProjects();
    }
  }, [id]);

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold ">Projects</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2 cursor-pointer rounded-xl hover:bg-slate-600 transition">
            <FiUsers /> Invite
          </button>
          <button
           onClick={() => navigate(`/hub/workspace/${id}/create-project`)}

            className="flex items-center gap-2 bg-green-500 text-slate-900 px-4 py-2 rounded-xl font-bold hover:bg-yellow-400 hover:scale-105 transition"
          >
            <FiPlus /> New Project
          </button>
        </div>
      </div>

      {/* Projects */}
      {loadingProjects ? (
        <p className="text-gray-400">Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold mb-4">No projects yet</h2>
          <button
            onClick={() => navigate(`/hub/workspace/${id}/create-project`)}
            className="bg-green-500 text-slate-900 px-6 py-3 rounded-xl font-bold transition hover:bg-yellow-400 hover:scale-105"
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
  key={project._id}
  className="border-2 border-slate-600 p-6 rounded-2xl shadow hover:shadow-xl hover:border-yellow-400 transition cursor-pointer"
>
  <div className="flex items-center gap-2 mb-3">
    <FiFolder className="text-yellow-400 text-2xl" />
    <h2 className="text-xl font-bold ">{project.title}</h2>
  </div>
  <p className="text-gray-400 mb-2">{project.description}</p>
  <p className="text-sm text-gray-300 mb-1">Status: {project.status}</p>
  <p className="text-xs text-gray-500">
    Start:{" "}
    {project.startDate
      ? new Date(project.startDate).toLocaleDateString()
      : "N/A"}{" "}
    <br />
    End:{" "}
    {project.endDate
      ? new Date(project.endDate).toLocaleDateString()
      : "N/A"}
  </p>
</div>

          ))}
        </div>
      )}
    </div>
  );
}

export default Workspace;
