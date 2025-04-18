"use client";

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
  Divider,
  Chip,
  Container,
} from "@mui/material";
import {
  Check,
  AccessTime,
  People,
  SquareFoot,
  MusicNote,
  LocalParking,
  Restaurant,
  Celebration,
  BusinessCenter,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import ImageGallery from "./ImageGallery";

export interface VenueProps {
  name: string;
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  capacity: string;
  minHours: string;
  squareFootage: string;
  description: string[];
  features: string[];
  additionalInfo?: {
    furniture?: {
      tables?: string;
      chairs?: string;
    };
    outdoorSpace?: string;
    restrooms?: string;
  };
  parking?: {
    free?: string;
    reserved?: string;
    reservedDetails?: string[];
  };
  foodAndBeverage?: {
    food?: string;
    prepArea?: string;
    alcoholicBeverages?: string;
  };
  eventRules?: {
    quietHours?: string;
    bookableHours?: string;
    rules?: string;
  };
  avAndMusic?: string;
  houseRules?: string[];
}

const VenueTemplate: React.FC<VenueProps> = ({
  name,
  images,
  capacity,
  minHours,
  squareFootage,
  description,
  features,
  additionalInfo,
  parking,
  foodAndBeverage,
  eventRules,
  avAndMusic,
  houseRules,
}) => {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
          {name}
        </Typography>

        <ImageGallery images={images} />

        <Box sx={{ pt: 4, pb: 2 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <Chip icon={<People />} label={capacity} />
            <Chip icon={<AccessTime />} label={minHours} />
            <Chip icon={<SquareFoot />} label={squareFootage} />
            <Box sx={{ ml: "20px" }}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to={`/contact?space=${encodeURIComponent(name)}`}
              >
                Book Now
              </Button>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" gutterBottom>
              About the Space
            </Typography>

            {description.map((paragraph, index) => (
              <Typography key={index} variant="body1" paragraph>
                {paragraph}
              </Typography>
            ))}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
              Features
            </Typography>

            <List>
              {features.map((feature) => (
                <ListItem key={feature}>
                  <ListItemIcon>
                    <Check color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Please note: Special Event Insurance is required. Select this as
              an Add-On in the booking flow or purchase directly from
              TheEventHelper.com. This general liability insurance coverage
              protects you, the event organizer, and us, the venue, against
              claims of injury to attendees and damage to the venue.
            </Typography>

            {additionalInfo && (
              <>
                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" gutterBottom>
                  <BusinessCenter sx={{ mr: 1, verticalAlign: "middle" }} />
                  Additional Information
                </Typography>

                {additionalInfo.furniture && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Furniture
                    </Typography>
                    {additionalInfo.furniture.tables && (
                      <Typography variant="body2" paragraph>
                        <strong>Tables (Qty: 5):</strong>{" "}
                        {additionalInfo.furniture.tables}
                      </Typography>
                    )}
                    {additionalInfo.furniture.chairs && (
                      <Typography variant="body2" paragraph>
                        <strong>Chairs (Qty: 15):</strong>{" "}
                        {additionalInfo.furniture.chairs}
                      </Typography>
                    )}
                  </>
                )}

                {additionalInfo.outdoorSpace && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Outdoor Space
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>OUTDOOR GATED COURTYARD:</strong>{" "}
                      {additionalInfo.outdoorSpace}
                    </Typography>
                  </>
                )}

                {additionalInfo.restrooms && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Restrooms
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {additionalInfo.restrooms}
                    </Typography>
                  </>
                )}
              </>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            {parking && (
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <LocalParking sx={{ mr: 1, verticalAlign: "middle" }} />
                  Parking
                </Typography>
                {parking.free && (
                  <Typography variant="body2" paragraph>
                    <strong>Free Parking:</strong> {parking.free}
                  </Typography>
                )}
                {parking.reserved && (
                  <Typography variant="body2" paragraph>
                    <strong>Reserved Parking:</strong> {parking.reserved}
                  </Typography>
                )}
                {parking.reservedDetails &&
                  parking.reservedDetails.map((detail, index) => (
                    <Typography key={index} variant="body2">
                      - {detail}
                    </Typography>
                  ))}
              </Paper>
            )}

            {foodAndBeverage && (
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <Restaurant sx={{ mr: 1, verticalAlign: "middle" }} />
                  Food and Beverage
                </Typography>
                {foodAndBeverage.food && (
                  <Typography variant="body2" paragraph>
                    <strong>Food:</strong> {foodAndBeverage.food}
                  </Typography>
                )}
                {foodAndBeverage.prepArea && (
                  <Typography variant="body2" paragraph>
                    <strong>Prep Area:</strong> {foodAndBeverage.prepArea}
                  </Typography>
                )}
                {foodAndBeverage.alcoholicBeverages && (
                  <Typography variant="body2" paragraph>
                    <strong>Alcoholic Beverages:</strong>{" "}
                    {foodAndBeverage.alcoholicBeverages}
                  </Typography>
                )}
              </Paper>
            )}

            {eventRules && (
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <Celebration sx={{ mr: 1, verticalAlign: "middle" }} />
                  Event Rules
                </Typography>
                {eventRules.quietHours && (
                  <Typography variant="body2" paragraph>
                    <strong>Quiet Hours:</strong> {eventRules.quietHours}
                  </Typography>
                )}
                {eventRules.bookableHours && (
                  <Typography variant="body2" paragraph>
                    <strong>Bookable Hours:</strong> {eventRules.bookableHours}
                  </Typography>
                )}
                {eventRules.rules && (
                  <Typography variant="body2" paragraph>
                    <strong>Rules:</strong> {eventRules.rules}
                  </Typography>
                )}
              </Paper>
            )}

            {avAndMusic && (
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <MusicNote sx={{ mr: 1, verticalAlign: "middle" }} />
                  AV and Music
                </Typography>
                <Typography variant="body2" paragraph>
                  {avAndMusic}
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>

        {houseRules && houseRules.length > 0 && (
          <Paper elevation={3} sx={{ p: 3, mt: 4, bgcolor: "#f8f8f8" }}>
            <Typography variant="h6" gutterBottom>
              House Rules
            </Typography>
            <List>
              {houseRules.map((rule, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <Check color="error" />
                  </ListItemIcon>
                  <ListItemText primary={rule} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        <Box sx={{ mt: 4, mb: 6, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to={`/contact?space=${encodeURIComponent(name)}`}
          >
            Book Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default VenueTemplate;
