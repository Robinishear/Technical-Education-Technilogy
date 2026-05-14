export interface Notice {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoticeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface NoticeDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}