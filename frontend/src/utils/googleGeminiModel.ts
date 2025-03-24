import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
const genAIModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export { genAIModel };
