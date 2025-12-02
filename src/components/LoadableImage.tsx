import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { BrokenImage, Refresh } from "@mui/icons-material";
import ImageSkeleton from "./ImageSkeleton";

interface LoadableImageProps {
  src: string;
  alt: string;
  aspectRatio?: number;
  onClick?: () => void;
  loading?: "lazy" | "eager";
  borderRadius?: number | string;
  sx?: object;
  /**
   * Callback when image successfully loads
   */
  onLoad?: () => void;
  /**
   * Callback when image fails to load
   */
  onError?: () => void;
}

/**
 * Image component with loading state management
 * Shows skeleton loader until image loads, then fades in the image
 */
const LoadableImage: React.FC<LoadableImageProps> = ({
  src,
  alt,
  aspectRatio = 1,
  onClick,
  loading = "lazy",
  borderRadius = 1,
  sx = {},
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  // Reset loading state when src changes and check if image is already cached
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    // Check if image is already loaded (cached)
    const img = new Image();
    img.src = src;

    if (img.complete) {
      // Image is already cached, set loading to false immediately
      setIsLoading(false);
    }
  }, [src, retryKey]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRetryKey((prev) => prev + 1);
    setIsLoading(true);
    setHasError(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio,
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        borderRadius,
        ...sx,
      }}
      onClick={onClick}
    >
      {/* Show skeleton while loading */}
      {isLoading && !hasError && (
        <ImageSkeleton
          aspectRatio={aspectRatio}
          borderRadius={borderRadius}
          animation="wave"
        />
      )}

      {/* Show image with fade-in effect when loaded */}
      {!hasError && (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          key={retryKey}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isLoading ? 0 : 1,
            transition: "opacity 300ms ease-in-out",
            position: isLoading ? "absolute" : "relative",
          }}
        />
      )}

      {/* Show error fallback with retry button */}
      {hasError && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "grey.200",
            color: "grey.600",
            gap: 1,
          }}
        >
          <BrokenImage sx={{ fontSize: 48, opacity: 0.5 }} />
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Failed to load image
          </Typography>
          <IconButton
            onClick={handleRetry}
            size="small"
            sx={{
              backgroundColor: "grey.300",
              "&:hover": {
                backgroundColor: "grey.400",
              },
            }}
            aria-label="Retry loading image"
          >
            <Refresh />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default LoadableImage;
