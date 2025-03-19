import type React from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Check, ArrowForward } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Space2: React.FC = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Bay View Loft
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/bay-view-loft.jpg"
            alt="Bay View Loft"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            A modern loft with stunning bay views, ideal for photoshoots and
            intimate gatherings
          </Typography>

          <Typography variant="body1" paragraph>
            The Bay View Loft features floor-to-ceiling windows with panoramic
            views of the bay. This contemporary space offers exceptional natural
            lighting and a clean, minimalist aesthetic that provides the perfect
            backdrop for photoshoots, intimate dinners, and small gatherings.
          </Typography>

          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Specifications
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Size:</strong> 1,200 sq ft
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Capacity:</strong> 60 seated, 100 standing
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Ceiling Height:</strong> 12 ft
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Availability:</strong> 7 days a week
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Typography variant="h6" gutterBottom>
            Amenities
          </Typography>

          <List dense>
            <ListItem>
              <ListItemIcon>
                <Check color="primary" />
              </ListItemIcon>
              <ListItemText primary="Bluetooth sound system" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check color="primary" />
              </ListItemIcon>
              <ListItemText primary="Natural and studio lighting options" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check color="primary" />
              </ListItemIcon>
              <ListItemText primary="Kitchenette" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check color="primary" />
              </ListItemIcon>
              <ListItemText primary="Lounge furniture included" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check color="primary" />
              </ListItemIcon>
              <ListItemText primary="Rooftop access" />
            </ListItem>
          </List>

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/gallery?filter=bay"
              endIcon={<ArrowForward />}
            >
              View Gallery
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/contact?space=Bay View Loft"
            >
              Inquire Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Space2;
