import type React from "react";
import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  //   Snackbar,
  //   Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
// import emailjs from "emailjs-com";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    space: "",
    message: "",
  });

  // Snackbar state
  //   const [openSnackbar, setOpenSnackbar] = useState(false);
  //   const [snackbarMessage, setSnackbarMessage] = useState("");
  //   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
  //     "success"
  //   );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string> // Type for SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();

  //     // Send email using EmailJS
  //     emailjs
  //       .send(
  //         process.env.REACT_APP_EMAILJS_SERVICE_ID!,
  //         process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
  //         formData,
  //         process.env.REACT_APP_EMAILJS_USER_ID!
  //       )
  //       .then(
  //         (response) => {
  //           console.log("SUCCESS:", response);
  //           setSnackbarMessage(
  //             "Thanks for your inquiry! Your email has been sent."
  //           );
  //           setSnackbarSeverity("success");
  //           setOpenSnackbar(true);
  //         },
  //         (error) => {
  //           console.log("FAILED:", error);
  //           setSnackbarMessage(
  //             "Sorry, there has been an error. Please try again."
  //           );
  //           setSnackbarSeverity("error");
  //           setOpenSnackbar(true);
  //         }
  //       );

  //     // Reset form after submission
  //     setFormData({ name: "", email: "", space: "", message: "" });
  //   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = "marfriaz@gmail.com";
    const mailtoLink = `mailto:${email}?subject=Inquiry%20for%20${encodeURIComponent(
      formData.space
    )}%20-%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
      formData.message
    )}`;

    window.location.href = mailtoLink; // This opens the default email client with the prefilled details

    // Reset form after submission
    setFormData({ name: "", email: "", space: "", message: "" });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
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
            <MenuItem value="The Wilson Room">The Wilson Room</MenuItem>
            <MenuItem value="The Courtyard">The Courtyard</MenuItem>
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

      {/* Snackbar for showing success or error messages */}
      {/* <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar> */}
    </Box>
  );
};

export default Contact;
