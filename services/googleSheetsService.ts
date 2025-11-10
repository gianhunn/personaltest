// Service for handling Google Sheets API calls
export interface TestResult {
  name: string
  gender: 'male' | 'female'
  answers: Record<number, number>
}

export interface ApiResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

class GoogleSheetsService {
  private baseUrl = '/api/sheets'

  /**
   * Save test results to Google Sheets (via API route)
   */
  async saveTestResults(testResult: TestResult): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/save-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testResult),
      })

      const result: ApiResponse = await response.json()

      if (result.success) {
        console.log('Test results saved successfully:', result)
      } else {
        console.error('Failed to save test results:', result)
      }

      return result
    } catch (error) {
      console.error('Error saving test results:', error)
      return {
        success: false,
        message: 'Network error occurred',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Save test results directly (alternative implementation)
   * WARNING: This exposes Google Sheets logic to client-side
   */
  async saveTestResultsDirect(testResult: TestResult): Promise<ApiResponse> {
    try {
      // This would require importing Google Sheets client on client-side
      // Not recommended for security reasons
      console.warn('Direct save method - not implemented for security reasons')
      return {
        success: false,
        message: 'Direct save not implemented'
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to save test results',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Read data from Google Sheets
   */
  async readSheet(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/read`)
      const result: ApiResponse = await response.json()
      return result
    } catch (error) {
      console.error('Error reading sheet:', error)
      return {
        success: false,
        message: 'Failed to read sheet',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Append data to Google Sheets
   */
  async appendData(row: any[]): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/append`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ row }),
      })

      const result: ApiResponse = await response.json()
      return result
    } catch (error) {
      console.error('Error appending data:', error)
      return {
        success: false,
        message: 'Failed to append data',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Update data in Google Sheets
   */
  async updateData(rowIndex: number, row: any[]): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rowIndex, row }),
      })

      const result: ApiResponse = await response.json()
      return result
    } catch (error) {
      console.error('Error updating data:', error)
      return {
        success: false,
        message: 'Failed to update data',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Delete data from Google Sheets
   */
  async deleteData(rowIndex: number): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rowIndex }),
      })

      const result: ApiResponse = await response.json()
      return result
    } catch (error) {
      console.error('Error deleting data:', error)
      return {
        success: false,
        message: 'Failed to delete data',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Find email by code from Google Sheets
   */
  async findEmailByCode(code: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/find-email?code=${encodeURIComponent(code)}`)
      const result: ApiResponse = await response.json()
      return result
    } catch (error) {
      console.error('Error finding email by code:', error)
      return {
        success: false,
        message: 'Failed to find email by code',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Send test results via email
   */
  async sendTestResultsEmail(emailData: {
    email: string
    name: string
    gender: 'male' | 'female'
    answers: Record<number, number>
    code?: string
  }): Promise<ApiResponse> {
    try {
      const response = await fetch('/api/email/send-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      const result: ApiResponse = await response.json()
      return result
    } catch (error) {
      console.error('Error sending email:', error)
      return {
        success: false,
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService()