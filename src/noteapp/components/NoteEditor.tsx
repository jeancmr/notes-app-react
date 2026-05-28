import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Category } from '@/interfaces/category.interface';
import type { Note } from '@/interfaces/note.interface';
import { noteSchema, type NoteFormValues } from '@/schemas/note.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Tag } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

interface NoteEditorProps {
  categories: Category[] | [];
  note: Note | 'new' | null;
  onClose: () => void;
  onSubmit: (noteFormValues: NoteFormValues) => Promise<void>;
}

const initialFormValues: NoteFormValues = {
  id: 0,
  title: '',
  content: '',
  categoryIds: [] as number[],
};

export const NoteEditor = ({ categories, note, onClose, onSubmit }: NoteEditorProps) => {
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: initialFormValues,
  });

  useEffect(() => {
    if (note && note !== 'new') {
      form.reset({
        id: note.id,
        title: note.title,
        content: note.content,
        categoryIds: note.categories ? note.categories.map((c) => c.id) : ([] as number[]),
      });
    } else {
      form.reset(initialFormValues);
    }
  }, [note, form]);

  const open = note !== null;
  const isNew = note === 'new';

  const selectedCategoryIds =
    useWatch({
      control: form.control,
      name: 'categoryIds',
    }) ?? [];

  const toggleCategory = (categoryId: number) => {
    const current = form.getValues('categoryIds') ?? [];
    const next = current.includes(categoryId)
      ? current.filter((id) => id !== categoryId)
      : [...current, categoryId];

    form.setValue('categoryIds', next, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl bg-paper">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">
            {isNew ? 'New note' : 'Edit note'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: 'title is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-0 border-b border-border bg-transparent px-0 font-display text-2xl focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              rules={{ required: 'content is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={10}
                      className="resize-none border-0 bg-transparent px-0 text-base leading-relaxed focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Tag className="h-3 w-3" /> Categories
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categories?.map((c) => {
                  const active = selectedCategoryIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCategory(c.id)}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition ${
                        active ? 'border-foreground' : 'border-border opacity-60 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: active ? c.color : 'transparent' }}
                    >
                      {active && <Check className="h-3 w-3" />}
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
