import { ArrowLeftIcon } from "lucide-react"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast"
import api from "../lib/axios"
import { Button } from "../components/ui/button"

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return
    }

    setLoading(true)
    try {
      await api.post("/notes", { title, content })
      toast.success("Note created successfully!")
      navigate("/")
    } catch (error) {
      console.log("Error creating note", error)

      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "☠️",
        })
      } else {
        toast.error("Failed to create note")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-8">

        {/* Back */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Notes
        </Link>

        {/* Card */}
        <div className="rounded-xl border border-border bg-card text-card-foreground p-6 shadow-sm">
          
          <h2 className="text-2xl font-semibold mb-6">
            Create New Note
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Title */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                value={title}
                placeholder="Note Title"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Content</label>
              <textarea
                placeholder="Write your note here..."
                className="w-full h-32 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Note"}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage