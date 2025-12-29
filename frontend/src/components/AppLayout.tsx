import React from "react";
import { AppBar, Toolbar, Box, Typography, Container } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          backdropFilter: "blur(10px)",
          borderBottom: (t) => `1px solid ${t.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)"}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
            Birthday Greeting Cards (Admin)
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  );
}
