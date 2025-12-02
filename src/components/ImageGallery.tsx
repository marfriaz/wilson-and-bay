"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  Grid2,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  Image,
} from "@mui/icons-material";
import LoadableImage from "./LoadableImage";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery("(max-width:400px)");

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleFirst = () => {
    setCurrentIndex(0);
  };

  const handleLast = () => {
    setCurrentIndex(images.length - 1);
  };

  // Integrate keyboard navigation hook
  useKeyboardNavigation({
    isActive: open,
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
    <>
      {/* Mobile-optimized Grid Layout */}
      <Box sx={{ borderRadius: 2, overflow: "hidden", mb: { xs: 2, sm: 0 } }}>
        {isMobile ? (
          // Mobile layout - simplified grid
          <Box sx={{ position: "relative" }}>
            <LoadableImage
              src={images[0]?.src || "/placeholder.svg"}
              alt={images[0]?.alt}
              onClick={() => handleOpen(0)}
              loading="eager"
              aspectRatio={4 / 3}
              borderRadius={2}
            />
            <Button
              variant="contained"
              onClick={() => handleOpen(0)}
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                zIndex: 2,
                backgroundColor: theme.palette.grey[700],
                color: "white",
                padding: "6px 12px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
                fontSize: isExtraSmall ? "0.7rem" : "0.8rem",
              }}
            >
              <Image
                sx={{
                  marginRight: 1,
                  fontSize: isExtraSmall ? "0.9rem" : "1rem",
                }}
              />
              <Typography variant="body2" sx={{ fontSize: "inherit" }}>
                Show all photos
              </Typography>
            </Button>
          </Box>
        ) : (
          // Desktop layout - grid with main image and thumbnails
          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Box
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpen(0);
                  }
                }}
                sx={{
                  cursor: "pointer",
                  "&:focus": {
                    outline: `3px solid ${theme.palette.primary.main}`,
                    outlineOffset: "2px",
                  },
                }}
              >
                <LoadableImage
                  src={images[0]?.src || "/placeholder.svg"}
                  alt={images[0]?.alt}
                  onClick={() => handleOpen(0)}
                  loading="eager"
                  aspectRatio={1}
                  borderRadius={1}
                />
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }} container spacing={1}>
              {images.slice(1, 5).map((img, index) => (
                <Grid2 size={6} key={index}>
                  <Box
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpen(index + 1);
                      }
                    }}
                    sx={{
                      cursor: "pointer",
                      "&:focus": {
                        outline: `3px solid ${theme.palette.primary.main}`,
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    <LoadableImage
                      src={img.src}
                      alt={img.alt}
                      onClick={() => handleOpen(index + 1)}
                      loading="lazy"
                      aspectRatio={1}
                      borderRadius={1}
                    />
                  </Box>
                </Grid2>
              ))}
            </Grid2>

            {/* Show All Photos Button (Positioned over the last photo) */}
            <Grid2 size={12} sx={{ position: "relative" }}>
              <Button
                variant="contained"
                onClick={() => handleOpen(0)}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  zIndex: 2,
                  backgroundColor: theme.palette.grey[700],
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                <Image sx={{ marginRight: 1 }} />
                <Typography variant="body2">Show all photos</Typography>
              </Button>
            </Grid2>
          </Grid2>
        )}
      </Box>

      {/* Mobile-optimized Lightbox */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={isMobile}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "black",
              width: isMobile ? "100%" : "80%",
              height: isMobile ? "100%" : "80%",
              maxWidth: "none",
              borderRadius: isMobile ? 0 : 2,
              m: isMobile ? 0 : 2,
            },
          },
        }}
      >
        <DialogContent
          sx={{ p: 0, height: "100%", position: "relative" }}
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
              zIndex: 2,
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
              zIndex: 2,
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
              zIndex: 2,
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

          {/* Full Image */}
          <Box
            component="img"
            src={images[currentIndex]?.src}
            alt={images[currentIndex]?.alt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              mx: "auto",
              backgroundColor: "black",
            }}
          />

          {/* Image Counter for Mobile */}
          {isMobile && (
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
              }}
            >
              <Typography variant="body2">
                {currentIndex + 1} / {images.length}
              </Typography>
            </Box>
          )}

          {/* Optional Caption */}
          {images[currentIndex]?.caption && (
            <Box
              sx={{
                position: "absolute",
                bottom: 24,
                left: 0,
                right: 0,
                textAlign: "center",
                color: "white",
                px: 2,
                py: isMobile ? 2 : 1,
                mx: isMobile ? 2 : 0,
                bgcolor: "rgba(0,0,0,0.5)",
                borderRadius: isMobile ? 1 : 0,
              }}
            >
              <Typography variant="body2">
                {images[currentIndex]?.caption}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
