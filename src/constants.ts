export const wilsonImages = Array.from({ length: 12 }, (_, i) => {
  const index = i + 1;
  return {
    id: index,
    src: `https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/wilsonRoom%2F${index}.jpeg?alt=media`,
    alt: `The Wilson Room ${index}`,
    space: "wilson",
  };
});

export const courtYardImages = Array.from({ length: 25 }, (_, i) => {
  const index = i + 1;
  return {
    id: index,
    src: `https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/courtyard%2F${index}.jpg?alt=media`,
    alt: `The Courtyard ${index}`,
    space: "courtyard",
  };
});

export const theLoftImages = Array.from({ length: 7 }, (_, i) => {
  const index = i + 1;
  return {
    id: index,
    src: `https://firebasestorage.googleapis.com/v0/b/wilsonandbay.firebasestorage.app/o/theLoft%2F${index}.jpg?alt=media`,
    alt: `The Loft ${index}`,
    space: "loft",
  };
});

export const galleryData = [...wilsonImages, ...courtYardImages];

// Route constants
export const ROUTES = {
  HOME: "/",
  WILSON_ROOM: "/thewilsonroom",
  COURTYARD: "/thecourtyard",
  THE_LOFT: "/the-loft",
  GALLERY: "/gallery",
  CONTACT: "/contact",
} as const;

// Featured images for home page "In Use" section
export const featuredImages = [
  wilsonImages[0], // The Wilson Room 1
  wilsonImages[4], // The Wilson Room 5
  courtYardImages[0], // The Courtyard 1
  courtYardImages[9], // The Courtyard 10
  wilsonImages[7], // The Wilson Room 8
  courtYardImages[14], // The Courtyard 15
];

// Peerspace review constants
export const PEERSPACE_URL =
  "https://www.peerspace.com/pages/listings/YOUR_LISTING_ID"; // TODO: Update with actual Peerspace URL
export const PEERSPACE_RATING = 5.0;

// Guest reviews for home page
export interface Review {
  id: number;
  text: string;
}

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
