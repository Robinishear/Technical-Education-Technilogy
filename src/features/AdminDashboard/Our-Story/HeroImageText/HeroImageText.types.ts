export interface HeroImageText {
  id: string;
  image: string;
  name?:      string;
  title?:     string;
  text?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HeroImageTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}