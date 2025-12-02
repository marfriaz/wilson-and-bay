# Testing Infrastructure Setup

This document describes the testing infrastructure that has been configured for the image gallery improvements.

## Installed Dependencies

### 1. fast-check (v4.3.0)

- **Purpose**: Property-based testing library for TypeScript/JavaScript
- **Usage**: Will be used to verify correctness properties across many randomly generated inputs
- **Configuration**: Minimum 100 iterations per property test as specified in design document
- **Import**: `import * as fc from 'fast-check';`

### 2. jest-axe (v10.0.0)

- **Purpose**: Accessibility testing library that integrates axe-core with Jest
- **Usage**: Will be used to verify WCAG compliance and accessibility requirements
- **Configuration**: Extended Jest matchers with `toHaveNoViolations()`
- **Import**: `import { axe, toHaveNoViolations } from 'jest-axe';`

## Test Environment Configuration

The following configurations have been added to `src/setupTests.js`:

### Touch Event Simulation

- **Touch Class**: Global Touch class for creating touch objects with properties like identifier, clientX, clientY, etc.
- **TouchEvent Class**: Global TouchEvent class extending UIEvent for simulating touch interactions
- **Purpose**: Enables testing of swipe gestures, pinch zoom, double-tap, and other touch interactions

### Responsive Testing Support

- **matchMedia Mock**: Mocked `window.matchMedia` for testing responsive behavior
- **Purpose**: Enables testing of:
  - Mobile vs desktop layouts
  - `prefers-reduced-motion` media query
  - Viewport-based conditional rendering

### Accessibility Testing

- **jest-axe Integration**: Extended Jest expect with `toHaveNoViolations()` matcher
- **Purpose**: Automated accessibility testing for ARIA attributes, roles, and WCAG compliance

## Usage Examples

### Property-Based Testing with fast-check

```javascript
import * as fc from "fast-check";

test("Property: Filter change clears previous images", () => {
  fc.assert(
    fc.property(
      fc.array(fc.string()), // Generate random filter sequences
      (filters) => {
        // Test implementation
      }
    ),
    { numRuns: 100 } // Run 100 iterations
  );
});
```

### Accessibility Testing with jest-axe

```javascript
import { axe } from "jest-axe";

test("Gallery has no accessibility violations", async () => {
  const { container } = render(<ImageGallery images={mockImages} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Touch Event Simulation

```javascript
test("Swipe left navigates to next image", () => {
  const touchStart = new Touch({
    identifier: 1,
    target: element,
    clientX: 200,
    clientY: 100,
  });

  const touchEnd = new Touch({
    identifier: 1,
    target: element,
    clientX: 50, // Moved 150px left
    clientY: 100,
  });

  // Simulate swipe gesture
  fireEvent.touchStart(element, { touches: [touchStart] });
  fireEvent.touchEnd(element, { changedTouches: [touchEnd] });

  // Assert navigation occurred
});
```

### Responsive Behavior Testing

```javascript
test("Mobile layout uses single column", () => {
  // Mock mobile viewport
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === "(max-width: 600px)",
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));

  const { container } = render(<Gallery />);
  // Assert single column layout
});
```

## Next Steps

With the testing infrastructure in place, the following can now be implemented:

1. **Unit tests** for individual components and utilities
2. **Property-based tests** for the 26 correctness properties defined in the design document
3. **Accessibility tests** for ARIA compliance and keyboard navigation
4. **Integration tests** for complete user flows

## Notes

- All property-based tests should run a minimum of 100 iterations
- Each property test must be tagged with: `**Feature: image-gallery-improvements, Property {number}: {property_text}**`
- Touch event simulation is available globally in all test files
- matchMedia is mocked by default but can be overridden per test
