import type { FunctionComponent, PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export const Box: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
};
