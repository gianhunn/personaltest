// Service for handling Google Sheets API calls from client-side
import { buildApiUrl, apiRequest, ApiResponse } from '@/lib/apiUtils'

export interface TestResult {
  name: string
  gender: 'male' | 'female'
  answers: Record<number, number>
}

class GoogleSheetsService {
  private baseUrl = '/api/sheets'

  /**
   * Save test results to Google Sheets
   */
  async saveTestResults(testResult: TestResult): Promise<ApiResponse> {
    const result = await apiRequest(
      `${this.baseUrl}/save-test`,
      { method: 'POST', body: JSON.stringify(testResult) },
      'saving test results'
    )

    // Log success/error for test results specifically
    if (result.success) {
      console.log('Test results saved successfully:', result)
    } else {
      console.error('Failed to save test results:', result)
    }

    return result
  }

  /**
   * Read data from Google Sheets
   */
  async readSheet(sheetName?: string): Promise<ApiResponse> {
    return apiRequest(
      buildApiUrl(this.baseUrl, 'read', sheetName),
      { method: 'GET' },
      'reading sheet'
    )
  }

  /**
   * Append data to Google Sheets
   */
  async appendData(row: any[], sheetName?: string): Promise<ApiResponse> {
    return apiRequest(
      buildApiUrl(this.baseUrl, 'append', sheetName),
      { method: 'POST', body: JSON.stringify({ row }) },
      'appending data'
    )
  }

  /**
   * Delete data from Google Sheets
   */
  async deleteData(rowIndex: number, sheetName?: string): Promise<ApiResponse> {
    return apiRequest(
      buildApiUrl(this.baseUrl, 'delete', sheetName),
      { method: 'DELETE', body: JSON.stringify({ rowIndex }) },
      'deleting data'
    )
  }

  /**
   * Find email by code from Google Sheets
   */
  async findEmailByCode(code: string): Promise<ApiResponse> {
    return apiRequest(
      `${this.baseUrl}/find-email?code=${encodeURIComponent(code)}`,
      { method: 'GET' },
      'finding email by code'
    )
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService()