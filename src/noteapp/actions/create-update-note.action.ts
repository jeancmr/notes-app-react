import { noteAppApi } from '@/api/note-app.api';
import type { Note } from '@/interfaces/note.interface';
import type { AxiosError } from 'axios';

interface NoteBody {
  userId: number | undefined;
  note: Partial<Note>;
}

interface Response {
  message: string;
}

export const createUpdateNoteAction = async (noteBody: NoteBody): Promise<Response> => {
  const { id, ...content } = noteBody.note;

  try {
    const { data } = await noteAppApi<Response>({
      url: id === 0 ? 'notes' : `notes/${id}`,
      method: id === 0 ? 'POST' : 'PATCH',
      data: id === 0 ? { ...content, userId: noteBody.userId } : content,
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? `${id ? 'Insert' : 'Update'} failed`, {
      cause: error,
    });
  }
};
