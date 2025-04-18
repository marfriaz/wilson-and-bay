import type React from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Wilson&Bay
      </Typography>
      <Typography variant="h5" paragraph>
        A spacious, multipurpose creative venue located in DTLA Arts District.✨
        Available for buyouts, pop ups, private parties, & more!
      </Typography>
    </Box>
  );
};

export default Home;
