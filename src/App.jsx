import './App.css'
import Home from './pages/Home';
import Cart from './components/Cart';
import AddProduct from "./components/AddProduct";
import { products as productsData } from "./products";

import { CartContext } from './components/Context';
import { useContext, useState } from 'react';

function App() {
  const { cart } = useContext(CartContext)
  const [products, setProducts] = useState(productsData)
  const [cartModal, setCartModal] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  return (
    <>
      <nav>
        <button onClick={() => { setAddProductModal(true) }}>Add New Product</button>
        <button onClick={() => { setCartModal(true) }}>Cart {cart.totalQuantity}</button>
      </nav>

      <div>
        
        {cartModal ? <Cart setCartModal={setCartModal} /> : <Home products={products} setProducts={setProducts} />}
        {addProductModal && <AddProduct setProducts={setProducts} setAddProductModal={setAddProductModal} />}
      </div>
    </>

  )
}

export default App