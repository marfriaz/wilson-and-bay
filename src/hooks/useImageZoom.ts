import { useState, useCallback } from "react";
import type React from "react";

export interface UseImageZoomProps {
  enabled: boolean;
  minZoom?: number; // default: 1
  maxZoom?: number; // default: 3
}

export interface UseImageZoomReturn {
  zoom: number;
  position: { x: number; y: number };
  isZoomed: boolean;
  handlePinch: (scale: number) => void;
  handleDoubleTap: () => void;
  handlePan: (deltaX: number, deltaY: number) => void;
  reset: () => void;
}

/**
 * Custom hook for managing image zoom functionality
 * Handles pinch zoom, double-tap zoom, and panning
 * Requirements: 5.1, 5.2, 5.3
 */
export function useImageZoom({
  enabled,
  minZoom = 1,
  maxZoom = 3,
}: UseImageZoomProps): UseImageZoomReturn {
  const [zoom, setZoom] = useState(minZoom);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isZoomed = zoom > minZoom;

  const handlePinch = useCallback(
    (scale: number) => {
      if (!enabled) return;

      setZoom((prevZoom) => {
        const newZoom = prevZoom * scale;
        // Clamp zoom level between min and max
        return Math.max(minZoom, Math.min(maxZoom, newZoom));
      });
    },
    [enabled, minZoom, maxZoom]
  );

  const handleDoubleTap = useCallback(() => {
    if (!enabled) return;

    setZoom((prevZoom) => {
      // Toggle between fit-to-screen (minZoom) and zoomed (2x)
      if (prevZoom > minZoom) {
        // Reset to fit-to-screen
        setPosition({ x: 0, y: 0 });
        return minZoom;
      } else {
        // Zoom to 2x
        return 2;
      }
    });
  }, [enabled, minZoom]);

  const handlePan = useCallback(
    (deltaX: number, deltaY: number) => {
      if (!enabled || !isZoomed) return;

      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));
    },
    [enabled, isZoomed]
  );

  const reset = useCallback(() => {
    setZoom(minZoom);
    setPosition({ x: 0, y: 0 });
  }, [minZoom]);

  return {
    zoom,
    position,
    isZoomed,
    handlePinch,
    handleDoubleTap,
    handlePan,
    reset,
  };
}
