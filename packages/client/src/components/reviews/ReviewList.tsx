import StarRating from './StarRating';
import { HiSparkles } from 'react-icons/hi2';
import ReviewSkeleton from './ReviewSkeleton';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import {
   reviewsApi,
   type GetReviewsResponseProps,
   type SummarizeResponseProps,
} from './reviewsApi';

type ReviewListProps = {
   productId: number;
};

//---------------------------- Main Function ----------------------------//
const ReviewList = ({ productId }: ReviewListProps) => {

   console.log('Product ID*****', productId)
   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviewsResponseProps>({
      queryKey: ['reviews', productId],
      queryFn: () => reviewsApi.fetchReviews(productId),
   });

   const {
      mutate: handleSummarize,
      isPending: isSummaryLoading,
      isError: isSummaryError,
      data: summarizeResponse,
   } = useMutation<SummarizeResponseProps>({
      mutationFn: () => reviewsApi.summarizeReviews(productId),
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

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5 p-6 max-w-3xl mx-auto w-full">
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

   //---------------------------- JSX ----------------------------//
   return (
      <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 max-w-3xl mx-auto">
         {/* Header */}
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
               <HiSparkles className="text-yellow-500" />
               Reviews Summary
            </h2>
            <span className="text-sm text-gray-500">
               {reviewData?.reviews.length} review
               {reviewData?.reviews.length === 1 ? '' : 's'}
            </span>
         </div>

         {/* Summary Section */}
         <div className="mb-6">
            {currentSummary ? (
               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-gray-800 p-4 rounded-lg leading-relaxed shadow-sm">
                  <p className="text-sm md:text-base whitespace-pre-line">
                     {currentSummary}
                  </p>
               </div>
            ) : (
               <div className="text-center">
                  <Button
                     onClick={() => handleSummarize()}
                     disabled={isSummaryLoading}
                     className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-all duration-200 shadow-sm"
                  >
                     <HiSparkles className="text-yellow-300" />
                     Summarize Reviews
                  </Button>

                  {isSummaryLoading && (
                     <div className="py-3">
                        <ReviewSkeleton />
                     </div>
                  )}

                  {isSummaryError && (
                     <p className="text-red-500 text-sm mt-2">
                        Could not summarize the reviews. Try again!
                     </p>
                  )}
               </div>
            )}
         </div>

         {/* Reviews Section */}
         <div className="flex flex-col gap-6">
            {reviewData?.reviews.map((review) => (
               <div
                  key={review.id}
                  className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 bg-gray-50"
               >
                  <div className="flex items-center justify-between mb-2">
                     <div className="font-semibold text-gray-800">
                        {review.author}
                     </div>
                     <StarRating value={review.rating} />
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                     {review.content}
                  </p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ReviewList;
