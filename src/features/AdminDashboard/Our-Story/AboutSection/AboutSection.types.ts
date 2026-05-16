export interface AboutSection {
  id: string;
  image: string;
  name?:      string;
  title?:     string;
  text?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}