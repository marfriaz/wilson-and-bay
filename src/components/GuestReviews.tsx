import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid2,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { guestReviews, PEERSPACE_URL, PEERSPACE_RATING } from "../constants";

const GuestReviews: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? guestReviews.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === guestReviews.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    (e.currentTarget as HTMLElement).dataset.touchStart = String(touch.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchStart = Number(
      (e.currentTarget as HTMLElement).dataset.touchStart
    );
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
  };

  return (
    <Box sx={{ pt: 8, bgcolor: "background.default" }}>
      <Container maxWidth={isMobile ? false : "lg"} disableGutters={isMobile}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: '"Oooh Baby", "cursive"',
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", md: "4rem" },
            mb: { xs: 3, md: 6 },
            textAlign: "center",
            px: isMobile ? 2 : 0,
            whiteSpace: { xs: "nowrap", md: "normal" },
          }}
        >
          Loved by Our Guests
        </Typography>

        {isMobile ? (
          <Box sx={{ position: "relative", px: 2 }}>
            <Box
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              tabIndex={0}
              sx={{
                overflow: "hidden",
                position: "relative",
                mx: -2,
                px: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  transition: "transform 0.3s ease-in-out",
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {guestReviews.map((review) => (
                  <Box
                    key={review.id}
                    sx={{
                      minWidth: "100%",
                      px: 1,
                    }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: 2,
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontStyle: "italic",
                            lineHeight: 1.7,
                            color: "text.primary",
                          }}
                        >
                          "{review.text}"
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            {currentSlide > 0 && (
              <IconButton
                onClick={handlePrevSlide}
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "40%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  width: 40,
                  height: 40,
                  zIndex: 2,
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
                  boxShadow: 2,
                }}
              >
                <ChevronLeft fontSize="large" />
              </IconButton>
            )}

            {currentSlide < guestReviews.length - 1 && (
              <IconButton
                onClick={handleNextSlide}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "40%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  width: 40,
                  height: 40,
                  zIndex: 2,
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
                  boxShadow: 2,
                }}
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            )}
          </Box>
        ) : (
          <Grid2 container spacing={4} sx={{ mb: 4 }}>
            {guestReviews.map((review) => (
              <Grid2 size={{ xs: 12, md: 4 }} key={review.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 2,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: "italic",
                        lineHeight: 1.7,
                        color: "text.primary",
                      }}
                    >
                      "{review.text}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        )}

        <Box sx={{ textAlign: "center", mt: 4, px: isMobile ? 2 : 0 }}>
          <Link
            href={PEERSPACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 500,
              textDecoration: "none",
              color: "primary.main",
              "&:hover": {
                color: "primary.dark",
                textDecoration: "underline",
              },
            }}
          >
            Read more reviews on Peerspace →
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default GuestReviews;
