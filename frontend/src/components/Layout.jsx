import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Home, LogOut, NotebookText, User } from "lucide-react";
import { confirmAction } from "@/utils/alert";

const Layout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    const confirmed = await confirmAction("Are you sure you want to Logout?");
    if (!confirmed) return;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#272727]">
      {/* Mobile Topbar */}
      <div className="sticky top-0 z-50 md:hidden bg-white dark:bg-[#202020] shadow-lg dark:shadow-black/40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-black dark:bg-white text-white dark:text-black font-bold w-8 h-8 flex items-center justify-center rounded-md">
              N
            </div>

            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              note<span className="text-gray-500">Stack</span>
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2f2f2f]"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <aside className="w-72 h-full bg-[#f7f7f7] dark:bg-[#202020] p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold">noteStack</h1>

                <button onClick={() => setSidebarOpen(false)}>✕</button>
              </div>

              <nav className="space-y-2">
                <NavLink
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f]"
                >
                  <Home size={20} />
                  Home
                </NavLink>

                <NavLink
                  to="/notes"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f]"
                >
                  <NotebookText size={20} />
                  Notes
                </NavLink>
              </nav>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#eaeaea] dark:bg-[#2a2a2a]">
                <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.name || "User"}
                  </span>

                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSidebarOpen(false);
                  navigate("/profile");
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f]"
              >
                <User size={20} />
                Profile
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-[#f7f7f7] dark:bg-[#202020] border-r border-gray-300 dark:border-[#3a3a3a] px-4 py-6 flex-col justify-between">
        <div>
          <div className="mb-6 flex items-center gap-2 px-2">
            <div className="bg-black dark:bg-white text-white dark:text-black font-bold w-8 h-8 flex items-center justify-center rounded-md">
              N
            </div>

            <h1 className="text-xl font-bold">
              note<span className="text-gray-500">Stack</span>
            </h1>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md ${
                  isActive
                    ? "bg-[#e0e0e0] dark:bg-[#333]"
                    : "hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f]"
                }`
              }
            >
              <Home size={20} />
              Home
            </NavLink>

            <NavLink
              to="/notes"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md ${
                  isActive
                    ? "bg-[#e0e0e0] dark:bg-[#333]"
                    : "hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f]"
                }`
              }
            >
              <NotebookText size={20} />
              Notes
            </NavLink>
          </nav>
        </div>

        {/* Bottom */}
        <div className="relative flex flex-col gap-3">
          {/* User Card */}
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex w-full items-center gap-3 px-3 py-3 rounded-lg bg-[#eaeaea] dark:bg-[#2a2a2a] hover:bg-[#dedede] dark:hover:bg-[#333] transition text-left"
          >
            <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="flex flex-col leading-tight overflow-hidden">
              <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.name || "User"}
              </span>

              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </span>
            </div>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute bottom-16 left-0 w-full rounded-xl border border-gray-200 dark:border-[#3a3a3a] bg-white dark:bg-[#2a2a2a] p-2 shadow-xl z-50">
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3a3a3a]"
              >
                <User size={16} />
                Profile
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="md:ml-72 min-h-screen">{children}</main>
    </div>
  );
};

export default Layout;