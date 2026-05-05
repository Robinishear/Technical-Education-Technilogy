export interface CompleteNewData {
  id: string;
  title: string;
  text: string;
  date: string;
  pdfUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}