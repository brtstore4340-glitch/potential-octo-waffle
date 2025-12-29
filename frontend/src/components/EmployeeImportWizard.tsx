import React, { useState } from 'react';
import { Box, Button, RadioGroup, FormControlLabel, Radio, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

// MOCK API Call
const mockUpload = async (file) => {
    // In real app: use axios.post('/admin/employees/import/preview', formData)
    return new Promise(resolve => setTimeout(() => resolve({
        total: 2,
        data: [
            { rowNumber: 2, first_name: 'John', email: 'john@test.com', isValid: true, errors: [] },
            { rowNumber: 3, first_name: 'Jane', email: 'jane', isValid: false, errors: ['Invalid Email'] }
        ]
    }), 1000));
};

export const EmployeeImportWizard = () => {
    const [step, setStep] = useState(1);
    const [previewData, setPreviewData] = useState([]);
    const [importMode, setImportMode] = useState('upsert');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Call Backend
        const result = await mockUpload(file);
        setPreviewData(result.data);
        setStep(2);
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>Bulk Employee Import</Typography>
            
            {step === 1 && (
                <Box sx={{ border: '2px dashed #ccc', p: 4, textAlign: 'center' }}>
                    <Button variant="contained" component="label">
                        Upload .xlsx
                        <input hidden accept=".xlsx" type="file" onChange={handleFileChange} />
                    </Button>
                    <Box mt={2}>
                        <a href="/api/admin/employees/template" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Download Template
                        </a>
                    </Box>
                </Box>
            )}

            {step === 2 && (
                <Box>
                    <Typography variant="subtitle1">Preview ({previewData.length} rows)</Typography>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Row</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {previewData.map((row) => (
                                <TableRow key={row.rowNumber} sx={{ bgcolor: row.isValid ? 'inherit' : '#ffebee' }}>
                                    <TableCell>{row.rowNumber}</TableCell>
                                    <TableCell>{row.first_name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell style={{ color: row.isValid ? 'green' : 'red' }}>
                                        {row.isValid ? 'OK' : row.errors.join(', ')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <RadioGroup row value={importMode} onChange={(e) => setImportMode(e.target.value)}>
                            <FormControlLabel value="upsert" control={<Radio />} label="Upsert (Update existing)" />
                            <FormControlLabel value="insert" control={<Radio />} label="Insert Only" />
                        </RadioGroup>
                        <Button variant="contained" color="primary">Commit Import</Button>
                    </Box>
                </Box>
            )}
        </Paper>
    );
};
