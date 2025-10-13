import { llmClient } from '../llm/client';
import { conversationRepository } from '../repositories/conversation.repository';



type chatResponse = {
   id: string;
   message: string;
};

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<chatResponse> {
      const response = await llmClient.generateText({
         // model: 'gpt-4o-mini',
         model: 'gemini-2.5-flash',
         instructions: 'You are a helpful customer support assistant.',
         prompt,
         temperature: 0.2,
         maxTokens: 100,
         previousResponseId:
            conversationRepository.getLastResponseId(conversationId),
      });
      conversationRepository.setLastResponseId(conversationId, response.id);

      return {
         id: response.id,
         message: response.text,
      };
   },
};
