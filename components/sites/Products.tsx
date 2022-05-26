import type { FunctionComponent } from 'react';
import { formatPrice } from 'helpers';
import Image from 'next/image';
import * as Base from '@/components/base';

import ky from 'ky';
import { useEffect, useState } from 'react';
type Orden = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

interface Props {
  onAddProduct: (product: Orden) => void;
}
export const Products: FunctionComponent<Props> = ({ onAddProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await ky(`/api/products/tenant`).json<Product[]>();
    setProducts(response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Base.Container className="mt-4">
      <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
          >
            <div className="px-4 py-2">
              <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-white">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {product.description}
              </p>
            </div>
            <Image
              className="object-cover w-full"
              src={product.image}
              width={320}
              height={200}
              alt={product.name}
            ></Image>

            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <h1 className="text-lg font-bold text-white">
                {formatPrice(product.price)}
              </h1>
              <button
                className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
                onClick={() => {
                  onAddProduct({
                    id: product._id,
                    name: product.name,
                    quantity: 1,
                    price: product.price,
                  });
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </Base.Container>
  );
};
