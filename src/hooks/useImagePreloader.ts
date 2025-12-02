import { useState, useEffect } from "react";
import { createImageLoader } from "../utils/imageUtils";
import type { ImageData } from "./useImageLightbox";

export interface UseImagePreloaderProps {
  images: ImageData[];
  currentIndex: number;
  preloadCount?: number; // default: 2 (next and previous)
}

export interface UseImagePreloaderReturn {
  isLoading: boolean;
  loadedIndices: Set<number>;
}

/**
 * Custom hook for preloading adjacent images in the lightbox
 * Preloads images at currentIndex - 1 and currentIndex + 1
 * Handles wrapping at array boundaries
 * Requirements: 3.2
 */
export function useImagePreloader({
  images,
  currentIndex,
  preloadCount = 2,
}: UseImagePreloaderProps): UseImagePreloaderReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (images.length === 0) {
      return;
    }

    const indicesToPreload: number[] = [];

    // Calculate adjacent indices with wrapping
    for (let i = 1; i <= preloadCount; i++) {
      // Previous images
      const prevIndex = (currentIndex - i + images.length) % images.length;
      indicesToPreload.push(prevIndex);

      // Next images
      const nextIndex = (currentIndex + i) % images.length;
      indicesToPreload.push(nextIndex);
    }

    // Filter out already loaded indices
    const toLoad = indicesToPreload.filter((idx) => !loadedIndices.has(idx));

    if (toLoad.length === 0) {
      return;
    }

    setIsLoading(true);

    // Preload images in parallel
    const preloadPromises = toLoad.map(async (idx) => {
      try {
        await createImageLoader(images[idx].src);
        setLoadedIndices((prev) => new Set(prev).add(idx));
      } catch (error) {
        // Silently fail - image will load when needed
        console.warn(`Failed to preload image at index ${idx}:`, error);
      }
    });

    Promise.all(preloadPromises).finally(() => {
      setIsLoading(false);
    });
  }, [images, currentIndex, preloadCount, loadedIndices]);

  return {
    isLoading,
    loadedIndices,
  };
}
