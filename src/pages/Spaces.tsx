import type React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

const spaces = [
  {
    id: 1,
    name: "The Wilson Room",
    description: "An elegant space perfect for corporate events and weddings.",
    image: "/wilson-room.jpg",
  },
  {
    id: 2,
    name: "Bay View Loft",
    description:
      "A modern loft with stunning bay views, ideal for photoshoots and intimate gatherings.",
    image: "/bay-view-loft.jpg",
  },
];

const Spaces: React.FC = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Our Event Spaces
      </Typography>
      <Grid container spacing={4}>
        {spaces.map((space) => (
          <Grid item key={space.id} xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={space.image}
                alt={space.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {space.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {space.description}
                </Typography>
                <Button
                  variant="outlined"
                  href={`/contact?space=${space.name}`}
                >
                  Inquire Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Spaces;
