import { formatearMXN } from '../utils/moneda.js';

function ProductCard({ product, agregarAlCarrito }) {
  const agotado = product.stock === 0;

  return (
    <article className="product-card">
      <div className="product-card__details">
        <p className="product-card__category">Accesorios de cómputo</p>
        <h2 className="product-card__name">{product.nombre}</h2>
        <p className="product-card__description">{product.descripcion}</p>
      </div>
      <div className="product-card__purchase">
        <p className="product-card__price">{formatearMXN(product.precio)}</p>
        <p className={`product-card__stock${agotado ? ' product-card__stock--empty' : ''}`}>
          {agotado ? 'Agotado' : `${product.stock} disponibles`}
        </p>
        <button
          className="button"
          type="button"
          disabled={agotado}
          onClick={() => agregarAlCarrito(product)}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
