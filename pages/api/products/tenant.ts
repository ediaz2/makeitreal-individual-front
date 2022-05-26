/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { httpClient } from 'helpers';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = await httpClient('products', {
      headers: { tenant: req.headers.host },
    }).json();
    console.log(products);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
