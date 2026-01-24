
export enum ThemeType {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  PINK_GRADIENT = 'PINK_GRADIENT',
  PURPLE_LUXE = 'PURPLE_LUXE',
  EMERALD_GREEN = 'EMERALD_GREEN',
  OCEAN_BLUE = 'OCEAN_BLUE',
  SUNSET_ORANGE = 'SUNSET_ORANGE',
  HIGH_CONTRAST = 'HIGH_CONTRAST'
}

export enum Language {
  EN = 'English',
  ES = 'Español',
  HI = 'हिन्दी',
  FR = 'Français',
  KR = '한국어',
  JP = '日本語'
}

export interface IntelligenceModule {
  skinToneHex: string;
  fitzpatrickScale: number;
  symmetryScore: number;
  agingSigns: { region: string; sign: string; severity: number }[];
  poreHeatmap: string; // Description or coordinates
  hydrationLevel: string;
  acneStage: string;
  hairTexture: string;
  hairSuitability: string[];
  lightingAdvice: string;
  zoomOptimization: string;
}

export interface FaceAnalysis {
  faceShape: string;
  symmetry: number;
  skinTone: string;
  undertone: string;
  skinTexture: string;
  problemZones: string[];
  eyeShape: string;
  lipShape: string;
  eyebrowShape: string;
  recommendations: string[];
  intelligence?: IntelligenceModule;
  culturalTrends?: string[];
  personalityMatch?: string;
}

export interface MakeupStep {
  step: number;
  name: string;
  product: string;
  colorHex: string;
  amount: string;
  duration: string;
  tools: string[];
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  instruction: string;
  proTip: string;
  mistakesToAvoid: string;
  budgetOption?: string;
  luxuryOption?: string;
  longevity?: string;
  imageUrl?: string;
  generatedImageUrl?: string;
  audioUrl?: string;
  microData?: {
    exactWeight?: string;
    pressureLevel?: string;
    lightingAngle?: string;
    voiceScript?: string;
    translationEs?: string;
  };
}

export interface HaircutStyle {
  id: number;
  name: string;
  category: string;
  params: string;
  previewUrl: string;
}

export interface WeddingDress {
  id: string;
  name: string;
  culture: string;
  occasion: string;
  description: string;
  features: string[];
  styleParams: string;
}

export interface StylistLook {
  id: string;
  title: string;
  outfit: string;
  makeup: string;
  hair: string;
  notes: string;
  imageUrl?: string;
}

export interface PersonalityStylistData {
  hair: string[];
  clothing: string[];
  jeans: string[];
  jewelry: string[];
  shoes: string[];
  transformation: string[];
  personalityProfile: string;
}

export type ViewState = 
  | 'DASHBOARD' 
  | 'MAKEUP_SELECTION' 
  | 'UPLOAD_SELECTION' 
  | 'CAMERA' 
  | 'PREVIEW' 
  | 'CONSENT' 
  | 'PROGRESS' 
  | 'ANALYSIS' 
  | 'TUTORIAL' 
  | 'HAIRCUTS' 
  | 'SETTINGS' 
  | 'PRIVACY' 
  | 'TERMS' 
  | 'SECURITY' 
  | 'WEDDING_DRESS_SELECTION' 
  | 'DRESS_PREVIEW' 
  | 'STYLIST_PREVIEW'
  | 'PERSONALITY_STYLIST_QA'
  | 'PERSONALITY_STYLIST_RESULTS'
  | 'PERSONALITY_STYLIST_FINAL'
  | 'GLOBAL_DRESS_DESIGNER';

export type Occasion = 'WEDDING' | 'PARTY' | 'OFFICE' | 'DATE' | 'DAILY' | 'FESTIVAL' | 'PHOTO' | 'SPORTS' | 'STYLIST' | 'PERSONALITY_STYLIST';

export type CountryStyle = 'INDIA' | 'PAKISTAN' | 'MIDDLE_EAST' | 'KOREA' | 'JAPAN' | 'CHINA' | 'THAILAND' | 'USA' | 'UK' | 'AUSTRALIA' | 'AFRICA' | 'EUROPE';
