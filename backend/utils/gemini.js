import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeCodeWithGemini = async (codeSnippet) => {
  const prompt = `Analyze the following code snippet. 
Please reply with a strictly formatted JSON object (no markdown formatting, no code block backticks) with the following exact keys:
- "summary": A brief summary of what the code does.
- "issues": An array of strings describing any issues found (security, performance, quality).
- "improvedCode": The complete refactored/improved code as a single string.
- "explanation": A detailed explanation of the changes and why they were made.
- "score": A number out of 10 representing code quality.

Begin code:
${codeSnippet}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    let textStr = response.text;
    // Remove markdown code block if present
    if (textStr.startsWith('\`\`\`json')) {
      textStr = textStr.replace(/^\`\`\`json/, '');
      textStr = textStr.replace(/\`\`\`$/, '');
    }
    
    return JSON.parse(textStr.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to analyze code with AI: " + error.message);
  }
};
