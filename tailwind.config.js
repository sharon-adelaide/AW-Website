/** Tailwind build configuration - A.W. Agro Processing Limited.
 *  Rebuild the stylesheet after changing markup or design tokens:
 *    npx tailwindcss@3 -c tailwind.config.js -i src/input.css -o assets/site.css --minify
 */
module.exports = Object.assign({ content: ["./*.html", "./assets/*.js"] },
{
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-surface": "#1b2e22",
        "on-secondary": "#f7f1e4",
        "on-tertiary-container": "#a9d4d6",
        "tertiary": "#255a5e",
        "on-tertiary-fixed": "#062123",
        "surface-container-highest": "#d5c29a",
        "surface": "#efe4cb",
        "surface-container-lowest": "#f7f1e4",
        "error": "#8f2018",
        "surface-dim": "#d5c29a",
        "primary-container": "#35543f",
        "tertiary-fixed-dim": "#8fc7c9",
        "on-primary-fixed-variant": "#35543f",
        "inverse-surface": "#1b2e22",
        "on-surface-variant": "#3e5245",
        "surface-tint": "#35543f",
        "outline-variant": "#b9ae91",
        "surface-container-low": "#e9dcc0",
        "primary": "#1b2e22",
        "on-tertiary-fixed-variant": "#164145",
        "secondary-container": "#c89a6a",
        "on-error-container": "#5c1109",
        "on-secondary-fixed-variant": "#5c3a1e",
        "secondary-fixed-dim": "#e9ce8a",
        "inverse-on-surface": "#efe4cb",
        "inverse-primary": "#a7c3ae",
        "on-secondary-fixed": "#3d2a06",
        "on-background": "#1b2e22",
        "tertiary-fixed": "#bfe3e4",
        "primary-fixed-dim": "#d9c9a6",
        "secondary": "#744826",
        "surface-variant": "#dccba6",
        "surface-bright": "#f7f1e4",
        "surface-container-high": "#dccba6",
        "on-primary": "#f7f1e4",
        "error-container": "#f2d3c8",
        "background": "#efe4cb",
        "secondary-fixed": "#f0dca6",
        "outline": "#4c5a4d",
        "on-error": "#f7f1e4",
        "surface-container": "#e3d4b4",
        "on-secondary-container": "#5c3a1e",
        "primary-fixed": "#efe4cb",
        "on-tertiary": "#f7f1e4",
        "on-primary-fixed": "#1b2e22",
        "on-primary-container": "#c9dbcd",
        "tertiary-container": "#1f4f53",
        "gari": "#d9a441",
        "gari-dim": "#e9ce8a",
        "on-gari": "#2a1f06",
        "lake": "#2c6b70"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        "space-4xl": "6rem",
        "container-max": "80rem",
        "gutter-mobile": "1rem",
        "space-xs": "0.5rem",
        "space-xl": "2rem",
        "gutter-desktop": "1.5rem",
        "space-2xs": "0.25rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-3xl": "4rem",
        "space-sm": "0.75rem",
        "space-2xl": "3rem"
      },
      fontFamily: {
        "display-mobile": ["Work Sans"],
        "headline-lg": ["Work Sans"],
        "label-md": ["Work Sans"],
        "headline-lg-mobile": ["Work Sans"],
        "body-lg": ['"Source Sans 3"'],
        "display": ["Work Sans"],
        "label-sm": ["Work Sans"],
        "body-md": ['"Source Sans 3"'],
        "body-sm": ['"Source Sans 3"'],
        "headline-md": ["Work Sans"],
        "headline-sm": ["Work Sans"]
      },
      fontSize: {
        "display-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-lg": ["36px", { lineHeight: "44px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "label-md": ["13px", { lineHeight: "18px", letterSpacing: "0.05em", fontWeight: "600" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["19px", { lineHeight: "30px", fontWeight: "400" }],
        "display": ["52px", { lineHeight: "60px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.06em", fontWeight: "600" }],
        "body-md": ["17px", { lineHeight: "26px", fontWeight: "400" }],
        "body-sm": ["15px", { lineHeight: "22px", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }]
      }
    }
  }
}
);
