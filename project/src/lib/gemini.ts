import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY || API_KEY === 'your_api_key_here') {
  console.error('Please set your Gemini API key in the .env file');
}

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getChatResponse(prompt: string): Promise<string> {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    return "API key not configured. Please set up your Gemini API key to use the chat feature.";
  }

  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return "I apologize, but I'm having trouble processing your request at the moment. Please try again later.";
  }
}