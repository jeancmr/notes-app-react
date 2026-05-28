import { createCategoryAction } from '../actions/create-category.action';
import { deleteCategoryAction } from '../actions/delete-category.action';
import { getCategoriessByUserAction } from '../actions/get-categories-by-user.action';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useNoteCategory = (userId: number) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['categories', { userId }],
    queryFn: () => getCategoriessByUserAction(userId),
    staleTime: 1000 * 6 * 5,
  });

  const mutation = useMutation({
    mutationFn: createCategoryAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategoryAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    ...query,
    mutation,
    deleteMutation,
  };
};
