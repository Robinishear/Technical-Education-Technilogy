export interface TaskDataProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export interface TaskData {
  id: string;
  title: string;
  link: string;
  text: string;
  time: string;
  createdAt: string;
  updatedAt: string;
}