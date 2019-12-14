import { Author } from './author';
import { Category } from './category';

export interface Book {
  isbn: string;
  title: string;
  language?: string;
  authors?: Author[];
  categories?: Category[];
}