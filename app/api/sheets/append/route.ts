import { NextRequest } from 'next/server';
import { getGoogleSheetsClient, appendToSheet } from '@/lib/googleSheets';
import { GOOGLE_SHEETS_CONFIG } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { row } = body; // row should be an array of values

    if (!row || !Array.isArray(row)) {
      return Response.json(
        { success: false, message: 'Invalid request: row must be an array' },
        { status: 400 }
      );
    }

    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID;

    // Force append to configured sheet column A
    const sheetName = GOOGLE_SHEETS_CONFIG.SHEET_NAME;
    const range = `${sheetName}!A:A`; // Use configured sheet column A

    const result = await appendToSheet(sheets, spreadsheetId, range, [row]);

    return Response.json({
      success: true,
      message: 'Row appended successfully',
      data: {
        ...result,
        sheetUsed: sheetName,
        rangeUsed: range
      },
    });
  } catch (error) {
    console.error('Error appending to sheet:', error);
    return Response.json(
      { success: false, message: 'Failed to append row', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}