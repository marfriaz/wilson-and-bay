import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid2,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
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
            fontFamily: '"Oooh Baby", "cursive"',
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", md: "4rem" },
            mb: 4,
            textAlign: "center",
          }}
        >
          Featured Gallery
        </Typography>

        {/* Image Display */}
        {isMobile ? (
          // Mobile Carousel
          <Box>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                width: "100vw",
                marginLeft: "calc(-50vw + 50%)",
                marginRight: "calc(-50vw + 50%)",
              }}
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
                      position: "relative",
                    }}
                  >
                    <Box
                      component="img"
                      src={image.src}
                      alt={image.alt}
                      loading="eager"
                      onError={() => handleImageError(index)}
                      sx={{
                        width: "100%",
                        height: "auto",
                        minHeight: "300px",
                        maxHeight: "500px",
                        objectFit: "cover",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        opacity: 1,
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Navigation Arrows - Only visible when focused and not at boundaries */}
              {currentSlide > 0 && (
                <IconButton
                  onClick={handlePrevSlide}
                  sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    width: 48,
                    height: 48,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                    },
                    "&:focus": {
                      opacity: 1,
                    },
                    "div:focus-within &": {
                      opacity: 1,
                    },
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft fontSize="large" />
                </IconButton>
              )}

              {currentSlide < displayedImages.length - 1 && (
                <IconButton
                  onClick={handleNextSlide}
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    width: 48,
                    height: 48,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                    },
                    "&:focus": {
                      opacity: 1,
                    },
                    "div:focus-within &": {
                      opacity: 1,
                    },
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight fontSize="large" />
                </IconButton>
              )}

              {/* Navigation Dots - Overlaid on bottom */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                  bgcolor: "rgba(0, 0, 0, 0.3)",
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                }}
              >
                {displayedImages.map((_, index) => (
                  <Box
                    key={index}
                    component="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to image ${index + 1}`}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor:
                        currentSlide === index
                          ? "white"
                          : "rgba(255, 255, 255, 0.5)",
                      cursor: "pointer",
                      border: "none",
                      padding: 0,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "white",
                      },
                    }}
                  />
                ))}
              </Box>
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
                  sx={{
                    overflow: "hidden",
                    borderRadius: 1,
                    height: 300,
                  }}
                >
                  <Box
                    component="img"
                    src={image.src}
                    alt={image.alt}
                    loading="eager"
                    onError={() => handleImageError(index)}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      transition: "transform 0.2s ease-out",
                      willChange: "transform",
                      "&:hover": {
                        transform: "scale(1.08)",
                      },
                    }}
                  />
                </Box>
              </Grid2>
            ))}
          </Grid2>
        )}

        {/* CTA Link */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Box
            onClick={handleViewGallery}
            component="span"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 500,
              textDecoration: "none",
              color: "primary.main",
              cursor: "pointer",
              display: "inline-block",
              "&:hover": {
                color: "primary.dark",
                textDecoration: "underline",
              },
            }}
          >
            View Full Gallery →
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedGallery;
