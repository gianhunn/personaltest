import { NextRequest } from 'next/server';
import { googleSheetsClient, appendToSheet } from '@/lib/googleSheets';
import { createErrorResponse, createSuccessResponse } from '@/lib/apiUtils';
import { GOOGLE_SHEETS_CONFIG } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, datetime, code, birthDate, consultationText } = body;

    // Validate required fields
    if (!phone || !datetime) {
      return Response.json(
        createErrorResponse('Missing required fields: phone, datetime'),
        { status: 400 }
      );
    }

    // Prepare contact data for Google Sheets
    const contactData = [
      new Date().toISOString(), // timestamp
      phone,
      birthDate || '', // birth date
      datetime,
      consultationText || '', // consultation text
      code || '', // code from URL param
    ];

    // Save to Google Sheets
    const sheets = googleSheetsClient;
    const spreadsheetId = GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID;
    const saveResult = await appendToSheet(sheets, spreadsheetId, GOOGLE_SHEETS_CONFIG.CONTACT_SHEET_NAME, [contactData]);

    if (!saveResult) {
      console.error('Failed to save contact form to Google Sheets');
      return Response.json(
        createErrorResponse('Failed to save contact form data'),
        { status: 500 }
      );
    }

    return Response.json(createSuccessResponse('Contact form submitted successfully'));

  } catch (error) {
    console.error('Error processing contact form:', error);
    return Response.json(
      createErrorResponse(
        'Failed to process contact form',
        error instanceof Error ? error.message : 'Unknown error'
      ),
      { status: 500 }
    );
  }
}