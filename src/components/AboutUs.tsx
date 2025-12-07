import React from "react";
import { Container, Typography } from "@mui/material";

const AboutUs: React.FC = () => {
  return (
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
        About us
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
        Located in the heart of the DTLA Arts District, Wilson&Bay offers a
        versatile and beautifully designed creative space for artists, events,
        and community gatherings. Whether you're hosting a private party, pop-up
        shop, workshop, or any special event, our venue adapts to fit your
        vision.
      </Typography>
    </Container>
  );
};

export default AboutUs;
