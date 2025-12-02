"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  Dialog,
  IconButton,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Container,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Close, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { galleryData } from "../constants";
import LoadableImage from "../components/LoadableImage";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

const Gallery: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const [filter, setFilter] = useState("all");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [filteredImages, setFilteredImages] = useState(galleryData);
  const [imageLoading, setImageLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [visibleCount, setVisibleCount] = useState(isMobile ? 6 : 12); // Initial number of images to show

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setCurrentImageIndex(null);
  };

  // Update visible count when mobile state changes
  useEffect(() => {
    setVisibleCount(isMobile ? 6 : 12);
  }, [isMobile]);

  // Handle filter changes with proper state management
  useEffect(() => {
    // Clear previous images immediately
    setFilteredImages([]);
    setIsTransitioning(true);

    // Close lightbox when filter changes
    setCurrentImageIndex(null);

    // Reset visible count when filter changes
    setVisibleCount(isMobile ? 6 : 12);

    // Simulate async filtering (in real app, this might be an API call)
    const timer = setTimeout(() => {
      const newFilteredImages =
        filter === "all"
          ? galleryData
          : galleryData.filter((item) => item.space === filter);

      setFilteredImages(newFilteredImages);
      setIsTransitioning(false);
    }, 100); // Small delay to show loading state

    return () => clearTimeout(timer);
  }, [filter, isMobile]);

  // Infinite scroll: Load more images when user scrolls near bottom
  useEffect(() => {
    const handleScroll = () => {
      // Mobile: trigger earlier and load fewer images
      // Desktop: trigger later and load more images
      const threshold = isMobile ? 300 : 500; // Trigger earlier on mobile
      const loadCount = isMobile ? 3 : 6; // Load fewer images on mobile

      // Use Math.max to handle iOS Safari's bounce scroll
      const scrollPosition =
        window.innerHeight + Math.max(window.scrollY, window.pageYOffset);
      const pageHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      if (
        scrollPosition >= pageHeight - threshold &&
        visibleCount < filteredImages.length
      ) {
        // Load more images based on device type
        setVisibleCount((prev) =>
          Math.min(prev + loadCount, filteredImages.length)
        );
      }
    };

    // Use passive listener for better scroll performance on mobile
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, filteredImages.length, isMobile]);

  const handleFilterChange = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };

  const checkImageLoaded = (index: number) => {
    const img = new Image();
    img.src = filteredImages[index]?.src || "";

    // If image is already cached/loaded, don't show spinner
    if (img.complete) {
      setImageLoading(false);
    } else {
      setImageLoading(true);
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex === null) return;
    const newIndex =
      currentImageIndex === 0
        ? filteredImages.length - 1
        : currentImageIndex - 1;
    checkImageLoaded(newIndex);
    setCurrentImageIndex(newIndex);
  };

  const handleNext = () => {
    if (currentImageIndex === null) return;
    const newIndex =
      currentImageIndex === filteredImages.length - 1
        ? 0
        : currentImageIndex + 1;
    checkImageLoaded(newIndex);
    setCurrentImageIndex(newIndex);
  };

  const handleFirst = () => {
    if (filteredImages.length > 0) {
      checkImageLoaded(0);
      setCurrentImageIndex(0);
    }
  };

  const handleLast = () => {
    if (filteredImages.length > 0) {
      checkImageLoaded(filteredImages.length - 1);
      setCurrentImageIndex(filteredImages.length - 1);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Integrate keyboard navigation hook
  useKeyboardNavigation({
    isActive: currentImageIndex !== null,
    onNext: handleNext,
    onPrevious: handlePrevious,
    onClose: handleClose,
    onFirst: handleFirst,
    onLast: handleLast,
  });

  // Handle touch swipe for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      handleNext();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      handlePrevious();
    }
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            mb: 3,
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Gallery
        </Typography>

        {isMobile ? (
          <Box sx={{ mb: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="gallery-filter-label">Filter by Space</InputLabel>
              <Select
                labelId="gallery-filter-label"
                id="gallery-filter-select"
                value={filter}
                label="Filter by Space"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Spaces</MenuItem>
                <MenuItem value="wilson">The Wilson Room</MenuItem>
                <MenuItem value="courtyard">The Courtyard</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
            <Tabs
              value={filter}
              onChange={handleFilterChange}
              aria-label="gallery filters"
              centered
            >
              <Tab label="All Spaces" value="all" />
              <Tab label="The Wilson Room" value="wilson" />
              <Tab label="The Courtyard" value="courtyard" />
            </Tabs>
          </Box>
        )}

        {isTransitioning ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            <Grid2 container spacing={2}>
              {filteredImages.slice(0, visibleCount).map((item, index) => (
                <Grid2 key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleImageClick(index);
                      }
                    }}
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 3,
                      },
                      "&:focus": {
                        outline: `3px solid ${theme.palette.primary.main}`,
                        outlineOffset: "2px",
                      },
                      overflow: "hidden",
                    }}
                  >
                    <LoadableImage
                      src={item.src}
                      alt={item.alt}
                      onClick={() => handleImageClick(index)}
                      loading={index < 6 ? "eager" : "lazy"}
                      aspectRatio={220 / 220}
                      borderRadius={0}
                      sx={{ height: 220 }}
                    />
                  </Card>
                </Grid2>
              ))}
            </Grid2>

            {/* Loading indicator when more images are available */}
            {visibleCount < filteredImages.length && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 4,
                }}
              >
                <CircularProgress size={40} />
              </Box>
            )}
          </>
        )}

        {/* Improved Lightbox Dialog matching ImageGallery */}
        <Dialog
          open={currentImageIndex !== null}
          onClose={handleClose}
          fullScreen={isMobile}
          slotProps={{
            paper: {
              sx: {
                bgcolor: "#000",
                width: isMobile ? "100%" : "80%",
                height: isMobile ? "100%" : "80%",
                maxWidth: "none",
                borderRadius: isMobile ? 0 : 2,
                m: isMobile ? 0 : 2,
                overflow: "hidden",
              },
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#000",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 10,
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                width: isMobile ? 40 : 36,
                height: isMobile ? 40 : 36,
              }}
            >
              <Close />
            </IconButton>

            {/* Arrows - larger on mobile for better touch targets */}
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: "absolute",
                top: "50%",
                left: 16,
                zIndex: 10,
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                transform: "translateY(-50%)",
                width: isMobile ? 48 : 36,
                height: isMobile ? 48 : 36,
              }}
            >
              <ArrowBackIos />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 16,
                zIndex: 10,
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                transform: "translateY(-50%)",
                width: isMobile ? 48 : 36,
                height: isMobile ? 48 : 36,
              }}
            >
              <ArrowForwardIos />
            </IconButton>

            {/* Image Counter for Mobile */}
            {isMobile && currentImageIndex !== null && (
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: 10,
                  zIndex: 5,
                }}
              >
                <Typography variant="body2">
                  {currentImageIndex + 1} / {filteredImages.length}
                </Typography>
              </Box>
            )}

            {/* Loading Spinner */}
            {imageLoading && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                }}
              >
                <CircularProgress size={60} sx={{ color: "white" }} />
              </Box>
            )}

            {currentImageIndex !== null && (
              <img
                src={
                  filteredImages[currentImageIndex]?.src || "/placeholder.svg"
                }
                alt={filteredImages[currentImageIndex]?.alt || "Gallery image"}
                onLoad={handleImageLoad}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
                  opacity: imageLoading ? 0 : 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
            )}
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Gallery;
