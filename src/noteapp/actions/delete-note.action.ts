import { noteAppApi } from '@/api/note-app.api';
import type { AxiosError } from 'axios';

interface Response {
  message: string;
}

export const deleteNoteAction = async (noteId: number): Promise<Response> => {
  try {
    const { data } = await noteAppApi.delete<Response>(`notes/${noteId}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Delete note failed', {
      cause: error,
    });
  }
};
