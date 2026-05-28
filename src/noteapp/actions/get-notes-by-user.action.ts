import { noteAppApi } from '@/api/note-app.api';
import type { Note } from '@/interfaces/note.interface';

export const getNotesByUserAction = async (userId: number, archived: boolean): Promise<Note[]> => {
  if (!userId) return [];

  const { data } = await noteAppApi.get<Note[]>(`/notes/user/${userId}?archived=${archived}`);

  return data;
};
