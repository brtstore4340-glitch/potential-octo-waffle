import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AppLayout from "./components/AppLayout";
import EmployeeImportWizardPage from "./pages/EmployeeImportWizardPage";
import CardCollectionsPage from "./pages/CardCollectionsPage";

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppLayout>
        <Box sx={{ mb: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Import Wizard" />
            <Tab label="Card Collections" />
          </Tabs>
        </Box>

        {tab === 0 && <EmployeeImportWizardPage />}
        {tab === 1 && <CardCollectionsPage />}
      </AppLayout>
    </LocalizationProvider>
  );
}
