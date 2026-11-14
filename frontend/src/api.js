const apiUrl = import.meta.env.VITE_API_URL;

export async function obtenerProductos() {
  const response = await fetch(`${apiUrl}/api/productos`);

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los productos (HTTP ${response.status}).`);
  }

  return response.json();
}
