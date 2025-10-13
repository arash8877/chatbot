import { type Review } from '../generated/prisma';
import { llmClient } from '../llm/client';
import { reviewRepository } from '../repositories/review.repository';
import template from '../llm/prompts/summarize-reviews.txt';

export const reviewService = {
   async getReviews(productId: number): Promise<Review[]> {
      return reviewRepository.getReviews(productId);
   },

   async summarizeReviews(productId: number): Promise<string> {
      const existingSummary = await reviewRepository.getReviewSummary(productId);
      if (existingSummary && existingSummary.expiresAt > new Date()) {
          console.log('[✅] Returning cached summary');
         return existingSummary.content;
      }

      // get the last 10 reviews
      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');

      // send the reviews to LLM to summarize
      const prompt = template.replace('{{reviews}}', joinedReviews);

      const response = await llmClient.generateText({
         model: 'gemini-2.5-flash',
         prompt,
         temperature: 0.2,
         maxTokens: 800,
      });
      
      const summary = response.text;
      await reviewRepository.storeReviewSummary(productId, summary);// store the summary in the database
      
      return summary;
   },
};
