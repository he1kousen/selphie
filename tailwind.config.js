/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#F4F1EC",
        surface: "#FAF8F4",
        ink:     "#1A1A1A",
        muted:   "#6B6660",
        accent:  "#B6724E",
        line:    "#DAD4C8",
        // Extended surface variants from reference
        "surface-bright":          "#fdf8f8",
        "surface-container":       "#f1edec",
        "surface-container-low":   "#f7f3f2",
        "surface-container-high":  "#ebe7e6",
        "surface-container-lowest":"#ffffff",
        "surface-dim":             "#ddd9d8",
      },
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        body:    ['"Inter"', "sans-serif"],
      },
      fontSize: {
        "display":           ["80px",  { lineHeight: "1.0",  letterSpacing: "-0.04em", fontWeight: "600" }],
        "headline-lg":       ["48px",  { lineHeight: "1.1",  letterSpacing: "-0.02em", fontWeight: "500" }],
        "headline-lg-mobile":["32px",  { lineHeight: "1.2",  letterSpacing: "-0.02em", fontWeight: "500" }],
        "headline-md":       ["24px",  { lineHeight: "1.3",  fontWeight: "500" }],
        "body-lg":           ["18px",  { lineHeight: "1.6",  fontWeight: "400" }],
        "body-md":           ["15px",  { lineHeight: "1.5",  fontWeight: "400" }],
        "label-caps":        ["12px",  { lineHeight: "1.0",  letterSpacing: "0.15em", fontWeight: "600" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tight:    "-0.02em",
        eyebrow:  "0.15em",
      },
      spacing: {
        "stack-sm":       "8px",
        "stack-md":       "16px",
        "stack-lg":       "48px",
        "stack-xl":       "80px",
        "margin-mobile":  "20px",
        "margin-desktop": "64px",
        "gutter":         "24px",
        "container-max":  "1280px",
      },
      maxWidth: {
        "container": "1280px",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg:      "0.25rem",
        xl:      "0.5rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}
