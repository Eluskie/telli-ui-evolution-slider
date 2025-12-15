import { GoogleGenAI } from "@google/genai";
import type { ConversationMessage } from '../types';
import { CHAT_CONFIG } from '../constants/chatConfig';

// Initialize the client.
// Note: In a real app, ensure process.env.API_KEY is set.
// For this UI demo, we will handle the case where it's missing gracefully.
const apiKey = process.env.API_KEY || 'demo-key';
const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (
  conversationHistory: ConversationMessage[],
  systemPrompt: string
): Promise<string> => {
  try {
    // Build conversation contents with system prompt first
    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        temperature: CHAT_CONFIG.MODEL_TEMPERATURE,
        maxOutputTokens: CHAT_CONFIG.MAX_OUTPUT_TOKENS,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "I can help you improve tone, fix clarity issues, or provide feedback on conversations!";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    // Graceful fallback with trigger word seeding
    return "I can help you improve tone, fix clarity issues, or provide feedback on agent conversations. What would you like to explore?";
  }
};

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