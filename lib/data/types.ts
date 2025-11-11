export interface PersonalityDimension {
  en: string
  vi: string
}

export interface DescriptionBullet {
  bold: string
  regular: string
}

export interface OutfitImage {
  src: string
  alt: string
}

export interface StyleGuideItem {
  alt: string
  src: string
  title: string
  description: string
  iconBg: string
}

export interface QuoteSection {
  backgroundImage: string
  backgroundImageAlt: string
  quote: string
  description: string
}

export interface StyleGuideOutfitImage {
  src: string
  alt: string
}

export interface StyleMetadata {
  title: string
  description: string
}

// Sub-style data (style-specific information)
export interface SubStyle {
  gender?: "male" | "female"
  styleName: string
  styleDescription: string
  metadata: StyleMetadata
  outfitImages: OutfitImage[]
  colorPalette: string[]
  styleGuideItems: StyleGuideItem[]
  quoteSection: QuoteSection
  styleGuideOutfitImage: StyleGuideOutfitImage
}

// Style data with sub-styles (like ENTP)
export interface StyleDataWithSubStyles {
  personalityType: string
  personalityTitle: string
  personalityDimensions: PersonalityDimension[]
  descriptionBullets: DescriptionBullet[]
  subStyles: SubStyle[]
}

// Flat style data (without sub-styles, like INTJ)
export interface StyleData {
  personalityType: string
  personalityTitle: string
  styleName: string
  styleDescription: string
  metadata: StyleMetadata
  personalityDimensions: PersonalityDimension[]
  descriptionBullets: DescriptionBullet[]
  outfitImages: OutfitImage[]
  colorPalette: string[]
  styleGuideItems: StyleGuideItem[]
  quoteSection: QuoteSection
  styleGuideOutfitImage: StyleGuideOutfitImage
}

// Union type for all style data
export type StyleDataUnion = StyleData | StyleDataWithSubStyles

// Styles data can be either a single object or an array of objects
export interface StylesData {
  [key: string]: StyleDataUnion | StyleDataWithSubStyles[]
}
