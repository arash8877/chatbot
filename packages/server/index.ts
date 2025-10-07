import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { chatController } from './controllers/chat.controller';


dotenv.config();

const app = express();
app.use(express.json());

//--------------------------- Set the port ---------------------------//
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
app.post('/api/chat', chatController.sendMessage);

//------------------------------- Start the server -------------------------------//
app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
