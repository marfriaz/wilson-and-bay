# Design Document: Guest Reviews Section

## Overview

The Guest Reviews Section is a React component that displays customer testimonials and ratings from Peerspace on the Wilson&Bay home page. It will be positioned after the Featured Gallery section and will showcase a 5-star rating, three guest review snippets, and a call-to-action link to view more reviews on Peerspace.

The component will follow the existing design patterns used throughout the site, utilizing Material-UI components for consistency and responsive design.

## Architecture

The feature will consist of:

1. **GuestReviews Component** - A new React functional component that renders the reviews section
2. **Constants Configuration** - Extension of the existing constants.ts file to include review data and Peerspace URL
3. **Home Page Integration** - Modification to the Home.tsx page to include the new component

The component will be stateless and purely presentational, receiving all data through props or importing from constants.

## Components and Interfaces

### GuestReviews Component

**Location:** `src/components/GuestReviews.tsx`

**Props:** None (data imported from constants)

**Structure:**

```typescript
interface Review {
  id: number;
  text: string;
}

const GuestReviews: React.FC = () => {
  // Component implementation
};
```

The component will render:

- A Container with consistent maxWidth matching other sections
- A heading "Loved by Our Guests"
- A star rating display "⭐ 5.0 on Peerspace"
- A Grid layout containing review cards
- A link to the Peerspace listing

### Constants Extension

**Location:** `src/constants.ts`

**New Exports:**

```typescript
export const PEERSPACE_URL = "..."; // Peerspace listing URL
export const PEERSPACE_RATING = 5.0;

export const guestReviews: Review[] = [
  {
    id: 1,
    text: "Everything was great, the host responded quick to questions or concerns i had. My baby shower was perfect here !!",
  },
  {
    id: 2,
    text: "The space was so amazing and big. Parking was a cool breeze. Communication with Michelle was top tier. She answered everytime I had a question or concern. She kept in contact with me and reassured me everything would be okay for my brothers home going celebration. Thank you so much!",
  },
  {
    id: 3,
    text: "I hosted my 5 year anniversary here. The venue was awesome. Space was big enough for all my guests. Michelle and Oscar were extremely communicative and helpful. Will recommend this venue to anyone in the area who is looking for one.",
  },
];
```

### Home Page Integration

**Location:** `src/pages/Home.tsx`

The GuestReviews component will be imported and placed after the FeaturedGallery component in the render tree.

## Data Models

### Review Interface

```typescript
interface Review {
  id: number; // Unique identifier for the review
  text: string; // The full review text
}
```

## Error Handling

Since this is a static content component with no external API calls or user interactions beyond navigation:

1. **Missing Data**: If review data is not available, the component should gracefully handle empty arrays
2. **Invalid URLs**: The Peerspace link should be validated as a proper URL format
3. **Rendering Errors**: React error boundaries at the page level will catch any component rendering errors

## Testing Strategy

### Unit Tests

Unit tests will verify:

- Component renders without crashing
- Correct heading text is displayed
- Star rating displays correctly
- All three reviews are rendered
- Peerspace link is present with correct attributes (href, target="\_blank", rel="noopener noreferrer")
- Review text matches expected content exactly

### Property-Based Tests

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

After analyzing the acceptance criteria, most requirements for this feature are concrete examples rather than universal properties. This is because the feature displays static, specific content (exact review texts, specific heading, fixed rating) rather than dynamic behavior that varies across inputs. Therefore, this feature will be validated primarily through example-based unit tests rather than property-based tests.

The testable requirements are:

**Example 1: Reviews section renders with correct structure**
The GuestReviews component should render with the heading "Loved by Our Guests", the rating "⭐ 5.0 on Peerspace", all three review texts, and a Peerspace link.
**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5**

**Example 2: Review content is preserved exactly**
Each of the three reviews should display with their exact text content including all punctuation and spacing.
**Validates: Requirements 2.1, 2.2, 2.3**

**Example 3: Peerspace link configuration**
The Peerspace URL should be stored in constants.ts and the rendered link should use this constant value with target="\_blank" and appropriate rel attributes.
**Validates: Requirements 4.1, 4.2, 4.3**

No property-based tests are needed for this feature as all requirements specify concrete, static content rather than behaviors that should hold across varying inputs.

## Testing Strategy

### Unit Tests

Unit tests will be the primary testing approach for this feature since all requirements involve specific, static content. Tests will verify:

**Component Rendering:**

- GuestReviews component renders without errors
- Heading "Loved by Our Guests" is present
- Star rating "⭐ 5.0 on Peerspace" is displayed
- All three review cards are rendered

**Content Accuracy:**

- First review text matches exactly: "Everything was great, the host responded quick to questions or concerns i had. My baby shower was perfect here !!"
- Second review text matches exactly: "The space was so amazing and big. Parking was a cool breeze. Communication with Michelle was top tier. She answered everytime I had a question or concern. She kept in contact with me and reassured me everything would be okay for my brothers home going celebration. Thank you so much!"
- Third review text matches exactly: "I hosted my 5 year anniversary here. The venue was awesome. Space was big enough for all my guests. Michelle and Oscar were extremely communicative and helpful. Will recommend this venue to anyone in the area who is looking for one."

**Link Functionality:**

- Peerspace link is present with correct href from constants
- Link has target="\_blank" attribute
- Link has rel="noopener noreferrer" for security
- Link text is "Read more reviews on Peerspace →"

**Integration:**

- Home page includes GuestReviews component
- GuestReviews appears after FeaturedGallery in DOM order

### Property-Based Tests

No property-based tests are required for this feature. All requirements specify concrete examples of static content rather than universal properties that should hold across varying inputs.

### Testing Framework

- **Unit Testing**: Jest and React Testing Library (already configured in the project)
- **Test Location**: `src/components/GuestReviews.test.tsx`

## Implementation Notes

1. **Styling Consistency**: Use Material-UI's Container, Typography, Box, and Card components to match existing sections like Spaces and FeaturedGallery
2. **Responsive Design**: Use Material-UI's Grid2 component with responsive size props to adapt layout for mobile/tablet/desktop
3. **Accessibility**: Ensure proper semantic HTML (section, heading hierarchy) and sufficient color contrast
4. **Link Security**: Always include rel="noopener noreferrer" with target="\_blank" links to prevent security vulnerabilities
5. **Spacing**: Match the vertical padding (py: 8) used in other sections like Spaces for visual consistency
