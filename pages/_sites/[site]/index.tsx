import type { NextPage } from 'next';
import { Dialog, Transition } from '@headlessui/react';
import Head from 'next/head';
import { formatPrice } from 'helpers';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import * as Base from '@/components/base';
import * as Form from '@/components/form';
import * as Core from '@/components/core';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';

import { Fragment, useEffect, useState } from 'react';
import { Products } from '@/components/sites/Products';

type Orden = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};
const headers = {
  name: 'Nombre',
  quantity: 'Cantidad',
  total: 'Total',
};

let schema = z.object({
  name: z.string().min(3),
});

type Data = z.infer<typeof schema>;

const Login: NextPage = () => {
  const [tenant, setTenant] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const [orden, setOrden] = useState<Orden[]>([]);

  const addProductCart = (product: Orden) => {
    setOrden((pre) => {
      const isExistsProductInOrden = pre.findIndex((p) => p.id === product.id);
      if (isExistsProductInOrden === 0) {
        pre[isExistsProductInOrden].quantity += 1;
        return [...pre];
      } else {
        return [...pre, product];
      }
    });
  };

  const addProduct = (index: number) => {
    setOrden((pre) => {
      pre[index].quantity += 1;
      return [...pre];
    });
  };

  const removeProduct = (index: number) => {
    setOrden((pre) => {
      pre[index].quantity -= 1;
      if (pre[index].quantity === 0) {
        return [...pre.slice(0, index), ...pre.slice(index + 1)];
      }
      return [...pre];
    });
  };

  const total = orden.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  useEffect(() => {
    setTenant(window.location.hostname.split('.')[0]);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Data>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Data) => {
    const EOL = '%0A';
    const ordersText = () => {
      const textData = `*•* *Datos del cliente*${EOL}Nombre : *${data.name}*${EOL}${EOL}`;
      let textOrder = '';
      for (const d of orden) {
        textOrder += `*[${formatPrice(d.price)}]* - *${d.quantity}* x ${d.name}${EOL}`;
      }
      return textData + textOrder + `${EOL}*Total:* ${formatPrice(total)}`;
    };
    const sendOrder = () => {
      const text = ordersText().replace(' ', '%20');
      const baseUrl = `https://api.whatsapp.com/send?phone=`;
      const hasText = `text=${text}`;
      window.open(`${baseUrl}${+51982575726}&${hasText}`, '_blank');
      setOrden([]);
      closeModal();
    };
    sendOrder();
    reset();
  };

  return (
    <div className="bg-slate-200 h-screen">
      <Head>
        <title>MyTienda | {tenant}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Core.HeaderBase>
        <Base.Button onClick={() => setIsOpen(!isOpen)}>
          Ver Carro de compras
        </Base.Button>
      </Core.HeaderBase>

      <Products onAddProduct={addProductCart}></Products>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Orden de compra
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6 mt-4">
                      <Form.Input
                        label="Nombre del cliente"
                        name="name"
                        register={register}
                        error={errors.name?.message}
                      ></Form.Input>
                    </div>

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
                        {orden.map((item, index) => (
                          <tr
                            key={item.id}
                            className="bg-white dark:bg-gray-800"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                            >
                              {item.name}
                            </th>
                            <td className="px-6 py-4 flex justify-between">
                              <button
                                type="button"
                                onClick={() => removeProduct(index)}
                              >
                                <MinusIcon className="h-4"></MinusIcon>
                              </button>
                              {item.quantity}
                              <button
                                type="button"
                                onClick={() => addProduct(index)}
                              >
                                <PlusIcon className="h-4"></PlusIcon>
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              {formatPrice(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td
                            className="px-6 py-4 bg-gray-50 dark:bg-gray-800"
                            colSpan={2}
                          >
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-900">
                                Total
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {formatPrice(total)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-4">
                      <Base.Button onClick={closeModal}>Cerrar</Base.Button>
                      <Base.Button type="submit">Solicitar pedido</Base.Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Core.Footer></Core.Footer>
    </div>
  );
};

export default Login;
