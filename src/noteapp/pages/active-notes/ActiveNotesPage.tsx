import { NoteHeader } from '@/noteapp/components/NoteHeader';
import { NoteViews } from '@/noteapp/components/NoteViews';

export const ActiveNotesPage = () => {
  return (
    <>
      <NoteHeader title="Active Notes" description="Everything you're still thinking about." />

      <div className="mt-8">
        <NoteViews archived={false} />
      </div>
    </>
  );
};
