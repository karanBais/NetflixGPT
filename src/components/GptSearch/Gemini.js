// src/components/GptSearch/Gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use environment variable with fallback for development/testing
const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "AIzaSyA8nQx_47UI-TXcMWIazth1d7VlKIxw-2Y";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
model: "gemini-2.5-flash",
});

const generationConfig = {
  temperature: 0.7, // Slightly lower for consistency
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 200, // Reduced for faster responses
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    return await result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error; // Re-throw to handle in GptSearchBar
  }
}

export default run;