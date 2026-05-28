import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotesByUserAction } from '../actions/get-notes-by-user.action';
import { createUpdateNoteAction } from '../actions/create-update-note.action';
import { deleteNoteAction } from '../actions/delete-note.action';

export const useNotes = (userId: number, archived: boolean) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['notes', { userId, archived }],
    queryFn: () => getNotesByUserAction(userId, archived),
    staleTime: 1000 * 6 * 5,
  });

  const mutation = useMutation({
    mutationFn: createUpdateNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return { ...query, mutation, deleteMutation };
};
