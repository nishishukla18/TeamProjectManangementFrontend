import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { FiClock, FiPlus, FiFolder } from "react-icons/fi";

function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const fetchWorkspaces = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/workspace/get-workspaces`, {
        withCredentials: true,
      });
      setWorkspaces(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
  fetchWorkspaces();
}, []);


  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background accent shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 opacity-10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with New Workspace button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold  mb-2">
              Workspaces
            </h1>
            <p className="text-gray-400">Manage and organize your projects</p>
          </div>
          <button
            onClick={() => navigate("/hub/create-workspace")}
            className="group relative flex items-center gap-2 bg-green-500 text-slate-900 px-6 py-3 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:bg-yellow-400 hover:shadow-2xl hover:scale-105"
          >
            <FiPlus size={20} className="transition-transform duration-300 group-hover:rotate-90" />
            New Workspace
          </button>
        </div>

        {workspaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="relative mb-8">
              <div className="w-32 h-32 border-2 border-green-500 rounded-3xl flex items-center justify-center">
                <FiFolder size={64} className="text-green-400" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <FiPlus size={24} className="text-slate-900" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No workspaces yet</h2>
            <p className="text-gray-400 mb-6 text-center max-w-md">
              Get started by creating your first workspace to organize your projects and collaborate with your team
            </p>
            <button
              onClick={() => navigate("/hub/create-workspace")}
              className="bg-green-500 text-slate-900 px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:bg-yellow-400 hover:shadow-2xl hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <FiPlus size={20} />
                Create Your First Workspace
              </span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((ws) => (
              <div
                key={ws._id}
                className="group relative  border-2 border-slate-500 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-yellow-400 cursor-pointer overflow-hidden"
                onClick={() => navigate(`/hub/workspace/${ws._id}`)}
              >
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12  border-2 border-slate-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-yellow-400 transition-all duration-300">
                    <FiFolder size={24} className="text-green-400 group-hover:text-yellow-400 transition-colors duration-300" />
                  </div>

                  {/* Title and Description */}
                  <h2 className="font-bold text-xl mb-2 text-black  transition-colors duration-300">
                    {ws.title}
                  </h2>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                    {ws.description}
                  </p>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <div className="w-8 h-8  rounded-full flex items-center justify-center">
                        <FiClock size={14} className="text-green-400" />
                      </div>
                      <span className="font-medium">
                        {new Date(ws.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-slate-900 text-xs font-bold">
                        {ws.createdBy[0].toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400 opacity-0 group-hover:opacity-20 rounded-bl-full transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workspaces;