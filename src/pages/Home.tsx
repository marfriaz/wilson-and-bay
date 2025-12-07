import React from "react";
import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Spaces from "../components/Spaces";
import FeaturedGallery from "../components/FeaturedGallery";
import GuestReviews from "../components/GuestReviews";
import InstagramEmbed from "../components/InstagramEmbed";
import { ROUTES } from "../constants";

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const heroImageSrc = isMobile
    ? "https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/banners%2F2.jpeg?alt=media"
    : "https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/banners%2F1.jpeg?alt=media";

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "calc(100dvh + 56px)", md: "calc(100vh + 64px)" },
          width: "100vw",
          overflow: "hidden",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          marginTop: { xs: "-56px", md: "-64px" },
          marginBottom: { xs: 0, md: 0 },
        }}
      >
        <Box
          component="img"
          src={heroImageSrc}
          alt="Wilson&Bay Venue"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: { xs: "center center", md: "center center" },
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        {/* Hero Text Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            zIndex: 1,
            width: "90%",
            maxWidth: "800px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Manrope", "Arial", sans-serif',
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
            }}
          >
            Unique event spaces in the heart of LA's arts district
          </Typography>
        </Box>
        {/* CTA Link - Bottom Right */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "80px", md: "15px" },
            right: { xs: "20px", md: "40px" },
            zIndex: 1,
          }}
        >
          <Box
            onClick={() => navigate(ROUTES.CONTACT)}
            component="span"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 500,
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
              display: "inline-block",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Inquire now →
          </Box>
        </Box>
      </Box>

      {/* Our Spaces Section */}
      <Spaces />

      {/* Featured Gallery Section */}
      <FeaturedGallery />

      {/* Guest Reviews Section */}
      <GuestReviews />

      {/* Instagram Embed Section */}
      <Container maxWidth="md" sx={{ my: 4, px: 2 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontFamily: '"Oooh Baby", "cursive"',
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", md: "4rem" },
            mb: 2,
            textAlign: "center",
          }}
        >
          From Instagram
        </Typography>
        <InstagramEmbed showTitle={false} />
      </Container>
    </Box>
  );
};

export default Home;
