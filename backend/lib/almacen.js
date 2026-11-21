import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const archivoProductosPredeterminado = fileURLToPath(new URL('../data/productos.json', import.meta.url));

function obtenerArchivoProductos() {
  return process.env.DATA_FILE ?? archivoProductosPredeterminado;
}

export async function leerProductos() {
  const contenido = await readFile(obtenerArchivoProductos(), 'utf8');
  return JSON.parse(contenido);
}

export async function guardarProductos(productos) {
  const contenido = `${JSON.stringify(productos, null, 2)}\n`;
  await writeFile(obtenerArchivoProductos(), contenido, 'utf8');
}
