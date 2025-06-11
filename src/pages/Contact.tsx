import type React from "react";
import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Paper,
  Divider,
  Link,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import StorefrontIcon from "@mui/icons-material/Storefront"; // Changed from OpenInNewIcon

import { venueJson } from "../components/VenueJson";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    space: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const email = "marfriaz@gmail.com";
    const email = "932wilson@gmail.com";
    const mailtoLink = `mailto:${email}?subject=Inquiry%20for%20${encodeURIComponent(
      formData.space
    )}%20-%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
      formData.message
    )}`;

    // window.location.href = mailtoLink;
    window.open(mailtoLink, "_blank");

    setFormData({ name: "", email: "", space: "", message: "" });
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 6 }}>
      <Grid container spacing={4}>
        {/* Left side - contact info */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h3" gutterBottom>
              Contact info
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography>932wilson@gmail.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography>932 Wilson Street, Los Angeles, CA 90021</Typography>
            </Box>

            {/* Instagram Link */}
            <Link
              href="https://www.instagram.com/wilsonbay.dtla"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}
            >
              <InstagramIcon fontSize="small" />
              @wilsonbay.dtla
            </Link>

            {/* Peerspace Link with updated icon */}
            <Link
              href="https://www.peerspace.com/pages/listings/66281ae02de482ca77c71015"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}
            >
              <StorefrontIcon fontSize="small" /> {/* Changed icon here */}
              Peerspace listing
            </Link>

            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              We typically respond within 24 hours. Feel free to reach out with
              any questions or special requests!
            </Typography>
          </Paper>
        </Grid>

        {/* Right side - form */}
        <Grid item xs={12} md={7}>
          <Typography variant="h3" gutterBottom>
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
            />
            <FormControl fullWidth required margin="normal">
              <InputLabel id="space-label">Space of Interest</InputLabel>
              <Select
                labelId="space-label"
                name="space"
                value={formData.space}
                onChange={handleSelectChange}
                label="Space of Interest"
              >
                {venueJson.venues.map(
                  (venue) =>
                    venue?.name &&
                    venue?.route && (
                      <MenuItem key={venue.route} value={venue.name}>
                        {venue.name}
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Send Inquiry
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
