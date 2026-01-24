
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeFace = async (base64Image: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: `ACT AS GLAM AI BEAUTY INTELLIGENCE ENGINE. Perform a deep-scan of this face for 55+ beauty metrics.
        
        OUTPUT JSON WITH THESE EXACT MODULES:
        1. BIOMETRICS: faceShape, symmetryScore (0-100), eyeShape, lipShape, eyebrowShape.
        2. DERMA_SCAN: skinTone (name + hex), fitzpatrickScale (1-6), undertone, skinTexture, hydrationLevel (dry/normal/oily), acneStage (none/mild/mod), poreSizeDistribution.
        3. AGING_MAP: Detected lines/wrinkles with regions and severity (0-10).
        4. HAIR_INTEL: hairTextureDetected, suitabilityRankings (3 styles), bangsCompatibility (best style).
        5. DIGITAL_OPT: lightingAdvice for this photo, zoomCameraPrepTips.
        6. CORE: problemZones, recommendations (5 tips).
        7. CULTURE: regionalTrendForecasting (for current season).` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          faceShape: { type: Type.STRING },
          symmetry: { type: Type.NUMBER },
          skinTone: { type: Type.STRING },
          undertone: { type: Type.STRING },
          skinTexture: { type: Type.STRING },
          problemZones: { type: Type.ARRAY, items: { type: Type.STRING } },
          eyeShape: { type: Type.STRING },
          lipShape: { type: Type.STRING },
          eyebrowShape: { type: Type.STRING },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          intelligence: {
            type: Type.OBJECT,
            properties: {
              skinToneHex: { type: Type.STRING },
              fitzpatrickScale: { type: Type.NUMBER },
              symmetryScore: { type: Type.NUMBER },
              hydrationLevel: { type: Type.STRING },
              acneStage: { type: Type.STRING },
              hairTexture: { type: Type.STRING },
              lightingAdvice: { type: Type.STRING },
              zoomOptimization: { type: Type.STRING },
              hairSuitability: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const analyzeFullBody = async (base64Image: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: `Analyze full-body photo to detect: face shape, skin tone, undertone, body type (hourglass/rectangle/triangle/inverted triangle), height estimate, posture, current outfit style, and suggested color palette. Output as JSON.` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          faceShape: { type: Type.STRING },
          skinTone: { type: Type.STRING },
          undertone: { type: Type.STRING },
          bodyType: { type: Type.STRING },
          heightEstimate: { type: Type.STRING },
          stylePreference: { type: Type.STRING },
          suggestedColors: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generatePersonalityRecommendations = async (analysis: any, answers: string[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Based on this full-body analysis: ${JSON.stringify(analysis)} and user answers: ${answers.join(', ')}, generate text-based style recommendations in JSON format. 
    
    Categories: 
    1. HAIR (3 options)
    2. CLOTHING (3 options)
    3. JEANS (3 options)
    4. JEWELRY (3 options)
    5. SHOES (3 options)
    6. TRANSFORMATION (3 pro tips)
    7. PERSONALITY_PROFILE (e.g., 'Powerful Minimalist')

    Provide 3 distinct options for each category matching the user's personality and body type.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hair: { type: Type.ARRAY, items: { type: Type.STRING } },
          clothing: { type: Type.ARRAY, items: { type: Type.STRING } },
          jeans: { type: Type.ARRAY, items: { type: Type.STRING } },
          jewelry: { type: Type.ARRAY, items: { type: Type.STRING } },
          shoes: { type: Type.ARRAY, items: { type: Type.STRING } },
          transformation: { type: Type.ARRAY, items: { type: Type.STRING } },
          personalityProfile: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateFinalLookImage = async (originalBase64: string, selections: string[], analysis: any) => {
  const prompt = `Photorealistically overlay the following look on the user's body: ${selections.join(', ')}. 
  Maintain 100% face/body feature consistency. User is ${analysis.bodyType} with ${analysis.skinTone} tone. 
  Output 1080p high-quality render matching original lighting.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: originalBase64, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: { imageConfig: { aspectRatio: "9:16" } }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

// ... (Rest of existing functions)
export const generateMakeupTutorial = async (faceData: any, occasion: string, country: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a 12-step AI Intelligence Enhanced tutorial. 
    User Profile: ${faceData.faceShape} face, ${faceData.skinTone} skin, ${faceData.eyeShape} eyes. 
    Occasion: ${occasion}, Style: ${country}.
    
    INCLUDE MICRO-DATA FOR EVERY STEP:
    - exactWeight: Product amount in grams/drops.
    - pressureLevel: Light/Medium/Firm.
    - lightingAngle: Best angle for ring light.
    - voiceScript: Short professional audio script for Step ${occasion}.
    - translationEs: Spanish translation of the instruction.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            step: { type: Type.NUMBER },
            name: { type: Type.STRING },
            product: { type: Type.STRING },
            colorHex: { type: Type.STRING },
            amount: { type: Type.STRING },
            duration: { type: Type.STRING },
            longevity: { type: Type.STRING },
            tools: { type: Type.ARRAY, items: { type: Type.STRING } },
            difficulty: { type: Type.STRING },
            instruction: { type: Type.STRING },
            proTip: { type: Type.STRING },
            mistakesToAvoid: { type: Type.STRING },
            budgetOption: { type: Type.STRING },
            luxuryOption: { type: Type.STRING },
            microData: {
              type: Type.OBJECT,
              properties: {
                exactWeight: { type: Type.STRING },
                pressureLevel: { type: Type.STRING },
                lightingAngle: { type: Type.STRING },
                voiceScript: { type: Type.STRING },
                translationEs: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};

export const generateTutorialStepImage = async (originalBase64: string, stepInfo: any, allPreviousStepsInfo: string) => {
  const prompt = `PHOTOREALISTIC AI ARTISTRY ENGINE: Apply Step ${stepInfo.step} (${stepInfo.name}) to the face. 
  Ensure identity consistency. Format as high-compression WebP. 
  Apply ${stepInfo.product} in ${stepInfo.colorHex}.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: originalBase64, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: { imageConfig: { aspectRatio: "3:4" } }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

export const generateHaircutVisualization = async (originalBase64: string, style: any) => {
  const prompt = `Render ${style.name} haircut on the provided face. 
  Hair Params: ${style.params}. Maintain 99.5% identity. 
  Output: High-compression WebP render.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: originalBase64, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: { imageConfig: { aspectRatio: "3:4" } }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

export const generateDressTryOn = async (originalBase64: string, dress: any, skinTone: string) => {
  const prompt = `Photorealistically overlay ${dress.name} on the user photo maintaining 100% facial feature consistency (eyes/nose/mouth position/size/angle) with zero distortions; render only dress changes using exact specifications: ${dress.styleParams}. Output 1080p JPG matching original photo's lighting and skin tone (${skinTone}).`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: originalBase64, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: { imageConfig: { aspectRatio: "3:4" } }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

export const generateStylistLook = async (originalBase64: string, lookData: any, analysis: any) => {
  const prompt = `Photorealistically overlay a new stylish look on the user. 
  Outfit: ${lookData.outfit}. 
  Makeup: ${lookData.makeup}. 
  Hair: ${lookData.hair}. 
  User stats: ${analysis.bodyType} body, ${analysis.skinTone} skin. 
  Maintain 100% facial feature consistency. Render high-quality 1080p JPG matching lighting.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: originalBase64, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: { imageConfig: { aspectRatio: "9:16" } }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

export const generateStylistDescriptions = async (analysis: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this style profile: ${JSON.stringify(analysis)}, generate 3 personalized stylish looks:
    Look 1: Casual Chic (daily wear)
    Look 2: Formal Elegance (events)
    Look 3: Cultural Fusion (special occasions)
    
    For each look provide: title, outfit, makeup, hair, and style notes.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            outfit: { type: Type.STRING },
            makeup: { type: Type.STRING },
            hair: { type: Type.STRING },
            notes: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};
