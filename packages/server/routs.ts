import { Router } from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';

const router = Router();

// Basic route for testing
router.get('/', (req: Request, res: Response) => {
   res.send('Hello, World!');
});

// Example API route
router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the API!' });
});

// Chat endpoint
router.post('/api/chat', chatController.sendMessage);

export default router;