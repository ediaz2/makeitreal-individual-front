/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react"
import { httpClient } from 'helpers';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const token = session && session.token;
  const { userId } = req.query;

  const products = await httpClient(`products/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).json();

  res.status(200).json(products);
};
