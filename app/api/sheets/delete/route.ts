import { NextRequest } from 'next/server';
import { googleSheetsClient, clearSheet } from '@/lib/googleSheets';
import { GOOGLE_SHEETS_CONFIG } from '@/lib/config';

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { rowIndex } = body; // 0-based row index

    if (typeof rowIndex !== 'number') {
      return Response.json(
        { success: false, message: 'Invalid request: rowIndex must be a number' },
        { status: 400 }
      );
    }

    const sheets = googleSheetsClient;
    const spreadsheetId = GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID;

    // Get sheet name from query parameter or use default
    const { searchParams } = new URL(request.url);
    const sheetName = searchParams.get('sheet') || GOOGLE_SHEETS_CONFIG.SHEET_NAME;

    const range = `${sheetName}!A${rowIndex + 1}:Z${rowIndex + 1}`; // Clear specific row in specified or default sheet
    const result = await clearSheet(sheets, spreadsheetId, range);

    return Response.json({
      success: true,
      message: 'Row cleared successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error deleting row:', error);
    return Response.json(
      { success: false, message: 'Failed to delete row', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}