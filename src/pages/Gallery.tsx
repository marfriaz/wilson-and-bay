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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setCurrentImageIndex(null);
  };

  // Handle filter changes with proper state management
  useEffect(() => {
    // Clear previous images immediately
    setFilteredImages([]);
    setIsTransitioning(true);

    // Close lightbox when filter changes
    setCurrentImageIndex(null);

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
  }, [filter]);

  const handleFilterChange = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };

  const handlePrevious = () => {
    if (currentImageIndex === null) return;
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1;
    });
  };

  const handleNext = () => {
    if (currentImageIndex === null) return;
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handleFirst = () => {
    if (filteredImages.length > 0) {
      setCurrentImageIndex(0);
    }
  };

  const handleLast = () => {
    if (filteredImages.length > 0) {
      setCurrentImageIndex(filteredImages.length - 1);
    }
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

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={filter}
            onChange={handleFilterChange}
            aria-label="gallery filters"
            centered={!isMobile}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile={isMobile}
            sx={{
              "& .MuiTab-root": {
                minWidth: isMobile ? 120 : "auto",
                fontSize: isMobile ? "0.875rem" : "1rem",
                padding: isMobile ? "12px 16px" : "12px 24px",
              },
            }}
          >
            <Tab label="All Spaces" value="all" />
            <Tab label="The Wilson Room" value="wilson" />
            <Tab label="The Courtyard" value="courtyard" />
          </Tabs>
        </Box>

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
          <Grid2 container spacing={2}>
            {filteredImages.map((item, index) => (
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

            {currentImageIndex !== null && (
              <img
                src={
                  filteredImages[currentImageIndex]?.src || "/placeholder.svg"
                }
                alt={filteredImages[currentImageIndex]?.alt || "Gallery image"}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
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
