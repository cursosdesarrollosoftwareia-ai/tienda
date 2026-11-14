import { useEffect, useState } from 'react';
import { obtenerProductos } from './api.js';
import Cart from './components/Cart.jsx';
import ProductList from './components/ProductList.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function agregarAlCarrito(product) {
    setCartItems((items) => {
      const existe = items.some((item) => item.id === product.id);

      if (existe) {
        return items.map((item) => (
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ));
      }

      return [...items, { ...product, cantidad: 1 }];
    });
  }

  function cambiarCantidad(productId, cantidad) {
    setCartItems((items) => items.map((item) => (
      item.id === productId
        ? { ...item, cantidad: Math.max(1, cantidad) }
        : item
    )));
  }

  function quitarDelCarrito(productId) {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  }

  function vaciar() {
    setCartItems([]);
  }

  useEffect(() => {
    let active = true;

    obtenerProductos()
      .then((result) => {
        if (active) {
          setProducts(result);
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message || 'No se pudieron cargar los productos.');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="store">
      <header className="store-header">
        <p className="store-eyebrow">Todo para tu espacio de trabajo</p>
        <h1>Accesorios que hacen la diferencia</h1>
        <p className="store-intro">
          Encuentra los esenciales para llevar tu setup al siguiente nivel.
        </p>
      </header>

      <div className="store-layout">
        <section className="catalog" aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <div>
              <p className="store-eyebrow">Nuestra selección</p>
              <h2 id="catalog-title">Productos destacados</h2>
            </div>
            {!loading && !error && (
              <p className="catalog-count">{products.length} productos</p>
            )}
          </div>

          {loading && <p className="status-message">Cargando…</p>}
          {error && <p className="status-message status-message--error" role="alert">{error}</p>}
          {!loading && !error && (
            <ProductList products={products} agregarAlCarrito={agregarAlCarrito} />
          )}
        </section>

        <Cart
          items={cartItems}
          cambiarCantidad={cambiarCantidad}
          quitarDelCarrito={quitarDelCarrito}
          vaciar={vaciar}
        />
      </div>
    </main>
  );
}

export default App;
