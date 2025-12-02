# Design Document

## Overview

This design document outlines comprehensive improvements to the Wilson and Bay image gallery system. The improvements address six key areas: (1) fixing a critical bug where cached images from previous tabs persist when switching filters, (2) migrating from deprecated MUI components to modern alternatives, (3) implementing performance optimizations for image loading from Firebase Storage, (4) enhancing user experience with keyboard navigation and zoom functionality, (5) improving accessibility for screen readers and keyboard users, and (6) adding smooth visual transitions and loading states.

The gallery consists of two main components: `ImageGallery.tsx` (used on individual venue pages) and `Gallery.tsx` (the main gallery page with space filtering). Both components share similar lightbox functionality and will benefit from these improvements.

## Architecture

### Component Structure

```
Gallery System
├── ImageGallery Component (venue pages)
│   ├── Grid View (thumbnails)
│   ├── Lightbox Dialog
│   └── Navigation Controls
├── Gallery Page Component (main gallery)
│   ├── Space Filter Tabs
│   ├── Grid View (thumbnails)
│   ├── Lightbox Dialog
│   └── Navigation Controls
└── Shared Utilities
    ├── Image Preloader
    ├── Keyboard Handler
    ├── Touch Gesture Handler
    └── Zoom Controller
```

### Key Architectural Decisions

1. **Shared Hook Pattern**: Extract common lightbox and navigation logic into custom hooks (`useImageLightbox`, `useKeyboardNavigation`, `useImagePreloader`) to avoid code duplication between components.

2. **State Management**: Use React state for UI concerns (current index, zoom level, loading states) with proper cleanup on filter changes to prevent the cached image bug.

3. **Performance Strategy**: Implement lazy loading for grid thumbnails, eager preloading for adjacent lightbox images, and skeleton loaders for perceived performance.

4. **Accessibility First**: Build keyboard navigation and ARIA support into the core component logic rather than as an afterthought.

5. **Progressive Enhancement**: Ensure basic functionality works without JavaScript enhancements, then layer on zoom, gestures, and transitions.

## Components and Interfaces

### Custom Hooks

#### useImageLightbox

```typescript
interface UseImageLightboxProps {
  images: ImageData[];
  initialIndex?: number;
  onClose?: () => void;
}

interface UseImageLightboxReturn {
  isOpen: boolean;
  currentIndex: number;
  currentImage: ImageData | null;
  open: (index: number) => void;
  close: () => void;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
}

function useImageLightbox(props: UseImageLightboxProps): UseImageLightboxReturn;
```

#### useKeyboardNavigation

```typescript
interface UseKeyboardNavigationProps {
  isActive: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onFirst?: () => void;
  onLast?: () => void;
}

function useKeyboardNavigation(props: UseKeyboardNavigationProps): void;
```

#### useImagePreloader

```typescript
interface UseImagePreloaderProps {
  images: ImageData[];
  currentIndex: number;
  preloadCount?: number; // default: 2 (next and previous)
}

interface UseImagePreloaderReturn {
  isLoading: boolean;
  loadedIndices: Set<number>;
}

function useImagePreloader(
  props: UseImagePreloaderProps
): UseImagePreloaderReturn;
```

#### useImageZoom

```typescript
interface UseImageZoomProps {
  enabled: boolean;
  minZoom?: number; // default: 1
  maxZoom?: number; // default: 3
}

interface UseImageZoomReturn {
  zoom: number;
  position: { x: number; y: number };
  isZoomed: boolean;
  handlePinch: (event: TouchEvent) => void;
  handleDoubleTap: (event: TouchEvent) => void;
  handlePan: (event: TouchEvent) => void;
  reset: () => void;
}

function useImageZoom(props: UseImageZoomProps): UseImageZoomReturn;
```

#### useTouchGestures

```typescript
interface UseTouchGesturesProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onPinch?: (scale: number) => void;
  onDoubleTap?: () => void;
  swipeThreshold?: number; // default: 50px
}

interface UseTouchGesturesReturn {
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

function useTouchGestures(props: UseTouchGesturesProps): UseTouchGesturesReturn;
```

### Updated Component Interfaces

#### ImageGallery Component

```typescript
interface ImageData {
  id: number;
  src: string;
  alt: string;
  caption?: string;
  space?: string;
}

interface ImageGalleryProps {
  images: ImageData[];
  loading?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps>;
```

#### Gallery Page Component

```typescript
interface GalleryFilter {
  value: string;
  label: string;
}

const Gallery: React.FC;
```

### Utility Functions

```typescript
// Image optimization
function getOptimizedImageUrl(
  baseUrl: string,
  width: number,
  quality?: number
): string;

// Loading state management
function createImageLoader(src: string): Promise<HTMLImageElement>;

// Accessibility helpers
function getImageAriaLabel(
  alt: string,
  currentIndex: number,
  totalCount: number
): string;

// Animation helpers
function shouldReduceMotion(): boolean;
```

## Data Models

### ImageData

```typescript
interface ImageData {
  id: number;
  src: string; // Firebase Storage URL
  alt: string; // Descriptive text for accessibility
  caption?: string; // Optional caption displayed in lightbox
  space?: string; // Space identifier for filtering (wilson, courtyard, loft)
}
```

### LightboxState

```typescript
interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
  zoom: number;
  position: { x: number; y: number };
}
```

### GalleryState

```typescript
interface GalleryState {
  filter: string; // Current space filter
  images: ImageData[]; // Filtered image list
  isTransitioning: boolean; // True during filter changes
  lightbox: LightboxState;
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Acceptance Criteria Testing Prework

1.1 WHEN a user switches from one space tab to another THEN the Gallery System SHALL clear all displayed images before rendering the new filtered set
Thoughts: This is about ensuring state consistency when filters change. We can test this by generating random filter sequences, applying them, and verifying that the displayed images always match the current filter with no remnants from previous filters.
Testable: yes - property

1.2 WHEN the filtered image set changes THEN the Gallery System SHALL reset the lightbox state to prevent displaying images from the previous filter
Thoughts: This ensures the lightbox doesn't show stale data. We can test by opening a lightbox, changing filters, and verifying the lightbox either closes or resets to a valid state for the new filter.
Testable: yes - property

1.3 WHEN images are loading after a tab switch THEN the Gallery System SHALL display a loading indicator until new images are ready
Thoughts: This is about UI feedback during async operations. We can test by triggering filter changes and checking that a loading state is present until images are ready.
Testable: yes - property

1.4 WHEN a user opens the lightbox after switching tabs THEN the Gallery System SHALL display only images from the currently selected space filter
Thoughts: This validates that the lightbox image set matches the current filter. We can test by switching filters, opening the lightbox at various indices, and verifying all navigable images belong to the current filter.
Testable: yes - property

2.1 WHEN rendering layout components THEN the Gallery System SHALL use MUI Grid2 instead of the deprecated Grid component
Thoughts: This is a code structure requirement, not a functional behavior we can test at runtime.
Testable: no

2.2 WHEN configuring Dialog components THEN the Gallery System SHALL use the slotProps API instead of the deprecated PaperProps
Thoughts: This is a code structure requirement about API usage, not a runtime behavior.
Testable: no

2.3 WHEN the application builds THEN the Gallery System SHALL produce no deprecation warnings related to MUI components
Thoughts: This is about build output, which we can verify by running the build and checking for warnings.
Testable: yes - example

2.4 WHEN migrating components THEN the Gallery System SHALL maintain identical visual appearance and responsive behavior
Thoughts: This is about visual regression, which is difficult to test programmatically without visual testing tools.
Testable: no

3.1 WHEN the gallery grid loads THEN the Gallery System SHALL implement lazy loading for images outside the initial viewport
Thoughts: This is about implementation strategy. We can verify that images outside the viewport have loading="lazy" attribute.
Testable: yes - example

3.2 WHEN a user opens the lightbox THEN the Gallery System SHALL preload the next and previous images in the sequence
Thoughts: This is about preloading behavior. We can test by opening the lightbox and verifying that adjacent images are requested.
Testable: yes - property

3.3 WHEN images are loading THEN the Gallery System SHALL display skeleton loaders or placeholders with appropriate dimensions
Thoughts: This is about UI state during loading. We can test that loading states are present when images haven't loaded yet.
Testable: yes - property

3.4 WHEN an image fails to load THEN the Gallery System SHALL display a fallback image or error state
Thoughts: This is error handling. We can test by providing invalid image URLs and verifying fallback behavior.
Testable: yes - property

3.5 WHEN images load from Firebase Storage THEN the Gallery System SHALL request optimized image sizes based on viewport dimensions
Thoughts: This is about URL construction. We can test that generated URLs include appropriate size parameters.
Testable: yes - property

4.1 WHEN the lightbox is open and a user presses the right arrow key THEN the Gallery System SHALL navigate to the next image
Thoughts: This is keyboard interaction. We can test by simulating keypress events and verifying navigation occurs.
Testable: yes - property

4.2 WHEN the lightbox is open and a user presses the left arrow key THEN the Gallery System SHALL navigate to the previous image
Thoughts: Same as 4.1 but for previous navigation.
Testable: yes - property

4.3 WHEN the lightbox is open and a user presses the Escape key THEN the Gallery System SHALL close the lightbox
Thoughts: Keyboard interaction for closing. We can test by simulating Escape key and verifying lightbox closes.
Testable: yes - property

4.4 WHEN the lightbox is open and a user presses the Home key THEN the Gallery System SHALL navigate to the first image
Thoughts: Keyboard navigation to first image. Testable by simulating Home key and checking index.
Testable: yes - property

4.5 WHEN the lightbox is open and a user presses the End key THEN the Gallery System SHALL navigate to the last image
Thoughts: Keyboard navigation to last image. Testable by simulating End key and checking index.
Testable: yes - property

4.6 WHEN thumbnail images receive focus THEN the Gallery System SHALL display a visible focus indicator
Thoughts: This is about CSS styling for focus states. Difficult to test programmatically without visual testing.
Testable: no

4.7 WHEN a user presses Enter or Space on a focused thumbnail THEN the Gallery System SHALL open the lightbox with that image
Thoughts: Keyboard activation of thumbnails. We can test by simulating key events on focused elements.
Testable: yes - property

5.1 WHEN a user performs a pinch gesture on a lightbox image THEN the Gallery System SHALL zoom the image proportionally to the pinch distance
Thoughts: This is about touch gesture handling. We can test by simulating touch events with varying distances and checking zoom levels.
Testable: yes - property

5.2 WHEN a user double-taps a lightbox image THEN the Gallery System SHALL toggle between fit-to-screen and zoomed states
Thoughts: Double-tap gesture handling. We can test by simulating double-tap events and verifying zoom state toggles.
Testable: yes - property

5.3 WHEN an image is zoomed THEN the Gallery System SHALL allow panning by dragging
Thoughts: This is about pan behavior when zoomed. We can test by setting zoom state and simulating drag gestures.
Testable: yes - property

5.4 WHEN a user swipes left with sufficient velocity THEN the Gallery System SHALL navigate to the next image
Thoughts: Swipe gesture detection. We can test with various swipe distances and verify navigation threshold.
Testable: yes - property

5.5 WHEN a user swipes right with sufficient velocity THEN the Gallery System SHALL navigate to the previous image
Thoughts: Same as 5.4 but for right swipe.
Testable: yes - property

5.6 WHEN touch targets are rendered THEN the Gallery System SHALL ensure minimum touch target sizes of 44x44 pixels
Thoughts: This is about element sizing. We can test by querying rendered elements and checking their dimensions.
Testable: yes - property

6.1 WHEN images are rendered THEN the Gallery System SHALL provide descriptive alt text for each image
Thoughts: This is about HTML attributes. We can test by rendering images and verifying alt attributes are present and non-empty.
Testable: yes - property

6.2 WHEN the lightbox opens THEN the Gallery System SHALL announce the current image position and total count to screen readers
Thoughts: This is about ARIA live regions or announcements. We can test by checking for aria-live regions with appropriate content.
Testable: yes - property

6.3 WHEN navigation controls are rendered THEN the Gallery System SHALL include ARIA labels describing their function
Thoughts: This is about aria-label attributes on buttons. We can test by querying controls and verifying labels exist.
Testable: yes - property

6.4 WHEN the lightbox state changes THEN the Gallery System SHALL manage focus appropriately to prevent focus loss
Thoughts: This is about focus management. We can test by opening/closing lightbox and verifying focus moves to appropriate elements.
Testable: yes - property

6.5 WHEN interactive elements are rendered THEN the Gallery System SHALL ensure proper tab order and keyboard accessibility
Thoughts: This is about tab index and keyboard navigation. We can test by simulating tab key presses and verifying order.
Testable: yes - property

6.6 WHEN the gallery filter tabs are rendered THEN the Gallery System SHALL use proper ARIA roles and states
Thoughts: This is about ARIA attributes on tab components. We can test by querying tabs and verifying role and aria-selected attributes.
Testable: yes - property

7.1 WHEN the lightbox opens or closes THEN the Gallery System SHALL animate the transition with a fade effect
Thoughts: This is about CSS transitions or animations. Difficult to test without visual testing tools.
Testable: no

7.2 WHEN navigating between images in the lightbox THEN the Gallery System SHALL use a slide or crossfade transition
Thoughts: This is about animation implementation. Difficult to test programmatically.
Testable: no

7.3 WHEN hovering over thumbnails THEN the Gallery System SHALL apply smooth scale and shadow transitions
Thoughts: This is about CSS hover effects. Difficult to test without visual testing.
Testable: no

7.4 WHEN images finish loading THEN the Gallery System SHALL fade them in smoothly
Thoughts: This is about load animations. Difficult to test programmatically.
Testable: no

7.5 WHEN animations execute THEN the Gallery System SHALL respect user preferences for reduced motion
Thoughts: This is about checking prefers-reduced-motion media query. We can test by mocking the media query and verifying animations are disabled.
Testable: yes - property

8.1 WHEN the lightbox is open on desktop THEN the Gallery System SHALL display a thumbnail strip at the bottom
Thoughts: This is about conditional rendering based on screen size. We can test by mocking viewport size and checking for thumbnail strip.
Testable: yes - example

8.2 WHEN thumbnails are displayed THEN the Gallery System SHALL highlight the currently active thumbnail
Thoughts: This is about visual state. We can test by checking for active class or style on the current thumbnail.
Testable: yes - property

8.3 WHEN a user clicks a thumbnail THEN the Gallery System SHALL navigate to that image immediately
Thoughts: This is click handling. We can test by simulating clicks on thumbnails and verifying index changes.
Testable: yes - property

8.4 WHEN the thumbnail strip contains many images THEN the Gallery System SHALL make it horizontally scrollable
Thoughts: This is about overflow behavior. We can test by rendering many thumbnails and checking for scroll container.
Testable: yes - example

8.5 WHEN the active thumbnail changes THEN the Gallery System SHALL auto-scroll to keep it visible in the thumbnail strip
Thoughts: This is about scroll behavior. We can test by changing active index and verifying scrollIntoView is called.
Testable: yes - property

9.1 WHEN an image begins loading THEN the Gallery System SHALL display a loading spinner or skeleton placeholder
Thoughts: This is about loading state UI. We can test by checking for loading indicators before images load.
Testable: yes - property

9.2 WHEN multiple images are loading THEN the Gallery System SHALL show progress indicators for each
Thoughts: This is about per-image loading states. We can test by rendering multiple images and verifying each has its own indicator.
Testable: yes - property

9.3 WHEN an image successfully loads THEN the Gallery System SHALL remove the loading indicator smoothly
Thoughts: This is about state transition. We can test by verifying loading indicator is removed after image loads.
Testable: yes - property

9.4 WHEN the gallery tab changes THEN the Gallery System SHALL show a loading state during the transition
Thoughts: This is about filter change feedback. We can test by changing filters and checking for loading state.
Testable: yes - property

9.5 WHEN images are being preloaded in the background THEN the Gallery System SHALL not block user interaction
Thoughts: This is about non-blocking behavior. We can test that UI remains interactive during preloading.
Testable: yes - property

10.1 WHEN viewing the gallery on mobile THEN the Gallery System SHALL use a single-column layout for thumbnails
Thoughts: This is about responsive layout. We can test by mocking mobile viewport and checking grid columns.
Testable: yes - example

10.2 WHEN the lightbox opens on mobile THEN the Gallery System SHALL use the full screen without margins
Thoughts: This is about fullscreen mode. We can test by checking Dialog fullScreen prop on mobile.
Testable: yes - example

10.3 WHEN touch controls are rendered on mobile THEN the Gallery System SHALL use larger touch targets than desktop
Thoughts: This is about conditional sizing. We can test by comparing button sizes between mobile and desktop viewports.
Testable: yes - property

10.4 WHEN the device orientation changes THEN the Gallery System SHALL adapt the layout appropriately
Thoughts: This is about orientation change handling. We can test by simulating orientation change events and verifying layout updates.
Testable: yes - property

10.5 WHEN viewing on extra small screens (under 400px) THEN the Gallery System SHALL adjust font sizes and spacing for readability
Thoughts: This is about responsive typography. We can test by mocking small viewport and checking computed styles.
Testable: yes - example

### Property Reflection

After reviewing all testable properties, I've identified the following areas for consolidation:

**Keyboard Navigation (4.1, 4.2, 4.3, 4.4, 4.5, 4.7)**: These can be consolidated into a single comprehensive property that tests all keyboard interactions rather than separate properties for each key.

**Swipe Gestures (5.4, 5.5)**: These are essentially the same property in different directions and can be combined.

**Loading Indicators (9.1, 9.2, 9.3)**: These describe the same loading state lifecycle and can be combined into one property about loading state management.

**Mobile Layout (10.1, 10.2)**: These are both examples of mobile-specific rendering and can be verified together.

The remaining properties provide unique validation value and should be kept separate.

### Correctness Properties

Property 1: Filter change clears previous images
_For any_ sequence of filter changes, after applying a new filter, the displayed image set should contain only images matching the current filter with no images from previous filters
**Validates: Requirements 1.1, 1.4**

Property 2: Lightbox state resets on filter change
_For any_ gallery state where the lightbox is open, when the filter changes, the lightbox should either close or reset to display only images from the new filter
**Validates: Requirements 1.2**

Property 3: Loading indicator during filter transition
_For any_ filter change operation, a loading indicator should be visible from the moment the filter changes until the new images are ready to display
**Validates: Requirements 1.3, 9.4**

Property 4: Image preloading for adjacent images
_For any_ lightbox state with a current index, the images at index-1 and index+1 (wrapping at boundaries) should be preloaded
**Validates: Requirements 3.2**

Property 5: Loading state presence before image load
_For any_ image that hasn't completed loading, a loading indicator (spinner or skeleton) should be visible in its place
**Validates: Requirements 3.3, 9.1, 9.2, 9.3**

Property 6: Fallback for failed image loads
_For any_ image URL that fails to load, the system should display a fallback image or error state instead of broken image
**Validates: Requirements 3.4**

Property 7: Optimized image URLs include size parameters
_For any_ image rendered in a specific viewport size, the requested URL should include appropriate width/height parameters for optimization
**Validates: Requirements 3.5**

Property 8: Keyboard navigation in lightbox
_For any_ open lightbox state, pressing arrow keys should navigate between images, Escape should close the lightbox, Home should go to first image, End should go to last image, and Enter/Space on thumbnails should open the lightbox
**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.7**

Property 9: Pinch zoom proportionality
_For any_ pinch gesture with a given scale factor, the image zoom level should change proportionally to the pinch distance
**Validates: Requirements 5.1**

Property 10: Double-tap zoom toggle
_For any_ lightbox image, double-tapping should toggle between zoomed and fit-to-screen states
**Validates: Requirements 5.2**

Property 11: Pan enabled when zoomed
_For any_ zoomed image state (zoom > 1), drag gestures should pan the image position
**Validates: Requirements 5.3**

Property 12: Swipe navigation threshold
_For any_ swipe gesture exceeding the threshold distance (50px), the system should navigate to the next (left swipe) or previous (right swipe) image
**Validates: Requirements 5.4, 5.5**

Property 13: Minimum touch target size
_For any_ interactive element in the gallery, the rendered size should be at least 44x44 pixels to meet touch accessibility standards
**Validates: Requirements 5.6**

Property 14: Alt text presence
_For any_ rendered image, the img element should have a non-empty alt attribute
**Validates: Requirements 6.1**

Property 15: Screen reader announcements
_For any_ lightbox state change, appropriate ARIA live regions or labels should announce the current position (e.g., "Image 3 of 12")
**Validates: Requirements 6.2**

Property 16: ARIA labels on controls
_For any_ navigation control (next, previous, close buttons), the element should have an aria-label describing its function
**Validates: Requirements 6.3**

Property 17: Focus management on state changes
_For any_ lightbox open/close operation, focus should move to an appropriate element (lightbox content when opening, trigger element when closing)
**Validates: Requirements 6.4**

Property 18: Tab order and keyboard accessibility
_For any_ interactive element in the gallery, it should be reachable via Tab key in logical order and activatable via Enter/Space
**Validates: Requirements 6.5**

Property 19: ARIA roles on filter tabs
_For any_ filter tab element, it should have role="tab" and appropriate aria-selected state
**Validates: Requirements 6.6**

Property 20: Reduced motion preference
_For any_ animation or transition, when prefers-reduced-motion is set, animations should be disabled or significantly reduced
**Validates: Requirements 7.5**

Property 21: Active thumbnail highlighting
_For any_ lightbox state with current index N, the thumbnail at index N should have visual indication (class or style) of being active
**Validates: Requirements 8.2**

Property 22: Thumbnail click navigation
_For any_ thumbnail click event at index N, the lightbox should immediately navigate to display image N
**Validates: Requirements 8.3**

Property 23: Thumbnail auto-scroll
_For any_ active thumbnail change, if the thumbnail is outside the visible scroll area, the container should scroll to make it visible
**Validates: Requirements 8.5**

Property 24: Non-blocking preload
_For any_ background image preloading operation, user interactions with the gallery should remain responsive and not be blocked
**Validates: Requirements 9.5**

Property 25: Mobile touch target sizing
_For any_ interactive element on mobile viewport (< 600px), the rendered size should be larger than the desktop equivalent
**Validates: Requirements 10.3**

Property 26: Orientation change adaptation
_For any_ device orientation change event, the gallery layout should update to match the new viewport dimensions
**Validates: Requirements 10.4**

## Error Handling

### Image Loading Errors

- **Network Failures**: Display fallback image with retry button
- **Invalid URLs**: Log error and show placeholder
- **Timeout**: Show loading state for max 10 seconds, then fallback
- **CORS Issues**: Detect and log for debugging

### State Management Errors

- **Invalid Index**: Clamp to valid range [0, images.length - 1]
- **Empty Image Array**: Display empty state message
- **Filter Mismatch**: Reset to "all" filter if invalid filter value

### Touch Gesture Errors

- **Conflicting Gestures**: Prioritize zoom over pan, pan over swipe
- **Invalid Touch Points**: Ignore gestures with < 1 or > 2 touch points
- **Gesture Cancellation**: Reset gesture state on touchcancel event

### Accessibility Errors

- **Missing Alt Text**: Use filename as fallback
- **Focus Trap**: Ensure Escape key always works to exit
- **Screen Reader**: Provide fallback text for all interactive elements

## Testing Strategy

### Unit Testing

We'll use React Testing Library and Jest for unit tests covering:

- Component rendering with various props
- Event handler functions (click, keyboard, touch)
- State transitions and updates
- Error boundary behavior
- Utility function correctness

### Property-Based Testing

We'll use `fast-check` (a property-based testing library for TypeScript/JavaScript) for property-based tests. Each property-based test will run a minimum of 100 iterations to ensure thorough coverage of the input space.

Each property-based test MUST be tagged with a comment explicitly referencing the correctness property from this design document using the format: `**Feature: image-gallery-improvements, Property {number}: {property_text}**`

Property-based tests will verify:

- Filter changes always result in correct image sets (Properties 1, 2, 3)
- Image preloading and loading states work across all indices (Properties 4, 5)
- Keyboard navigation works for all valid key combinations and indices (Property 8)
- Touch gestures correctly detect swipes, pinches, and taps across various input patterns (Properties 9, 10, 11, 12)
- Accessibility attributes are present for all rendered elements (Properties 14, 15, 16, 17, 18, 19)
- Responsive behavior adapts correctly across viewport sizes (Properties 25, 26)

### Integration Testing

- Full user flows: browse grid → open lightbox → navigate → close
- Filter switching with lightbox open/closed
- Mobile vs desktop rendering differences
- Keyboard and mouse navigation combinations

### Visual Regression Testing

- Screenshot comparison for layout changes
- Animation and transition verification
- Responsive breakpoint testing

### Accessibility Testing

- Automated testing with jest-axe
- Manual screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation testing
- Color contrast verification

### Performance Testing

- Lighthouse scores for gallery page
- Image loading time measurements
- Memory usage during extended browsing
- Frame rate during animations and transitions

## Implementation Notes

### MUI Migration

- Replace `Grid` with `Grid2` from `@mui/material`
- Replace `PaperProps` with `slotProps={{ paper: {...} }}`
- Test responsive behavior after migration

### Image Optimization

Firebase Storage supports URL parameters for image transformation:

- Add `&w=<width>` for width constraints
- Add `&h=<height>` for height constraints
- Consider implementing srcset for responsive images

### Performance Considerations

- Use `React.memo` for thumbnail components
- Implement virtual scrolling if image count exceeds 100
- Debounce resize handlers
- Use CSS transforms for animations (GPU acceleration)

### Browser Compatibility

- Test touch gestures on iOS Safari, Chrome Android
- Verify keyboard navigation on all major browsers
- Ensure fallbacks for older browsers without IntersectionObserver

### Future Enhancements

- Image sharing functionality
- Fullscreen API integration
- Download image option
- Slideshow mode with auto-advance
- Image comparison slider for before/after views
