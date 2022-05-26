import type {
  ComponentPropsWithoutRef,
  FunctionComponent,
  PropsWithChildren,
} from 'react';

export const Button: FunctionComponent<
  PropsWithChildren<ComponentPropsWithoutRef<'button'>>
> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
