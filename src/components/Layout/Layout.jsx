import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Header / Menu Toggle */}
      <div className="w-full flex items-center justify-between p-4 bg-white shadow-md sm:hidden">
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="cursor-pointer w-6 h-6 text-gray-700"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="cursor-pointer w-6 h-6 text-gray-700"
          />
        )}
      </div>

      {/* Sidebar */}
      <div className="flex">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
