import openai from 'openai';
import { type Review } from '../generated/prisma';
import { reviewRepository } from '../repositories/review.repository';

export const reviewService = {
   async getReviews(productId: number): Promise<Review[]> {
      return reviewRepository.getReviews(productId);
   },

   async summarizeReviews(productId: number): Promise<string> {
      // get the last 10 reviews
      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');

      // send the reviews to LLM to summarize
      const prompt = `Summarize the following customer reviews in to a short paragraph. Highlighting key themes, both positive and negative: ${joinedReviews} `;
      const response = await client?.responses.create({
         model: 'gpt-4.1',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 500,
      })
      return response?.output_text ?? '';
   },
};

// const client = new openai.OpenAI({
// apiKey: process.env.OPENAI_API_KEY,
// });

const client = process.env.OPENAI_API_KEY // alternative for no api key
   ? new openai({ apiKey: process.env.OPENAI_API_KEY })
   : null;
