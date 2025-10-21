import { useState } from 'react';
import ReviewList from '@/components/reviews/ReviewList';
import { ProductSelector } from '@/components/ui/ProductSelector';
import pattern from '@/assets/pattern.jpg';

//---------------------------- Main Function ----------------------------//
export default function SummarizerPage() {
   const [selectedProduct, setSelectedProduct] = useState<number | null>(null);


   //---------------------------- JSX ----------------------------//
   return (
      <div className="min-h-[calc(100vh-4rem)] py-8 px-4 md:px-8 flex flex-col items-center gap-8"
            style={{
            backgroundImage: `url(${pattern})`,
            backgroundSize: 'cover',
            backgroundColor: '#414952',
            backgroundBlendMode: 'multiply',
         }}
      >
         {/* Page Title */}
         <h1 className="text-2xl md:text-3xl font-bold text-white bg-[#414952] text-center ">
            Review Summarizer
         </h1>

         {/* Product Selector */}
         <div className="w-full max-w-md text-center">
            <ProductSelector
               selectedProductId={selectedProduct}
               onChange={(id) => setSelectedProduct(id)}
            />
         </div>

         {/* Review List */}
         <div className="w-full max-w-3xl">
            {selectedProduct ? (
               <ReviewList productId={selectedProduct} />
            ) : (
               <p className="text-white bg-[#414952] text-center text-sm md:text-base">
                  Please select a ride to view reviews and summary.
               </p>
            )}
         </div>
      </div>
   );
}
