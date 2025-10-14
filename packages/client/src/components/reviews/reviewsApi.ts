import axios from 'axios';

export type ReviewProps = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};

export type GetReviewsResponseProps = {
   summary: string | null;
   reviews: ReviewProps[];
};

export type SummarizeResponseProps = {
   summary: string;
};

//---------------------------- API Calls ----------------------------//
export const reviewsApi = {
   fetchReviews(productId: number) {
      return axios
         .get<GetReviewsResponseProps>(`/api/products/${productId}/reviews`)
         .then((res) => res.data);
   },

   summarizeReviews(productId: number) {
      return axios
         .post<SummarizeResponseProps>(
            `/api/products/${productId}/reviews/summarize`
         )
         .then((res) => res.data);
   },
};