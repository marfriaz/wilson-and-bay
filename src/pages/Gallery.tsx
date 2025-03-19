import React, { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { Close } from "@mui/icons-material";

// Sample gallery data - replace with your actual images
const galleryData = [
  {
    id: 1,
    space: "wilson",
    title: "Wilson Room Setup",
    image: "/wilson-room-1.jpg",
    description: "Corporate event setup",
  },
  {
    id: 2,
    space: "wilson",
    title: "Wilson Room Wedding",
    image: "/wilson-room-2.jpg",
    description: "Wedding reception layout",
  },
  {
    id: 3,
    space: "wilson",
    title: "Wilson Room Lighting",
    image: "/wilson-room-3.jpg",
    description: "Evening lighting setup",
  },
  {
    id: 4,
    space: "bay",
    title: "Bay View Daytime",
    image: "/bay-view-1.jpg",
    description: "Natural lighting with bay views",
  },
  {
    id: 5,
    space: "bay",
    title: "Bay View Cocktail",
    image: "/bay-view-2.jpg",
    description: "Cocktail party arrangement",
  },
  {
    id: 6,
    space: "bay",
    title: "Bay View Sunset",
    image: "/bay-view-3.jpg",
    description: "Sunset view from the loft",
  },
  {
    id: 7,
    space: "wilson",
    title: "Wilson Room Details",
    image: "/wilson-room-4.jpg",
    description: "Architectural details",
  },
  {
    id: 8,
    space: "bay",
    title: "Bay View Photoshoot",
    image: "/bay-view-4.jpg",
    description: "Fashion photoshoot setup",
  },
];

const Gallery: React.FC = () => {
  const [openImage, setOpenImage] = useState<null | {
    image: string;
    title: string;
    description: string;
  }>(null);

  const [filter, setFilter] = useState("all");

  const handleImageClick = (
    image: string,
    title: string,
    description: string
  ) => {
    setOpenImage({ image, title, description });
  };

  const handleClose = () => {
    setOpenImage(null);
  };

  const handleFilterChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };

  const filteredImages =
    filter === "all"
      ? galleryData
      : galleryData.filter((item) => item.space === filter);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Gallery
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          aria-label="gallery filters"
          centered
        >
          <Tab label="All Spaces" value="all" />
          <Tab label="The Wilson Room" value="wilson" />
          <Tab label="Bay View Loft" value="bay" />
        </Tabs>
      </Box>

      <Grid container spacing={2}>
        {filteredImages.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 3,
                },
              }}
              onClick={() =>
                handleImageClick(item.image, item.title, item.description)
              }
            >
              <CardMedia
                component="img"
                height="220"
                image={item.image}
                alt={item.title}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!openImage} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          {openImage && (
            <>
              <img
                src={openImage.image || "/placeholder.svg"}
                alt={openImage.title}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                <Typography variant="h6">{openImage.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {openImage.description}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
