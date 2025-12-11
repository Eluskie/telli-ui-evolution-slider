import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: In a real app, ensure process.env.API_KEY is set. 
// For this UI demo, we will handle the case where it's missing gracefully.
const apiKey = process.env.API_KEY || 'demo-key'; 
const ai = new GoogleGenAI({ apiKey });

export const rewriteContent = async (
  originalText: string, 
  instruction: string
): Promise<string> => {
  try {
    // This connects to the correct model for text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Original: "${originalText}". Instruction: ${instruction}. Rewrite the original text.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster small edits
      }
    });
    
    return response.text || "Could not generate rewrite.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback for demo purposes if no API key is present
    return "Natürlich! Wie kann ich Ihnen heute helfen, Ihr Erlebnis zu verbessern?";
  }
};