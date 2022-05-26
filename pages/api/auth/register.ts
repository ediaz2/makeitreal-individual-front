/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { httpClient } from 'helpers';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await httpClient.post('auth/register', {
      body: JSON.stringify(req.body),
    });

    res.status(200).json({
      message: 'Product created',
    });
  }
};
