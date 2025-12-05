import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { wilsonImages, courtYardImages, ROUTES } from "../constants";

interface SpaceCardProps {
  title: string;
  image: string;
  stats: string;
  description: string;
  link: string;
}

const SpaceCard: React.FC<SpaceCardProps> = ({
  title,
  image,
  stats,
  description,
  link,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 500 }}
        >
          {stats}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
          {description}
        </Typography>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate(link)}
          sx={{
            mt: "auto",
            borderRadius: 0,
            fontWeight: "bold",
          }}
        >
          View Space
        </Button>
      </CardContent>
    </Card>
  );
};

const Spaces: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentSlide, setCurrentSlide] = useState(0);
  const showLoftSpace = process.env.REACT_APP_THE_LOFT_SPACE === "true";

  const spaces: SpaceCardProps[] = [
    {
      title: "The Wilson Room",
      image: wilsonImages[0].src,
      stats: "4,300 sq ft | 120 people | Street-facing | 2 Floors",
      description:
        "A sun-filled historic venue blending industrial character with modern design.",
      link: ROUTES.WILSON_ROOM,
    },
    {
      title: "The Courtyard",
      image: courtYardImages[0].src,
      stats: "12,000 sq ft (approx) | Outdoor | Gated Access",
      description:
        "A flexible outdoor courtyard perfect for large events, pop-ups, and load-ins.",
      link: ROUTES.COURTYARD,
    },
  ];

  if (showLoftSpace) {
    spaces.push({
      title: "The Loft",
      image: wilsonImages[0].src,
      stats: "7,000 sq ft | Street Accessible | Multi-Room",
      description:
        "A sprawling second-floor loft with recording rooms, film areas, and versatile production zones.",
      link: ROUTES.THE_LOFT,
    });
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? spaces.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === spaces.length - 1 ? 0 : prev + 1));
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
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth={isMobile ? false : "lg"} disableGutters={isMobile}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 6,
            textAlign: "center",
            px: isMobile ? 2 : 0,
          }}
        >
          Our Spaces
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
                {spaces.map((space, index) => (
                  <Box
                    key={index}
                    sx={{
                      minWidth: "100%",
                      px: 1,
                    }}
                  >
                    <SpaceCard {...space} />
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

            {currentSlide < spaces.length - 1 && (
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
          <Grid2
            container
            spacing={4}
            sx={{
              justifyContent: "center",
            }}
          >
            {spaces.map((space, index) => (
              <Grid2
                size={{ xs: 12, md: spaces.length === 2 ? 6 : 4 }}
                key={index}
              >
                <SpaceCard {...space} />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Container>
    </Box>
  );
};

export default Spaces;
