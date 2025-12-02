// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Configure jest-axe for accessibility testing
import { toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

// Configure touch event simulation for testing
// Add Touch and TouchEvent to the global scope for testing
global.Touch = class Touch {
  constructor(touchInit) {
    this.identifier = touchInit.identifier;
    this.target = touchInit.target;
    this.clientX = touchInit.clientX || 0;
    this.clientY = touchInit.clientY || 0;
    this.screenX = touchInit.screenX || 0;
    this.screenY = touchInit.screenY || 0;
    this.pageX = touchInit.pageX || 0;
    this.pageY = touchInit.pageY || 0;
    this.radiusX = touchInit.radiusX || 0;
    this.radiusY = touchInit.radiusY || 0;
    this.rotationAngle = touchInit.rotationAngle || 0;
    this.force = touchInit.force || 0;
  }
};

global.TouchEvent = class TouchEvent extends UIEvent {
  constructor(type, touchEventInit = {}) {
    super(type, touchEventInit);
    this.touches = touchEventInit.touches || [];
    this.targetTouches = touchEventInit.targetTouches || [];
    this.changedTouches = touchEventInit.changedTouches || [];
    this.altKey = touchEventInit.altKey || false;
    this.metaKey = touchEventInit.metaKey || false;
    this.ctrlKey = touchEventInit.ctrlKey || false;
    this.shiftKey = touchEventInit.shiftKey || false;
  }
};

// Mock matchMedia for testing responsive behavior and prefers-reduced-motion
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
