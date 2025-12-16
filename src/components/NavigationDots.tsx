import React from "react";
import { Box } from "@mui/material";

export interface NavigationDotsProps {
  /** Total number of items */
  totalItems: number;
  /** Current active index */
  currentIndex: number;
  /** Callback when a dot is clicked */
  onDotClick: (index: number) => void;
  /** Maximum number of dots to show (for limited display) */
  maxDots?: number;
  /** Whether to use smaller edge dots when maxDots is exceeded */
  useSmallEdgeDots?: boolean;
  /** Custom positioning - left offset percentage */
  leftOffset?: string;
  /** Custom z-index */
  zIndex?: number;
  /** Additional sx props for the container */
  sx?: object;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({
  totalItems,
  currentIndex,
  onDotClick,
  maxDots,
  useSmallEdgeDots = false,
  leftOffset = "50%",
  zIndex = 10,
  sx = {},
}) => {
  // Determine how many dots to show
  const dotsToShow = maxDots ? Math.min(maxDots, totalItems) : totalItems;
  
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 16,
        left: leftOffset,
        transform: "translateX(-50%)",
        display: "flex",
        gap: 1,
        bgcolor: "rgba(0, 0, 0, 0.3)",
        px: 2,
        py: 1,
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        zIndex,
        ...sx,
      }}
    >
      {Array.from({ length: dotsToShow }).map((_, index) => {
        const isCurrentDot = index === currentIndex;
        
        // For limited dots with small edges
        let isEdgeDot = false;
        if (useSmallEdgeDots && maxDots && totalItems > maxDots) {
          const isLeftEdge = index === 0;
          const isRightEdge = index === maxDots - 1;
          isEdgeDot = (isLeftEdge || isRightEdge) && !isCurrentDot;
        }
        
        return (
          <Box
            key={index}
            component="button"
            onClick={() => onDotClick(index)}
            aria-label={`Go to item ${index + 1}`}
            sx={{
              width: isEdgeDot ? 6 : 8,
              height: isEdgeDot ? 6 : 8,
              borderRadius: "50%",
              bgcolor: isCurrentDot ? "white" : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              border: "none",
              padding: 0,
              transition: "all 0.3s ease",
              opacity: isEdgeDot ? 0.7 : 1,
              "&:hover": {
                bgcolor: "white",
                opacity: 1,
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default NavigationDots;