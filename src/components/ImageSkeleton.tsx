import React from "react";
import { Skeleton, Box } from "@mui/material";

interface ImageSkeletonProps {
  /**
   * Aspect ratio of the skeleton (width / height)
   * Common values: 1 (square), 4/3, 16/9
   */
  aspectRatio?: number;
  /**
   * Width of the skeleton (can be percentage or pixel value)
   */
  width?: string | number;
  /**
   * Height of the skeleton (can be percentage or pixel value)
   */
  height?: string | number;
  /**
   * Border radius for the skeleton
   */
  borderRadius?: number | string;
  /**
   * Animation type
   */
  animation?: "pulse" | "wave" | false;
}

/**
 * Reusable skeleton loader component for image placeholders
 * Matches aspect ratios of actual images and provides subtle animation
 */
const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  aspectRatio = 1,
  width = "100%",
  height,
  borderRadius = 1,
  animation = "wave",
}) => {
  return (
    <Box
      sx={{
        width,
        height: height || "auto",
        aspectRatio: height ? undefined : aspectRatio,
        position: "relative",
        overflow: "hidden",
        borderRadius,
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation={animation}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </Box>
  );
};

export default ImageSkeleton;
