import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router"
import api from "../lib/axios"
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react"
import { Button } from "../components/ui/button"

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error in fetching note", error)
        toast.error("Failed to fetch the note")
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted")
      navigate("/")
    } catch (error) {
      console.log("Error deleting the note", error)
      toast.error("Failed to delete note")
    }
  }

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content")
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully!")
      navigate("/")
    } catch (error) {
      console.log("Error saving the note:", error)
      toast.error("Failed to update note")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <LoaderIcon className="size-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>

          <Button variant="destructive" onClick={handleDelete}>
            <Trash2Icon className="size-4" />
            Delete Note
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Edit Note
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                placeholder="Note title"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                value={note?.title || ""}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Content</label>
              <textarea
                placeholder="Write your note here..."
                className="h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                value={note?.content || ""}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <Button disabled={saving} onClick={handleSave}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage