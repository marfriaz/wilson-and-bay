import { useEffect } from "react";

export interface UseKeyboardNavigationProps {
  isActive: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onFirst?: () => void;
  onLast?: () => void;
}

/**
 * Custom hook for keyboard navigation in the lightbox
 * Handles arrow keys, Escape, Home, End, Enter, and Space
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.7
 */
export function useKeyboardNavigation({
  isActive,
  onNext,
  onPrevious,
  onClose,
  onFirst,
  onLast,
}: UseKeyboardNavigationProps): void {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
          event.preventDefault();
          onPrevious();
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
        case "Home":
          event.preventDefault();
          if (onFirst) {
            onFirst();
          }
          break;
        case "End":
          event.preventDefault();
          if (onLast) {
            onLast();
          }
          break;
        case "Enter":
        case " ":
          // These are handled on focused elements, not globally
          // This is for thumbnail activation (requirement 4.7)
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount or when isActive changes
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, onNext, onPrevious, onClose, onFirst, onLast]);
}
