import type { FunctionComponent, PropsWithChildren } from 'react';

export const Label: FunctionComponent<PropsWithChildren<any>> = ({ children }) => (
  <label className="block mb-2 font-medium">{children}</label>
);
