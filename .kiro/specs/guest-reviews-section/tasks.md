# Implementation Plan: Guest Reviews Section

- [ ] 1. Add review data and Peerspace URL to constants

  - Add PEERSPACE_URL constant with the Peerspace listing URL
  - Add PEERSPACE_RATING constant set to 5.0
  - Add guestReviews array with three review objects containing id and text fields
  - Ensure review texts match exactly as specified in requirements
  - _Requirements: 2.1, 2.2, 2.3, 4.1_

- [ ] 2. Create GuestReviews component

  - [ ] 2.1 Create GuestReviews.tsx component file with basic structure

    - Import necessary Material-UI components (Box, Container, Typography, Card, CardContent, Grid2, Link)
    - Import review data and constants from constants.ts
    - Create functional component with proper TypeScript typing
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ] 2.2 Implement component layout and styling

    - Add Container with maxWidth="lg" for consistency
    - Add section heading "Loved by Our Guests" using Typography variant="h2"
    - Add star rating display "⭐ 5.0 on Peerspace" with appropriate styling
    - Implement Grid2 layout for review cards with responsive sizing
    - Add vertical padding (py: 8) to match other sections
    - _Requirements: 1.2, 1.3, 3.1_

  - [ ] 2.3 Implement review cards rendering

    - Map over guestReviews array to create Card components
    - Use CardContent to display review text
    - Apply consistent styling with elevation/shadow
    - Ensure text preserves original formatting
    - _Requirements: 1.4, 2.1, 2.2, 2.3, 2.4, 3.2_

  - [ ] 2.4 Add Peerspace link

    - Create Link component with text "Read more reviews on Peerspace →"
    - Set href to PEERSPACE_URL from constants
    - Add target="\_blank" attribute
    - Add rel="noopener noreferrer" for security
    - Style link to be prominent and match site design
    - _Requirements: 1.5, 4.2, 4.3_

  - [ ]\* 2.5 Write unit tests for GuestReviews component
    - Test component renders without errors
    - Test heading "Loved by Our Guests" is present
    - Test star rating "⭐ 5.0 on Peerspace" is displayed
    - Test all three review cards render
    - Test each review text matches exactly (all three reviews)
    - Test Peerspace link has correct href, target, and rel attributes
    - Test link text is "Read more reviews on Peerspace →"
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 4.1, 4.2, 4.3_

- [ ] 3. Integrate GuestReviews into Home page

  - [ ] 3.1 Import GuestReviews component in Home.tsx

    - Add import statement for GuestReviews component
    - _Requirements: 1.1_

  - [ ] 3.2 Add GuestReviews component to Home page render

    - Place GuestReviews component after FeaturedGallery component
    - Ensure proper spacing and layout integration
    - _Requirements: 1.1_

  - [ ]\* 3.3 Write integration test for Home page
    - Test that GuestReviews component appears on Home page
    - Test that GuestReviews appears after FeaturedGallery in DOM order
    - _Requirements: 1.1_

- [ ] 4. Final verification
  - Ensure all tests pass, ask the user if questions arise
