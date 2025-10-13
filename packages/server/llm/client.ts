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

import { GoogleGenAI } from '@google/genai';
import crypto from 'crypto';

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const modelsClient = client.models;

type GenerateTextOptions = {
  model?: string;
  prompt: string;
  instructions?: string;
  temperature?: number;
  maxTokens?: number;
};

type GenerateTextResult = {
  id: string;
  text: string;
};

export const llmClient = {
  async generateText({
    model = 'gemini-2.5-flash',
    prompt,
    instructions,
    temperature = 0.2,
    maxTokens = 2500,
  }: GenerateTextOptions): Promise<GenerateTextResult> {
    const fullPrompt =
      instructions && instructions.trim().length > 0
        ? `${instructions}\n\n${prompt}`
        : prompt;

    const callGemini = async (tokens: number) => {
      const result = await modelsClient.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
        config: {
          temperature,
          maxOutputTokens: tokens,
        },
      });

      // 🧠 Safely extract text
      let text = '';
      const candidate = result.candidates?.[0];
      const content = (candidate?.content as any)?.parts ?? [];

      if (Array.isArray(content) && content[0]?.text) {
        text = content.map((p: any) => p.text).join('\n');
      } else if ((result as any).text) {
        // fallback if SDK provides a text field
        text = (result as any).text;
      }

      // ⚠️ Log when Gemini ran out of tokens
      if (candidate?.finishReason === 'MAX_TOKENS') {
        console.warn('[⚠️] Gemini hit max tokens — retrying with higher limit');
      }

      return { text, maxedOut: candidate?.finishReason === 'MAX_TOKENS', result };
    };

    // 🌀 First attempt
    let { text, maxedOut } = await callGemini(maxTokens);

    // 🚀 Retry once if empty or truncated
    if (!text.trim() || maxedOut) {
      const retryTokens = Math.min(maxTokens * 2, 8000); // Gemini’s soft cap
      console.warn(`[🔁] Retrying with ${retryTokens} tokens...`);
      const retry = await callGemini(retryTokens);
      text = retry.text;
    }

    if (!text.trim()) {
      console.warn('[⚠️] Gemini returned empty text after retry.');
      text = 'No summary available.';
    }

    return {
      id: crypto.randomUUID(),
      text,
    };
  },
};
