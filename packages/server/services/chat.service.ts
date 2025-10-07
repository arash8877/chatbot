import openai from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

// const client = new openai.OpenAI({
// apiKey: process.env.OPENAI_API_KEY,
// });

const client = process.env.OPENAI_API_KEY // alternative for no api key
   ? new openai({ apiKey: process.env.OPENAI_API_KEY })
   : null;

type chatResponse = {
   id: string;
   message: string;
};

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<chatResponse> {
      if (!client) {
         // 👇 mock AI reply for local dev
         throw new Error(
            'OpenAI client is not initialized. Please set the OPENAI_API_KEY environment variable.'
         );
      }
      const response = await client.responses.create({
         model: 'gpt-4o',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id:
            conversationRepository.getLastResponseId(conversationId),
      });
      conversationRepository.setLastResponseId(conversationId, response.id);

      return {
         id: response.id,
         message: response.output_text,
      };
   },
};
