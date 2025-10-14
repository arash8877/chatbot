import axios from 'axios';
import StarRating from './StarRating';
import { HiSparkles } from 'react-icons/hi2';
import ReviewSkeleton from './ReviewSkeleton';
import { useMutation, useQuery } from '@tanstack/react-query';
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

type SummarizeResponseProps = {
   summary: string;
};

//---------------------------- Main Function ----------------------------//
const ReviewList = ({ productId }: ReviewListProps) => {
   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviewsResponseProps>({
      queryKey: ['reviews', productId],
      queryFn: () => fetchReviews(),
   });

   const {
      mutate: handleSummarize,
      isPending: isSummaryLoading,
      isError: isSummaryError,
      data: summarizeResponse,
   } = useMutation<SummarizeResponseProps>({
      mutationFn: () => summarizeReviews(),
   });

   // By using React Query, we no longer need to manage state and side effects manually
   // React Query also manage caching, refetching 3 times, error handling, and background updates behind the scenes

   //    const [reviewData, setReviewData] = useState<GetReviewsResponseProps>();
   //    const [isLoading, setIsLoading] = useState(false);
   //    const [error, setError] = useState('');
   //    const [summary, setSummary] = useState('');
   //    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
   //    const [summaryError, setSummaryError] = useState('');

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

   // const handleSummarize = async () => {
   //    try {
   //       setIsSummaryLoading(true);
   //       setSummaryError('');

   //       const { data } = await axios.post<SummarizeResponseProps>(
   //          `/api/products/${productId}/reviews/summarize`
   //       );
   //       setSummary(data.summary);
   //    } catch (error) {
   //       console.log(error);
   //       setSummaryError('Could not generate the summary. Try again!');
   //    } finally {
   //       setIsSummaryLoading(false);
   //    }
   // };

   const summarizeReviews = async () => {
      const { data } = await axios.post<SummarizeResponseProps>(
         `/api/products/${productId}/reviews/summarize`
      );
      return data;
   };

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

   const currentSummary = reviewData?.summary || summarizeResponse?.summary;

   return (
      <div>
         <div className="mb-5">
            {currentSummary ? (
               <p>{currentSummary}</p>
            ) : (
               <div>
                  <Button
                     onClick={() => handleSummarize()}
                     className="cursor-pointer"
                     disabled={isSummaryLoading}
                  >
                     <HiSparkles />
                     Summarize
                  </Button>
                  {isSummaryLoading && (
                     <div className="py-3">
                        <ReviewSkeleton />
                     </div>
                  )}
                  {isSummaryError && (
                     <p className="text-red-500">
                        Could not summarize the reviews. Try again!
                     </p>
                  )}
               </div>
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
