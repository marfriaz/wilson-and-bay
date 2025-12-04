# Requirements Document

## Introduction

This feature adds a guest reviews section to the home page, positioned after the "In Use" (Featured Gallery) section. The section will display a 5-star rating from Peerspace, rotating review snippets from actual guests, and a link to view more reviews on Peerspace. This social proof element will help potential clients understand the quality and experience of booking Wilson&Bay venue.

## Glossary

- **Guest Reviews Section**: A UI component displaying customer testimonials and ratings
- **Review Snippet**: A shortened version of a customer review, typically 1-3 sentences
- **Peerspace**: The third-party platform where Wilson&Bay is listed and receives reviews
- **Rotating Display**: A UI pattern that cycles through multiple items automatically or manually
- **Home Page**: The main landing page of the Wilson&Bay website
- **Featured Gallery Section**: The "In Use" section showing featured images on the home page

## Requirements

### Requirement 1

**User Story:** As a potential client visiting the website, I want to see guest reviews and ratings, so that I can understand the quality and experience of booking this venue.

#### Acceptance Criteria

1. WHEN the home page loads THEN the system SHALL display a reviews section after the Featured Gallery section
2. WHEN the reviews section is rendered THEN the system SHALL display the heading "Loved by Our Guests"
3. WHEN the reviews section is rendered THEN the system SHALL display a star rating of "⭐ 5.0 on Peerspace"
4. WHEN the reviews section is rendered THEN the system SHALL display between 1 and 3 review snippets
5. WHEN the reviews section is rendered THEN the system SHALL display a link labeled "Read more reviews on Peerspace →" that navigates to the Peerspace listing

### Requirement 2

**User Story:** As a potential client, I want to read authentic guest testimonials, so that I can make an informed decision about booking the venue.

#### Acceptance Criteria

1. WHEN review snippets are displayed THEN the system SHALL show the first review: "Everything was great, the host responded quick to questions or concerns i had. My baby shower was perfect here !!"
2. WHEN review snippets are displayed THEN the system SHALL show the second review: "The space was so amazing and big. Parking was a cool breeze. Communication with Michelle was top tier. She answered everytime I had a question or concern. She kept in contact with me and reassured me everything would be okay for my brothers home going celebration. Thank you so much!"
3. WHEN review snippets are displayed THEN the system SHALL show the third review: "I hosted my 5 year anniversary here. The venue was awesome. Space was big enough for all my guests. Michelle and Oscar were extremely communicative and helpful. Will recommend this venue to anyone in the area who is looking for one."
4. WHEN review text is displayed THEN the system SHALL preserve the original text including punctuation and spacing

### Requirement 3

**User Story:** As a potential client, I want the reviews section to be visually appealing and easy to read, so that I can quickly scan testimonials without being overwhelmed.

#### Acceptance Criteria

1. WHEN the reviews section is rendered THEN the system SHALL use consistent typography and spacing with the rest of the home page
2. WHEN the reviews section is rendered THEN the system SHALL display reviews in a card or container format that visually separates them from other content
3. WHEN the reviews section is rendered on mobile devices THEN the system SHALL adapt the layout to maintain readability
4. WHEN the reviews section is rendered THEN the system SHALL use appropriate contrast ratios for text accessibility

### Requirement 4

**User Story:** As a site administrator, I want the Peerspace link to be configurable, so that I can update it without modifying component code.

#### Acceptance Criteria

1. WHEN the Peerspace link is defined THEN the system SHALL store it in the constants configuration file
2. WHEN the reviews component renders the link THEN the system SHALL retrieve the URL from the constants configuration
3. WHEN a user clicks the Peerspace link THEN the system SHALL open the link in a new browser tab
