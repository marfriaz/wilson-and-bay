"use client";

import type React from "react";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Link,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Menu as MenuIcon,
  Storefront as StorefrontIcon,
} from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { venueJson, Venue } from "./VenueJson";
import { PEERSPACE_URL } from "../constants";

const Layout: React.FC = () => {
  const [spacesAnchorEl, setSpacesAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const spacesOpen = Boolean(spacesAnchorEl);
  const [spacesExpanded, setSpacesExpanded] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSpacesClick = (event: React.MouseEvent<HTMLElement>) => {
    setSpacesAnchorEl(event.currentTarget);
  };

  const handleSpacesClose = () => {
    setSpacesAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const toggleSpacesExpanded = () => {
    setSpacesExpanded(!spacesExpanded);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden", // Prevent horizontal scrolling
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              // fontSize: { xs: "1.1rem", sm: "1.25rem" },
              fontFamily: '"Oooh Baby", "cursive"', // Added font family
              fontWeight: "bold", // Added for bold text
            }}
          >
            Wilson&Bay
          </Typography>

          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ mr: 1, p: 1.5 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 3,
              }}
            >
              <Typography
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Home
              </Typography>

              <Box>
                <Button
                  id="spaces-button"
                  aria-controls={spacesOpen ? "spaces-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={spacesOpen ? "true" : undefined}
                  onClick={handleSpacesClick}
                  endIcon={<KeyboardArrowDown />}
                  sx={{
                    color: "inherit",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    padding: "6px 8px",
                  }}
                >
                  Our Spaces
                </Button>
                <Menu
                  id="spaces-menu"
                  anchorEl={spacesAnchorEl}
                  open={spacesOpen}
                  onClose={handleSpacesClose}
                  MenuListProps={{
                    "aria-labelledby": "spaces-button",
                  }}
                >
                  {venueJson.venues.map(
                    (venue: Venue) =>
                      // Explicitly check if name and route are non-empty strings
                      venue?.name &&
                      venue?.route && (
                        <MenuItem
                          key={venue.route} // Use route as a unique key
                          onClick={handleSpacesClose}
                          component={RouterLink}
                          to={venue.route} // Link to the venue's route
                        >
                          {venue.name}
                        </MenuItem>
                      )
                  )}
                </Menu>
              </Box>

              <Typography
                component={RouterLink}
                to="/gallery"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Gallery
              </Typography>

              <Typography
                component={RouterLink}
                to="/contact"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Contact Us
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            <ListItemButton
              component={RouterLink}
              to="/"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Home" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />

            {/* Our Spaces section - collapsible on mobile */}
            <ListItemButton
              onClick={toggleSpacesExpanded}
              sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
            >
              <ListItemText
                primary="Our Spaces"
                primaryTypographyProps={{ fontWeight: "medium" }}
              />
              {spacesExpanded ? (
                <KeyboardArrowDown fontSize="small" />
              ) : (
                <KeyboardArrowUp fontSize="small" />
              )}
            </ListItemButton>

            {/* Conditionally render space links based on expanded state */}
            {spacesExpanded && (
              <>
                {venueJson.venues.map(
                  (venue: Venue) =>
                    venue?.name &&
                    venue?.route && (
                      <ListItemButton
                        key={venue?.route}
                        component={RouterLink}
                        to={venue?.route}
                        onClick={toggleDrawer(false)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={venue?.name} />
                      </ListItemButton>
                    )
                )}
              </>
            )}
            <Divider sx={{ my: 1 }} />

            <ListItemButton
              component={RouterLink}
              to="/gallery"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Gallery" />
            </ListItemButton>

            <ListItemButton
              component={RouterLink}
              to="/contact"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Container
        component="main"
        sx={{
          flexGrow: 1,
          py: 0,
          px: { xs: 2, sm: 3 },
          maxWidth: { xs: "100%", sm: "lg" },
        }}
        disableGutters={isMobile}
      >
        <Outlet />
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: "auto",
          bgcolor: "background.paper",
          py: 3,
          px: { xs: 2, sm: 3 },
          borderTop: "1px solid",
          borderColor: "divider",
          marginTop: "5px",
          display: "flex",
          flexDirection: { xs: "row", sm: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          gap: 2,
          fontSize: "0.9rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="mailto:932wilson@gmail.com"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <EmailIcon fontSize="small" />
          <Box sx={{ display: { xs: "none", sm: "inline" } }}>
            932wilson@gmail.com
          </Box>
        </Link>

        <Link
          href="https://www.google.com/maps/search/?api=1&query=932+Wilson+Street,+Los+Angeles,+CA+90021"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <LocationOnIcon fontSize="small" />
          <Box sx={{ display: { xs: "none", sm: "inline" } }}>
            932 Wilson Street, Los Angeles, CA 90021
          </Box>
        </Link>

        <Link
          href="https://www.instagram.com/wilsonbay.dtla"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <InstagramIcon fontSize="small" />
          <Box sx={{ display: { xs: "none", sm: "inline" } }}>
            @wilsonbay.dtla
          </Box>
        </Link>

        <Link
          href={PEERSPACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <StorefrontIcon fontSize="small" />
          <Box sx={{ display: { xs: "none", sm: "inline" } }}>
            Peerspace listing
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Layout;
