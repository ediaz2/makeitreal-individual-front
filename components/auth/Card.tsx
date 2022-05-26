import type { FunctionComponent, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import * as Base from '@/components/base';

interface Props {
  title: string;
}

export const Card: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  const router = useRouter();

  const isPageLogin = router.pathname.split('/').includes('login');

  return (
    <div className="w-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="px-6 py-4">
        <div className="flex justify-center">
          <Base.Logo className="inline-flex"></Base.Logo>
        </div>

        <p className="mt-1 text-center text-gray-500">{props.title}</p>

        {children}
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          {isPageLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
        </span>

        <span
          onClick={() => router.push(isPageLogin ? '/register' : '/login')}
          className="mx-2 text-sm font-bold text-blue-500 hover:underline cursor-pointer"
        >
          {isPageLogin ? 'Registrarse' : 'Ingresar'}
        </span>
      </div>
    </div>
  );
};
