import axios from 'axios';
import { useEffect, useState } from 'react';

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

   const fetchReviews = async () => {
      const { data } = await axios.get<GetReviewsResponseProps>(
         `/api/products/${productId}/reviews`
      );
      setReviewData(data);
   };

   useEffect(() => {
        fetchReviews();
   }, []);
 
   return <div className='flex flex-col gap-5'>
    {reviewData?.reviews.map(review => (
        <div key={review.id}>
            <div className='font-semibold'>{review.author}</div>
            <div>Rating: {review.rating}/5</div>
            <p className='py-2'>{review.content}</p>
        </div>
    ))}
   </div>;
};

export default ReviewList;
