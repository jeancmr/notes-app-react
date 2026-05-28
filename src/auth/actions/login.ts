import { noteAppApi } from '@/api/note-app.api';
import type { AxiosError } from 'axios';
import type { LoginResponse } from '../interfaces/login.response';

export const loginAction = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const { data } = await noteAppApi.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Login failed', {
      cause: error,
    });
  }
};
