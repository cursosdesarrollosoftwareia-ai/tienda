import cors from 'cors';
import express from 'express';
import productosRouter from './routes/productos.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/productos', productosRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.use((error, req, res, next) => {
  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 500
    ? error.status
    : 500;
  const message = status < 500
    ? (status === 400 ? 'JSON inválido.' : error.message)
    : 'Error interno del servidor.';

  res.status(status).json({ error: message });
});

export default app;
