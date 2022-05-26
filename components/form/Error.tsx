import type { FunctionComponent } from 'react';

interface Props {
  label: string,
  error: string,
}

export const Error: FunctionComponent<Props> = ({ label, error }) => (
  <small id={`${label}-error`} className="pl-2 text-red-400 text-md italic">
    {error}
  </small>
);