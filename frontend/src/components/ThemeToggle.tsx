import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { ColorModeContext } from "../theme/ThemeProvider";
import toggleImg from "../theme/toggle.jfif";

const Track = styled("button")<{ dark: boolean }>(({ dark }) => ({
  width: 78,
  height: 38,
  borderRadius: 999,
  border: dark ? "1px solid rgba(148,163,184,0.6)" : "1px solid rgba(148,163,184,0.7)",
  background: dark
    ? "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.90))"
    : "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(241,245,249,0.96))",
  position: "relative",
  cursor: "pointer",
  padding: 0,
  outline: "none",
  transition: "all 220ms ease",
  backdropFilter: "blur(14px)",
  boxShadow: dark
    ? "0 10px 24px rgba(15,23,42,0.8), inset 0 0 0 1px rgba(148,163,184,0.25)"
    : "0 10px 24px rgba(148,163,184,0.4), inset 0 0 0 1px rgba(255,255,255,0.7)",
}));

const Thumb = styled("span")<{ dark: boolean }>(({ dark }) => ({
  width: 32,
  height: 32,
  borderRadius: 999,
  position: "absolute",
  left: 4,
  top: 3,
  transform: dark ? "translateX(40px)" : "translateX(0px)",
  transition: "transform 260ms cubic-bezier(.2,.8,.2,1)",
  backgroundImage: `url(${toggleImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  boxShadow: "0 8px 18px rgba(15,23,42,0.55)",
}));

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const dark = mode === "dark";

  return (
    <Track type="button" dark={dark} aria-label="Toggle theme" onClick={toggleColorMode}>
      <Thumb dark={dark} />
    </Track>
  );
}
