import { PenSquareIcon, Trash2Icon } from "lucide-react"
import React, { useState } from "react"
import { Link } from "react-router"
import { formatDate } from "../lib/utils.js"
import api from "../lib/axios"
import toast from "react-hot-toast"
import { confirmAction } from "../utils/alert"
import { Button } from "./ui/button"
import { capitalizeFirstLetter } from "@/utils/textUtils.js"

const NoteCard = ({ note, setNotes, expandedId, setExpandedId }) => {
  const isLong = note.content.length > 120
  const expanded = expandedId === note._id

  const toggleExpand = () => {
    setExpandedId(expanded ? null : note._id)
  }

  const handleDelete = async (e, id) => {
    e.preventDefault()
    const confirmed = await confirmAction("Are you sure you want to delete this note?")
    if (!confirmed) return

    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter((n) => n._id !== id))
      toast.success("Note deleted successfully!")
    } catch (error) {
      console.log("Error in handleDelete", error)
      toast.error("Failed to delete note")
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card text-card-foreground p-4 shadow-sm hover:shadow-md transition-all">
      
      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 line-clamp-1">
        {capitalizeFirstLetter(note?.title || "")}
      </h3>

      <p className={`text-sm text-muted-foreground ${expanded ? "" : "line-clamp-2"}`}>
        {capitalizeFirstLetter(note?.content || "")}
      </p>

      {isLong && (
        <button
          type="button"
          onClick={toggleExpand}
          className="mt-2 text-xs font-medium text-primary hover:underline dark:text-accent dark:hover:text-accent/80 transition"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-muted-foreground">
          {formatDate(new Date(note.createdAt))}
        </span>

        <div className="flex items-center gap-1">
          <Button asChild size="icon" variant="ghost">
            <Link to={`/note/${note._id}`}>
              <PenSquareIcon className="size-4" />
            </Link>
          </Button>

          <Button
            size="icon"
            variant="destructive"
            onClick={(e) => handleDelete(e, note._id)}
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard