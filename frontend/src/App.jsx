import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  })

  useEffect(() => {
    const root = document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Routes>
        <Route path="/" element={<HomePage setTheme={setTheme} theme={theme} />} />
        <Route path="/create" element={<CreatePage setTheme={setTheme} theme={theme} />} />
        <Route path="/note/:id" element={<NoteDetailPage setTheme={setTheme} theme={theme} />} />
      </Routes>
    </div>
  )
}

export default App