export interface BookRequest {
  id?: string;
  isbn: string;
  title: string;
  language?: string;
  authors?: string[];
  categories?: string[];
}