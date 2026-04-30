import React from "react";
import { MoonIcon, PlusIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = ({ theme, setTheme, setIsModalOpen }) => {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-[68px] md:top-0 z-40 bg-background/95 text-foreground backdrop-blur border-b border-border/40">
      <div className="px-4 md:px-8 py-4">
        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={() => setIsModalOpen && setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-lg shadow-sm"
          >
            <PlusIcon className="size-5" />
            <span className="hidden sm:inline">Create New Note</span>
            <span className="sm:hidden">New</span>
          </Button>

          <Button
            type="button"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <SunIcon className="size-5" />
            ) : (
              <MoonIcon className="size-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;