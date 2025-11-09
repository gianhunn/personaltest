import { google } from 'googleapis';
import { GOOGLE_SHEETS_CONFIG } from './config';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_SHEETS_CONFIG.CREDENTIALS,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

export async function readSheet(sheets: any, spreadsheetId: string, range: string) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values || [];
  } catch (error) {
    throw new Error(`Failed to read sheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function appendToSheet(sheets: any, spreadsheetId: string, range: string, values: any[][]) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: { values },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to append to sheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function clearSheet(sheets: any, spreadsheetId: string, range: string) {
  try {
    const response = await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to clear sheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}