import React from "react";
import {
  Box,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { People, SquareFoot } from "@mui/icons-material";
import ImageGallery2 from "./ImageGallery2";
import { wilsonImages, courtYardImages } from "../../constants";

// TypeScript interfaces
export interface SpaceData {
  id: string;
  name: string;
  images: ImageData[];
  capacity: number;
  squareFootage: number;
  description: string;
}

export interface ImageData {
  id: number;
  src: string;
  alt: string;
  space: string;
}

export interface SpaceCardProps {
  space: SpaceData;
  layoutDirection: 'image-left' | 'image-right';
  isMobile: boolean;
}

export interface InfoChipProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

// InfoChip component
const InfoChip: React.FC<InfoChipProps> = ({ icon, label, value }) => {
  return (
    <Chip
      icon={icon}
      label={`${label}: ${value}`}
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        borderRadius: "20px",
        fontSize: { xs: "0.75rem", md: "0.875rem" },
        height: { xs: "28px", md: "32px" },
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        "& .MuiChip-icon": {
          color: "white",
          fontSize: { xs: "16px", md: "18px" },
        },
        "& .MuiChip-label": {
          fontSize: "inherit",
          px: { xs: 1, md: 1.5 },
          fontWeight: 500,
        },
        "&:hover": {
          backgroundColor: "primary.dark",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        transition: "all 0.2s ease-in-out",
      }}
    />
  );
};

// Static space data configuration
const SPACES_DATA: SpaceData[] = [
  {
    id: 'wilson-room',
    name: 'The Wilson Room',
    images: wilsonImages.map(img => ({
      id: img.id,
      src: img.src,
      alt: img.alt,
      space: img.space,
    })),
    capacity: 120,
    squareFootage: 900,
    description: 'A two-story, sun-filled historic venue blending industrial character with modern design.'
  },
  {
    id: 'courtyard',
    name: 'The Courtyard',
    images: courtYardImages.map(img => ({
      id: img.id,
      src: img.src,
      alt: img.alt,
      space: img.space,
    })),
    capacity: 500,
    squareFootage: 4300,
    description: 'A flexible outdoor courtyard perfect for large events, pop-ups, and load-ins, with gated access for ease.'
  }
];

// SpaceCard component
const SpaceCard: React.FC<SpaceCardProps> = ({ space, layoutDirection, isMobile }) => {
  
  // Error handling for missing or malformed data
  if (!space || !space.name) {
    return null; // Gracefully handle missing space data
  }
  
  // Convert images to ImageGallery format with fallback
  const galleryImages = (space.images || []).length > 0 
    ? space.images.map(img => ({
        src: img.src || "/placeholder.svg",
        alt: img.alt || `${space.name} image`,
        caption: undefined,
      }))
    : [{
        src: "/placeholder.svg",
        alt: `${space.name} placeholder`,
        caption: undefined,
      }];

  const contentArea = (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: { xs: 2, md: 3 },
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontSize: { xs: "1.5rem", md: "2rem" },
          position: "relative",
          display: "inline-block",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-4px",
            left: 0,
            width: { xs: "80px", md: "100px" },
            height: "2px",
            backgroundColor: "primary.main",
            borderRadius: "2px",
          },
        }}
      >
        {space.name}
      </Typography>
      
      <Box sx={{ 
        display: "flex", 
        gap: { xs: 1, md: 1.5 }, 
        mb: 2, 
        flexWrap: { xs: "nowrap", md: "wrap" },
        overflow: "hidden"
      }}>
        {space.capacity && (
          <InfoChip
            icon={<People />}
            label="Capacity"
            value={`${space.capacity} people`}
          />
        )}
        {space.squareFootage && (
          <InfoChip
            icon={<SquareFoot />}
            label="Size"
            value={`${space.squareFootage.toLocaleString()} sq ft`}
          />
        )}
      </Box>
      
      {space.description && (
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3, // Limit to 3 lines maximum
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "4.8em", // Fallback for browsers that don't support line-clamp
          }}
        >
          {space.description}
        </Typography>
      )}
    </Box>
  );

  const imageArea = (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        minHeight: { xs: "300px", md: "500px" },
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ImageGallery2 images={galleryImages} />
    </Box>
  );

  // Mobile layout - always stacked with full width like hero image
  if (isMobile) {
    return (
      <Box
        sx={{
          mb: 4,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
          overflow: "hidden",
        }}
      >
        {/* Full-width image area that breaks out of all containers */}
        <Box
          sx={{
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
            marginTop: 0,
            marginBottom: 0,
            overflow: "hidden",
            position: "relative",
            left: "50%",
            right: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Box
            sx={{
              height: "300px",
              position: "relative",
              width: "100%",
            }}
          >
            <ImageGallery2 images={galleryImages} />
          </Box>
        </Box>
        
        {/* Content area with normal padding */}
        {contentArea}
      </Box>
    );
  }

  // Desktop layout - alternating
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: layoutDirection === 'image-left' ? "row" : "row-reverse",
        mb: 4,
        backgroundColor: "background.paper",
        height: "500px",
        width: "100%",
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      {imageArea}
      {contentArea}
    </Box>
  );
};

const Spaces2: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ pt: 8, bgcolor: "background.default", width: "100%", overflow: "hidden" }}>
      {/* Section title matching other subheaders */}
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        sx={{
          fontFamily: '"Oooh Baby", "cursive"',
          fontWeight: "bold",
          fontSize: { xs: "2.5rem", md: "4rem" },
          mb: 4,
          textAlign: "center",
          px: { xs: 2, md: 4 },
        }}
      >
        Our Spaces
      </Typography>
      
      {/* Render space cards with alternating layouts - full width */}
      <Box sx={{ width: "100%" }}>
        {SPACES_DATA.map((space, index) => (
          <Box key={space.id} id={space.id}>
            <SpaceCard
              space={space}
              layoutDirection={index % 2 === 0 ? 'image-left' : 'image-right'}
              isMobile={isMobile}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Spaces2;