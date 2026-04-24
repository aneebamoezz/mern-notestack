import { NotebookIcon } from "lucide-react"
import { Link } from "react-router"
import { Button } from "./ui/button"

const NotesNotFound = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 py-16 text-center text-foreground">
      <div className="rounded-full border border-border bg-muted p-8 shadow-sm">
        <NotebookIcon className="size-10 text-primary" />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold tracking-tight">
          No notes yet
        </h3>

        <p className="text-sm leading-6 text-muted-foreground">
          Ready to organize your thoughts? Create your first note to get started on your journey.
        </p>
      </div>

      <Button asChild>
        <Link to="/create">
          Create Your First Note
        </Link>
      </Button>
    </div>
  )
}

export default NotesNotFound