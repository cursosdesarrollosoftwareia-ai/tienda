import { copyFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import app from '../app.js';

const archivoSemilla = fileURLToPath(new URL('../data/productos.semilla.json', import.meta.url));
const dataFileOriginal = process.env.DATA_FILE;
let directorioTemporal;

beforeEach(async () => {
  directorioTemporal = await mkdtemp(join(tmpdir(), 'productos-api-'));
  const archivoTemporal = join(directorioTemporal, 'productos.json');
  await copyFile(archivoSemilla, archivoTemporal);
  process.env.DATA_FILE = archivoTemporal;
});

afterEach(async () => {
  await rm(directorioTemporal, { recursive: true, force: true });
  if (dataFileOriginal === undefined) {
    delete process.env.DATA_FILE;
  } else {
    process.env.DATA_FILE = dataFileOriginal;
  }
});

describe('API de productos', () => {
  it('lista los cuatro productos', async () => {
    // Arrange

    // Act
    const respuesta = await request(app).get('/api/productos');

    // Assert
    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(4);
  });

  it('responde 404 al buscar un producto inexistente', async () => {
    // Arrange

    // Act
    const respuesta = await request(app).get('/api/productos/999');

    // Assert
    expect(respuesta.status).toBe(404);
  });

  it('crea un producto válido con el siguiente identificador', async () => {
    // Arrange
    const nuevoProducto = {
      nombre: 'Monitor de prueba',
      precio: 199.99,
      descripcion: 'Monitor para las pruebas de la API.',
      imagen: 'https://example.com/monitor.jpg',
      stock: 5
    };

    // Act
    const respuesta = await request(app).post('/api/productos').send(nuevoProducto);

    // Assert
    expect(respuesta.status).toBe(201);
    expect(respuesta.body.id).toBe(5);
  });

  it('rechaza la creación de un producto sin nombre', async () => {
    // Arrange
    const productoSinNombre = {
      precio: 199.99,
      descripcion: 'Producto sin nombre.',
      imagen: 'https://example.com/monitor.jpg',
      stock: 5
    };

    // Act
    const respuesta = await request(app).post('/api/productos').send(productoSinNombre);

    // Assert
    expect(respuesta.status).toBe(400);
  });

  it('rechaza un cuerpo JSON mal formado', async () => {
    // Arrange
    const jsonMalFormado = '{"nombre":';

    // Act
    const respuesta = await request(app)
      .post('/api/productos')
      .set('Content-Type', 'application/json')
      .send(jsonMalFormado);

    // Assert
    expect(respuesta.status).toBe(400);
  });

  it('actualiza un producto existente', async () => {
    // Arrange
    const productoActualizado = {
      nombre: 'Teclado actualizado',
      precio: 99.99,
      descripcion: 'Descripción actualizada.',
      imagen: 'https://example.com/teclado-actualizado.jpg',
      stock: 10
    };

    // Act
    const respuesta = await request(app).put('/api/productos/1').send(productoActualizado);

    // Assert
    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toMatchObject({ id: 1, ...productoActualizado });
  });

  it('elimina un producto y luego responde 404 al buscarlo', async () => {
    // Arrange

    // Act
    const respuestaEliminacion = await request(app).delete('/api/productos/1');
    const respuestaBusqueda = await request(app).get('/api/productos/1');

    // Assert
    expect(respuestaEliminacion.status).toBe(204);
    expect(respuestaBusqueda.status).toBe(404);
  });
});
