export interface Student {
  id: string;
  name: string;
  image: string;
  position?: {
    role?: string;
    title?: string;
  };
  items?: string[] | { title?: string; feedback?: string }[];
  bio?: string;
}
