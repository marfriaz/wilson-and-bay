import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "80vh" },
          width: "100vw",
          overflow: "hidden",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <Box
          component="img"
          src="https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/banners%2F1.jpeg?alt=media"
          alt="Wilson&Bay Venue"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.6)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            px: 3,
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", md: "4rem" },
              textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            Wilson&Bay
          </Typography>
        </Box>
      </Box>

      {/* About Section */}
      <Container maxWidth="md" sx={{ my: 4, px: 2 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          About us
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", lineHeight: 1.7 }}
        >
          Located in the heart of the DTLA Arts District, Wilson&Bay offers a
          versatile and beautifully designed creative space for artists, events,
          and community gatherings. Whether you’re hosting a private party,
          pop-up shop, workshop, or any special event, our venue adapts to fit
          your vision.
        </Typography>

        {/* View Gallery Button */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/gallery")}
            sx={{
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", md: "1.1rem" },
              borderRadius: 0,
            }}
          >
            View our gallery
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
