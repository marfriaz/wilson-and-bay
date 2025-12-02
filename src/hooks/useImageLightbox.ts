import { useState, useCallback, useEffect } from "react";

export interface ImageData {
  id?: number;
  src: string;
  alt: string;
  caption?: string;
  space?: string;
}

export interface UseImageLightboxProps {
  images: ImageData[];
  initialIndex?: number;
  onClose?: () => void;
}

export interface UseImageLightboxReturn {
  isOpen: boolean;
  currentIndex: number;
  currentImage: ImageData | null;
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
}

/**
 * Custom hook for managing image lightbox state and navigation
 * Handles opening, closing, and navigating through images
 * Requirements: 1.1, 1.2, 1.4
 */
export function useImageLightbox({
  images,
  initialIndex = 0,
  onClose,
}: UseImageLightboxProps): UseImageLightboxReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset state when images array changes (e.g., filter change)
  // This prevents displaying images from previous filter
  useEffect(() => {
    setIsOpen(false);
    setCurrentIndex(0);
  }, [images]);

  const open = useCallback(
    (index: number) => {
      if (index >= 0 && index < images.length) {
        setCurrentIndex(index);
        setIsOpen(true);
      }
    },
    [images.length]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const previous = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < images.length) {
        setCurrentIndex(index);
      }
    },
    [images.length]
  );

  const currentImage = images[currentIndex] || null;

  return {
    isOpen,
    currentIndex,
    currentImage,
    open,
    close,
    next,
    previous,
    goTo,
  };
}
