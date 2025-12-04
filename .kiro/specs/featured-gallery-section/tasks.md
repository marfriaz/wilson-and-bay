# Implementation Plan

- [x] 1. Create featured images constant array

  - Add `featuredImages` array to `src/constants.ts` with 12-15 curated images from existing Wilson Room and Courtyard collections
  - Include id, src, alt, and space properties for each image
  - Export the array for use in components
  - _Requirements: 1.3, 4.1, 4.2, 4.5_

- [ ]\* 1.1 Write property test for featured image structure

  - **Property 7: Featured image structure**
  - **Validates: Requirements 4.2**

- [x] 2. Create image selection utility function

  - Create `src/utils/imageUtils.ts` if it doesn't exist
  - Implement `selectRandomImages` function that takes an array and count parameter
  - Function should shuffle array and return specified number of random images
  - Handle edge case where source array has fewer images than requested count
  - _Requirements: 1.3, 4.3_

- [ ]\* 2.1 Write property test for random selection validity

  - **Property 8: Random selection validity**
  - **Validates: Requirements 4.3**

- [ ]\* 2.2 Write property test for image count consistency

  - **Property 1: Image count consistency**
  - **Validates: Requirements 1.3**

- [x] 3. Create FeaturedGallery component skeleton

  - Create `src/components/FeaturedGallery.tsx`
  - Define component interface and props (no props needed)
  - Set up state management: currentSlide, displayedImages, touch tracking
  - Import necessary MUI components and hooks
  - Add basic component structure with section container
  - _Requirements: 1.1, 1.2_

- [x] 4. Implement section heading and CTA button

  - Add "In Use" heading using Typography with h2 variant
  - Add "View Full Gallery →" button using MUI Button component
  - Implement navigation handler using useNavigate hook
  - Style button consistently with existing site buttons (outlined variant, borderRadius: 0)
  - Apply proper spacing and layout
  - _Requirements: 1.2, 1.5_

- [ ]\* 4.1 Write unit test for basic rendering

  - Test component renders without crashing
  - Verify heading "In Use" is present
  - Verify CTA button exists with correct text and link
  - _Requirements: 1.2, 1.5_

- [x] 5. Implement mobile carousel layout

  - Add useMediaQuery hook to detect mobile viewport (< md breakpoint)
  - Create carousel container with overflow hidden
  - Implement sliding container with transform based on currentSlide state
  - Map through displayedImages and render each in a slide
  - Add smooth transition animation (0.3s ease-in-out)
  - _Requirements: 2.1_

- [x] 6. Add carousel navigation dots

  - Create dots container below carousel
  - Map through displayedImages to create dot indicators
  - Highlight active dot based on currentSlide state
  - Make dots clickable to jump to specific slides
  - Style dots with proper spacing and colors (primary.main for active, rgba for inactive)
  - _Requirements: 2.6_

- [ ]\* 6.1 Write property test for position indicator accuracy

  - **Property 4: Position indicator accuracy**
  - **Validates: Requirements 2.6**

- [x] 7. Implement touch gesture handlers for mobile

  - Add handleTouchStart to capture initial touch position
  - Add handleTouchMove to track touch movement (optional)
  - Add handleTouchEnd to process swipe and trigger navigation
  - Implement SWIPE_THRESHOLD constant (50 pixels)
  - Only trigger navigation if swipe exceeds threshold
  - Attach handlers to carousel container
  - _Requirements: 2.2, 2.3_

- [x] 8. Implement carousel navigation logic

  - Create handleNextSlide function with circular navigation (loop to start)
  - Create handlePrevSlide function with circular navigation (loop to end)
  - Update currentSlide state appropriately
  - Ensure navigation works at boundary conditions (first/last image)
  - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [ ]\* 8.1 Write property test for swipe left navigation

  - **Property 2: Swipe left navigation**
  - **Validates: Requirements 2.2**

- [ ]\* 8.2 Write property test for swipe right navigation

  - **Property 3: Swipe right navigation**
  - **Validates: Requirements 2.3**

- [x] 9. Implement desktop grid layout

  - Create conditional rendering based on isMobile state
  - Use Grid2 component for desktop layout
  - Configure grid to show 3 columns on md, 2 columns on sm
  - Map through displayedImages and render in grid cells
  - Apply proper spacing between grid items
  - _Requirements: 3.1, 3.2_

- [ ]\* 9.1 Write property test for desktop multi-image display

  - **Property 5: Desktop multi-image display**
  - **Validates: Requirements 3.2**

- [x] 10. Add desktop hover effects

  - Apply transition styles to images (transform, box-shadow)
  - Implement hover state with scale(1.05) transform
  - Add box-shadow on hover for depth
  - Ensure smooth animation timing (0.3s ease)
  - _Requirements: 3.4_

- [ ]\* 10.1 Write property test for responsive layout adaptation

  - **Property 6: Responsive layout adaptation**
  - **Validates: Requirements 3.5**

- [x] 11. Implement image loading and error handling

  - Add loading state for images
  - Implement onError handler for failed image loads
  - Display fallback background color for failed images
  - Add fade-in animation when images load successfully
  - Use loading="lazy" for images beyond the first 2
  - _Requirements: 6.1, 6.3, 6.4_

- [ ]\* 11.1 Write property test for image load error handling

  - **Property 9: Image load error handling**
  - **Validates: Requirements 6.3**

- [x] 12. Add keyboard navigation support

  - Implement handleKeyDown function for arrow key navigation
  - Listen for ArrowLeft, ArrowRight, Home, End keys
  - Call appropriate navigation functions
  - Ensure keyboard navigation only works when component is focused
  - Add tabIndex to make carousel focusable
  - _Requirements: 7.1, 7.3, 7.5_

- [ ]\* 12.1 Write property test for keyboard navigation controls

  - **Property 10: Keyboard navigation controls**
  - **Validates: Requirements 7.1, 7.3**

- [x] 13. Implement accessibility features

  - Add descriptive alt text to all images (use alt from image data)
  - Add aria-label to navigation dots ("Go to image X")
  - Add aria-label to next/previous buttons (if added)
  - Add aria-live region for carousel position announcements
  - Update aria-live region on slide change
  - Ensure proper semantic HTML (h2 for heading, button for CTA)
  - Add visible focus indicators for keyboard navigation
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ]\* 13.1 Write property test for alt text presence

  - **Property 11: Alt text presence**
  - **Validates: Requirements 8.1**

- [ ]\* 13.2 Write property test for ARIA labels on controls

  - **Property 12: ARIA labels on controls**
  - **Validates: Requirements 8.2**

- [ ]\* 13.3 Write property test for carousel position announcement

  - **Property 13: Carousel position announcement**
  - **Validates: Requirements 8.3**

- [ ]\* 13.4 Write property test for interactive element ARIA roles

  - **Property 14: Interactive element ARIA roles**
  - **Validates: Requirements 8.5**

- [ ]\* 13.5 Write accessibility test using jest-axe

  - Test component has no accessibility violations
  - Use axe to scan rendered component
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 14. Integrate FeaturedGallery into Home page

  - Import FeaturedGallery component in `src/pages/Home.tsx`
  - Add component between About section and Spaces component
  - Ensure proper spacing and layout integration
  - Verify component doesn't interfere with other sections
  - _Requirements: 1.1_

- [ ]\* 14.1 Write integration test for Home page placement

  - Verify FeaturedGallery renders in correct position on Home page
  - Test that all sections render in correct order
  - _Requirements: 1.1_

- [x] 15. Apply consistent styling and theme integration

  - Use theme colors (background.default, primary.main, text.primary)
  - Apply consistent typography (h2 with "Oooh Baby", body1 with "Manrope")
  - Match button styling with existing site buttons
  - Ensure consistent spacing with other home page sections (py: 6-8, px: 2-3)
  - Apply proper border radius (borderRadius: 1 for images)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 16. Optimize component performance

  - Use useMemo for displayedImages to prevent re-selection on every render
  - Use useCallback for event handlers (handleNextSlide, handlePrevSlide, etc.)
  - Add loading="eager" for first 2 images, loading="lazy" for rest
  - Wrap image components in React.memo if needed
  - _Requirements: 6.2, 6.5_

- [x] 17. Final checkpoint - Ensure all tests pass
  - Run all unit tests and verify they pass
  - Run all property-based tests and verify they pass
  - Run accessibility tests and verify no violations
  - Test component manually on mobile and desktop
  - Verify keyboard navigation works correctly
  - Test with slow network to verify loading states
  - Ensure all tests pass, ask the user if questions arise
