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
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Link as RouterLink, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const [spacesAnchorEl, setSpacesAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const spacesOpen = Boolean(spacesAnchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSpacesClick = (event: React.MouseEvent<HTMLElement>) => {
    setSpacesAnchorEl(event.currentTarget);
  };

  const handleSpacesClose = () => {
    setSpacesAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              flexGrow: isMobile ? 0 : 1,
            }}
          >
            Wilson&Bay
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: isMobile ? "flex-end" : "flex-start",
              gap: 2,
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
                  to="/space1"
                >
                  The Wilson Room
                </MenuItem>
                <MenuItem
                  onClick={handleSpacesClose}
                  component={RouterLink}
                  to="/space2"
                >
                  Bay View Loft
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
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      {/* <Box
        component="footer"
        sx={{ py: 3, px: 2, mt: "auto", backgroundColor: "background.paper" }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Wilson&Bay. All rights reserved.
        </Typography>
      </Box> */}
    </Box>
  );
};

export default Layout;
