import { FunctionComponent, useEffect, useState } from 'react';
import ky from 'ky';
import * as Base from '@/components/base';
import Image from 'next/image';
import { formatPrice } from 'helpers'

export const CardProducts: FunctionComponent<{
  session: any;
}> = ({ session }) => {
  type Product = {
    _id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  };

  const [products, setProducts] = useState<Product[]>([]);

  const id = session.user._id;

  const headers = {
    name: 'Nombre',
    image: 'Imagen',
    description: 'Descripción',
    price: 'Precio',
  };

  const fetchProducts = async () => {
    const response = await ky(`/api/products/${id}`).json<Product[]>();
    setProducts(response);
  };

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base.Box className="p-4 mt-2">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {Object.keys(headers).map((key) => (
              <th key={key} scope="col" className="px-6 py-3">
                {headers[key as keyof typeof headers]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {product.name}
              </th>
              <td className="px-6 py-4">
                {
                  <Image
                    src={product.image}
                    width={100}
                    height={100}
                    alt={product.name}
                  ></Image>
                }
              </td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4">{formatPrice(product.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Base.Box>
  );
};
