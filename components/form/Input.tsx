import type { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { Label } from '@/components/form/Label';
import { Error } from '@/components/form/Error';

interface Props extends ComponentPropsWithoutRef<'input'> {
  label: string;
  name: string;
  error?: string;
  register?: any;
  className?: string;
}

export const Input: FunctionComponent<Props> = ({
  label,
  name,
  register,
  error,
  className,
  ...props
}) => (
  <div className={`${className}`}>
    <Label htmlFor={name}>{label}</Label>
    <input
      id={name}
      className="border-2 border-secondary-100 rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
      placeholder={label}
      aria-describedby={error ? `${label}-error` : undefined}
      {...register(name)}
      {...props}
    />
    {error && <Error label={label} error={error} />}
  </div>
);
