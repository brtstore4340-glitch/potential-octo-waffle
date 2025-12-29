import React, { useMemo, useState } from "react";
import { Box, Paper, Typography, Grid, Card, CardActionArea, CardContent, Chip, Divider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

function calcIndex(day: number) {
  return ((day - 1) % 7) + 1;
}

export default function CardCollectionsPage() {
  const months = useMemo(() => Array.from({ length: 12 }).map((_, i) => i + 1), []);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [picked, setPicked] = useState<Dayjs | null>(dayjs());

  const day = picked ? picked.date() : 1;
  const selectedIndex = calcIndex(day);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800 }}>Card Collections</Typography>
      <Typography variant="body2" color="text.secondary">
        Grid 12 เดือน → คลิกเดือน → แสดงการ์ด 7 ใบ + Day Color Preview
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {months.map(m => (
          <Grid item xs={6} sm={4} md={3} key={m}>
            <Card sx={{ borderRadius: 3 }}>
              <CardActionArea onClick={() => setSelectedMonth(m)}>
                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>Month {m}</Typography>
                    <Typography variant="caption" color="text.secondary">Theme: (mock)</Typography>
                  </Box>
                  <Chip label={m === selectedMonth ? "Selected" : "Active"} color={m === selectedMonth ? "primary" : "success"} variant="outlined" />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography sx={{ fontWeight: 900, mb: 1 }}>Month Detail: {selectedMonth}</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {Array.from({ length: 7 }).map((_, i) => {
          const idx = i + 1;
          const highlighted = idx === selectedIndex;
          return (
            <Grid item xs={12} sm={6} md={3} lg={12/7} key={idx}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: (t) => highlighted ? `2px solid ${t.palette.primary.main}` : `1px solid ${t.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)"}`,
                  boxShadow: highlighted ? "0 14px 30px rgba(26,115,232,0.18)" : "none",
                }}
              >
                <CardContent>
                  <Typography sx={{ fontWeight: 900 }}>Card {idx}</Typography>
                  <Typography variant="body2" color="text.secondary">Color: (mock)</Typography>
                  {highlighted && <Chip sx={{ mt: 1 }} label={`Selected for Day ${day}`} color="primary" />}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Typography sx={{ fontWeight: 900, mb: 1 }}>Day Color Preview</Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
        <DatePicker value={picked} onChange={setPicked} />
        <Chip label={`วันที่ ${day} → ใช้ Card ${selectedIndex}`} color="primary" variant="outlined" />
      </Box>
    </Paper>
  );
}
