import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import ReviewSkeleton from './ReviewSkeleton';

type ReviewListProps = {
   productId: number;
};

type ReviewProps = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};

type GetReviewsResponseProps = {
   summary: string | null;
   reviews: ReviewProps[];
};

const ReviewList = ({ productId }: ReviewListProps) => {
   const [reviewData, setReviewData] = useState<GetReviewsResponseProps>();
   const [isLoading, setIsLoading] = useState(false);

   const fetchReviews = async () => {
      setIsLoading(true);
      const { data } = await axios.get<GetReviewsResponseProps>(
         `/api/products/${productId}/reviews`
      );
      setReviewData(data);
      setIsLoading(false);
   };

   useEffect(() => {
      fetchReviews();
   }, []);

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
               <ReviewSkeleton key={i} />
            ))}
         </div>
      );
   }

   return (
      <div className="flex flex-col gap-5">
         {reviewData?.reviews.map((review) => (
            <div key={review.id}>
               <div className="font-semibold">{review.author}</div>
               <div>
                  <StarRating value={review.rating} />
               </div>
               <p className="py-2">{review.content}</p>
            </div>
         ))}
      </div>
   );
};

export default ReviewList;
