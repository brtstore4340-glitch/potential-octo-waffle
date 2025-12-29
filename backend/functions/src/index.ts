import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import ExcelJS from "exceljs";

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "10mb" }));

/**
 * POST /api/import/employees/preview
 * - Accepts base64-encoded .xlsx content for now (frontend can send multipart later)
 * - Returns preview JSON: { total, valid_count, data:[...] }
 *
 * NOTE: This is a stub. Replace with:
 * - multipart upload to Storage + read buffer in function
 * - Dry-run validation + duplicate check via emailIndex
 */
app.post("/api/import/employees/preview", async (req, res) => {
  try {
    const { fileBase64 } = req.body as { fileBase64?: string };
    if (!fileBase64) {
      return res.status(400).json({ message: "fileBase64 is required (stub endpoint)" });
    }

    const buffer = Buffer.from(fileBase64, "base64");
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buffer);
    const ws = wb.worksheets[0];

    // Minimal stub parse (first 20 rows)
    const data: any[] = [];
    let total = 0;
    let valid = 0;

    ws.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // header
      total++;
      if (total > 20) return;

      const email = String(row.getCell(1).value ?? "").trim();
      const firstName = String(row.getCell(2).value ?? "").trim();

      const isValid = email.includes("@") && firstName.length > 0;
      data.push({
        row: rowNumber,
        email,
        firstName,
        isValid,
        errors: isValid ? [] : ["Invalid email or missing first name"]
      });
      if (isValid) valid++;
    });

    return res.json({ total, valid_count: valid, data });
  } catch (e: any) {
    return res.status(500).json({ message: e?.message ?? "preview failed" });
  }
});

/**
 * POST /api/import/employees/commit
 * - Accepts { mode, data } from preview
 * - Writes to Firestore (stub)
 */
app.post("/api/import/employees/commit", async (req, res) => {
  try {
    const { mode, data } = req.body as { mode?: "upsert" | "insert_only"; data?: any[] };
    if (!mode || !Array.isArray(data)) {
      return res.status(400).json({ message: "mode and data are required" });
    }

    // Stub result
    return res.json({
      inserted: Math.max(0, data.filter(d => d.isValid).length - 2),
      updated: mode === "upsert" ? 2 : 0,
      skipped: mode === "insert_only" ? 2 : 0,
      failed: 2,
      failures: [
        { row: 5, email: "bad-email", reason: "Invalid email format" },
        { row: 9, email: "dup@company.com", reason: "Duplicate email" }
      ]
    });
  } catch (e: any) {
    return res.status(500).json({ message: e?.message ?? "commit failed" });
  }
});

/**
 * POST /api/jobs/sendDailyBirthdays
 * - Triggered by Cloud Scheduler at 09:00 Asia/Bangkok
 * - Leap-year handling + deterministic card index
 * - Idempotency with sendingLocks/{employeeId}_{targetDate}
 *
 * NOTE: Stub (logs only). Implement full Firestore queries next.
 */
app.post("/api/jobs/sendDailyBirthdays", async (_req, res) => {
  console.log("[JOB] sendDailyBirthdays (stub) invoked");
  return res.json({ ok: true });
});

export const api = functions.region("asia-southeast1").https.onRequest(app);
