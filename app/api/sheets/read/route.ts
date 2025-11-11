import { NextRequest } from 'next/server';
import { googleSheetsClient, readSheet } from '@/lib/googleSheets';
import { GOOGLE_SHEETS_CONFIG } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    const sheets = googleSheetsClient;
    const spreadsheetId = GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID;

    // Get sheet name from query parameter or use default
    const { searchParams } = new URL(request.url);
    const sheetName = searchParams.get('sheet') || GOOGLE_SHEETS_CONFIG.SHEET_NAME;

    const range = `${sheetName}!A:Z`; // Read from specified or default sheet
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