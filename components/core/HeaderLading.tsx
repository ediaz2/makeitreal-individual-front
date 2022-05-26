import * as Base from '@/components/base';
import { useRouter } from 'next/router';
import { HeaderBase } from './HeaderBase';

export const HeaderLading = () => {
  const router = useRouter();
  return (
    <HeaderBase>
      <Base.Button
        className="bg-gray-700 hover:bg-gray-800 focus:ring-gray-300"
        onClick={() => router.push('/login')}
      >
        Ingresar
      </Base.Button>
      <Base.Button onClick={() => router.push('/register')}>
        Registrarse Gratis
      </Base.Button>
    </HeaderBase>
  );
};
