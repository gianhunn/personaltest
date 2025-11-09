// Google Sheets configuration constants
export const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: process.env.GOOGLE_SHEET_ID || '1DRkugRQubc-hWQdLHJpBkmuybDaFQCxsc8Wot2gifEc',
  SHEET_NAME: process.env.GOOGLE_SHEET_NAME || 'Sheet2',
  CREDENTIALS: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
} as const;