// Email service for handling email operations
import { apiRequest, ApiResponse } from '@/lib/apiUtils'

export interface EmailData {
  email: string
  name: string
  gender: 'male' | 'female'
  answers: Record<number, number>
  code?: string
}

export interface ContactEmailData {
  email: string
  phone: string
  datetime: string
  code?: string
  codeFound?: boolean
}

class EmailService {
  /**
   * Send test results via email
   */
  async sendTestResultsEmail(emailData: EmailData): Promise<ApiResponse> {
    return apiRequest(
      '/api/email/send-results',
      { method: 'POST', body: JSON.stringify(emailData) },
      'sending test results email'
    )
  }

  /**
   * Send contact form results via email
   */
  async sendContactFormEmail(contactData: ContactEmailData): Promise<ApiResponse> {
    return apiRequest(
      '/api/email/send-contact',
      { method: 'POST', body: JSON.stringify(contactData) },
      'sending contact email'
    )
  }
}

// Export singleton instance
export const emailService = new EmailService()