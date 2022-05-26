export const formatPrice = (price: number) => {
  return Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'PEN',
  }).format(price);
};