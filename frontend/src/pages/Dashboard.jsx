import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import { LoaderIcon } from "lucide-react"
import { Link } from "react-router";
import { EyeIcon, PenBoxIcon, Trash2 } from "lucide-react";
import { confirmAction } from "@/utils/alert";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import CreateNoteModal from "@/components/createModalNote";
import { capitalizeFirstLetter } from "@/utils/textUtils";

const DashboardPage = ({theme, setTheme}) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecentNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data.slice(0, 5));
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch recent notes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentNotes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = await confirmAction(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <LoaderIcon className="size-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} setIsModalOpen={setIsModalOpen} />
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold">Welcome!</h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
              Pick up where you left off
            </p>
          </div>

          <Button>
            <Link
              to="/notes"
            >
              View All Notes
            </Link>
          </Button>
        </div>


        {notes.length === 0 ? (
          <p>No recent notes found.</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="p-4 rounded-lg border border-gray-200 dark:border-[#3a3a3a] bg-white dark:bg-[#202020] flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{capitalizeFirstLetter(note.title)}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {capitalizeFirstLetter(note.content)}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={() => setSelectedNote(note)}
                    className="text-gray-500 dark:text-gray-400 hover:underline"
                  >
                    <EyeIcon size={16} />
                  </button>

                  <Link
                    to={`/note/${note._id}`}
                    className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:underline"
                  >
                    <PenBoxIcon size={16} />
                  </Link>

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="flex items-center gap-1 text-red-500 hover:underline"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedNote && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
            <div className="bg-white dark:bg-[#202020] p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto relative">
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-2 right-3 text-xl"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-3 my-4">{selectedNote.title}</h2>

              <p className="text-gray-600 dark:text-gray-300">
                {selectedNote.content}
              </p>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <CreateNoteModal
            setIsModalOpen={setIsModalOpen}
            setNotes={setNotes}
        />
      )}
    </>
  );
};

export default DashboardPage;