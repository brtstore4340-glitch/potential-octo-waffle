import React from "react";
import { AppBar, Toolbar, Box, Typography, Container } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={(t) => ({
        minHeight: "100vh",
        background:
          t.palette.mode === "dark"
            ? "radial-gradient(circle at top, #1E293B 0, #020617 55%)"
            : "radial-gradient(circle at top, #E0EDFF 0, #F9FAFB 60%)",
        color: t.palette.text.primary,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          backdropFilter: "blur(14px)",
          borderBottom: (t) =>
            `1px solid ${
              t.palette.mode === "dark" ? "rgba(148,163,184,0.35)" : "rgba(148,163,184,0.35)"
            }`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: 800,
              letterSpacing: 0.4,
            }}
          >
            Birthday Greeting Cards (Admin)
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{
          py: 3,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
