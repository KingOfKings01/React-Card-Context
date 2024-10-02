import { useContext, useState } from "react";
import PropTypes from 'prop-types'
import { CartContext } from '../components/Context.jsx';


export default function Home({products, setProducts}) {
  const [selectedOptions, setSelectedOptions] = useState({})
  const [isAvailable, setIsAvailable] = useState(true)

  const { addToCart } = useContext(CartContext)

  const handleOptionChange = (e, productId) => {
    setSelectedOptions({
      ...selectedOptions,
      [productId]: e.target.value,
    })

    setIsAvailable(true)
  };

  const handleAddToCard = (product) => {
    const selectedOption = selectedOptions[product.id]

    if (!selectedOption) {
      alert("Please select a size before adding to cart.")
      return
    }

    if (!(product.quantity[selectedOptions[product.id]] > 0)) {
      setIsAvailable(false)
      alert("This size is not available")
      return
    }
    else {
      setIsAvailable(true)
    }

    setProducts(prods => {
      return prods.map(prod => {
        if (prod.id === product.id) {
          const updatedProduct = { ...prod };
          updatedProduct.quantity[selectedOption] -= 1;
          return updatedProduct;
        }
        return prod;
      });
    });

    //Todo: Add to cart functionality from context

    const cardProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: {
        S: 0, M: 0, L: 0,
      }
    }

    cardProduct.quantity[selectedOption] = 1;

    addToCart(cardProduct)
  };

  return (
    <div className="container">
      <h1 className="title">Products</h1>
      
      {products.map((product) => (
        <div key={product.id} className="card">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          
            {Object.entries(product.quantity).map(([size, value]) => (
              <div key={size}>
                <label
                  className={`
                    option ${(selectedOptions[product.id] === size ? 'selected' : '')}
                    ${(size == 0) ? "disabled" : ""}`
                  }
                >
                  {size}: {value}
                  <input
                    hidden={true}
                    disabled={(product.quantity[size] == 0)}
                    className={`${(product.quantity[size] == 0) ? "disabled" : ""}`}
                    type="radio"
                    value={size}
                    name={`size-${product.id}`}
                    checked={selectedOptions[product.id] === size}
                    onChange={(e) => handleOptionChange(e, product.id)}
                  />
                </label>
              </div>
            ))}

            {
              isAvailable ?
                <button  onClick={() => handleAddToCard(product)} >Add to cart</button>
                :
                <button onClick={() => handleAddToCard(product)} disabled>Add to cart</button>
            }

        </div>
      ))}
    </div>
  )
}


Home.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.objectOf(PropTypes.number).isRequired,
  })).isRequired,
  setProducts: PropTypes.func.isRequired,
}