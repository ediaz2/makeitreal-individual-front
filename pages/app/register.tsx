import type { NextPage } from 'next';
import Head from 'next/head';
import ky from 'ky';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import * as Base from '@/components/base';
import * as Auth from '@/components/auth';
import * as Form from '@/components/form';

const schema = z
  .object({
    name: z.string().min(1),
    ruc: z.string().length(11),
    tenant: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmation: z.string(),
  })
  .refine((data) => data.password === data.confirmation, {
    message: 'Password and confirmation must match',
    path: ['confirmation'],
  });

type FormData = z.infer<typeof schema>;

const Register: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const validateTenant = async (tenant: string) => {
    const { exists } = await ky(
      `https://api.mytienda.xyz/api/users/tenant/${tenant}`,
    ).json<{ exists: string }>();
    return !exists;
  };

  const validateRuc = async (ruc: string) => {
    const { data } = await ky(
      `https://sunat.mytienda.xyz/api/ruc/${ruc}`,
    ).json<{ data: Array<Record<string, any>> }>();
    return data.length !== 0;
  };

  const onSubmit = async (data: FormData) => {
    const isValidTenant = await validateTenant(data.tenant);
    if (!isValidTenant) {
      setError('tenant', {
        type: 'validate',
        message: 'Tenant already exists',
      });
      return;
    }

    const isValidRuc = await validateRuc(data.ruc);
    if (!isValidRuc) {
      setError('ruc', {
        type: 'validate',
        message: 'RUC no exists',
      });
    }

    if (isValidRuc && isValidTenant) {
      await ky.post('/api/auth/register', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      reset();
    }
  };

  return (
    <div className="bg-slate-200">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Base.Container className="flex items-center h-screen">
        <Auth.Card title="Registrarse en MyTienda">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <Form.Input
                label="Nombre"
                name="name"
                register={register}
                autoComplete="off"
                error={errors.name?.message}
              ></Form.Input>
              <Form.Input
                label="RUC"
                name="ruc"
                type="number"
                register={register}
                error={errors.ruc?.message}
              ></Form.Input>
              <Form.Input
                label="Tenant"
                name="tenant"
                register={register}
                error={errors.tenant?.message}
              ></Form.Input>
              <Form.Input
                label="Email"
                name="email"
                register={register}
                error={errors.email?.message}
              ></Form.Input>
              <Form.Input
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password?.message}
              ></Form.Input>
              <Form.Input
                label="Confirmar Password"
                name="confirmation"
                type="password"
                register={register}
                error={errors.confirmation?.message}
              ></Form.Input>
            </div>

            <div className="flex justify-end mt-6">
              <Base.Button type="submit">Registrarse</Base.Button>
            </div>
          </form>
        </Auth.Card>
      </Base.Container>
    </div>
  );
};

export default Register;
