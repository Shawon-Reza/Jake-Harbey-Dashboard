import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full font-poppins">
      <div
        className={`fixed inset-0 z-40 w-full bg-primary transition-transform duration-300 md:static md:z-auto md:w-72 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ minWidth: 220 }}
      >
        <Sidebar
          onNavigate={() => setSidebarOpen(false)}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <div className="flex h-screen overflow-hidden min-w-0 w-full flex-1 flex-col overflow-y-auto font-poppins">
        <div className={sidebarOpen ? "hidden md:block" : "block"}>
          <Navbar
            isSidebarOpen={sidebarOpen}
            onMenuClick={() => setSidebarOpen((current) => !current)}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
