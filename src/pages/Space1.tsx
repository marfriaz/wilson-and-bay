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
import ImageGallery from "../components/ImageGallery";
import { wilsonImages as galleryImages } from "../constants";

const Space1: React.FC = () => {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
          The Wilson Room
        </Typography>

        <ImageGallery images={galleryImages} />

        <Box sx={{ pt: 4, pb: 2 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <Chip icon={<People />} label="120 people" />
            <Chip icon={<AccessTime />} label="6 hrs min" />
            <Chip icon={<SquareFoot />} label="4300 sqft" />
            <Box sx={{ ml: "20px" }}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/contact?space=The Wilson Room"
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

            <Typography variant="body1" paragraph>
              Discover a hidden gem in Downtown LA's Arts District. Revitalized
              from a historic Art Deco bank, our 4,300 square foot, two-story
              venue offers a unique blend of old-world charm and modern design.
              Features include a built-in bar, the original bank vault, prep
              areas, showers and breakout rooms.
            </Typography>

            <Typography variant="body1" paragraph>
              Perfect for events such as Private Parties, Birthday Parties,
              Baby/Bridal Showers, Cocktail Events, Influencer Pop-Ups, Art
              Exhibitions, Retail Pop-Ups, Product Launches, Intimate Weddings &
              Receptions, Creative Workshops, Seminars, Classes, Film or Photo
              Shoots, Networking Events, Corporate Meetings, Live Performances,
              Readings, Small Concerts, Holiday Parties, Fashion Shows, Social
              Mixers, Wellness Retreats, Yoga Classes & Studios, Fitness &
              Workout Classes, Dance Class & Studio, Retreat, Off-Site, Team
              Building, Audition Board Meeting, Boardroom, Brainstorm Casting,
              Client Meeting, Conference Room, Career Expo, Job Fair, Therapy
              Work Session, and more! Please send your inquiries!
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
              Features
            </Typography>

            <List>
              {[
                "Conference / Break Out Rooms with Tables and Chairs",
                "Private Dressing Rooms with Curtains",
                "2 Private Bathrooms with Showers (Body Wash Not Included)",
                "Ample Free + Paid parking and easy ground floor load-in",
                "Beautiful Custom Chandeliers",
                "Large windows & Natural Light",
                "High Ceilings",
                "2 Floors",
                "Outlets throughout Venue",
                "Bar Nook for serving drinks",
                "2 Mini Fridges",
                "2 Large Ice Chests with Spigots (Ice not included)",
                "Refillable Keg",
                "A/C & Central Heat",
              ].map((feature) => (
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

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
              <BusinessCenter sx={{ mr: 1, verticalAlign: "middle" }} />
              Additional Information
            </Typography>

            <Typography variant="h6" gutterBottom>
              Furniture
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Tables (Qty: 5):</strong> We have several tables
              throughout the unit that we ask that you do not move. Most are on
              the mezzanine floor. Additional table rentals available as add-on
              - must be requested at least 5 business days ahead of the
              reservation day.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Chairs (Qty: 15):</strong> Some chairs available
              throughout the unit. Additional chair rentals available as add-on
              - must be requested at least 5 business days ahead of the
              reservation day.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Outdoor Space
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>OUTDOOR GATED COURTYARD:</strong> 15,000 sq ft expansive
              outdoor gated courtyard available as add-on space, standalone
              event space or reserved parking (available all day weekends and
              weekday evenings after 6:30pm). Ask for details or if interested
              in booking as standalone event space.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Restrooms
            </Typography>
            <Typography variant="body2" paragraph>
              2 ADA accessible restrooms on-site. Private bathrooms with
              showers.
            </Typography>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <LocalParking sx={{ mr: 1, verticalAlign: "middle" }} />
                Parking
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Free Parking:</strong> Ample street parking all around
                our building available on a first come first serve basis. Ask us
                for details!
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Reserved Parking:</strong> Available for an extra charge
                ($20/vehicle, reduced rates available for bulk reservations)
              </Typography>
              <Typography variant="body2">
                - Up to 30 spots available for reservation after 6:30pm M-F
              </Typography>
              <Typography variant="body2">
                - Up to 30 spots available for reservation all day Saturday &
                Sunday
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <Restaurant sx={{ mr: 1, verticalAlign: "middle" }} />
                Food and Beverage
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Food:</strong> Outside food and non-alcoholic beverages
                allowed. No cooking is allowed on-site.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Prep Area:</strong> Food prep area available in the
                back, no stove top or other equipment. Might be able to
                accommodate if asked ahead of time depending on the request. No
                open flames allowed.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Alcoholic Beverages:</strong> Guests can bring their own
                alcohol. Beer, wine, and seltzers only. Liquor must be served by
                a licensed vendor.
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <Celebration sx={{ mr: 1, verticalAlign: "middle" }} />
                Event Rules
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Quiet Hours:</strong> Any loud music or noise must end
                by 12:00 AM
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Bookable Hours:</strong> Hours may be adjusted upon
                request
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Rules:</strong> Confetti or glitter are allowed. Large
                events require hired security. Pets are allowed. Ticketed events
                are allowed.
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <MusicNote sx={{ mr: 1, verticalAlign: "middle" }} />
                AV and Music
              </Typography>
              <Typography variant="body2" paragraph>
                DJs are allowed. Live music is allowed. Amplified music is
                allowed.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ p: 3, mt: 4, bgcolor: "#f8f8f8" }}>
          <Typography variant="h6" gutterBottom>
            House Rules
          </Typography>
          <List>
            {[
              "SPECIAL EVENT INSURANCE is required.",
              "NO SMOKING inside the space. Smoke inside the space will be fined $500.",
              "Alcohol usage within the space is permitted with prior approval. Complaints from neighbors or other building tenants about inebriated guests will result in a $500 fee per incident.",
              "No sale of food and drinks on our property. Food trucks outside of our building is fine!",
              "Outside catering is allowed, but NO OPEN FLAMES. Please note we do not have a commercial kitchen for cooking.",
              "Clients are welcome to decorate how they would like as long as they are careful not to damage the walls or floors. Please take all decor with you when you leave; anything left behind will be subject to an additional $300 clean up fee.",
              "Leave space as you found it. Feel free to move things around, but move things back to their designated place before you leave.",
              "Your setup and clean-up have to be within your booking period.",
              "Mandatory deep cleaning fee is $250.",
              "Overtime: Please note that overtime is billed at 30 min increments at 1.5x the hourly rate. No exceptions.",
              "SECURITY DETAIL is required for certain types of events.",
              "All events must end by 12AM (1AM latest for cleaning/tear-down). Clients must allocate tear-down time, clear the space, and bring all belongings to be out of the building by 1AM.",
              "There are security cameras in unit in common areas and outside. Please ask if you need indoor security cameras shut off.",
            ].map((rule, idx) => (
              <ListItem key={idx}>
                <ListItemIcon>
                  <Check color="error" />
                </ListItemIcon>
                <ListItemText primary={rule} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Box sx={{ mt: 4, mb: 6, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/contact?space=The Wilson Room"
          >
            Book Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Space1;
