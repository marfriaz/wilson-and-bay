# Implementation Plan

- [x] 1. Refactor SpaceCard component to support horizontal layout mode

  - Add optional `layoutMode` prop to SpaceCardProps interface ('vertical' | 'horizontal')
  - Implement conditional rendering logic based on layoutMode
  - Create horizontal layout structure with two side-by-side boxes (text left, image right)
  - Apply flexbox styling for horizontal mode: display flex, flexDirection row, equal flex basis for both boxes
  - Maintain existing vertical layout for mobile carousel
  - _Requirements: 1.1, 1.2, 1.3, 3.3, 3.4_

- [ ]\* 1.1 Write property test for horizontal element ordering

  - **Property 2: Horizontal element ordering**
  - **Validates: Requirements 1.2, 1.3**

- [ ]\* 1.2 Write property test for equal width allocation

  - **Property 8: Equal width allocation**
  - **Validates: Requirements 3.3**

- [x] 2. Update non-mobile layout rendering in Spaces component

  - Replace Grid2 container with Box container for vertical stacking
  - Map through spaces array and render SpaceCard with layoutMode="horizontal"
  - Apply consistent spacing between stacked space rectangles (mb: 4 or similar)
  - Ensure full-width rectangles within the container
  - _Requirements: 1.1, 1.4_

- [ ]\* 2.1 Write property test for vertical stacking consistency

  - **Property 3: Vertical stacking consistency**
  - **Validates: Requirements 1.4**

- [ ]\* 2.2 Write property test for responsive layout switching

  - **Property 1: Responsive layout switching**
  - **Validates: Requirements 1.1, 1.5**

- [x] 3. Style the horizontal text box

  - Ensure text box contains title, stats, description, and CTA in vertical order
  - Apply appropriate padding and internal spacing
  - Set flex: 1 for equal width distribution
  - Use flexDirection: 'column' for vertical text stacking
  - Prevent text overflow with proper overflow handling
  - _Requirements: 2.1, 2.3_

- [ ]\* 3.1 Write property test for text content completeness

  - **Property 4: Text content completeness**
  - **Validates: Requirements 2.1**

- [ ]\* 3.2 Write property test for text overflow prevention

  - **Property 5: Text overflow prevention**
  - **Validates: Requirements 2.3**

- [x] 4. Style the horizontal image box

  - Set flex: 1 for equal width distribution
  - Apply width: '100%' and height: '100%' to image
  - Use objectFit: 'cover' to maintain aspect ratio and fill container
  - Ensure image aligns vertically with text box
  - _Requirements: 3.1, 3.2, 3.4_

- [ ]\* 4.1 Write property test for image aspect ratio preservation

  - **Property 7: Image aspect ratio preservation**
  - **Validates: Requirements 3.1, 3.2**

- [x] 5. Implement hover effects for horizontal layout

  - Add hover styles to space rectangle (elevation change, border, or subtle color shift)
  - Maintain existing CTA link hover behavior (color change, underline)
  - Use &:hover pseudo-selector in sx prop
  - Ensure hover effects are smooth with transitions
  - _Requirements: 2.4, 4.2_

- [ ]\* 5.1 Write unit test for CTA hover feedback

  - Test that hovering over CTA link triggers style changes
  - _Requirements: 2.4_

- [ ]\* 5.2 Write unit test for rectangle hover feedback

  - Test that hovering over space rectangle triggers visual feedback
  - _Requirements: 4.2_

- [x] 6. Apply consistent styling and theming

  - Apply shadows, borders, or background colors to space rectangles
  - Ensure styling matches site theme using Material-UI theme values
  - Maintain consistency across all space rectangles
  - Verify "Our Spaces" heading styling remains unchanged
  - _Requirements: 4.1, 4.3_

- [ ]\* 6.1 Write property test for consistent styling application

  - **Property 10: Consistent styling application**
  - **Validates: Requirements 4.1**

- [x] 7. Ensure accessibility compliance

  - Verify semantic HTML structure with proper heading hierarchy (h2 for section, h3 for space titles)
  - Ensure all images have descriptive alt text
  - Test keyboard navigation (Tab to focus, Enter to activate)
  - Verify visible focus indicators meet WCAG standards
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]\* 7.1 Write property test for semantic HTML structure

  - **Property 12: Semantic HTML structure**
  - **Validates: Requirements 5.1**

- [ ]\* 7.2 Write property test for image alt text presence

  - **Property 13: Image alt text presence**
  - **Validates: Requirements 5.2**

- [ ]\* 7.3 Write property test for keyboard accessibility

  - **Property 14: Keyboard accessibility**
  - **Validates: Requirements 5.3, 5.4**

- [x] 8. Test responsive behavior and mobile preservation

  - Verify mobile carousel behavior remains unchanged
  - Test layout switching at md breakpoint
  - Ensure no layout shifts during viewport resize
  - Test with different numbers of spaces (2 vs 3 with The Loft enabled)
  - _Requirements: 1.5, 4.4_

- [ ]\* 8.1 Write unit tests for mobile carousel preservation

  - Test that mobile view still renders carousel with navigation buttons
  - Test swipe gesture handlers remain functional
  - _Requirements: 1.5_

- [x] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
