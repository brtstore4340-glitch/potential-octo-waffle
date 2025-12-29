import { createTheme, ThemeOptions } from "@mui/material/styles";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const srgb = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function autoTextOn(bgHex: string) {
  return luminance(bgHex) > 0.35 ? "#0B1220" : "#FFFFFF";
}

const GOOGLE_BLUE = "#1A73E8";
const GOOGLE_BLUE_DARK = "#8AB4F8";

export type ColorMode = "light" | "dark";

export function getDesignTokens(mode: ColorMode): ThemeOptions {
  const primaryMain = mode === "dark" ? GOOGLE_BLUE_DARK : GOOGLE_BLUE;
  const primaryContrastText = autoTextOn(primaryMain);

  const bgDefault = mode === "dark" ? "#0B1220" : "#FAFBFC";
  const bgPaper   = mode === "dark" ? "#111B2D" : "#FFFFFF";

  const textPrimary = mode === "dark" ? "#E6EEF9" : "#0B1220";
  const textSecondary = mode === "dark" ? "rgba(230,238,249,0.72)" : "rgba(11,18,32,0.72)";

  return {
    palette: {
      mode,
      primary: { main: primaryMain, contrastText: primaryContrastText },
      background: { default: bgDefault, paper: bgPaper },
      text: { primary: textPrimary, secondary: textSecondary },
      success: { main: mode === "dark" ? "#34D399" : "#2E7D32" },
      error: { main: mode === "dark" ? "#FCA5A5" : "#D32F2F" },
      warning: { main: mode === "dark" ? "#FCD34D" : "#ED6C02" },
      info: { main: mode === "dark" ? "#93C5FD" : "#0288D1" },
    },
    typography: {
      fontFamily: "Noto Sans Thai, Roboto, Arial, sans-serif",
      button: { textTransform: "none", fontWeight: 700 },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 200ms ease, color 200ms ease",
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { borderRadius: 18 } } },
      MuiButton: { styleOverrides: { root: { borderRadius: 18 } } },
    },
  };
}

export function buildTheme(mode: ColorMode) {
  return createTheme(getDesignTokens(mode));
}
