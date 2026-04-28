import React, { useState } from "react"
import { ChevronDownIcon, MoonIcon, PlusIcon, SunIcon } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { Button } from "./ui/button"

const Navbar = ({ theme, setTheme, setIsModalOpen }) => {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 bg-background text-foreground shadow-md shadow-black/10 dark:shadow-[0_6px_18px_rgba(255,255,255,0.12)] transition-shadow">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between">

          <h1 className="text-3xl font-semibold tracking-tight">
            noteStack
          </h1>

          <div className="flex items-center gap-3">

            <div className="flex justify-end relative">
              <Button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2"
              >
                Logout
              </Button>
            </div>

            {/* New Note Button */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <PlusIcon className="size-5" />
              <span>Create New Note</span>
            </Button>


            {/* Theme Toggle */}
            <button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <SunIcon className="size-5" />
              ) : (
                <MoonIcon className="size-5" />
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar