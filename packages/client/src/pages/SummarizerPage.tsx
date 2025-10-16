import { useState } from 'react';
import ReviewList from '@/components/reviews/ReviewList';
import { ProductSelector } from '@/components/ui/ProductSelector';


//---------------------------- Main Function ----------------------------//
export default function SummarizerPage() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  console.log("selectedProduct:", selectedProduct)


  //---------------------------- JSX ----------------------------//
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4 md:px-8 flex flex-col items-center gap-8">
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
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
          <p className="text-gray-500 text-center text-sm md:text-base">
            Please select a product to view reviews and summary.
          </p>
        )}
      </div>
    </div>
  );
}
