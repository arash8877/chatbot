import { Router } from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { PrismaClient } from './generated/prisma';

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

// kkk
router.get('/api/products/:id/reviews', async (req:Request, res:Response) => {
   const prisma = new PrismaClient();
   const productId = Number(req.params.id)

   if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
   }

   const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' }
   })
   res.json(reviews)
} )

export default router;