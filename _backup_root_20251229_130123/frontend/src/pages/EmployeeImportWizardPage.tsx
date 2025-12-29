import React, { useMemo, useState } from "react";
import {
  Box, Paper, Stepper, Step, StepLabel, Typography, Alert, Divider,
  RadioGroup, FormControlLabel, Radio, LinearProgress
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import GlassButton from "../components/GlassButton";

type ImportMode = "upsert" | "insert_only";

type PreviewRow = {
  row: number;
  employeeId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: string;
  department?: string;
  position?: string;
  timezone?: string;
  status?: "active" | "inactive";
  isValid: boolean;
  errors: string[];
};

const steps = ["Upload", "Preview & Validate", "Result"];

export default function EmployeeImportWizardPage() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<ImportMode>("upsert");
  const [loading, setLoading] = useState(false);

  // Demo data (replace with real API)
  const [preview, setPreview] = useState<{ total: number; valid: number; data: PreviewRow[] } | null>(null);
  const rows = preview?.data ?? [];

  const columns: GridColDef[] = useMemo(() => ([
    { field: "row", headerName: "Row", width: 80 },
    { field: "employeeId", headerName: "Employee ID", width: 140 },
    { field: "firstName", headerName: "First Name", width: 140 },
    { field: "lastName", headerName: "Last Name", width: 140 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "birthDate", headerName: "Birth Date", width: 120 },
    { field: "department", headerName: "Department", width: 140 },
    { field: "position", headerName: "Position", width: 140 },
    {
      field: "errors",
      headerName: "Errors",
      width: 360,
      sortable: false,
      valueGetter: (p) => Array.isArray(p.row?.errors) ? p.row.errors.join(" | ") : "",
    },
  ]), []);

  const summaryText = useMemo(() => {
    if (!preview) return "";
    const invalid = preview.total - preview.valid;
    return `พบ ${preview.total} แถว, ผ่าน ${preview.valid}, ผิด ${invalid}`;
  }, [preview]);

  const downloadTemplate = () => {
    window.location.href = "/admin/employees/template";
  };

  const mockPreview = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 650));
    setPreview({
      total: 100,
      valid: 98,
      data: Array.from({ length: 20 }).map((_, i) => ({
        row: i + 2,
        employeeId: `EMP${String(i + 1).padStart(4, "0")}`,
        firstName: "Somchai",
        lastName: "Jaidee",
        email: i % 9 === 0 ? "bad-email" : `user${i + 1}@company.com`,
        birthDate: "1984-11-27",
        department: "IT",
        position: "PM",
        isValid: i % 9 !== 0,
        errors: i % 9 === 0 ? ["Invalid email format"] : [],
      }))
    });
    setStep(1);
    setLoading(false);
  };

  const mockCommit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setStep(2);
    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Import Employees</Typography>
          <Typography variant="body2" color="text.secondary">Upload → Preview → Commit</Typography>
        </Box>

        <GlassButton onClick={downloadTemplate}>
          Download Template
        </GlassButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Stepper activeStep={step} sx={{ mb: 2 }}>
        {steps.map(s => (
          <Step key={s}><StepLabel>{s}</StepLabel></Step>
        ))}
      </Stepper>

      {loading && <LinearProgress sx={{ mb: 2, borderRadius: 999 }} />}

      {step === 0 && (
        <Box sx={{
          mt: 2, p: 3, borderRadius: 3,
          border: (t) => `2px dashed ${t.palette.mode === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.10)"}`,
          bgcolor: (t) => t.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)",
          backdropFilter: "blur(10px)",
          textAlign: "center"
        }}>
          <Typography sx={{ fontWeight: 700, mb: 1 }}>Dropzone (.xlsx)</Typography>
          <Typography variant="body2" color="text.secondary">
            (หน้านี้เป็น skeleton) — ให้แทนด้วย dropzone จริง + call /preview
          </Typography>
          <Box sx={{ mt: 2 }}>
            <GlassButton loading={loading} onClick={mockPreview}>Preview</GlassButton>
          </Box>
        </Box>
      )}

      {step === 1 && (
        <Box sx={{ mt: 2 }}>
          <Alert severity={(preview && preview.valid === preview.total) ? "success" : "warning"} sx={{ mb: 2 }}>
            {summaryText}
          </Alert>

          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography sx={{ fontWeight: 800, mb: 1 }}>Settings</Typography>
            <RadioGroup row value={mode} onChange={(e) => setMode(e.target.value as ImportMode)}>
              <FormControlLabel value="upsert" control={<Radio />} label="Upsert (Update if exists)" />
              <FormControlLabel value="insert_only" control={<Radio />} label="Insert Only (Skip duplicates)" />
            </RadioGroup>
          </Paper>

          <Paper variant="outlined" sx={{ height: 520 }}>
            <DataGrid
              rows={rows.map((r, idx) => ({ id: `${r.row}-${idx}`, ...r }))}
              columns={columns}
              disableRowSelectionOnClick
              getRowClassName={(p) => p.row.isValid ? "row-valid" : "row-invalid"}
              sx={{
                "& .row-invalid": { bgcolor: "rgba(244, 67, 54, 0.14)", "&:hover": { bgcolor: "rgba(244, 67, 54, 0.20)" } },
                "& .row-valid": { bgcolor: "rgba(76, 175, 80, 0.10)", "&:hover": { bgcolor: "rgba(76, 175, 80, 0.16)" } },
              }}
            />
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <GlassButton loading={loading} onClick={mockCommit}>Commit</GlassButton>
          </Box>
        </Box>
      )}

      {step === 2 && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Success: 98, Failed: 2
          </Alert>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            (Skeleton) — ถ้ามี failed ให้แสดงปุ่ม Download Error Report
          </Typography>
          <GlassButton onClick={() => alert("TODO: Download Error Report")}>
            Download Error Report
          </GlassButton>
        </Box>
      )}
    </Paper>
  );
}
