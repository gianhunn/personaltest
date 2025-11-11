// Common utilities for API services
import { google } from 'googleapis';
import { GOOGLE_SHEETS_CONFIG } from './config';

export interface ApiResponse {
  success: boolean
  message: string
  data?: any
  error?: string
}

/**
 * Create API URL with optional sheet parameter
 */
export function buildApiUrl(baseUrl: string, endpoint: string, sheetName?: string): string {
  const url = `${baseUrl}/${endpoint}`
  return sheetName ? `${url}?sheet=${encodeURIComponent(sheetName)}` : url
}

/**
 * Handle API fetch with consistent error handling
 */
export async function apiRequest<T = any>(
  url: string,
  options: RequestInit,
  errorContext: string
): Promise<ApiResponse> {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    return await response.json()
  } catch (error) {
    console.error(`Error ${errorContext}:`, error)
    return {
      success: false,
      message: `Failed to ${errorContext}`,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Create standardized error response
 */
export function createErrorResponse(message: string, error?: string): ApiResponse {
  return {
    success: false,
    message,
    error: error || 'Unknown error'
  }
}

/**
 * Create standardized success response
 */
export function createSuccessResponse(message: string, data?: any): ApiResponse {
  return {
    success: true,
    message,
    data
  }
}