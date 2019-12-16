import { Author } from './author';
import { Category } from './category';

export interface Book {
  id?: string;
  isbn: string;
  title: string;
  language?: string;
  authors?: Author[];
  categories?: string[];
}