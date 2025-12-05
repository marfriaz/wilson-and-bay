# Design Document: Luxury Light Theme

## Overview

This design document outlines the implementation of a new luxury light theme for the event-space business website. The theme will provide a bright, sophisticated visual experience that emphasizes white space, soft shadows, and a refined color palette. The design draws inspiration from premium platforms like Peerspace and Airbnb while maintaining a unique, polished aesthetic suitable for luxury event venues.

The theme will be implemented as a Material-UI theme object that can be easily swapped with the existing theme by changing a single import in App.tsx.

## Architecture

### Theme Structure

The theme follows Material-UI's standard theme structure with the following key sections:

1. **Palette Configuration**: Defines the color system including mode, primary, secondary, background, text, and divider colors
2. **Typography System**: Configures font families, sizes, weights, line heights, and letter spacing
3. **Component Overrides**: Customizes the appearance of MUI components (Button, Paper, Card, AppBar, etc.)
4. **Shape Configuration**: Defines border radius values
5. **Shadow System**: Provides a custom shadow scale for elevation

### File Organization

```
src/
  themes/
    luxury-light-theme.ts  (new file)
  App.tsx                  (import change only)
```

## Components and Interfaces

### Theme Export

```typescript
// luxury-light-theme.ts
import { createTheme } from "@mui/material/styles";

const luxuryLightTheme = createTheme({
  // Configuration object
});

export default luxuryLightTheme;
```

### Integration Point

```typescript
// App.tsx
import theme from "./themes/luxury-light-theme"; // Changed from "./themes/theme"
```

## Data Models

### Color Palette

**Mode**: Light

**Primary Colors**:

- Main: Soft neutral gray with warm undertones (#4A4A4A or similar)
- Light: Lighter variant for hover states
- Dark: Darker variant for active states

**Secondary Colors**:

- Main: Subtle accent color (muted gold, sage, or warm gray)
- Light/Dark: Variants for different states

**Background**:

- Default: Soft off-white (#FAFAFA, #F8F8F8, or #F5F5F5)
- Paper: Pure white (#FFFFFF)

**Text**:

- Primary: Rich dark gray (#2C2C2C or #333333)
- Secondary: Medium gray (#666666 or #757575)

**Divider**: Very subtle with low opacity (rgba with 0.08-0.12 alpha)

### Typography Scale

**Font Families**:

- Body: "Inter", "Helvetica Neue", "Arial", sans-serif (or similar modern sans-serif)
- Headings: Same as body for consistency, or preserve "Oooh Baby" for h1/h2 if brand requires
- Monospace: "Roboto Mono" for any code/technical content

**Type Scale**:

- h1: 3.5-4rem, weight 300-400, generous letter spacing
- h2: 2.5-3rem, weight 300-400
- h3: 2rem, weight 400-500
- h4: 1.5rem, weight 500
- h5: 1.25rem, weight 500
- h6: 1rem, weight 600
- body1: 1rem, line-height 1.7-1.8
- body2: 0.875rem, line-height 1.6-1.7
- button: 0.875-0.95rem, weight 500-600, uppercase with letter spacing

### Shadow System

Soft shadows with warm, subtle tones:

- Elevation 0: none
- Elevation 1: 0 1px 3px rgba(0, 0, 0, 0.04)
- Elevation 2: 0 2px 6px rgba(0, 0, 0, 0.06)
- Elevation 3: 0 4px 12px rgba(0, 0, 0, 0.08)
- Elevation 4: 0 6px 16px rgba(0, 0, 0, 0.09)
- Higher elevations: Progressive increase with max opacity around 0.12

### Component Styling

**Button**:

- Border radius: 4-8px (subtle rounding)
- Padding: 10-14px vertical, 24-32px horizontal
- Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Hover: Slight elevation increase, subtle color shift
- No default shadow, shadow on hover

**Paper/Card**:

- Background: Pure white
- Border radius: 8-12px
- Shadow: Elevation 1 by default
- Border: Optional 1px solid with very low opacity
- Hover: Elevation increase to 2-3

**AppBar**:

- Background: rgba(255, 255, 255, 0.95-0.98)
- Backdrop filter: blur(10-12px)
- Shadow: Elevation 1
- Color: Text primary

**Divider**:

- Color: rgba(0, 0, 0, 0.08-0.12)

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property Reflection

After analyzing all acceptance criteria, several properties test similar aspects:

- Multiple criteria test opacity values (dividers, shadows) - these can be validated together
- Typography criteria test different aspects (hierarchy, spacing, scale) - each provides unique value
- Component styling criteria are mostly specific examples rather than universal properties
- Integration criteria test file structure and theme validity

The following properties provide comprehensive coverage without redundancy:

**Property 1: Text contrast meets accessibility standards**
_For any_ text color and background color pair defined in the theme palette, the contrast ratio should meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
**Validates: Requirements 1.2**

**Property 2: Opacity values maintain subtlety**
_For any_ color value using rgba or hsla in the theme (dividers, shadows, overlays), the alpha channel should be less than 0.15 to ensure soft, subtle appearance
**Validates: Requirements 2.4, 4.1, 4.4**

**Property 3: Typography hierarchy uses consistent scale**
_For any_ two consecutive heading levels (h1→h2, h2→h3, etc.), the font size ratio should fall within 1.2x to 1.6x to maintain consistent typographic rhythm
**Validates: Requirements 3.3**

**Property 4: Body text provides comfortable reading**
_For any_ body text typography variant (body1, body2), the line height should be >= 1.6 and letter spacing should be >= 0 to ensure readability
**Validates: Requirements 3.2**

**Property 5: Component transitions use smooth easing**
_For any_ component override that defines transitions, the transition property should include a timing function (ease, ease-in-out, or cubic-bezier) rather than linear
**Validates: Requirements 5.5**

**Property 6: Theme exports valid MUI structure**
_For any_ theme object exported from the theme file, it should contain the required MUI theme properties: palette, typography, components, shape, and shadows
**Validates: Requirements 7.2**

**Property 7: Essential component overrides exist**
_For any_ theme object, it should include component overrides for at least: MuiButton, MuiPaper, MuiCard, MuiAppBar, and MuiDivider
**Validates: Requirements 7.4**

### Examples (Specific Test Cases)

**Example 1: Light mode with off-white background**
The theme should have `palette.mode = "light"` and `palette.background.default` should be a soft off-white value (e.g., #FAFAFA, #F8F8F8, or #F5F5F5)
**Validates: Requirements 1.1**

**Example 2: Pure white paper background**
The theme should have `palette.background.paper = "#FFFFFF"` or `rgb(255, 255, 255)`
**Validates: Requirements 1.3**

**Example 3: Button hover includes color transition**
The MuiButton component override should include hover styles with color or backgroundColor changes
**Validates: Requirements 2.3**

**Example 4: Heading font weights create hierarchy**
Typography definitions for h1-h6 should have font weights defined, with variation across levels
**Validates: Requirements 3.1**

**Example 5: Button typography has text transform**
The button typography variant should have textTransform and letterSpacing properties defined
**Validates: Requirements 3.4**

**Example 6: Script font preserved for brand**
Typography h1 and h2 should use "Oooh Baby" font family for brand consistency
**Validates: Requirements 3.5**

**Example 7: Button hover increases shadow**
The MuiButton hover styles should include boxShadow property to add elevation on hover
**Validates: Requirements 4.2**

**Example 8: Paper uses minimal elevation**
The MuiPaper default styles should use elevation 0-2 (low shadow values)
**Validates: Requirements 4.3**

**Example 9: Buttons have rounded corners**
The MuiButton override should include borderRadius > 0 and transition properties
**Validates: Requirements 5.1**

**Example 10: Button hover provides elevation**
The MuiButton hover styles should include both shadow/elevation changes and color changes
**Validates: Requirements 5.2**

**Example 11: Cards have borders and shadows**
The MuiCard override should include border and boxShadow properties
**Validates: Requirements 5.3**

**Example 12: AppBar uses semi-transparent backdrop**
The MuiAppBar override should include rgba backgroundColor with alpha < 1 and backdropFilter property
**Validates: Requirements 5.4**

**Example 13: Theme file exists in correct location**
A file should exist at `src/themes/luxury-light-theme.ts`
**Validates: Requirements 7.1**

## Error Handling

### Invalid Color Values

If color values are malformed or invalid:

- TypeScript will catch type errors during development
- MUI will fall back to default colors at runtime
- Browser DevTools will show CSS warnings

### Missing Component Overrides

If expected component overrides are missing:

- Components will use MUI default styles
- Visual appearance may not match design specifications
- No runtime errors will occur

### Theme Import Errors

If the theme file cannot be imported:

- TypeScript will show import errors
- Application will fail to compile
- Clear error messages will indicate the missing file

### Contrast Ratio Failures

If text/background combinations fail accessibility standards:

- Automated testing will flag violations
- Manual review should verify readability
- Adjustments to color values may be needed

## Testing Strategy

### Unit Testing

Unit tests will verify specific configuration values and examples:

1. **Theme Structure Tests**: Verify the theme object has all required properties
2. **Color Configuration Tests**: Check specific color values match design specifications
3. **Typography Tests**: Verify font families, sizes, and spacing values
4. **Component Override Tests**: Ensure expected components have style overrides
5. **Integration Test**: Verify the theme can be imported and used with ThemeProvider

**Testing Framework**: Jest with React Testing Library

**Test File Location**: `src/themes/luxury-light-theme.test.ts`

### Property-Based Testing

Property-based tests will verify universal properties across the theme configuration:

1. **Contrast Ratio Property**: Generate text/background color pairs and verify WCAG compliance
2. **Opacity Constraints Property**: Extract all rgba/hsla values and verify alpha < 0.15
3. **Typography Scale Property**: Test all heading level pairs maintain consistent ratios
4. **Reading Comfort Property**: Verify all body text variants meet line-height and letter-spacing minimums
5. **Transition Easing Property**: Extract all transition definitions and verify easing functions
6. **Theme Validity Property**: Verify exported theme has required MUI structure
7. **Component Coverage Property**: Verify essential component overrides exist

**Property-Based Testing Library**: fast-check (JavaScript/TypeScript PBT library)

**Configuration**: Each property test should run a minimum of 100 iterations

**Test Tagging**: Each property-based test must include a comment with the format:
`// Feature: luxury-light-theme, Property {number}: {property_text}`

### Testing Approach

- **Implementation-first development**: Create the theme file first, then write tests to verify correctness
- **Complementary testing**: Unit tests catch specific bugs, property tests verify general correctness
- **Early validation**: Run tests after theme creation to catch issues before integration
- **Accessibility focus**: Prioritize contrast ratio testing to ensure WCAG compliance

### Manual Testing

After automated tests pass:

1. Visual inspection of all pages with the new theme
2. Verify photography looks good against the light background
3. Check responsive behavior across device sizes
4. Validate hover states and transitions feel smooth
5. Ensure brand consistency with existing design elements

## Implementation Notes

### Color Selection Guidelines

- Use HSL color space for easier manipulation of lightness and saturation
- Test colors against actual venue photography to ensure they complement images
- Consider color blindness accessibility when choosing accent colors
- Maintain sufficient contrast for text readability

### Typography Considerations

- Ensure web fonts are loaded before rendering to avoid FOUT (Flash of Unstyled Text)
- Consider font loading performance impact
- Test typography across different screen sizes and resolutions
- Verify font licensing for commercial use

### Performance Optimization

- Theme object is created once at application startup
- No runtime theme calculations needed
- Component overrides are applied efficiently by MUI
- Consider code splitting if theme becomes very large

### Browser Compatibility

- Backdrop filter may not work in older browsers (provide fallback)
- CSS custom properties are widely supported but verify target browsers
- Test shadow rendering across different browsers
- Verify color rendering consistency

### Maintenance

- Document color choices and their purposes
- Keep theme file well-organized with comments
- Version control theme changes carefully
- Consider creating theme variants for seasonal updates
