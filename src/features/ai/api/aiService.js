import axios from 'axios';
import OpenAI from "openai";
import { PRICING_RATES, TOOLTIPS } from '../../../constants';

const NVIDIA_API_KEY = import.meta.env.VITE_NVIDIA_API_KEY;
const NVIDIA_API_URL = "/api/nvidia/v1/chat/completions";
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Initialize OpenAI (Client-side usage requires this flag)
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

const TIMEOUT_MS = 12000; // 12 seconds max

export const aiService = {
  /**
   * Generates a project proposal using NVIDIA -> OpenAI -> Rule-based Fallback
   */
  generateProjectProposal: async (answers) => {
    try {
      // 1. Try NVIDIA (Primary)
      console.log("AI Service: Trying NVIDIA...");
      if (NVIDIA_API_KEY) {
         try {
            return await Promise.race([
               callNvidia(answers),
               timeoutPromise(TIMEOUT_MS, "NVIDIA Timeout")
            ]);
         } catch (err) {
            console.warn("NVIDIA Failed/Timed out:", err.message);
         }
      }

      // 2. Try OpenAI (Fallback)
      console.log("AI Service: Falling back to OpenAI...");
      if (OPENAI_API_KEY) {
         try {
            return await Promise.race([
               callOpenAI(answers),
               timeoutPromise(TIMEOUT_MS, "OpenAI Timeout")
            ]);
         } catch (err) {
            console.warn("OpenAI Failed/Timed out:", err.message);
         }
      }

      // 3. Last Resort
      throw new Error("All AI Providers failed");

    } catch (error) {
      console.error("AI Service Error:", error);
      return fallbackLogic(answers);
    }
  }
};

// --- Helpers ---

const timeoutPromise = (ms, label) => new Promise((_, reject) => {
  setTimeout(() => reject(new Error(label)), ms);
});

const getSystemContext = () => `
You are a Senior Solutions Architect at "Frenzo Services".
Analyze user requirements and generate a professional Project Proposal.

**Pricing Strategy (INR):**
${JSON.stringify(PRICING_RATES)}

**Services:**
${JSON.stringify(TOOLTIPS)}

**Instructions:**
1. Recommend best Stack & Project Type.
2. Estimate Cost (with buffer).
3. Requirements & Analysis.
4. Output RAW JSON ONLY. No markdown blocks.

**Schema:**
{
  "title": "Title",
  "estimatedCost": 0,
  "requirements": "markdown string"
}
`;

const cleanContent = (text) => {
  let content = text.trim();
  if (content.startsWith('```json')) content = content.replace(/^```json/, '').replace(/```$/, '');
  if (content.startsWith('```')) content = content.replace(/^```/, '').replace(/```$/, '');
  return JSON.parse(content);
};

// --- Providers ---

const callNvidia = async (answers) => {
    const payload = {
        model: "moonshotai/kimi-k2.5",
        messages: [
          { role: "system", content: getSystemContext() },
          { role: "user", content: JSON.stringify(answers) }
        ],
        max_tokens: 4000,
        temperature: 0.7
    };

    const response = await axios.post(NVIDIA_API_URL, payload, {
        headers: { "Authorization": `Bearer ${NVIDIA_API_KEY}` }
    });
    
    // NVIDIA specific response structure
    const result = cleanContent(response.data.choices[0].message.content);
    return { ...result, isAiGenerated: true, provider: 'NVIDIA' };
};

const callOpenAI = async (answers) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: getSystemContext() },
            { role: "user", content: JSON.stringify(answers) }
        ],
    });

    const result = cleanContent(completion.choices[0].message.content);
    return { ...result, isAiGenerated: true, provider: 'OpenAI' };
};

const fallbackLogic = async (answers) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Basic Rule Engine (simplified for brevity)
  let estimatedCost = 35000;
  let title = "Custom Growth System";
  
  if (answers.goal?.toLowerCase().includes('scale')) { estimatedCost += 20000; title = "Enterprise Scaling Platform"; }
  if (answers.platform?.toLowerCase().includes('app')) { estimatedCost = 60000; title = "Cross-Platform Mobile App"; }

  return {
    title,
    estimatedCost,
    requirements: `## System Proposal\n\n**Strategic Analysis**\nWe have detected a need for a robust ${title}. This is a templated estimation based on your inputs.`,
    isAiGenerated: false
  };
};
