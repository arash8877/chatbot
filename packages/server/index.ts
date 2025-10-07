import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import openai from 'openai';
import z from 'zod';

dotenv.config();

// const client = new openai.OpenAI({
// apiKey: process.env.OPENAI_API_KEY,
// });
const client = process.env.OPENAI_API_KEY
   ? new openai({ apiKey: process.env.OPENAI_API_KEY })
   : null;

const app = express();
app.use(express.json());

// Set the port
const port = process.env.PORT || 3000;

//---------------------------- routes -----------------------------//

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
   res.send('Hello, World!');
});

// Example API route
app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the API!' });
});

// Chat endpoint
const conversations = new Map<string, string>(); // In-memory store for conversations

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long. Maximum length is 1000 characters.'),
   conversationId: z.uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const parseResult = chatSchema.safeParse(req.body);
   if (!parseResult.success) {
      const structuredError = z.treeifyError(parseResult.error);
      return res.status(400).json(structuredError);
   }

   if (!process.env.OPENAI_API_KEY) {
      // 👇 mock AI reply for local dev
      return res.json({
         message: `🤖 [Mocked AI]: You said "${prompt}". Imagine this is a deep and thoughtful AI response.`,
      });
   }

   if (!client) {
      return res
         .status(500)
         .json({ message: 'OpenAI client is not initialized.' });
   }

   try {
      const { prompt, conversationId } = req.body;

      const response = await client.responses.create({
         model: 'gpt-4o',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id: conversations.get(conversationId),
      });
      conversations.set(conversationId, response.id);
      res.json({ message: response.output_text });
   } catch (error) {
      res.status(500).json({ error: 'Failed to generate a response.' });
   }
});

//------------------------------- Start the server -------------------------------//
app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
