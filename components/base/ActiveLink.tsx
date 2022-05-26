import { useRouter } from 'next/router';
import type { FunctionComponent, PropsWithChildren, MouseEvent } from 'react';

interface Props {
  href: string;
}

export const ActiveLink: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  href,
}) => {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
  };

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform hover:text-blue-600 hover:underline md:mx-4 md:my-0"
      style={style}
    >
      {children}
    </a>
  );
};
