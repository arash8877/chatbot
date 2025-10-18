import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long. Maximum length is 1000 characters.'),
   conversationId: z.uuid(),
});

export const chatController = {

   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         const structuredError = z.treeifyError(parseResult.error);
         return res.status(400).json(structuredError);
      }

      // if (!process.env.OPENAI_API_KEY) {
      //    // 👇 mock AI reply for local dev
      //    return res.json({
      //       message: "🤖 Imagine this is a deep and thoughtful AI response.",
      //    });
      // }


      try {
         const { prompt, conversationId } = req.body;

         console.log('🚀 Sending to chatService:', { prompt, conversationId });

         const response = await chatService.sendMessage(prompt, conversationId);

         res.json({ message: response.message });
      } catch (error) {
          console.error('🔥 ChatController Error:', error);
         res.status(500).json({ error: 'Failed to generate a response.' });
      }
   },
};
