import type React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Space1 from "./pages/Space1";
import Space2 from "./pages/Space2";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="space1" element={<Space1 />} />
            <Route path="space2" element={<Space2 />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
