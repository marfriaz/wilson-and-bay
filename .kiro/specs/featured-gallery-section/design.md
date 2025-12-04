# Design Document

## Overview

The Featured Gallery Section is a new component that will be integrated into the Wilson and Bay home page to showcase curated highlight images from across all event spaces. The section serves as a visual teaser that gives visitors an immediate sense of the venue's aesthetic and atmosphere, encouraging them to explore the full gallery.

The component will be positioned between the "About us" section and the "Our Spaces" section on the home page. It will feature a responsive design that adapts between a swipeable carousel on mobile devices and a multi-image grid layout on desktop. The section will include a heading "In Use", display 6 randomly selected images from a curated collection, and provide a call-to-action button linking to the full gallery page.

## Architecture

### Component Structure

```
FeaturedGallery (New Component)
├── Section Container
│   ├── Heading ("In Use")
│   ├── Image Display
│   │   ├── Mobile: Swipeable Carousel
│   │   │   ├── Image Slides
│   │   │   ├── Navigation Dots
│   │   │   └── Touch Gesture Handlers
│   │   └── Desktop: Grid Layout
│   │       ├── Image Cards (3x2 or 2x3 grid)
│   │       └── Hover Effects
│   └── CTA Button ("View Full Gallery →")
```

### Integration Points

1. **Home Page**: The FeaturedGallery component will be imported and rendered in `src/pages/Home.tsx` between the About section and the Spaces component
2. **Constants**: Featured images array will be defined in `src/constants.ts` alongside existing image arrays
3. **Routing**: The CTA button will use React Router's `useNavigate` hook to link to `ROUTES.GALLERY`
4. **Theme**: The component will consume the existing MUI theme from `src/themes/theme.ts`

### Technology Stack

- **React 19.0.0**: Component framework
- **TypeScript**: Type safety
- **Material-UI 6.4.8**: UI component library and styling
- **React Router 7.3.0**: Navigation
- **Existing hooks**: Reuse touch gesture patterns from Spaces component

## Components and Interfaces

### FeaturedGallery Component

**File**: `src/components/FeaturedGallery.tsx`

```typescript
interface FeaturedImage {
  id: number;
  src: string;
  alt: string;
  space: string;
}

interface FeaturedGalleryProps {
  // No props needed - component is self-contained
}

const FeaturedGallery: React.FC<FeaturedGalleryProps> = () => {
  // Component implementation
};
```

**State Management**:

- `currentSlide: number` - Tracks the active slide index in mobile carousel
- `displayedImages: FeaturedImage[]` - The 6 randomly selected images for this render
- `touchStart: number` - Touch gesture tracking for swipe detection
- `touchEnd: number` - Touch gesture tracking for swipe detection

**Key Methods**:

- `selectRandomImages()` - Selects 6 random images from the featured array
- `handleNextSlide()` - Navigates to next carousel slide
- `handlePrevSlide()` - Navigates to previous carousel slide
- `handleTouchStart()` - Captures touch start position
- `handleTouchEnd()` - Processes swipe gesture and triggers navigation
- `handleViewGallery()` - Navigates to the full gallery page

### Mobile Carousel Implementation

The mobile carousel will follow the same pattern as the Spaces component carousel:

```typescript
// Carousel container with overflow hidden
<Box sx={{ overflow: "hidden", position: "relative" }}>
  {/* Sliding container */}
  <Box
    sx={{
      display: "flex",
      transition: "transform 0.3s ease-in-out",
      transform: `translateX(-${currentSlide * 100}%)`,
    }}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    {displayedImages.map((image, index) => (
      <Box key={index} sx={{ minWidth: "100%", px: 2 }}>
        <img src={image.src} alt={image.alt} />
      </Box>
    ))}
  </Box>

  {/* Navigation dots */}
  <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mt: 3 }}>
    {displayedImages.map((_, index) => (
      <Box
        key={index}
        onClick={() => setCurrentSlide(index)}
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor:
            currentSlide === index ? "primary.main" : "rgba(255,255,255,0.3)",
          cursor: "pointer",
        }}
      />
    ))}
  </Box>
</Box>
```

### Desktop Grid Implementation

The desktop layout will display images in a responsive grid:

```typescript
<Grid2 container spacing={2}>
  {displayedImages.map((image, index) => (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
      <Box
        component="img"
        src={image.src}
        alt={image.alt}
        sx={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          borderRadius: 1,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 3,
          },
        }}
      />
    </Grid2>
  ))}
</Grid2>
```

## Data Models

### Featured Images Array

**File**: `src/constants.ts`

```typescript
export const featuredImages: FeaturedImage[] = [
  // Wilson Room highlights
  {
    id: 1,
    src: "https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/wilsonRoom%2F1.jpeg?alt=media",
    alt: "The Wilson Room - Main Space",
    space: "wilson",
  },
  {
    id: 2,
    src: "https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/wilsonRoom%2F5.jpeg?alt=media",
    alt: "The Wilson Room - Event Setup",
    space: "wilson",
  },
  // Courtyard highlights
  {
    id: 3,
    src: "https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/courtyard%2F1.jpg?alt=media",
    alt: "The Courtyard - Outdoor Space",
    space: "courtyard",
  },
  {
    id: 4,
    src: "https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/courtyard%2F10.jpg?alt=media",
    alt: "The Courtyard - Evening View",
    space: "courtyard",
  },
  // Additional curated images...
  // Total of 12-15 images to provide variety
];
```

### Image Selection Algorithm

```typescript
const selectRandomImages = (count: number = 6): FeaturedImage[] => {
  const shuffled = [...featuredImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
```

This approach ensures:

- Different images on each page load
- No duplicates in a single render
- Simple implementation without external dependencies

##

Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Image count consistency

_For any_ render of the FeaturedGallery component, the component should display exactly 6 images from the featured images array.
**Validates: Requirements 1.3**

### Property 2: Swipe left navigation

_For any_ carousel state that is not at the last image, swiping left should increment the current slide index by 1.
**Validates: Requirements 2.2**

### Property 3: Swipe right navigation

_For any_ carousel state that is not at the first image, swiping right should decrement the current slide index by 1.
**Validates: Requirements 2.3**

### Property 4: Position indicator accuracy

_For any_ carousel state, the visual position indicator should highlight the dot corresponding to the current slide index.
**Validates: Requirements 2.6**

### Property 5: Desktop multi-image display

_For any_ desktop viewport render, the component should display at least 2 images simultaneously in the grid layout.
**Validates: Requirements 3.2**

### Property 6: Responsive layout adaptation

_For any_ viewport width change from mobile to desktop (or vice versa), the component should switch between carousel and grid layouts appropriately.
**Validates: Requirements 3.5**

### Property 7: Featured image structure

_For any_ item in the featuredImages array, it should contain src, alt, space, and id properties.
**Validates: Requirements 4.2**

### Property 8: Random selection validity

_For any_ call to the image selection function, all returned images should exist in the source featuredImages array.
**Validates: Requirements 4.3**

### Property 9: Image load error handling

_For any_ image that fails to load, the component should continue to render without crashing and maintain layout integrity.
**Validates: Requirements 6.3**

### Property 10: Keyboard navigation controls

_For any_ carousel state, pressing the left/right arrow keys should navigate to the previous/next image respectively.
**Validates: Requirements 7.1, 7.3**

### Property 11: Alt text presence

_For any_ rendered image in the component, it should have a non-empty alt attribute.
**Validates: Requirements 8.1**

### Property 12: ARIA labels on controls

_For any_ navigation control (next/previous buttons, dots), it should have an appropriate aria-label attribute.
**Validates: Requirements 8.2**

### Property 13: Carousel position announcement

_For any_ carousel navigation action, the component should update ARIA live region attributes to announce the new position.
**Validates: Requirements 8.3**

### Property 14: Interactive element ARIA roles

_For any_ interactive element (buttons, clickable dots), it should have appropriate ARIA role and state attributes.
**Validates: Requirements 8.5**

## Error Handling

### Image Loading Failures

**Strategy**: Graceful degradation with fallback UI

```typescript
const handleImageError = (index: number) => {
  console.error(`Failed to load image at index ${index}`);
  // Keep the image slot but show a placeholder
  // Don't remove from the array to maintain layout
};

<Box
  component="img"
  src={image.src}
  alt={image.alt}
  onError={() => handleImageError(index)}
  sx={{
    // Fallback background color
    bgcolor: "rgba(255,255,255,0.1)",
  }}
/>;
```

### Empty Featured Images Array

**Strategy**: Defensive programming with early return

```typescript
if (!featuredImages || featuredImages.length === 0) {
  console.warn("No featured images available");
  return null; // Don't render the section
}

if (featuredImages.length < 6) {
  // Use all available images if less than 6
  setDisplayedImages(featuredImages);
}
```

### Navigation Boundary Conditions

**Strategy**: Implement circular navigation (loop to beginning/end)

```typescript
const handleNextSlide = () => {
  setCurrentSlide((prev) =>
    prev === displayedImages.length - 1 ? 0 : prev + 1
  );
};

const handlePrevSlide = () => {
  setCurrentSlide((prev) =>
    prev === 0 ? displayedImages.length - 1 : prev - 1
  );
};
```

### Touch Gesture Edge Cases

**Strategy**: Minimum swipe distance threshold

```typescript
const SWIPE_THRESHOLD = 50; // pixels

const handleTouchEnd = () => {
  const diff = touchStart - touchEnd;

  // Only trigger navigation if swipe exceeds threshold
  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    if (diff > 0) {
      handleNextSlide();
    } else {
      handlePrevSlide();
    }
  }
};
```

### Viewport Detection Failures

**Strategy**: Default to mobile-first approach

```typescript
const isMobile = useMediaQuery(theme.breakpoints.down("md"));

// If media query fails, default to mobile layout (safer)
const layoutMode = isMobile ?? true;
```

## Testing Strategy

### Unit Testing

**Framework**: React Testing Library with Jest (already configured in the project)

**Test Coverage**:

1. **Component Rendering**

   - Verify component renders without crashing
   - Check that heading "In Use" is present
   - Verify CTA button exists with correct text
   - Confirm 6 images are rendered

2. **Random Selection Logic**

   - Test that `selectRandomImages` returns exactly 6 images
   - Verify all returned images exist in source array
   - Test behavior when source array has fewer than 6 images

3. **Mobile Carousel**

   - Test carousel renders on mobile viewport
   - Verify navigation dots are present
   - Test touch event handlers are attached

4. **Desktop Grid**

   - Test grid layout renders on desktop viewport
   - Verify at least 2 images are visible
   - Test responsive breakpoints

5. **Navigation**

   - Test next/previous slide navigation
   - Verify circular navigation at boundaries
   - Test keyboard navigation (arrow keys)

6. **Accessibility**

   - Verify all images have alt text
   - Check ARIA labels on navigation controls
   - Test semantic HTML structure
   - Verify keyboard focus management

7. **Error Handling**
   - Test image load error handling
   - Verify component doesn't crash with empty array
   - Test boundary conditions

**Example Unit Test**:

```typescript
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FeaturedGallery from "./FeaturedGallery";

describe("FeaturedGallery", () => {
  it("renders the section heading", () => {
    render(
      <BrowserRouter>
        <FeaturedGallery />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /in use/i })
    ).toBeInTheDocument();
  });

  it("displays exactly 6 images", () => {
    render(
      <BrowserRouter>
        <FeaturedGallery />
      </BrowserRouter>
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(6);
  });

  it("includes View Full Gallery button", () => {
    render(
      <BrowserRouter>
        <FeaturedGallery />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /view full gallery/i });
    expect(button).toBeInTheDocument();
  });
});
```

### Property-Based Testing

**Framework**: fast-check (already installed in the project)

**Property Tests**:

1. **Property 1: Image count consistency**

   - Generate random subsets of featured images
   - Verify selection function always returns exactly 6 images (or all if fewer than 6 available)

2. **Property 7: Featured image structure**

   - Generate random image objects
   - Verify each has required properties: id, src, alt, space

3. **Property 8: Random selection validity**

   - Generate random featured image arrays
   - Verify all selected images exist in source array
   - Verify no duplicates in selection

4. **Property 11: Alt text presence**
   - Generate random image data
   - Verify every rendered image has non-empty alt text

**Example Property Test**:

```typescript
import fc from "fast-check";
import { selectRandomImages } from "./imageUtils";

describe("Property: Image selection", () => {
  it("always returns exactly 6 images when source has >= 6", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.integer(),
            src: fc.webUrl(),
            alt: fc.string(),
            space: fc.constantFrom("wilson", "courtyard", "loft"),
          }),
          { minLength: 6, maxLength: 20 }
        ),
        (images) => {
          const selected = selectRandomImages(images, 6);
          expect(selected).toHaveLength(6);

          // All selected images should be from source
          selected.forEach((img) => {
            expect(images).toContainEqual(img);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

1. **Home Page Integration**

   - Verify FeaturedGallery renders in correct position on Home page
   - Test navigation to gallery page via CTA button
   - Verify component doesn't interfere with other sections

2. **Responsive Behavior**

   - Test layout changes across different viewport sizes
   - Verify smooth transitions between mobile and desktop layouts

3. **User Interaction Flows**
   - Test complete swipe gesture flow on mobile
   - Test keyboard navigation flow
   - Test CTA button click flow

### Accessibility Testing

**Framework**: jest-axe (already installed in the project)

```typescript
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

it("should have no accessibility violations", async () => {
  const { container } = render(
    <BrowserRouter>
      <FeaturedGallery />
    </BrowserRouter>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Performance Considerations

### Image Loading Optimization

1. **Lazy Loading**: Use native `loading="lazy"` attribute for images not in initial viewport
2. **Responsive Images**: Consider using `srcset` for different device pixel ratios
3. **Preloading**: Preload the first 2-3 images for faster initial render

```typescript
<Box
  component="img"
  src={image.src}
  alt={image.alt}
  loading={index < 2 ? "eager" : "lazy"}
  sx={{
    width: "100%",
    height: "auto",
  }}
/>
```

### Component Optimization

1. **Memoization**: Use `React.memo` for image components to prevent unnecessary re-renders
2. **useCallback**: Memoize event handlers to prevent recreation on each render
3. **Random Selection**: Perform random selection once on mount, not on every render

```typescript
const displayedImages = useMemo(
  () => selectRandomImages(featuredImages, 6),
  [] // Only run once on mount
);

const handleNextSlide = useCallback(() => {
  setCurrentSlide((prev) =>
    prev === displayedImages.length - 1 ? 0 : prev + 1
  );
}, [displayedImages.length]);
```

### Bundle Size

- No additional dependencies required
- Reuse existing MUI components and hooks
- Estimated component size: ~5KB (minified)

## Styling Guidelines

### Mobile Styles (< 900px)

```typescript
{
  // Carousel container
  px: 2,
  py: 6,

  // Images
  width: "100%",
  height: "auto",
  maxHeight: "400px",
  objectFit: "cover",
  borderRadius: 1,

  // Navigation dots
  width: 12,
  height: 12,
  borderRadius: "50%",

  // Spacing
  gap: 1.5,
  mt: 3,
}
```

### Desktop Styles (>= 900px)

```typescript
{
  // Section container
  py: 8,
  px: 3,

  // Grid
  spacing: 2,

  // Images
  width: "100%",
  height: 300,
  objectFit: "cover",
  borderRadius: 1,

  // Hover effects
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: 3,
  },
}
```

### Theme Integration

```typescript
// Use existing theme colors
bgcolor: "background.default", // #181818
color: "text.primary", // #fff
primary.main: "#12585A", // Dark teal for accents

// Use existing typography
heading: "h2" with "Oooh Baby" font
body: "body1" with "Manrope" font

// Use existing button styles
Button variant="outlined" with borderRadius: 0
```

## Deployment Considerations

### Feature Flag

Consider adding an environment variable to enable/disable the featured gallery:

```typescript
const showFeaturedGallery = process.env.REACT_APP_FEATURED_GALLERY === "true";

// In Home.tsx
{
  showFeaturedGallery && <FeaturedGallery />;
}
```

### Content Management

The featured images array should be curated by the content team. Consider:

- Selecting high-quality, representative images
- Balancing images across different spaces
- Updating seasonally or for special events
- Ensuring diversity in event types shown

### Analytics

Consider adding analytics tracking:

- Featured gallery impressions
- CTA button clicks
- Carousel interaction rate (mobile)
- Image hover interactions (desktop)

```typescript
const handleViewGallery = () => {
  // Track analytics event
  if (window.gtag) {
    window.gtag("event", "featured_gallery_cta_click", {
      event_category: "engagement",
      event_label: "home_page",
    });
  }

  navigate(ROUTES.GALLERY);
};
```

## Future Enhancements

### Phase 2 Considerations

1. **Admin Interface**: Allow venue managers to update featured images without code changes
2. **Auto-rotation**: Automatically cycle through images on desktop
3. **Lightbox Integration**: Open images in full-screen lightbox on click
4. **Video Support**: Include video clips in the featured carousel
5. **Social Proof**: Add event type labels or testimonials to images
6. **Performance Metrics**: Track image load times and optimize accordingly
7. **A/B Testing**: Test different image selections and layouts for conversion optimization

### Accessibility Enhancements

1. **Reduced Motion**: Respect `prefers-reduced-motion` media query
2. **High Contrast**: Ensure sufficient contrast in high contrast mode
3. **Screen Reader**: Enhanced announcements for carousel state changes
4. **Focus Trap**: Implement focus trap for keyboard users in carousel

### Mobile Enhancements

1. **Pinch to Zoom**: Allow users to zoom into images
2. **Haptic Feedback**: Provide tactile feedback on swipe (iOS)
3. **Pull to Refresh**: Refresh random selection with pull gesture
4. **Share Button**: Allow users to share individual images
