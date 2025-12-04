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
