import { NextRequest } from 'next/server';
import { getGoogleSheetsClient, readSheet } from '@/lib/googleSheets';
import { GOOGLE_SHEETS_CONFIG } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return Response.json(
        { success: false, message: 'Missing code parameter' },
        { status: 400 }
      );
    }

    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID;

    // Read the code-email mapping sheet to find the code
    const range = `${GOOGLE_SHEETS_CONFIG.CODE_EMAIL_SHEET_NAME}!A:B`; // Read columns A (code) and B (email)
    const sheetData = await readSheet(sheets, spreadsheetId, range);

    console.log('Searching for code:', code, 'in sheet:', GOOGLE_SHEETS_CONFIG.CODE_EMAIL_SHEET_NAME);

    if (!sheetData || sheetData.length === 0) {
      return Response.json(
        { success: false, message: 'No data found in sheet' },
        { status: 404 }
      );
    }

    // Find the row where column A matches the code
    const matchingRow = sheetData.find((row: any[]) => row[0] === code);

    let email: string;
    let codeFound: boolean = !!matchingRow;

    if (matchingRow) {
      // Code found - use the corresponding email
      email = matchingRow[1];
      console.log('Found email for code:', code, '->', email);
    } else {
      // Code not found - use default email from first data row
      // Skip potential header row (row 0) and get first data row
      const firstDataRow = sheetData.length > 1 ? sheetData[1] : sheetData[0];
      email = firstDataRow ? firstDataRow[1] : null;

      if (!email) {
        return Response.json(
          { success: false, message: 'No email found in sheet' },
          { status: 404 }
        );
      }

      console.log('Code not found, using default email:', email);
    }

    return Response.json({
      success: true,
      message: codeFound ? 'Email found for code' : 'Using default email (code not found)',
      data: {
        code: codeFound ? code : null,
        email,
        codeFound
      },
    });
  } catch (error) {
    console.error('Error finding email by code:', error);
    return Response.json(
      { success: false, message: 'Failed to find email by code', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}