# Implementation Plan

- [x] 1. Install dependencies and set up testing infrastructure

  - Install fast-check for property-based testing
  - Install jest-axe for accessibility testing
  - Configure test environment for touch event simulation
  - _Requirements: All (testing foundation)_

- [x] 2. Create shared utility functions and helpers

  - [x] 2.1 Implement image optimization utility

    - Create `getOptimizedImageUrl` function to add width/height parameters to Firebase URLs
    - Handle edge cases for URLs that already have parameters
    - _Requirements: 3.5_

  - [ ]\* 2.2 Write property test for image URL optimization

    - **Property 7: Optimized image URLs include size parameters**
    - **Validates: Requirements 3.5**

  - [x] 2.3 Implement image preloader utility

    - Create `createImageLoader` function that returns a Promise for image loading
    - Handle loading errors and timeouts
    - _Requirements: 3.2, 3.4_

  - [x] 2.4 Implement accessibility helper functions

    - Create `getImageAriaLabel` for screen reader announcements
    - Create `shouldReduceMotion` to check prefers-reduced-motion
    - _Requirements: 6.2, 7.5_

  - [ ]\* 2.5 Write property test for reduced motion preference
    - **Property 20: Reduced motion preference**
    - **Validates: Requirements 7.5**

- [x] 3. Create custom hooks for shared functionality

  - [x] 3.1 Implement useImageLightbox hook

    - Create hook with state management for lightbox (isOpen, currentIndex)
    - Implement open, close, next, previous, goTo functions
    - Add proper cleanup on unmount
    - _Requirements: 1.1, 1.2, 1.4_

  - [ ]\* 3.2 Write property test for lightbox state management

    - **Property 1: Filter change clears previous images**
    - **Property 2: Lightbox state resets on filter change**
    - **Validates: Requirements 1.1, 1.2, 1.4**

  - [x] 3.3 Implement useKeyboardNavigation hook

    - Add event listeners for arrow keys, Escape, Home, End, Enter, Space
    - Handle cleanup of event listeners
    - Only activate when isActive is true
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.7_

  - [ ]\* 3.4 Write property test for keyboard navigation

    - **Property 8: Keyboard navigation in lightbox**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.7**

  - [x] 3.5 Implement useImagePreloader hook

    - Preload images at currentIndex - 1 and currentIndex + 1
    - Track loading state and loaded indices
    - Handle wrapping at array boundaries
    - _Requirements: 3.2_

  - [ ]\* 3.6 Write property test for image preloading

    - **Property 4: Image preloading for adjacent images**
    - **Validates: Requirements 3.2**

  - [x] 3.7 Implement useTouchGestures hook

    - Track touch start, move, and end positions
    - Detect swipe left/right with threshold (50px)
    - Detect pinch gestures with scale calculation
    - Detect double-tap with timing threshold
    - _Requirements: 5.1, 5.2, 5.4, 5.5_

  - [ ]\* 3.8 Write property test for swipe gesture detection

    - **Property 12: Swipe navigation threshold**
    - **Validates: Requirements 5.4, 5.5**

  - [ ]\* 3.9 Write property test for pinch zoom

    - **Property 9: Pinch zoom proportionality**
    - **Validates: Requirements 5.1**

  - [ ]\* 3.10 Write property test for double-tap zoom

    - **Property 10: Double-tap zoom toggle**
    - **Validates: Requirements 5.2**

  - [x] 3.11 Implement useImageZoom hook

    - Manage zoom level (1-3x) and position state
    - Implement handlePinch, handleDoubleTap, handlePan functions
    - Add reset function to return to default state
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]\* 3.12 Write property test for pan when zoomed
    - **Property 11: Pan enabled when zoomed**
    - **Validates: Requirements 5.3**

- [x] 4. Migrate ImageGallery component from deprecated MUI components

  - [x] 4.1 Replace Grid with Grid2

    - Update all Grid imports to Grid2
    - Verify responsive behavior matches original
    - Test on mobile and desktop viewports
    - _Requirements: 2.1, 2.4_

  - [x] 4.2 Replace PaperProps with slotProps

    - Update Dialog PaperProps to slotProps={{ paper: {...} }}
    - Verify styling remains identical
    - _Requirements: 2.2, 2.4_

  - [x] 4.3 Verify no deprecation warnings
    - Run build and check console for warnings
    - _Requirements: 2.3_

- [x] 5. Migrate Gallery page component from deprecated MUI components

  - [x] 5.1 Replace Grid with Grid2

    - Update all Grid imports to Grid2
    - Verify responsive grid layout
    - _Requirements: 2.1, 2.4_

  - [x] 5.2 Replace PaperProps with slotProps
    - Update Dialog PaperProps to slotProps={{ paper: {...} }}
    - _Requirements: 2.2, 2.4_

- [x] 6. Fix filter change bug in Gallery page

  - [x] 6.1 Add loading state during filter transitions

    - Add isTransitioning state variable
    - Show loading indicator when filter changes
    - Clear loading state when images are ready
    - _Requirements: 1.3, 9.4_

  - [ ]\* 6.2 Write property test for loading indicator during transition

    - **Property 3: Loading indicator during filter transition**
    - **Validates: Requirements 1.3, 9.4**

  - [x] 6.3 Reset lightbox state on filter change

    - Close lightbox when filter changes
    - Reset currentImageIndex to null
    - Clear any cached image references
    - _Requirements: 1.2_

  - [x] 6.4 Ensure filtered images update immediately

    - Use useEffect to respond to filter changes
    - Clear previous image array before setting new one
    - _Requirements: 1.1, 1.4_

  - [ ]\* 6.5 Write property test for filter change correctness
    - **Property 1: Filter change clears previous images**
    - **Property 2: Lightbox state resets on filter change**
    - **Validates: Requirements 1.1, 1.2, 1.4**

- [-] 7. Implement loading states and skeleton loaders

  - [x] 7.1 Create skeleton loader component

    - Build reusable Skeleton component for image placeholders
    - Match aspect ratios of actual images
    - Add subtle animation
    - _Requirements: 3.3_

  - [x] 7.2 Add loading state to thumbnail images

    - Track loading state for each image
    - Show skeleton until image loads
    - Fade in image when loaded
    - _Requirements: 3.3, 9.1, 9.2, 9.3_

  - [ ]\* 7.3 Write property test for loading state management

    - **Property 5: Loading state presence before image load**
    - **Validates: Requirements 3.3, 9.1, 9.2, 9.3**

  - [x] 7.4 Add error fallback for failed images

    - Detect image load errors
    - Display fallback placeholder image
    - Add retry button for failed images
    - _Requirements: 3.4_

  - [ ]\* 7.5 Write property test for image load fallback
    - **Property 6: Fallback for failed image loads**
    - **Validates: Requirements 3.4**

- [x] 8. Implement lazy loading for gallery grid

  - [ ] 8.1 Add lazy loading to thumbnail images

    - Set loading="lazy" on images outside initial viewport
    - Use loading="eager" for first row of images
    - _Requirements: 3.1_

  - [ ] 8.2 Integrate useImagePreloader in lightbox

    - Call useImagePreloader hook with current index
    - Preload adjacent images when lightbox opens
    - _Requirements: 3.2_

  - [ ]\* 8.3 Write property test for non-blocking preload
    - **Property 24: Non-blocking preload**
    - **Validates: Requirements 9.5**

- [x] 9. Add keyboard navigation to lightbox

  - [x] 9.1 Integrate useKeyboardNavigation hook

    - Add hook to both ImageGallery and Gallery components
    - Pass navigation handlers (next, previous, close, goTo)
    - Activate only when lightbox is open
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 9.2 Add keyboard activation to thumbnails

    - Make thumbnails focusable with tabIndex
    - Add onKeyDown handler for Enter and Space keys
    - Ensure visible focus indicators
    - _Requirements: 4.6, 4.7_

  - [ ]\* 9.3 Write property test for keyboard navigation
    - **Property 8: Keyboard navigation in lightbox**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.7**

- [ ] 10. Implement touch gestures and zoom functionality

  - [ ] 10.1 Integrate useTouchGestures hook in lightbox

    - Replace existing touch handlers with hook
    - Connect swipe handlers to navigation
    - Add pinch and double-tap handlers
    - _Requirements: 5.1, 5.2, 5.4, 5.5_

  - [ ] 10.2 Integrate useImageZoom hook in lightbox

    - Add zoom state management to lightbox
    - Apply zoom transform to image element
    - Enable panning when zoomed
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ] 10.3 Ensure minimum touch target sizes

    - Set minimum width/height of 44px for mobile buttons
    - Increase button sizes on mobile viewports
    - _Requirements: 5.6_

  - [ ]\* 10.4 Write property test for touch target sizing
    - **Property 13: Minimum touch target size**
    - **Property 25: Mobile touch target sizing**
    - **Validates: Requirements 5.6, 10.3**

- [ ] 11. Enhance accessibility features

  - [ ] 11.1 Add comprehensive alt text

    - Ensure all images have descriptive alt attributes
    - Use filename as fallback if alt is missing
    - _Requirements: 6.1_

  - [ ]\* 11.2 Write property test for alt text presence

    - **Property 14: Alt text presence**
    - **Validates: Requirements 6.1**

  - [ ] 11.3 Add screen reader announcements

    - Add aria-live region for lightbox state changes
    - Announce "Image X of Y" when navigating
    - Update aria-label on lightbox container
    - _Requirements: 6.2_

  - [ ]\* 11.4 Write property test for screen reader announcements

    - **Property 15: Screen reader announcements**
    - **Validates: Requirements 6.2**

  - [ ] 11.5 Add ARIA labels to navigation controls

    - Add aria-label to next/previous/close buttons
    - Ensure labels are descriptive ("Next image", "Previous image", "Close gallery")
    - _Requirements: 6.3_

  - [ ]\* 11.6 Write property test for ARIA labels on controls

    - **Property 16: ARIA labels on controls**
    - **Validates: Requirements 6.3**

  - [ ] 11.7 Implement focus management

    - Move focus to lightbox when opening
    - Return focus to trigger element when closing
    - Trap focus within lightbox when open
    - _Requirements: 6.4_

  - [ ]\* 11.8 Write property test for focus management

    - **Property 17: Focus management on state changes**
    - **Validates: Requirements 6.4**

  - [ ] 11.9 Ensure proper tab order

    - Set appropriate tabIndex values
    - Test tab navigation through all interactive elements
    - _Requirements: 6.5_

  - [ ]\* 11.10 Write property test for tab order

    - **Property 18: Tab order and keyboard accessibility**
    - **Validates: Requirements 6.5**

  - [ ] 11.11 Add ARIA roles to filter tabs

    - Ensure tabs have role="tab"
    - Add aria-selected to active tab
    - Add role="tablist" to tab container
    - _Requirements: 6.6_

  - [ ]\* 11.12 Write property test for ARIA roles on tabs
    - **Property 19: ARIA roles on filter tabs**
    - **Validates: Requirements 6.6**

- [ ] 12. Add smooth transitions and animations

  - [ ] 12.1 Add fade transition to lightbox open/close

    - Use MUI Fade component or CSS transitions
    - Set appropriate duration (200-300ms)
    - _Requirements: 7.1_

  - [ ] 12.2 Add slide/crossfade for image navigation

    - Implement transition between images in lightbox
    - Use CSS transforms for smooth animation
    - _Requirements: 7.2_

  - [ ] 12.3 Add hover effects to thumbnails

    - Add scale transform on hover
    - Add box-shadow transition
    - Use smooth timing function
    - _Requirements: 7.3_

  - [ ] 12.4 Add fade-in for loaded images

    - Transition opacity from 0 to 1 when image loads
    - Use CSS transition or animation
    - _Requirements: 7.4_

  - [ ] 12.5 Respect prefers-reduced-motion
    - Check media query in shouldReduceMotion utility
    - Disable or reduce animations when preference is set
    - _Requirements: 7.5_

- [ ] 13. Implement thumbnail strip in lightbox

  - [ ] 13.1 Create thumbnail strip component

    - Build horizontal scrollable container
    - Render small thumbnails for all images
    - Show only on desktop (hide on mobile)
    - _Requirements: 8.1, 8.4_

  - [ ] 13.2 Add active thumbnail highlighting

    - Apply active class/style to current thumbnail
    - Use border or background color to indicate active state
    - _Requirements: 8.2_

  - [ ]\* 13.3 Write property test for active thumbnail highlighting

    - **Property 21: Active thumbnail highlighting**
    - **Validates: Requirements 8.2**

  - [ ] 13.4 Add click handler to thumbnails

    - Navigate to clicked image immediately
    - Update lightbox current index
    - _Requirements: 8.3_

  - [ ]\* 13.5 Write property test for thumbnail click navigation

    - **Property 22: Thumbnail click navigation**
    - **Validates: Requirements 8.3**

  - [ ] 13.6 Implement auto-scroll for active thumbnail

    - Use scrollIntoView when active thumbnail changes
    - Ensure smooth scrolling behavior
    - Keep active thumbnail centered when possible
    - _Requirements: 8.5_

  - [ ]\* 13.7 Write property test for thumbnail auto-scroll
    - **Property 23: Thumbnail auto-scroll**
    - **Validates: Requirements 8.5**

- [ ] 14. Optimize for mobile responsiveness

  - [ ] 14.1 Adjust grid layout for mobile

    - Use single column on mobile viewports
    - Adjust spacing and padding for small screens
    - _Requirements: 10.1_

  - [ ] 14.2 Ensure fullscreen lightbox on mobile

    - Set fullScreen prop based on isMobile
    - Remove margins on mobile
    - _Requirements: 10.2_

  - [ ] 14.3 Increase touch target sizes on mobile

    - Use larger button sizes on mobile (48px vs 36px)
    - Increase padding on interactive elements
    - _Requirements: 10.3_

  - [ ] 14.4 Handle orientation changes

    - Add event listener for orientationchange
    - Update layout when orientation changes
    - Re-calculate image dimensions
    - _Requirements: 10.4_

  - [ ]\* 14.5 Write property test for orientation change

    - **Property 26: Orientation change adaptation**
    - **Validates: Requirements 10.4**

  - [ ] 14.5 Adjust typography for extra small screens
    - Reduce font sizes on screens under 400px
    - Adjust spacing and padding
    - Ensure readability
    - _Requirements: 10.5_

- [ ] 15. Final integration and testing

  - [ ] 15.1 Integrate all improvements into ImageGallery component

    - Wire up all hooks and utilities
    - Test component in isolation
    - Verify all features work together
    - _Requirements: All_

  - [ ] 15.2 Integrate all improvements into Gallery page component

    - Wire up all hooks and utilities
    - Test filter switching with all new features
    - Verify bug fix for cached images
    - _Requirements: All_

  - [ ]\* 15.3 Run full test suite

    - Execute all unit tests
    - Execute all property-based tests
    - Verify test coverage meets requirements
    - _Requirements: All_

  - [ ]\* 15.4 Perform accessibility audit

    - Run jest-axe tests
    - Manual screen reader testing
    - Keyboard-only navigation testing
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [ ] 15.5 Test on multiple devices and browsers
    - Test on iOS Safari, Chrome Android
    - Test on desktop Chrome, Firefox, Safari
    - Verify touch gestures work correctly
    - Verify keyboard navigation works correctly
    - _Requirements: All_

- [ ] 16. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
