import React from "react"
import { MoonIcon, PlusIcon, SunIcon } from "lucide-react"
import { Link } from "react-router"
import { Button } from "./ui/button"

const Navbar = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="bg-background text-foreground shadow-md shadow-black/10 dark:shadow-[0_6px_18px_rgba(255,255,255,0.12)] transition-shadow">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          
          <h1 className="text-3xl font-semibold tracking-tight">
            noteStack
          </h1>

          <div className="flex items-center gap-3">
            
            {/* New Note Button */}
            <Button asChild className="bg-foreground hover:">
              <Link to="/create" className="flex items-center gap-2">
                <PlusIcon className="size-5" />
                <span>Create New Note</span>
              </Link>
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