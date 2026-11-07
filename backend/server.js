import app from './app.js';

const port = process.env.PORT === undefined ? 3001 : Number(process.env.PORT);

if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new Error('PORT debe ser un número entero entre 0 y 65535.');
}

app.listen(port, () => {
  console.log(`API de la tienda escuchando en el puerto ${port}.`);
});
