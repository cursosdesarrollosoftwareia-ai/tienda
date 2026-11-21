# Copilot Instructions

## Contexto
- Repositorio dividido en `backend/` y `frontend/`; ejecutar los comandos en la carpeta correspondiente.
- El back-end usa Node.js, módulos ES, Express 5 y Vitest/Supertest.
- El front-end usa React 19, JSX y Vite 8; no usa TypeScript ni Redux.
- El catálogo y el carrito son datos locales: el carrito vive en el estado de React y los productos se leen/escriben en JSON.

## Convenciones de código
- Usa JavaScript ES Modules (`import`/`export`) y rutas con extensión `.js` o `.jsx` cuando corresponda.
- Sigue el estilo existente: indentación de 2 espacios, comillas simples y punto y coma.
- Conserva nombres descriptivos; el dominio usa nombres españoles (`productos`, `obtenerProductos`, `calcularTotal`).
- Separa responsabilidades: rutas Express en `routes/`, persistencia y validación en `lib/`, componentes React en `src/components/` y utilidades en `src/utils/`.
- Mantén componentes pequeños y pasa funciones de estado desde `App.jsx` a los componentes cuando sea necesario.

## Back-end
- Configura Express desde `backend/app.js`; monta el CRUD en `/api/productos` y conserva respuestas JSON y códigos 200/201/204/400/404/500.
- Usa `leerProductos` y `guardarProductos` de `lib/almacen.js` para persistir `data/productos.json`.
- Permite seleccionar otro archivo con `DATA_FILE`; no cambies su tratamiento ni escribas directamente fuera de este módulo.
- Valida toda entrada con `validarProducto` y normaliza texto con `crearDatosProducto`; exige nombre, descripción e imagen no vacíos, precio positivo y stock entero no negativo.
- Reserva `PORT` (predeterminado 3001) y `CORS_ORIGIN`; no cambies estos nombres de variable.
- Conserva el manejo centralizado de JSON inválido y rutas no encontradas en `app.js`.

## Front-end
- Obtén datos mediante `obtenerProductos` en `src/api.js`; la URL base procede de `VITE_API_URL` y se añade `/api/productos`.
- Mantén el estado del catálogo, carga y errores en `App.jsx`; evita convertirlo en una API o fuente global nueva.
- Implementa operaciones del carrito con actualización funcional de estado y calcula cantidades/totales mediante `src/utils/carrito.js`.
- Formatea importes en pesos mexicanos con `src/utils/moneda.js`; conserva estados de carga, error, stock agotado y semántica ARIA existente.
- Ejecuta la app desde `frontend/`; no agregues dependencias, rutas ni frameworks sin necesidad demostrada.

## Pruebas y verificación
- Back-end: desde `backend/`, usa `npm test` para Vitest/Supertest y `npm run coverage` para cobertura.
- Las pruebas de API deben usar `DATA_FILE` con un archivo temporal copiado desde `data/productos.semilla.json` y restaurar la variable al finalizar.
- Front-end: desde `frontend/`, usa `npm run lint` y `npm run build`; no hay suite de pruebas front-end configurada.
- Después de cambios, verifica el flujo CRUD con `backend/peticiones.http` o las pruebas existentes y ejecuta la compilación del front-end.

## Seguridad
- Valida entrada en el servidor aunque exista validación visual o de componentes en el cliente.
- No copies datos reales, tokens ni secretos al repositorio; configura `CORS_ORIGIN`, `PORT`, `DATA_FILE` y `VITE_API_URL` mediante variables de entorno.
- Conserva el origen CORS configurado y no uses `cors()` abierto en el código existente salvo que el cambio lo requiera explícitamente.
