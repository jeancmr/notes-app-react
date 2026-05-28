import { noteAppApi } from '@/api/note-app.api';
import type { User } from '@/interfaces/user.interface';
import type { AxiosError } from 'axios';

export const checkAuthAction = async (): Promise<User> => {
  try {
    const { data } = await noteAppApi.get<User>('/auth/verify');
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Check auth failed', {
      cause: error,
    });
  }
};
