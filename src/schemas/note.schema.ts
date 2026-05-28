import { z } from 'zod';

export const noteSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(4, 'Note title must be at least 4 characters long'),
  content: z.string(),
  categoryIds: z.array(z.number()).optional(),
});

export type NoteFormValues = z.infer<typeof noteSchema>;
