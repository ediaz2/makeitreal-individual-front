import * as Base from '@/components/base';
import { signOut } from 'next-auth/react';
import { HeaderBase } from './HeaderBase';

export const HeaderApp = () => {
  return (
    <HeaderBase>
      <Base.Button
        className="bg-red-700 hover:bg-red-800 focus:ring-red-300"
        onClick={() => signOut()}
      >
        Cerrar Sesión
      </Base.Button>
    </HeaderBase>
  );
};
