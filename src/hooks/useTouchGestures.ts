import { useRef, useCallback } from "react";
import type React from "react";

export interface UseTouchGesturesProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onPinch?: (scale: number) => void;
  onDoubleTap?: () => void;
  swipeThreshold?: number; // default: 50px
}

export interface UseTouchGesturesReturn {
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

interface TouchState {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startDistance: number;
  lastTapTime: number;
}

/**
 * Custom hook for handling touch gestures
 * Detects swipe left/right, pinch zoom, and double-tap
 * Requirements: 5.1, 5.2, 5.4, 5.5
 */
export function useTouchGestures({
  onSwipeLeft,
  onSwipeRight,
  onPinch,
  onDoubleTap,
  swipeThreshold = 50,
}: UseTouchGesturesProps): UseTouchGesturesReturn {
  const touchState = useRef<TouchState>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    startDistance: 0,
    lastTapTime: 0,
  });

  // Calculate distance between two touch points
  const getTouchDistance = useCallback((touches: React.TouchList): number => {
    if (touches.length < 2) return 0;

    const touch1 = touches[0];
    const touch2 = touches[1];

    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;

    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];

      touchState.current.startX = touch.clientX;
      touchState.current.startY = touch.clientY;
      touchState.current.endX = touch.clientX;
      touchState.current.endY = touch.clientY;

      // Handle pinch gesture initialization
      if (e.touches.length === 2) {
        touchState.current.startDistance = getTouchDistance(e.touches);
      }

      // Handle double-tap detection
      const now = Date.now();
      const timeSinceLastTap = now - touchState.current.lastTapTime;

      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        // Double tap detected
        if (onDoubleTap) {
          onDoubleTap();
        }
        touchState.current.lastTapTime = 0; // Reset to prevent triple-tap
      } else {
        touchState.current.lastTapTime = now;
      }
    },
    [getTouchDistance, onDoubleTap]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];

      touchState.current.endX = touch.clientX;
      touchState.current.endY = touch.clientY;

      // Handle pinch gesture
      if (e.touches.length === 2 && onPinch) {
        const currentDistance = getTouchDistance(e.touches);

        if (touchState.current.startDistance > 0) {
          const scale = currentDistance / touchState.current.startDistance;
          onPinch(scale);
        }

        touchState.current.startDistance = currentDistance;
      }
    },
    [getTouchDistance, onPinch]
  );

  const handleTouchEnd = useCallback(() => {
    const deltaX = touchState.current.startX - touchState.current.endX;
    const deltaY = touchState.current.startY - touchState.current.endY;

    // Check if horizontal swipe exceeds threshold and is more horizontal than vertical
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe && Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        // Swipe left
        if (onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Swipe right
        if (onSwipeRight) {
          onSwipeRight();
        }
      }
    }

    // Reset touch state
    touchState.current.startDistance = 0;
  }, [swipeThreshold, onSwipeLeft, onSwipeRight]);

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
