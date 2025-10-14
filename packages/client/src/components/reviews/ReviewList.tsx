import axios from 'axios';
import StarRating from './StarRating';
import { HiSparkles } from 'react-icons/hi2';
import ReviewSkeleton from './ReviewSkeleton';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';

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
   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviewsResponseProps>({
      queryKey: ['reviews', productId],
      queryFn: () => fetchReviews(),
   });

   // By using React Query, we no longer need to manage state and side effects manually
   // React Query also manage caching, refetching 3 times, error handling, and background updates behind the scenes

   //    const [reviewData, setReviewData] = useState<GetReviewsResponseProps>();
   //    const [isLoading, setIsLoading] = useState(false);
   //    const [error, setError] = useState('');

   //    const fetchReviews = async () => {
   //       try {
   //          setIsLoading(true);
   //          const { data } = await axios.get<GetReviewsResponseProps>(
   //             `/api/products/${productId}/reviews`
   //          );
   //          setReviewData(data);
   //       } catch (error) {
   //          console.log(error);
   //          setError('Could not fetch the reviews. Try again!');
   //       } finally {
   //          setIsLoading(false);
   //       }
   //    };

   //    useEffect(() => {
   //       fetchReviews();
   //    }, []);

   const fetchReviews = async () => {
      const { data } = await axios.get<GetReviewsResponseProps>(
         `/api/products/${productId}/reviews`
      );
      return data;
   };

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
               <ReviewSkeleton key={i} />
            ))}
         </div>
      );
   }

   if (error) {
      return <div className="text-red-500">{error.message}</div>;
   }

   if (reviewData?.reviews.length === 0) {
      return <div>There is no review for this product!</div>;
   }

   return (
      <div>
         <div className="mb-5">
            {reviewData?.summary ? (
               <p>{reviewData.summary}</p>
            ) : (
               <Button>
                  <HiSparkles />
                  Summarize
               </Button>
            )}
         </div>
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
      </div>
   );
};

export default ReviewList;
