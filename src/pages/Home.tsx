import React from "react";
import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Spaces from "../components/Spaces";
import FeaturedGallery from "../components/FeaturedGallery";
import GuestReviews from "../components/GuestReviews";
import InstagramEmbed from "../components/InstagramEmbed";

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
