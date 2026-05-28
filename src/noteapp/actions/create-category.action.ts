import { noteAppApi } from '@/api/note-app.api';
import type { AxiosError } from 'axios';

interface CategoryBody {
  userId: number | undefined;
  name: string;
}

interface Response {
  message: string;
}

export const createCategoryAction = async (categoryBody: CategoryBody): Promise<Response> => {
  try {
    const { data } = await noteAppApi<Response>({
      url: 'categories',
      method: 'POST',
      data: categoryBody,
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Create category failed', {
      cause: error,
    });
  }
};
