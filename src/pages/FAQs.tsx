import React from "react";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  ExpandMore,
  Check,
  MusicNote,
  Security,
  Warning,
} from "@mui/icons-material";

const FAQs: React.FC = () => {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            mb: 4,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            textAlign: "center",
            fontFamily: '"Oooh Baby", "cursive"',
            fontWeight: "bold",
          }}
        >
          Frequently Asked Questions
        </Typography>



        {/* Features */}
        {/* <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">What features are included?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {[
                "Conference / Break Out Rooms with Tables and Chairs",
                "Private Dressing Rooms with Curtains",
                "2 Private Bathrooms with Showers (body wash not included)",
                "Ample Free + Paid parking and easy ground floor load-in",
                "Beautiful Custom Chandeliers",
                "Large windows & Natural Light",
                "High Ceilings",
                "2 Floors",
                "Outlets throughout Venue",
                "Bar Nook for serving drinks",
                "2 Mini Fridges",
                "2 Large Ice Chests with Spigots (ice not included)",
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
          </AccordionDetails>
        </Accordion> */}

        {/* Furniture */}
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">What furniture is available?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Tables (Qty: 5):</strong> Several tables are available throughout the unit; 
              please do not move them. Most are on the mezzanine floor. Additional table rentals 
              are available as an add-on and must be requested at least 5 business days ahead 
              of the reservation day.
            </Typography>
            <Typography variant="body2">
              <strong>Chairs (Qty: 15):</strong> Some chairs are available throughout the unit. 
              Additional chair rentals are available as an add-on and must be requested at least 
              5 business days ahead of the reservation day.
            </Typography>
          </AccordionDetails>
        </Accordion> */}

        {/* Parking */}
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              <LocalParking sx={{ mr: 1, verticalAlign: "middle" }} />
              What are the parking options?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Reserved Parking:</strong> Available for an extra charge ($20/vehicle, 
              with reduced rates for bulk reservations)
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Availability:</strong>
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Up to 30 spots available for reservation after 6:30 PM M-F" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Up to 30 spots available for reservation all day Saturday & Sunday" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion> */}

        {/* Food and Beverage */}
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              <Restaurant sx={{ mr: 1, verticalAlign: "middle" }} />
              What are the food and beverage policies?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Food:</strong> Outside food and non-alcoholic beverages are allowed. 
              No cooking is permitted on-site.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Prep Area:</strong> A food prep area is available in the back, but it 
              does not include a stove top or other equipment. Accommodations might be possible 
              if requested ahead of time, depending on the request. No open flames are allowed.
            </Typography>
            <Typography variant="body2">
              <strong>Alcoholic Beverages:</strong> Guests can bring their own alcohol (beer, 
              wine, and seltzers only). Liquor must be served by a licensed vendor.
            </Typography>
          </AccordionDetails>
        </Accordion> */}

        {/* Outdoor Space */}
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Is there outdoor space available?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              <strong>Outdoor Gated Courtyard:</strong> 15,000 sq ft available as an add-on space, 
              standalone event space, or reserved parking (available all day weekends and weekday 
              evenings after 6:30 PM). Inquire for details or if interested in booking as a 
              standalone event space.
            </Typography>
          </AccordionDetails>
        </Accordion> */}

        {/* Restrooms */}
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">What restroom facilities are available?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              2 ADA accessible restrooms on-site. Private bathrooms with showers are available.
            </Typography>
          </AccordionDetails>
        </Accordion> */}

        {/* Event Rules */}
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              <Celebration sx={{ mr: 1, verticalAlign: "middle" }} />
              What are the event rules?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Quiet Hours:</strong> Loud music or noise must end by 12:00 AM.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Bookable Hours:</strong> Hours may be adjusted upon request.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Allowed:</strong> Confetti, glitter, pets, ticketed events.
            </Typography>
            <Typography variant="body2">
              <strong>Security:</strong> Large events require hired security.
            </Typography>
          </AccordionDetails>
        </Accordion> */}

        {/* AV and Music */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              <MusicNote sx={{ mr: 1, verticalAlign: "middle" }} />
              What are the AV and music policies?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              <ListItem>
                <ListItemIcon><Check color="primary" /></ListItemIcon>
                <ListItemText primary="DJs are allowed" />
              </ListItem>
              <ListItem>
                <ListItemIcon><Check color="primary" /></ListItemIcon>
                <ListItemText primary="Live music is allowed" />
              </ListItem>
              <ListItem>
                <ListItemIcon><Check color="primary" /></ListItemIcon>
                <ListItemText primary="Amplified music is allowed" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Insurance Requirements */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              <Security sx={{ mr: 1, verticalAlign: "middle" }} />
              What insurance is required?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Special Event Insurance is required. This can be selected as an Add-On in the 
              booking flow or purchased directly from TheEventHelper.com. This general liability 
              insurance coverage protects you, the event organizer, and the venue against claims 
              of injury to attendees and damage to the venue.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* House Rules */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              <Warning sx={{ mr: 1, verticalAlign: "middle" }} />
              What are the house rules?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {[
                "SPECIAL EVENT INSURANCE is required.",
                "NO SMOKING inside the space. Smoke inside the space will incur a $500 fine.",
                "Alcohol usage within the space is permitted with prior approval. Complaints from neighbors or other building tenants about inebriated guests will result in a $500 fee per incident.",
                "No sale of food and drinks on the property. Food trucks outside of the building are permitted.",
                "Outside catering is allowed, but NO OPEN FLAMES. There is no commercial kitchen for cooking.",
                "Clients are welcome to decorate but must be careful not to damage walls or floors. All decor must be removed; anything left behind will be subject to an additional $300 clean-up fee.",
                "Leave the space as you found it. Feel free to move items, but return them to their designated place before leaving.",
                "Setup and clean-up must be within your booking period.",
                "A mandatory deep cleaning fee of $250 applies.",
                "Overtime: Overtime is billed in 30-minute increments at 1.5x the hourly rate. No exceptions.",
                "SECURITY DETAIL is required for certain types of events.",
                "All events must end by 12 AM (1 AM latest for cleaning/tear-down). Clients must allocate tear-down time, clear the space, and remove all belongings from the building by 1 AM.",
                "Security cameras are present in common areas inside the unit and outside. Please ask if you need indoor security cameras shut off.",
              ].map((rule) => (
                <ListItem key={rule}>
                  <ListItemIcon>
                    <Check color="error" />
                  </ListItemIcon>
                  <ListItemText primary={rule} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Contact Information */}
        <Paper elevation={2} sx={{ p: 3, mt: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Have more questions?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <Box
              component="a"
              href="/contact"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Contact us
            </Box>{" "}
            for more information or to schedule a visit.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default FAQs;