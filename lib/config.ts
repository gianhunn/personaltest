// Google Sheets configuration constants
export const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: process.env.GOOGLE_SHEET_ID || '1DRkugRQubc-hWQdLHJpBkmuybDaFQCxsc8Wot2gifEc',
  SHEET_NAME: process.env.GOOGLE_SHEET_NAME || 'Test results',
  CODE_EMAIL_SHEET_NAME: process.env.GOOGLE_CODE_EMAIL_SHEET_NAME || 'Codes', // Sheet for code-email mapping
  CONTACT_SHEET_NAME: process.env.GOOGLE_CONTACT_SHEET_NAME || 'Registration results', // Sheet for contact form data
  CREDENTIALS: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
} as const;