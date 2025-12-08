# Design Document

## Overview

This design transforms the Spaces component's non-mobile layout from a vertical card grid to a horizontal split layout. Each space will be displayed as a full-width rectangle containing two equal-width boxes: text content on the left and an image on the right. The mobile view will remain unchanged, preserving the existing carousel functionality.

The implementation will leverage Material-UI's responsive layout system (Grid2, Box) and breakpoint utilities to conditionally render different layouts based on viewport size. The design maintains the existing component structure while introducing a new layout variant for desktop/tablet views.

## Architecture

### Component Structure

The Spaces component will maintain its current architecture with the following modifications:

1. **Spaces Component (Container)**: Top-level component that determines which layout to render based on viewport size
2. **SpaceCard Component**: Will be refactored to support two rendering modes:
   - **Vertical Mode** (existing): Used in mobile carousel
   - **Horizontal Mode** (new): Used in non-mobile horizontal layout
3. **Layout Wrapper**: A new conditional rendering logic that switches between carousel and stacked horizontal layouts

### Responsive Behavior

- **Mobile (< md breakpoint)**: Carousel with swipe gestures (unchanged)
- **Non-Mobile (≥ md breakpoint)**: Vertically stacked horizontal rectangles (new)

The existing `isMobile` check using `useMediaQuery(theme.breakpoints.down("md"))` will be reused to determine which layout to render.

## Components and Interfaces

### Modified SpaceCard Component

The SpaceCard component will accept an additional prop to determine its layout mode:

```typescript
interface SpaceCardProps {
  title: string;
  image: string;
  stats: string;
  description: string;
  link: string;
  layoutMode?: "vertical" | "horizontal"; // New prop
}
```

**Vertical Mode (existing)**:

- Card with image on top
- Content below image
- Hover effect: translateY(-8px)

**Horizontal Mode (new)**:

- Box container with flexDirection: 'row'
- Left box: text content (title, stats, description, CTA)
- Right box: image
- Both boxes: equal flex basis (50%)
- Hover effect: subtle elevation or border change

### Layout Structure for Non-Mobile

```
<Container>
  <Typography "Our Spaces" heading />
  <Box (vertical stack container)>
    {spaces.map(space => (
      <SpaceCard layoutMode="horizontal" {...space} />
    ))}
  </Box>
</Container>
```

Each horizontal SpaceCard will use:

- `display: 'flex'`
- `flexDirection: 'row'`
- `alignItems: 'stretch'` or `'center'`
- Consistent spacing between stacked cards (e.g., `mb: 4`)

## Data Models

No changes to data models. The existing `SpaceCardProps` interface and `spaces` array structure remain the same, with only the addition of an optional `layoutMode` prop.

```typescript
const spaces: SpaceCardProps[] = [
  {
    title: "The Wilson Room",
    image: wilsonImages[0].src,
    stats: "4,300 sq ft | 120 people | Street-facing | 2 Floors",
    description:
      "A sun-filled historic venue blending industrial character with modern design.",
    link: ROUTES.WILSON_ROOM,
  },
  // ... other spaces
];
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Responsive layout switching

_For any_ viewport width at or above the 'md' breakpoint, the Spaces Component should render each space as a horizontal rectangle with flexDirection 'row', and for any viewport width below the 'md' breakpoint, it should render the mobile carousel layout.
**Validates: Requirements 1.1, 1.5**

### Property 2: Horizontal element ordering

_For any_ space rendered in non-mobile view, the text box should appear as the first child and the image box should appear as the second child within the space rectangle.
**Validates: Requirements 1.2, 1.3**

### Property 3: Vertical stacking consistency

_For any_ set of multiple spaces rendered in non-mobile view, the spacing between consecutive space rectangles should be consistent (equal margin/padding values).
**Validates: Requirements 1.4**

### Property 4: Text content completeness

_For any_ space rendered in horizontal layout, the text box should contain all required elements (title, statistics, description, call-to-action link) in the correct vertical order.
**Validates: Requirements 2.1**

### Property 5: Text overflow prevention

_For any_ text content displayed in the text box, the computed overflow style should prevent content from being cut off (overflow: visible or auto, not hidden with content exceeding bounds).
**Validates: Requirements 2.3**

### Property 6: CTA hover feedback

_For any_ call-to-action link, hovering over it should trigger visual style changes (color change, underline, or other visual feedback).
**Validates: Requirements 2.4**

### Property 7: Image aspect ratio preservation

_For any_ space image rendered in the horizontal layout, the image should maintain its proper aspect ratio without distortion (objectFit: 'cover' or 'contain' applied).
**Validates: Requirements 3.1, 3.2**

### Property 8: Equal width allocation

_For any_ space rectangle in horizontal layout, the text box and image box should have approximately equal widths (within 5% tolerance).
**Validates: Requirements 3.3**

### Property 9: Vertical alignment

_For any_ space rectangle rendered in horizontal layout, the text box and image box should be vertically aligned (same height or proper alignment property applied).
**Validates: Requirements 3.4**

### Property 10: Consistent styling application

_For any_ space rectangle in non-mobile view, consistent styling (shadows, borders, background colors) should be applied according to the theme.
**Validates: Requirements 4.1**

### Property 11: Rectangle hover feedback

_For any_ space rectangle, hovering over it should trigger visual feedback such as elevation changes or style modifications.
**Validates: Requirements 4.2**

### Property 12: Semantic HTML structure

_For any_ rendered Spaces component, proper semantic HTML should be used with appropriate heading hierarchy (h2 for section, h3 for space titles).
**Validates: Requirements 5.1**

### Property 13: Image alt text presence

_For any_ space image displayed in horizontal layout, the img element should have a non-empty, descriptive alt attribute.
**Validates: Requirements 5.2**

### Property 14: Keyboard accessibility

_For any_ interactive element in the Spaces component, keyboard navigation should work correctly (Tab to focus, Enter to activate) and visible focus indicators should be present.
**Validates: Requirements 5.3, 5.4**

## Error Handling

### Layout Rendering Errors

- **Missing Image**: If a space's image fails to load, the component should display a placeholder or fallback image to maintain layout integrity
- **Invalid Breakpoint**: If the breakpoint detection fails, default to the mobile layout as a safe fallback
- **Missing Space Data**: If required space properties (title, description, etc.) are missing, the component should skip rendering that space or display a warning in development mode

### Responsive Behavior Errors

- **Rapid Resize**: If the viewport is rapidly resized across the breakpoint threshold, debounce or throttle the layout recalculation to prevent excessive re-renders
- **SSR Mismatch**: Ensure server-side rendering produces a consistent initial layout that matches the client-side hydration to avoid layout shifts

## Testing Strategy

### Unit Testing

Unit tests will verify specific examples and edge cases:

1. **Layout Mode Selection**: Test that the correct layout (horizontal vs carousel) is rendered based on viewport width
2. **Element Ordering**: Test that text box appears before image box in horizontal mode
3. **Hover States**: Test that hover event handlers trigger style changes
4. **Accessibility**: Test that proper ARIA attributes and semantic HTML are present
5. **Edge Cases**:
   - Single space vs multiple spaces rendering
   - Optional "The Loft" space inclusion based on environment variable
   - Empty or missing space data handling

### Property-Based Testing

Property-based tests will verify universal properties across all inputs using **fast-check** (JavaScript property-based testing library):

- **Minimum 100 iterations** per property test to ensure thorough coverage
- Each property test must be tagged with a comment referencing the design document property:
  - Format: `// Feature: spaces-horizontal-layout, Property {number}: {property_text}`
- Properties to test:
  - Responsive layout switching (Property 1)
  - Element ordering consistency (Property 2)
  - Spacing consistency across multiple spaces (Property 3)
  - Text content completeness (Property 4)
  - Image aspect ratio preservation (Property 7)
  - Equal width allocation (Property 8)
  - Semantic HTML structure (Property 12)
  - Alt text presence (Property 13)

### Integration Testing

- Test the Spaces component within the Home page context
- Verify navigation to individual space pages via CTA links
- Test responsive behavior across actual device viewports using browser testing tools

### Visual Regression Testing

- Capture screenshots of the horizontal layout at various viewport sizes
- Compare against baseline images to detect unintended visual changes
- Test hover states and transitions

## Implementation Notes

### Styling Approach

Use Material-UI's `sx` prop for all styling to maintain consistency with the existing codebase. Key style considerations:

- **Text Box**: `flex: 1`, padding for internal spacing, flexDirection: 'column' for vertical text stacking
- **Image Box**: `flex: 1`, ensure image fills container with `width: '100%'`, `height: '100%'`, `objectFit: 'cover'`
- **Space Rectangle**: `display: 'flex'`, `flexDirection: 'row'`, `mb: 4` for spacing between stacked rectangles
- **Hover Effects**: Use `&:hover` pseudo-selector for elevation or border changes

### Performance Considerations

- Reuse existing `isMobile` check to avoid duplicate media query subscriptions
- Avoid unnecessary re-renders by memoizing the SpaceCard component if needed
- Ensure images are optimized and lazy-loaded if not already implemented

### Accessibility Considerations

- Maintain existing keyboard navigation patterns
- Ensure focus indicators are visible with sufficient contrast (WCAG AA minimum)
- Use semantic HTML (`<article>` or `<section>` for space rectangles)
- Preserve existing alt text for images

### Browser Compatibility

- Test flexbox layout across modern browsers (Chrome, Firefox, Safari, Edge)
- Ensure graceful degradation for older browsers if necessary
- Verify touch gestures still work on mobile devices with touch-enabled tablets
