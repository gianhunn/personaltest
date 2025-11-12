import { NextRequest } from 'next/server';
import { googleSheetsClient, appendToSheet } from '@/lib/googleSheets';
import { GOOGLE_SHEETS_CONFIG } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, gender, answers, code } = body;

    if (!name || !gender || !answers) {
      return Response.json(
        { success: false, message: 'Missing required fields: name, gender, answers' },
        { status: 400 }
      );
    }

    const sheets = googleSheetsClient;
    const spreadsheetId = GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID;

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const sheetName = GOOGLE_SHEETS_CONFIG.SHEET_NAME;

    // Convert answers object to array format for sheets
    const answersArray = Object.values(answers); // Get answer values in order

    // Create row data: [timestamp, name, gender, answer1, answer2, ..., answer12, code] (code optional)
    const rowData = [
      timestamp,
      name,
      gender,
      ...answersArray,
      ...(code ? [code] : [])
    ];

    const range = `${sheetName}!A:A`; // Append to configured sheet column A

    const result = await appendToSheet(sheets, spreadsheetId, range, [rowData]);

    return Response.json({
      success: true,
      message: 'Test results saved successfully',
      data: {
        ...result,
        sheetUsed: sheetName,
        rangeUsed: range,
        savedData: {
          timestamp,
          name,
          gender,
          answers: answersArray,
          ...(code && { code }),
          totalAnswers: answersArray.length
        }
      },
    });
  } catch (error) {
    console.error('Error saving test results:', error);
    return Response.json(
      { success: false, message: 'Failed to save test results', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}