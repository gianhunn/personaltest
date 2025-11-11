// Contact service for handling contact form operations
import { apiRequest, ApiResponse } from '@/lib/apiUtils'

export interface ContactData {
  phone: string
  datetime: string
  code?: string
}

class ContactService {
  /**
   * Submit contact form data
   */
  async submitContactForm(contactData: ContactData): Promise<ApiResponse> {
    return apiRequest(
      '/api/contact/submit',
      { method: 'POST', body: JSON.stringify(contactData) },
      'submitting contact form'
    )
  }
}

// Export singleton instance
export const contactService = new ContactService()