import React, { useState } from "react";
import { XIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Button } from "./ui/button";

const CreateNoteModal = ({ setIsModalOpen, setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateNote = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/notes", {
        title,
        content,
      });

      setNotes((prevNotes) => [res.data, ...prevNotes]);
      toast.success("Note created successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error creating note", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-xl bg-background p-6 text-foreground shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Create New Note</h2>

          <button onClick={() => setIsModalOpen(false)}>
            <XIcon className="size-5" />
          </button>
        </div>

        <form onSubmit={handleCreateNote} className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border bg-background p-3 outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            placeholder="Click to add description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-48 w-full resize-none rounded-md border bg-background p-3 outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Discard
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;