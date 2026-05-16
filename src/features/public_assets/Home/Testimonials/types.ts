export interface GalleryItem {
  id: string;
  name: string;
  image: string;
  position?: {
    role?: string;
    title?: string;
  };
  items?: {
    title?: string;
    feedback?: string;
  }[];
  bio?: string;
}