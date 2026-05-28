import { noteAppApi } from '@/api/note-app.api';
import type { Category } from '@/interfaces/category.interface';

export const getCategoriessByUserAction = async (userId: number): Promise<Category[]> => {
  if (!userId) return [];

  const { data } = await noteAppApi.get<Category[]>(`/categories/user/${userId}`);

  return data;
};
