import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }

      const product = await productRepository.getProduct(productId);

      if (!product) {
         return res.status(400).json({ error: 'Product not found' });
      }

      const checkThereIsReviews = await reviewRepository.getReviews(productId, 1);
      if (checkThereIsReviews.length === 0) {
         return res.status(400).json({ error: 'There are no review for summarize' });
      }

      const reviews = await reviewService.getReviews(productId);
      res.json(reviews);
   },

   async summarizeReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }
      const summary = await reviewService.summarizeReviews(productId);
      res.json({ summary });
   },
};
