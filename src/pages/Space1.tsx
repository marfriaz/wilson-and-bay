import React from "react";
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

const Space1: React.FC = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        The Wilson Room
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/wilson-room.jpg"
            alt="The Wilson Room"
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
            An elegant space perfect for corporate events and weddings
          </Typography>

          <Typography variant="body1" paragraph>
            The Wilson Room offers a sophisticated environment with high
            ceilings, hardwood floors, and large windows providing abundant
            natural light. This versatile space can be configured to accommodate
            a variety of events.
          </Typography>

          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Specifications
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Size:</strong> 2,000 sq ft
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Capacity:</strong> 120 seated, 200 standing
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Ceiling Height:</strong> 14 ft
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
              <ListItemText primary="Professional sound system" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check color="primary" />
              </ListItemIcon>
              <ListItemText primary="Adjustable lighting with dimmer controls" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check color="primary" />
              </ListItemIcon>
              <ListItemText primary="Catering prep area" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check color="primary" />
              </ListItemIcon>
              <ListItemText primary="Tables and chairs included" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Check color="primary" />
              </ListItemIcon>
              <ListItemText primary="Private entrance and restrooms" />
            </ListItem>
          </List>

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/gallery?filter=wilson"
              endIcon={<ArrowForward />}
            >
              View Gallery
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/contact?space=The Wilson Room"
            >
              Inquire Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Space1;
