/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { formidable } from 'formidable';
import { getSession } from 'next-auth/react';
import { httpClient } from 'helpers';
import FormData from 'form-data';
import { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseData = (
  req: NextApiRequest,
): Promise<{
  fields: { [key: string]: string };
  files: any;
}> => {
  const form = formidable();

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        const _fields = Object.keys(fields).reduce(
          (acc: Record<string, string>, key: string) => {
            acc[key] = fields[key][0];
            return acc;
          },
          {},
        );
        resolve({ fields: _fields, files });
      }
    });
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const token = session && session.token;

  if (req.method === 'POST') {
    const data = await parseData(req);

    const formData = new FormData();
    formData.append('image', createReadStream(data.files.image[0].filepath), {
      filename: data.files.image[0].originalFilename,
    });
    formData.append('name', data.fields.name);
    formData.append('price', data.fields.price);
    formData.append('description', data.fields.description);
    formData.append('user', data.fields.user);

    await httpClient.post('products', {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders(),
      },
      // @ts-ignore
      body: formData,
    });

    res.status(200).json({
      message: 'Product created',
    });
  }
};
