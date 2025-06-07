import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Box sx={{ mt: "-2rem", pt: 0 }}>
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
          src="https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/wilsonRoom%2F932WilsonSt-44-edited-cropped.jpeg?alt=media"
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            px: 3,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", md: "4rem" },
              mb: 1, // reduced from 2
              textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            Wilson&Bay
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 2, // reduced from 4
              maxWidth: 600,
              fontWeight: 300,
              fontSize: { xs: "1rem", md: "1.5rem" },
              textShadow: "1px 1px 6px rgba(0,0,0,0.7)",
            }}
          >
            A spacious, multipurpose creative venue located in the DTLA Arts
            District. Available for buyouts, pop ups, private parties, & more!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: { xs: "0.9rem", md: "1.2rem" },
              fontWeight: "bold",
              borderRadius: 0,
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
            onClick={() => (window.location.href = "/contact")}
          >
            Book Now
          </Button>
        </Box>
      </Box>

      {/* About Section */}
      <Container maxWidth="md" sx={{ my: 4, px: 2 }}>
        {" "}
        {/* reduced my from 8 */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2 }} // reduced mb from 3
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
      </Container>
    </Box>
  );
};

export default Home;
