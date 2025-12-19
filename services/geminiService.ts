
import { GoogleGenAI, Type } from "@google/genai";
import { MonitoredApp, DailySummary } from "../types";

export const getWellnessInsight = async (apps: MonitoredApp[]): Promise<DailySummary> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const usageContext = apps
    .map(app => `${app.name} (${app.category}): ${app.dailyUsageMinutes} mins`)
    .join(', ');

  const prompt = `Analyze this daily digital usage data: ${usageContext}. 
    Provide a professional, calm, and non-judgmental insight about the user's habits and 3 specific, small actionable steps for improvement. 
    Focus on "Focus" and "Presence".`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: { type: Type.STRING, description: 'A short, supportive analysis of habits.' },
            recommendations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: '3 small actionable steps.' 
            },
            tone: { type: Type.STRING, description: 'The overall vibe of the advice.' }
          },
          required: ['insight', 'recommendations', 'tone']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      insight: "Taking small steps toward digital balance is always a win. Today is a great day to be present.",
      recommendations: ["Try leaving your phone in another room for 30 mins", "Notice how you feel before opening TikTok", "Set a 5-minute intention before social media"],
      tone: "Encouraging"
    };
  }
};
