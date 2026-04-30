import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Home, LogOut, NotebookText } from "lucide-react";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#272727]">

      {/* 🔹 Mobile Topbar */}
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
      onClick={() => setOpen(true)}
      className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2f2f2f]"
    >
      ☰
    </button>
  </div>
</div>

      {/* 🔹 Mobile Sidebar (Overlay) */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <aside className="w-72 h-full bg-[#f7f7f7] dark:bg-[#202020] p-4 flex flex-col justify-between">

            {/* Top */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-bold">noteStack</h1>
                <button onClick={() => setOpen(false)}>✕</button>
              </div>

              <nav className="space-y-2">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f]"
                >
                  <Home size={20} />
                  Home
                </NavLink>

                <NavLink
                  to="/notes"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f]"
                >
                  <NotebookText size={20} />
                  Notes
                </NavLink>
              </nav>
            </div>

            {/* Bottom */}
            <div
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f]"
            >
              <LogOut size={20} />
              Logout
            </div>
          </aside>
        </div>
      )}

      {/* 🔹 Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-[#f7f7f7] dark:bg-[#202020] border-r border-gray-300 dark:border-[#3a3a3a] px-4 py-6 flex flex-col justify-between">

        {/* Top */}
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
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer hover:bg-[#e8e8e8] dark:hover:bg-[#2f2f2f]"
        >
          <LogOut size={20} />
          Logout
        </div>
      </aside>

      {/* 🔹 Main */}
      <main className="md:ml-72 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;