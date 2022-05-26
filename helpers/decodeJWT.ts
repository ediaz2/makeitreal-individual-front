export const decodeJWT = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = Buffer.from(base64Url, 'base64').toString('utf-8');
  return JSON.parse(base64);
};