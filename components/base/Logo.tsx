import type { FunctionComponent } from 'react';

import { ShoppingBagIcon } from '@heroicons/react/solid';

export const Logo: FunctionComponent<any> = () => (
  <div className="flex items-center text-gray-800">
    <ShoppingBagIcon className="h-10 w-10"></ShoppingBagIcon>
    <span className="font-bold text-2xl">MyTienda</span>
  </div>
);
