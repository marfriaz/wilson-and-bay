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
import { Venue } from "./VenueJson";
interface VenueTemplateProps {
  venue: Venue;
}

const VenueTemplate: React.FC<VenueTemplateProps> = ({ venue }) => {
  const allEventTypes = [
    ...(venue.about_space?.ideal_for_events?.private_events ?? []),
    ...(venue.about_space?.ideal_for_events?.creative_educational ?? []),
    ...(venue.about_space?.ideal_for_events?.business_corporate ?? []),
    ...(venue.about_space?.ideal_for_events?.wellness_fitness ?? []),
  ].join(", ");

  const spaceSqft =
    venue.description?.match(/(\d[\d,]*)\s+square foot/)?.[1] || "";
  const notesText = venue.notes?.[0] || "";

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
          {venue.name}
        </Typography>

        {venue.images && <ImageGallery images={venue.images} />}

        <Box sx={{ pt: 4, pb: 2 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            {venue.capacity && (
              <Chip icon={<People />} label={`${venue.capacity} people`} />
            )}
            {venue.minimum_booking_hours && (
              <Chip
                icon={<AccessTime />}
                label={`${venue.minimum_booking_hours} hrs min`}
              />
            )}
            {spaceSqft && (
              <Chip icon={<SquareFoot />} label={`${spaceSqft} sqft`} />
            )}
            <Box sx={{ ml: "20px" }}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to={`/contact?space=${encodeURIComponent(venue.name || "")}`}
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

            {venue.description && (
              <Typography variant="body1" paragraph>
                {venue.description}
                {venue.about_space?.features?.length ? (
                  <>
                    {" "}
                    Features include {venue.about_space.features.join(", ")}.
                  </>
                ) : null}
              </Typography>
            )}

            {(allEventTypes || venue.about_space?.purpose) && (
              <Typography variant="body1" paragraph>
                {venue.about_space?.purpose
                  ? venue.about_space.purpose
                  : `Perfect for events such as ${allEventTypes}.`}{" "}
                Please send your inquiries!
              </Typography>
            )}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
              Features
            </Typography>

            {venue.features?.length ? (
              <List>
                {venue.features.map((feature) => (
                  <ListItem key={feature}>
                    <ListItemIcon>
                      <Check color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" paragraph>
                No features listed.
              </Typography>
            )}

            {notesText && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {notesText}
              </Typography>
            )}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
              <BusinessCenter sx={{ mr: 1, verticalAlign: "middle" }} />
              Additional Information
            </Typography>

            {venue.additional_information?.furniture && (
              <>
                <Typography variant="h6" gutterBottom>
                  Furniture
                </Typography>
                {venue.additional_information.furniture.tables && (
                  <Typography variant="body2" paragraph>
                    <strong>
                      Tables (Qty:{" "}
                      {venue.additional_information.furniture.tables.quantity ??
                        0}
                      ):
                    </strong>{" "}
                    {venue.additional_information.furniture.tables.notes || ""}
                  </Typography>
                )}
                {venue.additional_information.furniture.chairs && (
                  <Typography variant="body2" paragraph>
                    <strong>
                      Chairs (Qty:{" "}
                      {venue.additional_information.furniture.chairs.quantity ??
                        0}
                      ):
                    </strong>{" "}
                    {venue.additional_information.furniture.chairs.notes || ""}
                  </Typography>
                )}
              </>
            )}

            {/* Moved Outdoor Space from Space1 */}
            {venue.additional_information?.outdoor_space && (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Outdoor Space
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>
                    {venue.additional_information.outdoor_space.name}:
                  </strong>{" "}
                  {venue.additional_information.outdoor_space.size_sq_ft} sq ft{" "}
                  {venue.additional_information.outdoor_space.availability}
                </Typography>
              </>
            )}

            {/* Moved Restrooms from Space1 */}
            {venue.additional_information?.restrooms && (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Restrooms
                </Typography>
                <Typography variant="body2" paragraph>
                  {venue.additional_information.restrooms.ada_accessible} ADA
                  accessible restrooms on-site.{" "}
                  {venue.additional_information.restrooms
                    .private_bathrooms_with_showers
                    ? "Private bathrooms with showers."
                    : ""}
                </Typography>
              </>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            {/* Moved Parking from Space1 */}
            {venue.additional_information?.parking && (
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <LocalParking sx={{ mr: 1, verticalAlign: "middle" }} />
                  Parking
                </Typography>
                {venue.additional_information.parking.free_parking && (
                  <Typography variant="body2" paragraph>
                    <strong>Free Parking:</strong>{" "}
                    {venue.additional_information.parking.free_parking}
                  </Typography>
                )}
                {venue.additional_information.parking.reserved_parking && (
                  <>
                    <Typography variant="body2" paragraph>
                      <strong>Reserved Parking:</strong> Available for an extra
                      charge ($
                      {
                        venue.additional_information.parking.reserved_parking
                          .cost_per_vehicle
                      }
                      /vehicle,{" "}
                      {venue.additional_information.parking.reserved_parking
                        .notes || ""}
                      )
                    </Typography>
                    {venue.additional_information.parking.reserved_parking
                      .availability?.length ? (
                      venue.additional_information.parking.reserved_parking.availability.map(
                        (item, idx) => (
                          <Typography variant="body2" key={idx}>
                            - {item}
                          </Typography>
                        )
                      )
                    ) : (
                      <Typography variant="body2">
                        No reserved parking availability details.
                      </Typography>
                    )}
                  </>
                )}
              </Paper>
            )}

            {/* Moved Food and Beverage from Space1 */}
            {venue.additional_information?.food_and_beverage && (
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <Restaurant sx={{ mr: 1, verticalAlign: "middle" }} />
                  Food and Beverage
                </Typography>
                {venue.additional_information.food_and_beverage.food && (
                  <Typography variant="body2" paragraph>
                    <strong>Food:</strong>{" "}
                    {venue.additional_information.food_and_beverage.food}
                  </Typography>
                )}
                {venue.additional_information.food_and_beverage.prep_area && (
                  <Typography variant="body2" paragraph>
                    <strong>Prep Area:</strong>{" "}
                    {venue.additional_information.food_and_beverage.prep_area}
                  </Typography>
                )}
                {venue.additional_information.food_and_beverage
                  .alcoholic_beverages && (
                  <Typography variant="body2" paragraph>
                    <strong>Alcoholic Beverages:</strong>{" "}
                    {
                      venue.additional_information.food_and_beverage
                        .alcoholic_beverages
                    }
                  </Typography>
                )}
              </Paper>
            )}

            {/* Moved Event Rules from Space1 */}
            {venue.event_rules && (
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <Celebration sx={{ mr: 1, verticalAlign: "middle" }} />
                  Event Rules
                </Typography>
                {venue.event_rules.quiet_hours && (
                  <Typography variant="body2" paragraph>
                    <strong>Quiet Hours:</strong>{" "}
                    {venue.event_rules.quiet_hours}
                  </Typography>
                )}
                {venue.event_rules.bookable_hours_notes && (
                  <Typography variant="body2" paragraph>
                    <strong>Bookable Hours:</strong>{" "}
                    {venue.event_rules.bookable_hours_notes}
                  </Typography>
                )}
                {venue.event_rules.allowed?.length ||
                venue.event_rules.required?.length ||
                venue.event_rules.general_rules?.length ? (
                  <Typography variant="body2" paragraph>
                    <strong>Rules:</strong>{" "}
                    {[
                      ...(venue.event_rules.allowed || []),
                      ...(venue.event_rules.general_rules || []),
                    ].join(". ")}
                    . {venue.event_rules.required?.join(". ")}.
                  </Typography>
                ) : null}
              </Paper>
            )}

            {/* Moved AV and Music from Space1 */}
            {venue.event_rules?.av_and_music?.length ? (
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <MusicNote sx={{ mr: 1, verticalAlign: "middle" }} />
                  AV and Music
                </Typography>
                <Typography variant="body2" paragraph>
                  {venue.event_rules.av_and_music.join(". ")}
                </Typography>
              </Paper>
            ) : null}
          </Grid>
        </Grid>

        {/* Moved House Rules from Space1 */}
        {venue.house_rules?.length ? (
          <Paper elevation={3} sx={{ p: 3, mt: 4, bgcolor: "#f8f8f8" }}>
            <Typography variant="h6" gutterBottom>
              House Rules
            </Typography>
            <List>
              {venue.house_rules.map((rule, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <Check color="error" />
                  </ListItemIcon>
                  <ListItemText primary={rule} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : null}
      </Container>
    </Box>
  );
};

export default VenueTemplate;
