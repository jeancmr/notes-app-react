import { NoteHeader } from '@/noteapp/components/NoteHeader';
import { NoteViews } from '@/noteapp/components/NoteViews';

export const ArchivedNotesPage = () => {
  return (
    <>
      <NoteHeader title="Archived" description="Set aside, but not forgotten." />

      <div className="mt-8">
        <NoteViews archived={true} />
      </div>
    </>
  );
};
