import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Product = {
  id: number;
  name: string;
};

type ProductSelectorProps = {
  selectedProductId: number | null;
  onChange: (productId: number) => void;
};

export function ProductSelector({ selectedProductId, onChange }: ProductSelectorProps) {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get<Product[]>('/api/products');
      return data;
    },
  });

  if (isLoading) return <p>Loading rides...</p>;
  if (error) return <p className="text-red-500">Failed to load rides</p>;

  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium text-gray-700">Select a ride:</label>
      <select
        className="border border-gray-300 rounded-lg p-2 w-full md:w-64"
        value={selectedProductId ?? ''}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value="" disabled>
          -- Choose a ride --
        </option>
        {products?.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
