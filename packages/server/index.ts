import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import openai from 'openai';

dotenv.config();

const client = new openai.OpenAI({
   apiKey: process.env.OPENAI_API_KEY || '',
});

const app = express();
app.use(express.json());

// Set the port
const port = process.env.PORT || 3000;

// routes
app.get('/', (req: Request, res: Response) => {
   res.send('Hello, World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the API!' });
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const { prompt } = req.body;

   const response = await client.responses.create({
      model: 'gpt-4o',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
   });
   res.json({ message: response.output_text });
});

// Start the server
app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
