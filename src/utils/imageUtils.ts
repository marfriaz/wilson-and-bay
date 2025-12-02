/**
 * Image utility functions for the gallery system
 */

/**
 * Adds width and height parameters to Firebase Storage URLs for image optimization
 * @param baseUrl - The original Firebase Storage URL
 * @param width - Desired width in pixels
 * @param height - Optional desired height in pixels
 * @returns Optimized URL with size parameters
 */
export function getOptimizedImageUrl(
  baseUrl: string,
  width: number,
  height?: number
): string {
  try {
    const url = new URL(baseUrl);

    // Add width parameter
    url.searchParams.set("w", width.toString());

    // Add height parameter if provided
    if (height !== undefined) {
      url.searchParams.set("h", height.toString());
    }

    return url.toString();
  } catch (error) {
    // If URL parsing fails, return the original URL
    console.error("Failed to parse URL for optimization:", error);
    return baseUrl;
  }
}

/**
 * Creates a Promise-based image loader with timeout and error handling
 * @param src - The image URL to load
 * @param timeout - Optional timeout in milliseconds (default: 10000ms)
 * @returns Promise that resolves with the loaded HTMLImageElement or rejects on error/timeout
 */
export function createImageLoader(
  src: string,
  timeout: number = 10000
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    let timeoutId: NodeJS.Timeout | null = null;

    // Set up timeout
    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        img.src = ""; // Cancel the load
        reject(new Error(`Image load timeout after ${timeout}ms: ${src}`));
      }, timeout);
    }

    // Handle successful load
    img.onload = () => {
      if (timeoutId) clearTimeout(timeoutId);
      resolve(img);
    };

    // Handle load errors
    img.onerror = () => {
      if (timeoutId) clearTimeout(timeoutId);
      reject(new Error(`Failed to load image: ${src}`));
    };

    // Start loading
    img.src = src;
  });
}

/**
 * Generates an accessible ARIA label for images in the gallery
 * @param alt - The alt text for the image
 * @param currentIndex - The current image index (0-based)
 * @param totalCount - Total number of images
 * @returns Formatted ARIA label for screen readers
 */
export function getImageAriaLabel(
  alt: string,
  currentIndex: number,
  totalCount: number
): string {
  return `${alt}, Image ${currentIndex + 1} of ${totalCount}`;
}

/**
 * Checks if the user prefers reduced motion
 * @returns true if user prefers reduced motion, false otherwise
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches;
}
