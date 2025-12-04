import type React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VenueTemplate from "./components/VenueTemplate"; // Assuming your dynamic venue component is here
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import theme from "./themes/theme";
import { venueJson } from "./components/VenueJson";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            {/* Map over venueJson.venues to create dynamic routes */}
            {venueJson.venues.map((venue) => (
              <Route
                key={venue.route}
                path={venue.route}
                element={<VenueTemplate venue={venue} />}
              />
            ))}

            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
