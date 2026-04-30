export interface Instructor {
  id: string;
  name: string;
  image: string;
  position: { title: string };
  items: string[];
}

export interface FormData {
  name: string;
  image: string;
  positionTitle: string;
  itemsRaw: string;
}

export interface TestimonialTableProps {
  testimonials: Instructor[];
  isLoading: boolean;
  isError: boolean;
  deletePending: boolean;
  onEdit: (inst: Instructor) => void;
  onDelete: (id: string) => void;
}