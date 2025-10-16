import { useState } from 'react';
import ReviewList from '@/components/reviews/ReviewList';
import { ProductSelector } from '@/components/ui/ProductSelector'; 

export default function SummarizerPage() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  return (
    <div className="p-6 flex flex-col gap-6">
      <ProductSelector
        selectedProductId={selectedProduct}
        onChange={(id) => setSelectedProduct(id)}
      />

      {selectedProduct && <ReviewList productId={selectedProduct} />}
    </div>
  );
}
