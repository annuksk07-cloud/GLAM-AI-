
import React from 'react';
import { ThemeType, Occasion, CountryStyle, HaircutStyle, Language, WeddingDress } from './types';

export const THEMES: Record<ThemeType, string> = {
  [ThemeType.DARK]: 'bg-[#1A1A1A] text-white',
  [ThemeType.LIGHT]: 'bg-white text-gray-900',
  [ThemeType.PINK_GRADIENT]: 'bg-gradient-to-br from-[#FF1493] to-[#FFB6C1] text-white',
  [ThemeType.PURPLE_LUXE]: 'bg-[#7B2CBF] text-white',
  [ThemeType.EMERALD_GREEN]: 'bg-[#2D6A4F] text-white',
  [ThemeType.OCEAN_BLUE]: 'bg-[#0277BD] text-white',
  [ThemeType.SUNSET_ORANGE]: 'bg-[#FF6B35] text-white',
  [ThemeType.HIGH_CONTRAST]: 'bg-black text-white border-2 border-white'
};

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  HOME: { [Language.EN]: 'Home', [Language.ES]: 'Inicio', [Language.HI]: 'होम', [Language.FR]: 'Accueil', [Language.KR]: '홈', [Language.JP]: 'ホーム' },
  MAKEUP: { [Language.EN]: 'Makeup', [Language.ES]: 'Maquillaje', [Language.HI]: 'मेकअप', [Language.FR]: 'Maquillage', [Language.KR]: '메이크업', [Language.JP]: 'メイク' },
  HAIRCUTS: { [Language.EN]: 'Haircuts', [Language.ES]: 'Cortes', [Language.HI]: 'हेयरकट', [Language.FR]: 'Coiffures', [Language.KR]: '헤어컷', [Language.JP]: 'ヘアカット' },
  WEDDING: { [Language.EN]: 'Wedding', [Language.ES]: 'Boda', [Language.HI]: 'शादी', [Language.FR]: 'Mariage', [Language.KR]: '웨딩', [Language.JP]: 'ウェディング' },
  STYLIST: { [Language.EN]: 'AI Stylist', [Language.ES]: 'Estilista IA', [Language.HI]: 'AI स्टाइलिस्ट', [Language.FR]: 'Styliste IA', [Language.KR]: 'AI 스타일리스트', [Language.JP]: 'AIスタイリスト' },
  PERSONALITY: { [Language.EN]: 'Personality Stylist', [Language.ES]: 'Estilista Personal', [Language.HI]: 'व्यक्तित्व स्टाइलिस्ट', [Language.FR]: 'Styliste Personnalité', [Language.KR]: '성격 스타일리스트', [Language.JP]: 'パーソナリティスタイリスト' },
  DESIGNER: { [Language.EN]: 'Dress Designer', [Language.ES]: 'Diseñador', [Language.HI]: 'डिज़ाइनर', [Language.FR]: 'Designer', [Language.KR]: '디자이너', [Language.JP]: 'デザイナー' },
  SETTINGS: { [Language.EN]: 'Settings', [Language.ES]: 'Ajustes', [Language.HI]: 'सेटिंग्स', [Language.FR]: 'Paramètres', [Language.KR]: '설정', [Language.JP]: '設定' },
  DASHBOARD_TITLE: { 
    [Language.EN]: 'Your Personal AI Stylist.', 
    [Language.ES]: 'Tu estilista personal de IA.', 
    [Language.HI]: 'आपका व्यक्तिगत AI स्टाइलिस्ट।',
    [Language.FR]: 'Votre styliste personnel IA.',
    [Language.KR]: '당신의 퍼스널 AI 스타일리스트.',
    [Language.JP]: 'あなた専用のAIスタイリスト。'
  }
};

export const OCCASIONS: { value: Occasion; label: string; icon: string }[] = [
  { value: 'PERSONALITY_STYLIST', label: 'Personality Stylist', icon: 'fa-user-astronaut' },
  { value: 'STYLIST', label: 'AI Body Stylist', icon: 'fa-star' },
  { value: 'WEDDING', label: 'Wedding (Bridal)', icon: 'fa-ring' },
  { value: 'PARTY', label: 'Party/Clubbing', icon: 'fa-glass-cheers' },
  { value: 'OFFICE', label: 'Office/Professional', icon: 'fa-briefcase' },
  { value: 'DATE', label: 'Evening Date', icon: 'fa-heart' },
  { value: 'DAILY', label: 'Daily/Casual', icon: 'fa-sun' },
  { value: 'FESTIVAL', label: 'Festival/Celebration', icon: 'fa-om' },
  { value: 'PHOTO', label: 'Photography/Camera', icon: 'fa-camera' },
  { value: 'SPORTS', label: 'Sports/Active', icon: 'fa-running' },
];

export const COUNTRIES: { value: CountryStyle; label: string; icon: string }[] = [
  { value: 'INDIA', label: 'India', icon: 'fa-om' },
  { value: 'PAKISTAN', label: 'Pakistan', icon: 'fa-moon' },
  { value: 'MIDDLE_EAST', label: 'Middle East', icon: 'fa-mosque' },
  { value: 'KOREA', label: 'Korea', icon: 'fa-circle-half-stroke' },
  { value: 'JAPAN', label: 'Japan', icon: 'fa-sun' },
  { value: 'CHINA', label: 'China', icon: 'fa-dragon' },
  { value: 'THAILAND', label: 'Thailand', icon: 'fa-temple' },
  { value: 'USA', label: 'USA', icon: 'fa-star' },
  { value: 'UK', label: 'UK', icon: 'fa-crown' },
  { value: 'AUSTRALIA', label: 'Australia', icon: 'fa-kangaroo' },
  { value: 'AFRICA', label: 'Africa', icon: 'fa-map' },
  { value: 'EUROPE', label: 'Europe', icon: 'fa-tower-bridge' },
];

export const WEDDING_DRESS_NAMES = [
  'A-line Wedding Gown', 'Ball Gown Bridal Dress', 'Mermaid Wedding Dress', 'Sheath Wedding Gown', 'Trumpet Wedding Dress',
  'Vintage Wedding Dress', 'Bohemian Wedding Dress', 'Lace Wedding Gown', 'Satin Wedding Dress', 'Tulle Wedding Dress',
  'Off-Shoulder Wedding Dress', 'V-neck Wedding Gown', 'Sweetheart Neckline Dress', 'Strapless Wedding Dress', 'Cape Wedding Dress',
  'Two-Piece Wedding Dress', 'High-Low Wedding Dress', 'Backless Wedding Gown', 'Button-Back Wedding Dress', 'Ruffled Wedding Dress',
  'Floral Embroidery Dress', 'Beaded Wedding Gown', 'Crystal-Embellished Dress', 'Organza Wedding Dress', 'Chiffon Wedding Dress',
  'Velvet Wedding Gown', 'Sequin Wedding Dress', 'Illusion Neckline Dress', 'Detachable Train Dress', 'Corset Back Wedding Dress',
  'Red Lehenga Choli', 'Gold Bridal Lehenga', 'Pastel Bridal Saree', 'Heavy Embroidered Anarkali', 'Designer Bridal Gown',
  'Silk Bridal Saree', 'Net Bridal Lehenga', 'Mirror Work Lehenga', 'Zardozi Embroidered Dress', 'Bandhani Bridal Saree',
  'Banarasi Bridal Saree', 'Kanjeevaram Bridal Saree', 'Velvet Bridal Lehenga', 'Sequin Embellished Lehenga', 'Dual-Tone Bridal Lehenga',
  'Crop Top Bridal Lehenga', 'Cape Sleeve Bridal Gown', 'Peacock Motif Lehenga', 'Floral Print Bridal Saree', 'Pearl Embellished Lehenga',
  'Red Qipao Dress', 'Gold Cheongsam', 'Phoenix Embroidered Dress', 'Dragon Motif Qipao', 'Modern Red Wedding Gown',
  'Traditional Chinese Bridal Robe', 'Silk Red Cheongsam', 'Lace Overlay Qipao', 'Beaded Chinese Wedding Dress', 'Velvet Red Cheongsam',
  'Two-Tone Qipao', 'Crystal Embellished Cheongsam', 'Floral Pattern Qipao', 'High-Collar Bridal Dress', 'Detachable Skirt Qipao',
  'White Shiro-muku', 'Uchikake Kimono', 'Furisode Bridal Kimono', 'Hōmongi Wedding Dress', 'Tsukesage Bridal Kimono',
  'Modern Japanese Wedding Gown', 'Lace Overlay Kimono', 'Gold Embroidered Shiro-muku', 'Floral Pattern Uchikake', 'Two-Tone Bridal Kimono',
  'Arabic Kaftan Dress', 'Dubai Bridal Abaya', 'Moroccan Wedding Caftan', 'Turkish Bridal Jilbab', 'Persian Bridal Gown',
  'Beaded Middle Eastern Dress', 'Velvet Arabic Kaftan', 'Lace Overlay Abaya', 'Crystal Embellished Caftan', 'Gold Embroidered Jilbab',
  'Floral Pattern Kaftan', 'Two-Tone Bridal Abaya', 'Sequin Middle Eastern Dress', 'Detachable Skirt Kaftan', 'High-Collar Bridal Jilbab',
  'Kente Wedding Dress', 'Dashiki Bridal Gown', 'Boubou Wedding Robe', 'Ankara Bridal Dress', 'Mudcloth Wedding Gown',
  'Beaded African Dress', 'Velvet Kente Dress', 'Lace Overlay Dashiki', 'Crystal Embellished Boubou', 'Floral Pattern Ankara Dress'
];

export const WEDDING_DRESSES: WeddingDress[] = WEDDING_DRESS_NAMES.map((name, i) => {
  let culture = 'Western';
  if (i >= 30 && i < 50) culture = 'Indian';
  else if (i >= 50 && i < 65) culture = 'Chinese';
  else if (i >= 65 && i < 75) culture = 'Japanese';
  else if (i >= 75 && i < 90) culture = 'Middle Eastern';
  else if (i >= 90) culture = 'African';

  return {
    id: `dress-${i}`,
    name,
    culture,
    occasion: 'Wedding (Bridal)',
    description: `A beautiful ${culture} style dress.`,
    features: ['Premium Fabric', 'Hand-crafted', 'Elegant'],
    styleParams: `silhouette=elegant, fabric=luxury, culture=${culture}`
  };
});

// ... HAIRCUT_STYLES and SVG generators ...
const SVG_PREFIX = 'data:image/svg+xml;base64,';
const createGlassSilhouette = (path: string) => btoa(`<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#1A1A1A"/><circle cx="100" cy="100" r="80" fill="#FF1493" fill-opacity="0.05"/><path d="${path}" fill="#FF1493" opacity="0.2"/><rect x="30" y="30" width="140" height="140" rx="40" fill="white" fill-opacity="0.03" style="backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1)"/><path d="${path}" stroke="#FF1493" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
const createGoldenOutline = (path: string) => btoa(`<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#1A1A1A"/><path d="${path}" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 0px 8px rgba(255,215,0,0.4))"/><path d="M60 180 L140 180" stroke="#FFD700" stroke-width="1" stroke-opacity="0.2"/></svg>`);
const createNeonGlow = (path: string) => btoa(`<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#1A1A1A"/><defs><filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter></defs><path d="${path}" stroke="#FF1493" stroke-width="3" stroke-linecap="round" filter="url(#glow)"/></svg>`);
const createHolographic = (path: string) => btoa(`<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#1A1A1A"/><defs><linearGradient id="holo-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF1493" /><stop offset="50%" stop-color="#FFD700" /><stop offset="100%" stop-color="#7B2CBF" /></linearGradient></defs><path d="${path}" stroke="url(#holo-grad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/></svg>`);

export const HAIRCUT_STYLES: HaircutStyle[] = [
  { id: 1, name: 'Pixie Cut', category: 'Short', params: '1-3 inches, textured, high volume', previewUrl: SVG_PREFIX + createGlassSilhouette("M70 45 Q100 25 130 45 L140 80 Q100 95 60 80 Z") },
  { id: 2, name: 'Buzz Cut', category: 'Short', params: '0.5-1 inch, uniform, no tapering', previewUrl: SVG_PREFIX + createGlassSilhouette("M75 55 Q100 40 125 55 L120 90 Q100 100 80 90 Z") },
  { id: 3, name: 'Bixie', category: 'Short', params: 'Chin-length back, short bangs, textured', previewUrl: SVG_PREFIX + createGlassSilhouette("M65 50 Q100 30 135 50 L145 110 Q100 125 55 110 Z") },
  { id: 4, name: 'Shaggy Pixie', category: 'Short', params: '2-4 inches, heavy texture, piecey', previewUrl: SVG_PREFIX + createGlassSilhouette("M60 45 Q100 20 140 45 L150 85 Q100 105 50 85 Z") },
  { id: 5, name: 'Textured Crop', category: 'Short', params: '1-2 inches, choppy, messy', previewUrl: SVG_PREFIX + createGlassSilhouette("M70 60 Q100 45 130 60 L135 100 Q100 110 65 100 Z") },
  { id: 6, name: 'Bob Cut', category: 'Medium', params: 'Chin-length, blunt, no layers', previewUrl: SVG_PREFIX + createGoldenOutline("M50 70 C50 40, 150 40, 150 70 L155 130 L45 130 Z") },
  { id: 7, name: 'Lob', category: 'Medium', params: 'Shoulder-length, slight layers, soft ends', previewUrl: SVG_PREFIX + createGoldenOutline("M45 60 C45 30, 155 30, 155 60 L160 150 C130 145, 70 145, 40 150 Z") },
  { id: 8, name: 'Blunt Cut', category: 'Medium', params: 'One-length, sharp ends, no texture', previewUrl: SVG_PREFIX + createGoldenOutline("M40 50 L160 50 L160 140 L40 140 Z") },
  { id: 9, name: 'Layered Cut', category: 'Medium', params: 'Shoulder-length, 3+ layer levels', previewUrl: SVG_PREFIX + createGoldenOutline("M50 50 C50 20, 150 20, 150 50 M45 100 L155 100 M40 125 L160 125") },
  { id: 10, name: 'Shag Cut', category: 'Medium', params: 'Collarbone, heavy texture, curtain bangs', previewUrl: SVG_PREFIX + createGoldenOutline("M60 40 C100 20, 140 40, 140 40 M70 40 L50 60 L70 80") },
  { id: 11, name: 'Wolf Cut', category: 'Medium', params: 'Short back, long front, extreme layers', previewUrl: SVG_PREFIX + createGoldenOutline("M50 30 C100 10, 150 30, 150 30 M40 130 L80 130") },
  { id: 12, name: 'Feather Cut', category: 'Medium', params: 'Face-framing, wispy ends, movement', previewUrl: SVG_PREFIX + createGoldenOutline("M50 50 C100 20, 150 50, 150 50 M60 60 Q40 90 60 120") },
  { id: 13, name: 'V-Cut', category: 'Long', params: 'Waist-length, V-shaped ends', previewUrl: SVG_PREFIX + createGoldenOutline("M50 40 C100 10, 150 40, 150 40 L150 120 L100 180 L50 120 Z") },
  { id: 14, name: 'U-Cut', category: 'Long', params: 'Mid-back, rounded ends', previewUrl: SVG_PREFIX + createGoldenOutline("M50 40 C100 10, 150 40, 150 40 L150 130 Q100 180 50 130 Z") },
  { id: 15, name: 'Straight Cut', category: 'Long', params: 'One-length, blunt ends', previewUrl: SVG_PREFIX + createGoldenOutline("M45 40 L155 40 L155 170 L45 170 Z") },
  { id: 16, name: 'Long Layers', category: 'Long', params: 'Tailbone, 3+ layer levels', previewUrl: SVG_PREFIX + createGoldenOutline("M50 40 C100 10, 150 40, 150 40 M55 90 L145 90 M60 130 L140 130") },
  { id: 17, name: 'Butterfly Cut', category: 'Long', params: 'Short layers on top, long bottom', previewUrl: SVG_PREFIX + createGoldenOutline("M40 80 Q100 40 160 80 M60 120 Q100 90 140 120") },
  { id: 18, name: 'Step Cut', category: 'Long', params: 'Even layers, waterfall effect', previewUrl: SVG_PREFIX + createGoldenOutline("M50 50 L150 50 M60 80 L140 80 M70 110 L130 110") },
  { id: 19, name: 'Mermaid Cut', category: 'Long', params: 'Long with face-framing short layers', previewUrl: SVG_PREFIX + createGoldenOutline("M40 70 C40 40, 160 40, 160 70 Q180 120 160 180") },
  { id: 20, name: 'Curtain Bangs', category: 'Bangs', params: 'Center-parted, face-framing', previewUrl: SVG_PREFIX + createNeonGlow("M80 60 Q100 40 120 60 M75 70 Q60 100 70 130 M125 70 Q140 100 130 130") },
  { id: 21, name: 'Side-Swept', category: 'Bangs', params: 'Angled, one-side coverage', previewUrl: SVG_PREFIX + createNeonGlow("M70 50 Q110 40 140 90 M65 60 Q60 80 65 110") },
  { id: 22, name: 'Wispy Bangs', category: 'Bangs', params: 'Light, see-through, textured', previewUrl: SVG_PREFIX + createNeonGlow("M60 50 Q100 35 140 50 M70 50 Q75 85 75 90 M85 45 Q90 80 90 95 M100 40 Q100 85 100 100 M115 45 Q110 80 110 95 M130 50 Q125 85 125 90") },
  { id: 23, name: 'Blunt Bangs', category: 'Bangs', params: 'Straight-across, thick', previewUrl: SVG_PREFIX + createNeonGlow("M60 70 L140 70 L140 85 L60 85 Z") },
  { id: 24, name: 'Micro Bangs', category: 'Bangs', params: 'Very short, eyebrow-length', previewUrl: SVG_PREFIX + createNeonGlow("M70 50 L130 50 L130 60 L70 60 Z") },
  { id: 25, name: 'Hime Cut', category: 'Trend', params: 'Straight with cheek-length front pieces', previewUrl: SVG_PREFIX + createHolographic("M40 40 L160 40 L160 180 M60 40 L60 100 M140 40 L140 100") },
  { id: 26, name: 'Modern Mullet', category: 'Trend', params: 'Short front/sides, long back', previewUrl: SVG_PREFIX + createHolographic("M60 40 Q100 20 140 40 L130 80 M50 80 L150 80 L140 170 L60 170 Z") },
  { id: 27, name: 'Octopus Cut', category: 'Trend', params: 'Short layers all over, volume', previewUrl: SVG_PREFIX + createHolographic("M50 40 Q100 10 150 40 Q170 100 150 170 M60 100 Q100 80 140 100") },
  { id: 28, name: 'Jellyfish Cut', category: 'Trend', params: 'Short top, long curtain pieces', previewUrl: SVG_PREFIX + createHolographic("M55 50 L145 50 L145 100 L55 100 Z M80 100 L80 180 M120 100 L120 180") },
  { id: 29, name: 'Tapered Cut', category: 'Trend', params: 'Gradual length change', previewUrl: SVG_PREFIX + createHolographic("M60 40 C100 10 140 40 140 40 L120 100 L80 100 Z") },
  { id: 30, name: 'French Bob', category: 'Classic', params: 'Chin-length, slight bend', previewUrl: SVG_PREFIX + createHolographic("M55 60 C55 40, 145 40, 145 60 L145 110 Q100 120 55 110 Z") },
  { id: 31, name: 'Italian Bob', category: 'Classic', params: 'Jaw-length, slight angle', previewUrl: SVG_PREFIX + createHolographic("M50 60 C50 30, 150 30, 150 60 L160 120 L40 120 Z") },
  { id: 32, name: 'Hollywood Waves', category: 'Classic', params: 'Shoulder-length, soft waves', previewUrl: SVG_PREFIX + createHolographic("M50 40 Q100 10 150 40 Q170 80 140 140 Q100 120 60 140") },
  { id: 33, name: 'Soft Curls', category: 'Classic', params: 'Mid-length, natural curl pattern', previewUrl: SVG_PREFIX + createHolographic("M60 50 Q100 20 140 50 C160 100 140 150 100 160 C60 150 40 100 60 50") },
];
