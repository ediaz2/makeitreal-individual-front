import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const middleware = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get('host');

  if (!hostname) {
    return new Response(null, {
      status: 400,
      statusText: 'No hostname found in request headers',
    });
  }

  const currentHost = hostname.replace(`.${process.env.DOMAIN}`, '');

  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, {
      status: 404,
    });
  }

  if (
    hostname === String(process.env.DOMAIN) &&
    ['/login', '/register'].includes(pathname)
  ) {
    url.href = `${url.protocol}//app.${currentHost}${pathname}`;
    return NextResponse.redirect(url);
  }

  if (!pathname.includes('.') && !pathname.startsWith('/api')) {
    if (currentHost == 'app') {
      if (!['/login', '/register'].includes(pathname) && !req.cookies['next-auth.session-token']) {
        url.href = `${url.protocol}//app.${process.env.DOMAIN}/login`;
        return NextResponse.redirect(url);
      } else {
        url.pathname = `/app${pathname}`;
        return NextResponse.rewrite(url);
      }
    }

    if (hostname === String(process.env.DOMAIN)) {
      url.pathname = `/home${pathname}`;
      return NextResponse.rewrite(url);
    }

    url.pathname = `/_sites/${currentHost}${pathname}`;
    return NextResponse.rewrite(url);
  }
};

export default middleware;
