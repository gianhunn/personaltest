/**
 * Hourglass Components
 *
 * This file exports the hourglass components from the modular structure.
 * The implementation has been refactored into separate files for better maintainability:
 *
 * - hourglass/types.ts - TypeScript types and interfaces
 * - hourglass/constants.ts - Configuration constants and geometry
 * - hourglass/utils.ts - Utility functions
 * - hourglass/animation-engine.ts - Core animation logic
 * - hourglass/hourglass-loader.tsx - Main loader component
 * - hourglass/hourglass.tsx - Simple demo component
 */

export { HourglassLoader, Hourglass } from './hourglass/index'
export type { HourglassLoaderProps } from './hourglass/types'
export { DEFAULT_CONFIG } from './hourglass/constants'

// Default export for convenience
export { HourglassLoader as default } from './hourglass/index'
