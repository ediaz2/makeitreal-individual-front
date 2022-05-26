import { FunctionComponent, PropsWithChildren } from 'react';
import * as Base from '@/components/base';

export const HeaderBase: FunctionComponent<PropsWithChildren<any>> = ({
  children,
}) => {
  return (
    <header>
      <nav className="bg-white shadow">
        <Base.Container>
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-800">
                <Base.Logo> </Base.Logo>
              </div>
            </div>

            <div className="flex items-center py-2 -mx-1 md:mx-0">
              {children}
            </div>
          </div>
        </Base.Container>
      </nav>
    </header>
  );
};
