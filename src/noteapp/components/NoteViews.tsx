import { Archive, ArchiveRestore, Pencil, Plus, Trash2 } from 'lucide-react';
import { use, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { AuthContext } from '@/auth/context/AuthContext';
import { Button } from '@/components/ui/button';
import type { Note } from '@/interfaces/note.interface';
import type { NoteFormValues } from '@/schemas/note.schema';
import { useNotes } from '../hooks/useNotes';
import { NoteCategories } from './NoteCategories';
import { NoteEditor } from './NoteEditor';
import { useNoteCategory } from '../hooks/useNoteCategory';

interface Props {
  archived: boolean;
}

export const NoteViews = ({ archived }: Props) => {
  const [filter, setFilter] = useState<number | null>(null);
  const { user } = use(AuthContext);
  const { data: notes, isLoading, mutation, deleteMutation } = useNotes(user?.id || 0, archived);
  const { data: categories } = useNoteCategory(user?.id || 0);

  const [editing, setEditing] = useState<Note | 'new' | null>(null);

  const filtered = useMemo(() => {
    if (!notes) return [];
    return notes.filter((n) => (filter ? n.categories.some((c) => c.id === filter) : true));
  }, [filter, notes]);

  const handleSubmit = async (noteData: NoteFormValues) => {
    const clientData = { userId: user?.id, note: noteData };
    await mutation.mutateAsync(clientData, {
      onSuccess: (data) => {
        setEditing(null);
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error((error as Error).message);
      },
    });
  };

  const handleDeleteNote = async (noteId: number) => {
    if (!confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }
    await deleteMutation.mutateAsync(noteId, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error((error as Error).message);
      },
    });
  };

  const handleToggleNote = async (noteData: Note) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categories, updatedAt, createdAt, ...note } = noteData;

    const clientData = {
      userId: user?.id,
      note: {
        ...note,
        archived: !archived,
        categoryIds: categories ? categories.map((c) => c.id) : ([] as number[]),
      },
    };

    await mutation.mutateAsync(clientData, {
      onSuccess: () => {
        toast.success(archived ? 'Note unarchived' : 'Note archived');
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <NoteCategories categories={categories || []} filter={filter} setFilter={setFilter} />

        <div className="ml-auto">
          {!archived && (
            <Button onClick={() => setEditing('new')} className="rounded-full" disabled={isLoading}>
              <Plus className="mr-1 h-4 w-4" /> New note
            </Button>
          )}
        </div>
      </div>

      {filtered?.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-paper/50 p-16 text-center">
          <p className="font-display text-2xl italic text-muted-foreground">
            {archived ? 'Nothing in the archive.' : 'A blank page. Begin somewhere.'}
          </p>
          {!archived && (
            <Button
              variant="link"
              onClick={() => setEditing('new')}
              className="mt-2 text-foreground"
            >
              Write your first note →
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered?.map((note) => (
            <article
              key={note.id}
              className="group flex flex-col rounded-lg border border-border bg-paper p-5 shadow-paper transition hover:shadow-paper-lg"
            >
              <h3 className="font-display text-2xl leading-tight text-foreground">{note.title}</h3>
              <p className="mt-2 line-clamp-6 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {note.content}
              </p>
              {note.categories.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {note.categories.map((c) => (
                    <span
                      key={c.id}
                      className="rounded-full bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span suppressHydrationWarning>
                  {new Date(note.updatedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                  <button
                    onClick={() => setEditing(note)}
                    className="rounded p-1.5 hover:bg-secondary"
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleToggleNote(note)}
                    className="rounded p-1.5 hover:bg-secondary"
                    aria-label={archived ? 'Unarchive' : 'Archive'}
                  >
                    {archived ? (
                      <ArchiveRestore className="h-3.5 w-3.5" />
                    ) : (
                      <Archive className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="rounded p-1.5 text-destructive hover:bg-destructive/10"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <NoteEditor
        categories={categories || []}
        key={editing === 'new' ? 'new' : (editing?.id ?? 'none')}
        note={editing}
        onClose={() => setEditing(null)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
