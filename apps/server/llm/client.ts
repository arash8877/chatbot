// import openai from 'openai';

// // const client = new openai.OpenAI({
// // apiKey: process.env.OPENAI_API_KEY,
// // });

// const client = process.env.OPENAI_API_KEY // alternative for no api key- remove this when there i an api key
//    ? new openai({ apiKey: process.env.OPENAI_API_KEY })
//    : null;

// type GenerateTextOptions = {
//    model?: string;
//    prompt: string;
//    instructions?: string;
//    temperature?: number;
//    maxTokens?: number;
//    previousResponseId?: string;
// };

// type GenerateTextResult = {
//    id: string;
//    text: string;
// };

// export const llmClient = {
//    async generateText({
//       model = 'gpt-4.1',
//       prompt,
//       instructions,
//       temperature = 0.2,
//       maxTokens = 300,
//       previousResponseId,
//    }: GenerateTextOptions): Promise<GenerateTextResult> {
//       const response = await client?.responses.create({
//          model,
//          input: prompt,
//          instructions,
//          temperature,
//          max_output_tokens: maxTokens,
//          previous_response_id: previousResponseId,
//       });
//       return {
//          id: response?.id || '',
//          text: response?.output_text || '',
//       };
//    },
// };
import { GoogleGenAI, FinishReason } from '@google/genai'; // Import FinishReason
import crypto from 'crypto';

// The maximum allowed output tokens for gemini-2.5-flash-lite
const MAX_MODEL_OUTPUT_TOKENS = 65536;

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const modelsClient = client.models;

type GenerateTextOptions = {
  model?: string;
  prompt: string;
  instructions?: string; // Will be passed as systemInstruction
  temperature?: number;
  maxOutputTokens?: number; // Renamed for consistency with the API
};

type GenerateTextResult = {
  id: string;
  text: string;
  truncated: boolean; // Indicate if the response was cut off
};

export const llmClient = {
  async generateText({
    model = 'gemini-2.5-flash-lite',
    prompt,
    instructions,
    temperature = 0.2,
    maxOutputTokens = MAX_MODEL_OUTPUT_TOKENS,
  }: GenerateTextOptions): Promise<GenerateTextResult> {
    
    // 1. Cap tokens to the model's actual maximum
    const finalMaxTokens = Math.min(maxOutputTokens, MAX_MODEL_OUTPUT_TOKENS);
    
    // 2. Use dedicated systemInstruction field for better performance/adherence
    const systemInstruction = (instructions ?? '').trim() || undefined;

    try {
      const result = await modelsClient.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature,
          maxOutputTokens: finalMaxTokens,
          systemInstruction: systemInstruction, // Best practice for instructions
        },
      });

      // 3. Simple and reliable text extraction
      const text = result.text ?? '';
      const candidate = result.candidates?.[0];
      const finishReason = candidate?.finishReason;
      
      const wasTruncated = finishReason === FinishReason.MAX_TOKENS;

      if (wasTruncated) {
        console.warn(`[⚠️] Gemini hit MAX_TOKENS (${finalMaxTokens}). Response was truncated.`);
      }

      if (!text.trim()) {
        console.warn('[⚠️] Gemini returned empty text.');
        return {
          id: crypto.randomUUID(),
          text: 'No answer available.',
          truncated: wasTruncated,
        };
      }

      return {
        id: crypto.randomUUID(),
        text,
        truncated: wasTruncated,
      };
    } catch (error) {
      // 4. Critical: Handle API/network errors gracefully
      console.error('[❌] Gemini API Call Failed:', error);
      throw new Error(`LLM generation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
};