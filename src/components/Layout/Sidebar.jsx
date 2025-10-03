import React from "react";
import { House, Settings, CheckSquare, X, PersonStanding } from "lucide-react";
import { MdPerson } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/hub", name: "Dashboard", Icon: House },
  { to: "/hub/workspaces", name: "Workspaces", Icon: PersonStanding },
  { to: "/hub/tasks", name: "Tasks", Icon: House },
  { to: "/hub/members", name: "Members", Icon: MdPerson },
  { to: "/hub/progress", name: "Progress", Icon: CheckSquare }, 
  { to: "/hub/settings", name: "Settings", Icon: Settings },
];

function Sidebar({ sidebar, setSidebar }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${
          sidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebar(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-200 shadow-lg z-30 transform transition-transform duration-300
        ${sidebar ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static sm:h-screen sm:shadow-none`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end p-4 sm:hidden">
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 cursor-pointer text-gray-700"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 gap-2">
          {links.map((link, index) => {
            const isActive = location.pathname === link.to;
            const Icon = link.Icon;

            return (
              <Link
                key={index}
                to={link.to}
                onClick={() => setSidebar(false)}
                className={`flex items-center gap-3 p-2 rounded-md font-medium transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-green-700 via-green-900 to-gray-800  text-white"
                      : "text-gray-800 hover:bg-gradient-to-r from-green-700 via-green-900 to-gray-800  hover:text-white"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
