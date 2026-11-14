import { formatearMXN } from '../utils/moneda.js';

function CartItem({ item, cambiarCantidad, quitarDelCarrito }) {
  return (
    <li className="cart-item">
      <div className="cart-item__details">
        <h3 className="cart-item__name">{item.nombre}</h3>
        <p className="cart-item__unit-price">{formatearMXN(item.precio)} c/u</p>
        <button
          className="cart-item__remove"
          type="button"
          onClick={() => quitarDelCarrito(item.id)}
        >
          Quitar
        </button>
      </div>
      <div className="cart-item__controls">
        <div className="quantity-control" aria-label={`Cantidad de ${item.nombre}`}>
          <button
            type="button"
            aria-label={`Disminuir cantidad de ${item.nombre}`}
            onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
          >
            −
          </button>
          <span aria-live="polite">{item.cantidad}</span>
          <button
            type="button"
            aria-label={`Aumentar cantidad de ${item.nombre}`}
            onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
          >
            +
          </button>
        </div>
        <p className="cart-item__subtotal">
          {formatearMXN(item.precio * item.cantidad)}
        </p>
      </div>
    </li>
  );
}

export default CartItem;
