const camposTexto = ['nombre', 'descripcion', 'imagen'];

export function validarProducto(producto) {
  if (producto === null || typeof producto !== 'object' || Array.isArray(producto)) {
    return 'El cuerpo debe ser un objeto JSON.';
  }

  for (const campo of [...camposTexto, 'precio', 'stock']) {
    if (!Object.hasOwn(producto, campo)) {
      return `Falta el campo obligatorio "${campo}".`;
    }
  }

  for (const campo of camposTexto) {
    if (typeof producto[campo] !== 'string' || producto[campo].trim() === '') {
      return `El campo "${campo}" debe ser un texto no vacío.`;
    }
  }

  if (typeof producto.precio !== 'number' || !Number.isFinite(producto.precio) || producto.precio <= 0) {
    return 'El campo "precio" debe ser un número mayor que cero.';
  }

  if (!Number.isInteger(producto.stock) || producto.stock < 0) {
    return 'El campo "stock" debe ser un entero no negativo.';
  }

  return null;
}

export function crearDatosProducto(producto) {
  return {
    nombre: producto.nombre.trim(),
    precio: producto.precio,
    descripcion: producto.descripcion.trim(),
    imagen: producto.imagen.trim(),
    stock: producto.stock
  };
}
