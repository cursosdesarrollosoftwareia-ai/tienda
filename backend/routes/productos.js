import { Router } from 'express';
import { guardarProductos, leerProductos } from '../lib/almacen.js';
import { crearDatosProducto, validarProducto } from '../lib/validacion.js';

const router = Router();

router.get('/', async (req, res) => {
  const productos = await leerProductos();
  res.json(productos);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const productos = await leerProductos();
  const producto = productos.find((elemento) => elemento.id === id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  res.json(producto);
});

router.post('/', async (req, res) => {
  const error = validarProducto(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const productos = await leerProductos();
  const id = productos.reduce((mayorId, producto) => Math.max(mayorId, producto.id), 0) + 1;
  const producto = { id, ...crearDatosProducto(req.body) };

  productos.push(producto);
  await guardarProductos(productos);

  res.status(201).json(producto);
});

router.put('/:id', async (req, res) => {
  const error = validarProducto(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const id = Number(req.params.id);
  const productos = await leerProductos();
  const indice = productos.findIndex((producto) => producto.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  const producto = { id, ...crearDatosProducto(req.body) };
  productos[indice] = producto;
  await guardarProductos(productos);

  res.json(producto);
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const productos = await leerProductos();
  const indice = productos.findIndex((producto) => producto.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  productos.splice(indice, 1);
  await guardarProductos(productos);

  res.status(204).end();
});

export default router;
