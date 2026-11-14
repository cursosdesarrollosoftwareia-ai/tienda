import ProductCard from './ProductCard.jsx';

function ProductList({ products, agregarAlCarrito }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          agregarAlCarrito={agregarAlCarrito}
        />
      ))}
    </div>
  );
}

export default ProductList;
