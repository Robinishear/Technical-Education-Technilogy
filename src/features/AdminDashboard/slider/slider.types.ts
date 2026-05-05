export interface Slider {
  id: string;
  image: string;
  caption?: string;
  order: number;
}

export interface SliderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
