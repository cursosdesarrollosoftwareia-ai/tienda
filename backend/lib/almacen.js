import { readFile, writeFile } from 'node:fs/promises';

const archivoProductos = new URL('../data/productos.json', import.meta.url);

export async function leerProductos() {
  const contenido = await readFile(archivoProductos, 'utf8');
  return JSON.parse(contenido);
}

export async function guardarProductos(productos) {
  const contenido = `${JSON.stringify(productos, null, 2)}\n`;
  await writeFile(archivoProductos, contenido, 'utf8');
}
