import fs from 'fs';
import path from 'path';
import template from '../llm/prompts/chatbot.txt'
import { llmClient } from '../llm/client';
import { conversationRepository } from '../repositories/conversation.repository';

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'llm', 'prompts', 'Tivoli.md'),
   'utf-8'
);

const today = new Date().toLocaleDateString('en-GB', {
   weekday: 'long',
   year: 'numeric',
   month: 'long',
   day: 'numeric',
});

const instructions = template.replace('{{parkInfo}}', parkInfo)
.replace('{{current date}}', today);;



type chatResponse = {
   id: string;
   message: string;
};

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<chatResponse> {
      const options: any = {
         // model: 'gpt-4o-mini',
         model: 'gemini-2.5-flash-lite',
         instructions,
         prompt,
         temperature: 0.2,
         maxTokens: 65536,
      };
      const lastResponseId = conversationRepository.getLastResponseId(conversationId);
      if (lastResponseId) {
         options.previousResponseId = lastResponseId;
      }
      const response = await llmClient.generateText(options);
      conversationRepository.setLastResponseId(conversationId, response.id);

      return {
         id: response.id,
         message: response.text,
      };
   },
};
