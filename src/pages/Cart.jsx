import { CartContext } from '../components/Context.jsx'
import { useContext } from "react";

export default function Cart() {

  const { cart: { products, totalPrice }, clearCart } = useContext(CartContext)

  return (
    <div className='container'>
      <h2 className="title">Cart</h2>
      {
        (products.length > 0) ?
          <>
            <div className="card">
              {products.map((product) => (
                <ul key={product.id} className="card">
                  <li >{product.name}</li>
                  <li >{product.description}</li>
                  
                  <li >Price: {product.price}</li>
                  {Object.entries(product.quantity).map(([size, value], index) => {
                    return <span className="box" key={index}> {size}: {value} </span>
                  })}

                  <li>Total: {Object.values(product.quantity).reduce(
                    (acc, value) => acc + value * product.price
                    , 0
                  )}</li>
                </ul>
              )
              )}
            </div>
            <div className="card">
              <p>Total Cost: {totalPrice}</p>
              <div>
                <button onClick={() => {

                  alert('Clear Cart');
                  clearCart()
                }}>Clear Cart</button>
                <button onClick={
                  () => {
                    alert("Place order");
                    clearCart()
                  }
                }>
                  Checkout
                </button>

              </div>
            </div>
          </> :
          <div className="card">
            <p className="center">
              Cart is empty
            </p>
          </div>
      }
    </div>
  )
}
