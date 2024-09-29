import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css'
import Home from './pages/Home';
import Cart from './pages/Cart';
import { CartContext } from './components/Context';
import { useContext } from 'react';

function App() {
  const { cart } = useContext(CartContext)
  return (
    <Router>
      <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/cart"}>Cart {cart.totalQuantity}</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Default route */}
        <Route path="/cart" element={<Cart />} />  
        <Route path="*" element={<>404 Page not found</>} />
      </Routes>
    </Router>
  )
}

export default App