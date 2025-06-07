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
} from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link as RouterLink, Outlet } from "react-router-dom";

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
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            Wilson&Bay
          </Typography>

          {isMobile ? (
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
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
                  <MenuItem
                    onClick={handleSpacesClose}
                    component={RouterLink}
                    to="/thewilsonroom"
                  >
                    The Wilson Room
                  </MenuItem>
                  <MenuItem
                    onClick={handleSpacesClose}
                    component={RouterLink}
                    to="/thecourtyard"
                  >
                    The Courtyard
                  </MenuItem>
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
                <ListItemButton
                  component={RouterLink}
                  to="/thewilsonroom"
                  onClick={toggleDrawer(false)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="The Wilson Room" />
                </ListItemButton>

                <ListItemButton
                  component={RouterLink}
                  to="/thecourtyard"
                  onClick={toggleDrawer(false)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="The Courtyard" />
                </ListItemButton>
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
          py: { xs: 2, sm: 4 },
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
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          fontSize: "0.9rem",
        }}
      >
        <Link
          href="mailto:932wilson@gmail.com"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <EmailIcon fontSize="small" />
          932wilson@gmail.com
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
          932 Wilson Street, Los Angeles, CA 90021
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
          @wilsonbay.dtla
        </Link>
      </Box>
    </Box>
  );
};

export default Layout;
