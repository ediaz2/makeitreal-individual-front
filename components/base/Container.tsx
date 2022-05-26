import type { FunctionComponent, PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export const Container: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={`container px-6 py-3 mx-auto ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
