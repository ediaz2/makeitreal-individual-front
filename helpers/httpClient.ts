import ky from 'ky';

export const httpClient = ky.create({
  prefixUrl: String(`${process.env.API_URL}/api`),
  timeout: 50000,
});