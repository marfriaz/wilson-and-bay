"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  Image,
} from "@mui/icons-material";
import LoadableImage from "../LoadableImage";
import NavigationDots from "../NavigationDots";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";

interface ImageGallery2Props {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

const ImageGallery2: React.FC<ImageGallery2Props> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0); // For main gallery swiping
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkImageLoaded = (index: number) => {
    const img = document.createElement("img");
    img.src = images[index]?.src || "";

    // If image is already cached/loaded, don't show spinner
    if (img.complete) {
      setImageLoading(false);
    } else {
      setImageLoading(true);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    checkImageLoaded(newIndex);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    checkImageLoaded(newIndex);
    setCurrentIndex(newIndex);
  };

  const handleFirst = () => {
    checkImageLoaded(0);
    setCurrentIndex(0);
  };

  const handleLast = () => {
    checkImageLoaded(images.length - 1);
    setCurrentIndex(images.length - 1);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
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

  // Handle touch swipe for mobile lightbox
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

  // Handle touch swipe for main gallery
  const [galleryTouchStart, setGalleryTouchStart] = useState(0);
  const [galleryTouchEnd, setGalleryTouchEnd] = useState(0);

  const handleGalleryTouchStart = (e: React.TouchEvent) => {
    setGalleryTouchStart(e.targetTouches[0].clientX);
  };

  const handleGalleryTouchMove = (e: React.TouchEvent) => {
    setGalleryTouchEnd(e.targetTouches[0].clientX);
  };

  const handleGalleryTouchEnd = () => {
    if (!galleryTouchStart || !galleryTouchEnd) return;

    const diff = galleryTouchStart - galleryTouchEnd;
    const SWIPE_THRESHOLD = 50;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        // Swipe left - next image
        setGalleryIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
      } else {
        // Swipe right - previous image
        setGalleryIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
      }
    }

    // Reset touch state
    setGalleryTouchStart(0);
    setGalleryTouchEnd(0);
  };

  return (
    <>
      {/* Grid layout optimized for Spaces2 cards */}
      <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
        {isMobile ? (
          // Mobile layout - swipeable carousel
          <Box sx={{ position: "relative", height: "100%", overflow: "hidden" }}>
            <Box
              onTouchStart={handleGalleryTouchStart}
              onTouchMove={handleGalleryTouchMove}
              onTouchEnd={handleGalleryTouchEnd}
              sx={{
                display: "flex",
                transition: "transform 0.3s ease-in-out",
                transform: `translateX(-${galleryIndex * 100}%)`,
                height: "100%",
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: "100%",
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <LoadableImage
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    onClick={() => handleOpen(index)}
                    loading={index === 0 ? "eager" : "lazy"}
                    aspectRatio={4 / 3}
                    borderRadius={0}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              ))}
            </Box>
            {/* Navigation Dots */}
            <NavigationDots
              totalItems={images.length}
              currentIndex={galleryIndex}
              onDotClick={(index) => setGalleryIndex(index)}
              maxDots={5}
              useSmallEdgeDots={true}
              leftOffset="53%"
              zIndex={10}
            />
          </Box>
        ) : (
          // Desktop layout - one big photo on top, 3 smaller ones on bottom
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 1 }}>
            {/* Main large image - top */}
            <Box sx={{ flex: 2, width: "100%" }}>
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
                  height: "100%",
                  width: "100%",
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
                  aspectRatio={16 / 9}
                  borderRadius={0}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>

            {/* Thumbnail row - bottom */}
            <Box sx={{ flex: 1, display: "flex", gap: 1, height: "100%" }}>
              {images.slice(1, 4).map((img, index) => (
                <Box key={index} sx={{ flex: 1, position: "relative", height: "100%" }}>
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
                      height: "100%",
                      width: "100%",
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
                      borderRadius={0}
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  
                  {/* Show all photos button on last thumbnail */}
                  {index === 2 && images.length > 4 && (
                    <Button
                      variant="contained"
                      onClick={() => handleOpen(0)}
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        zIndex: 2,
                        backgroundColor: theme.palette.grey[700],
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                        },
                        fontSize: "0.7rem",
                        minWidth: "auto",
                      }}
                    >
                      <Image sx={{ marginRight: 0.5, fontSize: "0.8rem" }} />
                      <Typography variant="body2" sx={{ fontSize: "inherit", color: "white" }}>
                        +{images.length - 4}
                      </Typography>
                    </Button>
                  )}
                </Box>
              ))}
            </Box>

            {/* Show All Photos Button (positioned over the main image) */}
            {images.length <= 4 && (
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
                <Typography variant="body2" sx={{ color: "white" }}>Show all photos</Typography>
              </Button>
            )}
          </Box>
        )}
      </Box>

      {/* Full-screen lightbox */}
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
          sx={{ 
            p: 0, 
            height: "100%", 
            position: "relative",
            overflow: "hidden"
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Blurred background image */}
          <Box
            component="img"
            src={images[currentIndex]?.src}
            alt=""
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(20px)",
              transform: "scale(1.1)", // Slightly scale to hide blur edges
              opacity: 0.3,
              zIndex: 0,
            }}
          />
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 3,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              width: isMobile ? 40 : 36,
              height: isMobile ? 40 : 36,
            }}
          >
            <Close />
          </IconButton>

          {/* Navigation arrows */}
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: "absolute",
              top: "50%",
              left: 16,
              zIndex: 3,
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
              zIndex: 3,
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

          {/* Loading Spinner */}
          {imageLoading && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            >
              <CircularProgress size={60} sx={{ color: "white" }} />
            </Box>
          )}

          {/* Full Image */}
          <Box
            component="img"
            src={images[currentIndex]?.src}
            alt={images[currentIndex]?.alt}
            onLoad={handleImageLoad}
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              mx: "auto",
              opacity: imageLoading ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
              zIndex: 1,
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
                zIndex: 3,
              }}
            >
              <Typography variant="body2" sx={{ color: "white" }}>
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
                zIndex: 3,
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

export default ImageGallery2;