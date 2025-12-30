export const spacing = {
  // Spacing scale (based on 4px)
  px: 1,
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  
  // Container sizes
  container: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  
  // Border radius
  borderRadius: {
    none: 0,
    sm: 2,
    base: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 24,
    full: 9999,
  },
};

// Convenience aliases (common named scales used across the codebase)
spacing.xs = spacing[1];
spacing.sm = spacing[2];
spacing.md = spacing[4];
spacing.lg = spacing[6];
spacing.xl = spacing[8];
spacing.xxl = spacing[10];

// Also expose numeric aliases for clarity
spacing.px = spacing.px || 1;

export default spacing;