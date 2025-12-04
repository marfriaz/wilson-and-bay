import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid2,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { featuredImages, ROUTES } from "../constants";

const FeaturedGallery: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Use hardcoded featured images from constants
  const displayedImages = featuredImages;

  // Constants
  const SWIPE_THRESHOLD = 50;

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const diff = touchStart - touchEnd;

    // Only trigger navigation if swipe exceeds threshold
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        // Swipe left - next slide (will be implemented in next task)
        handleNextSlide();
      } else {
        // Swipe right - previous slide (will be implemented in next task)
        handlePrevSlide();
      }
    }

    // Reset touch state
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Navigation handlers with circular navigation (memoized)
  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === displayedImages.length - 1 ? 0 : prev + 1
    );
  }, [displayedImages.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? displayedImages.length - 1 : prev - 1
    );
  }, [displayedImages.length]);

  // Image error handler (memoized)
  const handleImageError = useCallback((index: number) => {
    console.error(`Failed to load featured image at index ${index}`);
    // Image will show fallback background color
  }, []);

  // Keyboard navigation handler (memoized)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isMobile) return; // Only for mobile carousel

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlePrevSlide();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNextSlide();
          break;
        case "Home":
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case "End":
          e.preventDefault();
          setCurrentSlide(displayedImages.length - 1);
          break;
      }
    },
    [isMobile, handlePrevSlide, handleNextSlide, displayedImages.length]
  );

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Navigation handler (memoized)
  const handleViewGallery = useCallback(() => {
    navigate(ROUTES.GALLERY);
  }, [navigate]);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
          }}
        >
          In Use
        </Typography>

        {/* Image Display */}
        {isMobile ? (
          // Mobile Carousel
          <Box>
            <Box
              sx={{ position: "relative", overflow: "hidden" }}
              tabIndex={0}
              role="region"
              aria-label="Featured gallery carousel"
            >
              <Box
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                sx={{
                  display: "flex",
                  transition: "transform 0.3s ease-in-out",
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {displayedImages.map((image, index) => (
                  <Box
                    key={image.id}
                    sx={{
                      minWidth: "100%",
                      px: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={image.src}
                      alt={image.alt}
                      loading={index < 2 ? "eager" : "lazy"}
                      onError={() => handleImageError(index)}
                      sx={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "400px",
                        objectFit: "cover",
                        borderRadius: 1,
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        opacity: 1,
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Navigation Dots */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                mt: 3,
              }}
              role="tablist"
              aria-label="Gallery navigation"
            >
              {displayedImages.map((_, index) => (
                <Box
                  key={index}
                  component="button"
                  onClick={() => setCurrentSlide(index)}
                  role="tab"
                  aria-label={`Go to image ${index + 1}`}
                  aria-selected={currentSlide === index}
                  tabIndex={0}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor:
                      currentSlide === index
                        ? "primary.main"
                        : "rgba(255, 255, 255, 0.3)",
                    cursor: "pointer",
                    border: "none",
                    padding: 0,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor:
                        currentSlide === index
                          ? "primary.dark"
                          : "rgba(255, 255, 255, 0.5)",
                    },
                    "&:focus": {
                      outline: `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: "2px",
                    },
                  }}
                />
              ))}
            </Box>

            {/* ARIA Live Region for screen reader announcements */}
            <Box
              role="status"
              aria-live="polite"
              aria-atomic="true"
              sx={{
                position: "absolute",
                left: "-10000px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              Image {currentSlide + 1} of {displayedImages.length}
            </Box>
          </Box>
        ) : (
          // Desktop Grid
          <Grid2 container spacing={2}>
            {displayedImages.map((image, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={image.id}>
                <Box
                  component="img"
                  src={image.src}
                  alt={image.alt}
                  loading={index < 2 ? "eager" : "lazy"}
                  onError={() => handleImageError(index)}
                  sx={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 1,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 3,
                    },
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        )}

        {/* CTA Button */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handleViewGallery}
            sx={{
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", md: "1.1rem" },
              borderRadius: 0,
            }}
          >
            View Full Gallery →
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedGallery;
