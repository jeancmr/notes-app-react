import type { Category } from './category.interface';

export interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}
