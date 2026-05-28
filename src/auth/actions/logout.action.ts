import { noteAppApi } from '@/api/note-app.api';
import type { AxiosError } from 'axios';

export const logoutAction = async (): Promise<void> => {
  try {
    await noteAppApi.post<void>('/auth/logout');
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'logout failed', {
      cause: error,
    });
  }
};
