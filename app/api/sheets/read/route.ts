import { NextRequest } from 'next/server';
import { getGoogleSheetsClient, readSheet } from '@/lib/googleSheets';
import { GOOGLE_SHEETS_CONFIG } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID;

    const sheetName = GOOGLE_SHEETS_CONFIG.SHEET_NAME;
    const range = `${sheetName}!A:Z`; // Read from configured sheet
    const rows = await readSheet(sheets, spreadsheetId, range);

    return Response.json({
      success: true,
      message: 'Rows retrieved successfully',
      data: rows,
    });
  } catch (error) {
    console.error('Error reading sheet:', error);
    return Response.json(
      { success: false, message: 'Failed to read sheet', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}