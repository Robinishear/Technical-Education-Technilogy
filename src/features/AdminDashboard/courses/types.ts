export interface Category {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  price: number;
  oldPrice?: number | null;
  rating: number;
  totalReviews: number;
  isPublished: boolean;
  categoryId: string;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCoursePayload {
  title: string;
  thumbnail: string;
  instructor: string;
  price: number;
  oldPrice?: number | null;
  totalReviews:number;
  rating:number;
  categoryId: string;
}