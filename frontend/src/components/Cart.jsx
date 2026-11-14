import { calcularTotal } from '../utils/carrito.js';
import { formatearMXN } from '../utils/moneda.js';
import CartItem from './CartItem.jsx';

function Cart({ items, cambiarCantidad, quitarDelCarrito, vaciar }) {
  const total = calcularTotal(items);

  return (
    <aside className="cart" aria-labelledby="cart-title">
      <div className="cart__heading">
        <div>
          <p className="store-eyebrow">Tu selección</p>
          <h2 id="cart-title">Carrito</h2>
        </div>
        {items.length > 0 && (
          <button className="cart__clear" type="button" onClick={vaciar}>
            Vaciar
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="cart__empty">Tu carrito está vacío. Agrega productos para comenzar.</p>
      ) : (
        <>
          <ul className="cart__items">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                cambiarCantidad={cambiarCantidad}
                quitarDelCarrito={quitarDelCarrito}
              />
            ))}
          </ul>
          <p className="cart__total">
            <span>Total:</span>
            <strong>{formatearMXN(total)}</strong>
          </p>
        </>
      )}
    </aside>
  );
}

export default Cart;
