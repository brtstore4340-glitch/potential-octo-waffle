import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { ColorModeContext } from "../theme/ThemeProvider";

const Track = styled("button")<{ dark: boolean }>(({ dark }) => ({
  width: 74,
  height: 36,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.25)",
  background: dark
    ? "linear-gradient(135deg, rgba(17,27,45,0.90), rgba(9,14,24,0.95))"
    : "linear-gradient(135deg, rgba(240,247,255,0.95), rgba(255,255,255,0.95))",
  position: "relative",
  cursor: "pointer",
  padding: 0,
  outline: "none",
  transition: "all 220ms ease",
  backdropFilter: "blur(10px)",
  boxShadow: dark
    ? "inset 0 0 0 1px rgba(255,255,255,0.06), 0 10px 24px rgba(0,0,0,0.35)"
    : "inset 0 0 0 1px rgba(0,0,0,0.04), 0 10px 24px rgba(26,115,232,0.18)",
}));

const Thumb = styled("span")<{ dark: boolean }>(({ dark }) => ({
  width: 30,
  height: 30,
  borderRadius: 999,
  position: "absolute",
  left: 3,
  transform: dark ? "translateX(38px)" : "translateX(0px)",
  transition: "transform 260ms cubic-bezier(.2,.8,.2,1)",
  background: dark
    ? "linear-gradient(135deg, #8AB4F8, #1A73E8)"
    : "linear-gradient(135deg, #FFD54F, #FFB300)",
  boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
}));

const Icon = styled("span")<{ side: "left" | "right"; active: boolean }>(({ side, active }) => ({
  position: "absolute",
  top: 8,
  fontSize: 14,
  opacity: active ? 1 : 0.55,
  transition: "opacity 200ms ease",
  left: side === "left" ? 10 : "auto",
  right: side === "right" ? 10 : "auto",
}));

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const dark = mode === "dark";

  return (
    <Track type="button" dark={dark} aria-label="Toggle theme" onClick={toggleColorMode}>
      <Icon side="left" active={!dark}>☀️</Icon>
      <Icon side="right" active={dark}>🌙</Icon>
      <Thumb dark={dark} />
    </Track>
  );
}
