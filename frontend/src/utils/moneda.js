const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
});

export function formatearMXN(cantidad) {
  return formatter.format(cantidad);
}
