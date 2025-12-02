import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageGallery from "./ImageGallery";

const mockImages = [
  { src: "/image1.jpg", alt: "Image 1" },
  { src: "/image2.jpg", alt: "Image 2" },
  { src: "/image3.jpg", alt: "Image 3" },
];

describe("ImageGallery - Keyboard Navigation", () => {
  test("thumbnails are focusable with tabIndex", () => {
    render(<ImageGallery images={mockImages} />);

    // Find all focusable elements (thumbnails)
    const focusableElements = screen
      .getAllByRole("img")
      .map((img) => img.parentElement);

    // Check that at least one thumbnail wrapper has tabIndex
    const hasFocusable = focusableElements.some(
      (el) => el?.getAttribute("tabindex") === "0"
    );
    expect(hasFocusable).toBe(true);
  });

  test("pressing Enter on thumbnail opens lightbox", () => {
    render(<ImageGallery images={mockImages} />);

    // Get the first focusable thumbnail wrapper
    const thumbnails = screen.getAllByRole("img");
    const firstThumbnailWrapper = thumbnails[0].parentElement;

    // Simulate Enter key press
    if (firstThumbnailWrapper) {
      fireEvent.keyDown(firstThumbnailWrapper, { key: "Enter" });
    }

    // Check that lightbox opened (dialog should be visible)
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  test("pressing Space on thumbnail opens lightbox", () => {
    render(<ImageGallery images={mockImages} />);

    // Get the first focusable thumbnail wrapper
    const thumbnails = screen.getAllByRole("img");
    const firstThumbnailWrapper = thumbnails[0].parentElement;

    // Simulate Space key press
    if (firstThumbnailWrapper) {
      fireEvent.keyDown(firstThumbnailWrapper, { key: " " });
    }

    // Check that lightbox opened
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  test("pressing Escape closes lightbox", () => {
    render(<ImageGallery images={mockImages} />);

    // Open lightbox first
    const thumbnails = screen.getAllByRole("img");
    const firstThumbnailWrapper = thumbnails[0].parentElement;
    if (firstThumbnailWrapper) {
      fireEvent.keyDown(firstThumbnailWrapper, { key: "Enter" });
    }

    // Verify lightbox is open
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(window, { key: "Escape" });

    // Lightbox should be closed (dialog should not be in document)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("pressing ArrowRight navigates to next image", () => {
    render(<ImageGallery images={mockImages} />);

    // Open lightbox
    const thumbnails = screen.getAllByRole("img");
    const firstThumbnailWrapper = thumbnails[0].parentElement;
    if (firstThumbnailWrapper) {
      fireEvent.keyDown(firstThumbnailWrapper, { key: "Enter" });
    }

    // Get initial image
    const lightboxImages = screen.getAllByRole("img");
    const initialSrc =
      lightboxImages[lightboxImages.length - 1].getAttribute("src");

    // Press ArrowRight
    fireEvent.keyDown(window, { key: "ArrowRight" });

    // Get new image
    const updatedImages = screen.getAllByRole("img");
    const newSrc = updatedImages[updatedImages.length - 1].getAttribute("src");

    // Image should have changed
    expect(newSrc).not.toBe(initialSrc);
  });

  test("pressing ArrowLeft navigates to previous image", () => {
    render(<ImageGallery images={mockImages} />);

    // Open lightbox at second image
    const thumbnails = screen.getAllByRole("img");
    const secondThumbnailWrapper = thumbnails[1]?.parentElement;
    if (secondThumbnailWrapper) {
      fireEvent.keyDown(secondThumbnailWrapper, { key: "Enter" });
    }

    // Get initial image
    const lightboxImages = screen.getAllByRole("img");
    const initialSrc =
      lightboxImages[lightboxImages.length - 1].getAttribute("src");

    // Press ArrowLeft
    fireEvent.keyDown(window, { key: "ArrowLeft" });

    // Get new image
    const updatedImages = screen.getAllByRole("img");
    const newSrc = updatedImages[updatedImages.length - 1].getAttribute("src");

    // Image should have changed
    expect(newSrc).not.toBe(initialSrc);
  });

  test("pressing Home navigates to first image", () => {
    render(<ImageGallery images={mockImages} />);

    // Open lightbox at last image
    const thumbnails = screen.getAllByRole("img");
    const lastThumbnailWrapper =
      thumbnails[thumbnails.length - 1]?.parentElement;
    if (lastThumbnailWrapper) {
      fireEvent.keyDown(lastThumbnailWrapper, { key: "Enter" });
    }

    // Press Home
    fireEvent.keyDown(window, { key: "Home" });

    // Get current image
    const updatedImages = screen.getAllByRole("img");
    const currentSrc =
      updatedImages[updatedImages.length - 1].getAttribute("src");

    // Should be first image
    expect(currentSrc).toBe(mockImages[0].src);
  });

  test("pressing End navigates to last image", () => {
    render(<ImageGallery images={mockImages} />);

    // Open lightbox at first image
    const thumbnails = screen.getAllByRole("img");
    const firstThumbnailWrapper = thumbnails[0].parentElement;
    if (firstThumbnailWrapper) {
      fireEvent.keyDown(firstThumbnailWrapper, { key: "Enter" });
    }

    // Press End
    fireEvent.keyDown(window, { key: "End" });

    // Get current image
    const updatedImages = screen.getAllByRole("img");
    const currentSrc =
      updatedImages[updatedImages.length - 1].getAttribute("src");

    // Should be last image
    expect(currentSrc).toBe(mockImages[mockImages.length - 1].src);
  });
});
