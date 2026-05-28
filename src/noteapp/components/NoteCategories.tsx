import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { useNoteCategory } from '../hooks/useNoteCategory';
import { use, type SubmitEvent } from 'react';
import { AuthContext } from '@/auth/context/AuthContext';
import type { Category } from '@/interfaces/category.interface';
import { toast } from 'sonner';

interface Props {
  filter: number | null;
  categories: Category[] | [];
  setFilter: (filter: number | null) => void;
}

export const NoteCategories = ({ filter, categories, setFilter }: Props) => {
  const { user } = use(AuthContext);
  const { mutation, deleteMutation, isLoading } = useNoteCategory(user?.id || 0);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const category = formData.get('category') as string;

    const categoryData = { userId: user?.id, name: category };

    await mutation.mutateAsync(categoryData, {
      onSuccess: () => {
        (event.target as HTMLFormElement).reset();
      },
      onError: (error) => {
        toast.error((error as Error).message);
      },
    });
  };

  const handleDeleteCategory = async (categoryId: number) => {
    await deleteMutation.mutateAsync(categoryId, {
      onError: (error) => {
        toast.error((error as Error).message);
      },
    });
  };

  return (
    <>
      <span className="mr-1 text-sm text-muted-foreground">Categories:</span>
      <button
        onClick={() => setFilter(null)}
        className={`rounded-full border px-3 py-1 text-xs transition ${
          filter === null
            ? 'border-foreground bg-foreground text-background'
            : 'border-border bg-paper hover:bg-secondary'
        }`}
      >
        All
      </button>
      {categories?.map((c) => (
        <span key={c.id} className="group relative inline-flex">
          <button
            onClick={() => setFilter(filter === c.id ? null : c.id)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              filter === c.id ? 'border-foreground' : 'border-border hover:border-foreground/40'
            }`}
            style={{ backgroundColor: filter === c.id ? c.color : 'transparent' }}
          >
            <span
              className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
              style={{ backgroundColor: c.color }}
            />
            {c.name}
          </button>
          <button
            onClick={() => {
              if (filter === c.id) setFilter(null);
              handleDeleteCategory(c.id);
            }}
            className="ml-1 text-muted-foreground hover:text-destructive group-hover:inline"
            aria-label={`Remove ${c.name}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </span>
      ))}
      <form onSubmit={handleSubmit} className="ml-2 flex items-center gap-1">
        <Input
          id="category"
          name="category"
          placeholder="New category"
          className="h-7 w-32 rounded-full bg-paper text-xs"
        />
        <Button type="submit" size="sm" variant="ghost" className="h-7 px-2" disabled={isLoading}>
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </form>
    </>
  );
};
