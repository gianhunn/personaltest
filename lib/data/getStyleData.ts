import stylesData from "./styles.json"
import type { StyleData, StyleDataWithSubStyles, StylesData, SubStyle } from "./types"

/**
 * Check if style data has sub-styles
 */
export function hasSubStyles(data: StyleData | StyleDataWithSubStyles): data is StyleDataWithSubStyles {
  return "subStyles" in data && Array.isArray(data.subStyles)
}

/**
 * Check if a style entry is an array
 */
function isStyleArray(data: StyleData | StyleDataWithSubStyles | StyleDataWithSubStyles[]): data is StyleDataWithSubStyles[] {
  return Array.isArray(data)
}

/**
 * Get style data by key
 * @param styleKey - The key of the style (e.g., "entp")
 * @param index - Optional index if the style is an array (default: 0)
 * @returns Style data object (can be with or without sub-styles)
 */
export function getStyleData(styleKey: string, index: number = 0): StyleData | StyleDataWithSubStyles {
  const data = (stylesData as StylesData)[styleKey]
  if (!data) {
    throw new Error(`Style data not found for key: ${styleKey}`)
  }
  
  // If it's an array, get the element at the specified index
  if (isStyleArray(data)) {
    if (index < 0 || index >= data.length) {
      throw new Error(`Style index ${index} is out of range for ${styleKey}`)
    }
    return data[index]
  }
  
  // Otherwise return the data directly
  return data
}

/**
 * Get a specific sub-style from a style that has sub-styles
 * @param styleKey - The key of the parent style (e.g., "entp")
 * @param subStyleIndex - The index of the sub-style (0 or 1)
 * @param styleIndex - Optional index if the style is an array (default: 0)
 * @returns Combined style data with sub-style information
 */
export function getSubStyleData(styleKey: string, subStyleIndex: number, styleIndex: number = 0): StyleData {
  const data = getStyleData(styleKey, styleIndex)
  
  if (!hasSubStyles(data)) {
    throw new Error(`Style ${styleKey} does not have sub-styles`)
  }
  
  if (subStyleIndex < 0 || subStyleIndex >= data.subStyles.length) {
    throw new Error(`Sub-style index ${subStyleIndex} is out of range for ${styleKey}`)
  }
  
  const subStyle = data.subStyles[subStyleIndex]
  
  // Combine parent style data with sub-style data
  return {
    personalityType: data.personalityType,
    personalityTitle: data.personalityTitle,
    styleName: subStyle.styleName,
    styleDescription: subStyle.styleDescription,
    metadata: subStyle.metadata,
    personalityDimensions: data.personalityDimensions,
    descriptionBullets: data.descriptionBullets,
    outfitImages: subStyle.outfitImages,
    colorPalette: subStyle.colorPalette,
    styleGuideItems: subStyle.styleGuideItems,
    quoteSection: subStyle.quoteSection,
    styleGuideOutfitImage: subStyle.styleGuideOutfitImage,
  }
}

/**
 * Get a sub-style by gender
 * @param styleKey - The key of the parent style (e.g., "entp")
 * @param gender - The gender to filter by ("male" or "female")
 * @param styleIndex - Optional index if the style is an array (default: 0)
 * @returns Combined style data with sub-style information, or null if not found
 */
export function getSubStyleByGender(styleKey: string, gender: "male" | "female", styleIndex: number = 0): StyleData | null {
  const data = getStyleData(styleKey, styleIndex)
  
  if (!hasSubStyles(data)) {
    return null
  }
  
  const subStyleIndex = data.subStyles.findIndex(subStyle => subStyle.gender === gender)
  if (subStyleIndex === -1) {
    return null
  }
  
  return getSubStyleData(styleKey, subStyleIndex, styleIndex)
}

/**
 * Get all available style keys
 * @returns Array of style keys
 */
export function getAvailableStyleKeys(): string[] {
  return Object.keys(stylesData as StylesData)
}

/**
 * Get sub-styles for a given style key
 * @param styleKey - The key of the style
 * @param styleIndex - Optional index if the style is an array (default: 0)
 * @returns Array of sub-styles or null if style doesn't have sub-styles
 */
export function getSubStyles(styleKey: string, styleIndex: number = 0): SubStyle[] | null {
  const data = getStyleData(styleKey, styleIndex)
  if (hasSubStyles(data)) {
    return data.subStyles
  }
  return null
}
