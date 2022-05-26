import type { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import * as Base from '@/components/base';
import * as Form from '@/components/form';
import ky from 'ky';

let schema = z.object({
  name: z.string().min(3),
  price: z.preprocess((n) => parseInt(n as string, 10), z.number()),
  image: z.any(),
  description: z.string().min(3),
  user: z.string().optional(),
});

type Data = z.infer<typeof schema>;

export const CardProductCreate: FunctionComponent<{
  session: any;
}> = ({ session }) => {
  const id = session.user._id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Data>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Data) => {
    data.user = id;
    data.image = data.image[0];
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      // @ts-ignore
      formData.append(key, data[key]);
    });
    await ky.post('/api/products', {
      body: formData,
    });
    reset();
  };

  return (
    <Base.Box className="p-4 mt-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-4">
          <Form.Input
            label="Nombre del producto"
            name="name"
            register={register}
            error={errors.name?.message}
          ></Form.Input>
          <Form.Input
            label="Precio"
            type="number"
            name="price"
            register={register}
            error={errors.price?.message}
          ></Form.Input>
          <Form.Input
            label="Imagen"
            name="image"
            type="file"
            accept="image/*"
            register={register}
            error={errors.image?.message}
          ></Form.Input>
          <Form.Input
            label="Descripción"
            name="description"
            register={register}
            error={errors.description?.message}
          ></Form.Input>
        </div>

        <div className="flex justify-end mt-6">
          <Base.Button type="submit">
            Crear producto
          </Base.Button>
        </div>
      </form>
    </Base.Box>
  );
};
