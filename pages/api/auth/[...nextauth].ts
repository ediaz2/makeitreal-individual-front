import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { decodeJWT, httpClient } from 'helpers';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Correo electrónico',
          type: 'text',
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: 'Password',
        },
      },
      authorize: async (credentials?: { email: string; password: string }) => {
        const { token } = await httpClient
          .post('auth/login', {
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          })
          .json<{ token: string }>();

        if (token) {
          const { id } = decodeJWT(token);
          const user = await httpClient(`users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).json();
          return { user, token };
        }
        return null;
      },
    }),
  ],
  secret: process.env.SECRET || 'secret',
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      // @ts-ignore
      session.user = token.user.user;
      // @ts-ignore
      session.token = token.user.token;
      return Promise.resolve(session);
    },
    redirect: async () => {
      return process.env.NEXTAUTH_URL || '/';
    },
  },
});
