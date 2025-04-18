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
import { galleryData } from "../constants";

const Gallery: React.FC = () => {
  const [openImage, setOpenImage] = useState<null | {
    src: string;
  }>(null);

  const [filter, setFilter] = useState("all");

  const handleImageClick = (src: string) => {
    setOpenImage({ src });
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
          <Tab label="The Courtyard" value="courtyard" />
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
              onClick={() => handleImageClick(item.src)}
            >
              <CardMedia
                component="img"
                height="220"
                image={item.src}
                alt={item.alt}
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
                src={openImage.src || "/placeholder.svg"}
                // alt={openImage.title}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                {/* <Typography variant="h6">{openImage.title}</Typography> */}
                {/* <Typography variant="body2" color="text.secondary">
                  {openImage.description}
                </Typography> */}
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
