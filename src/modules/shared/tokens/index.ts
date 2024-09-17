export const tokens = {
  breakpoints: {
    s: "767px",
    m: "1023px",
    l: "1439px",
    xl:"1440px"
  },
  screens: {
    s: {
      max: "767px",
    },
    m: {
      min: "768px",
      max: "1023px",
    },
    l: {
      min: "1024px",
      max: "1439px",
    },
    xl: {
      min: "1440px",
    },
  },
  mediaQueries: {
    s: "@media screen and (max-width: 767px)",
    m: "@media screen and (min-width: 768px) and (max-width: 1023px)",
    l: "@media screen and (min-width: 1024px) and (max-width: 1439px)",
    xl: "@media screen and (min-width: 1440px)",
  },
  colors: {
    secondary: "#FFFFFF",
    white: "#FFFFFF",
    black: "#000",
    gray: "#DCDCDC",
    grayLight: "#F2F2F2",
  },
  durations: {
    slowly: "400ms",
    promptly: "250ms",
    quickly: "100ms",
    immediately: "50ms",
    instantly: "0ms",
  },
  timingFunctions: {
    ease: "ease",
    easeIn: "ease-in",
    easeInOut: "ease-in-out",
  },
  radii: {
    s: "4px",
    m: "6px",
    l: "50%",
  },
  shadows: {
    elevate: "0px 2px 6px rgba(0,0,0,0.24)",
    focus: "0 0 0 3px #4d90fe",
    focusLight: "0 0 0 2px #4d90fe",
    none: "none",
  },
  space: {
    none: "0",
    tiny: "2px",
    smallest: "4px",
    smaller: "8px",
    small: "12px",
    regular: "16px",
    large: "24px",
    larger: "32px",
    huge: "40px",
    largest: "48px",
    loose: "56px",
    looser: "64px",
    loosest: "80px",
  },
  fontSizes: {
    xl: "32px",
    l: "24px",
    txl: "20px",
    m: "18px",
    s: "16px",
    tsm: "14px",
    xs: "12px",
  },
  fontWeights: {
    bold: 700,
    medium: 500,
    regular: 400,
    light: 300,
  },
  lineHeights: {
    xl: "48px",
    l: "32px",
    m: "24px",
    s: "16px",
    xs: "8px",
  },
};

export default tokens;
