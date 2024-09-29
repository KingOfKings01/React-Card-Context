import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        products: [],
        totalPrice: 0,
        totalQuantity: 0
    });

    const addToCart = (cartProduct) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.products.findIndex(
                (product) => product.id === cartProduct.id
            );
            
            let updatedProducts;

            //Todo: Update the existing product with it's quantities
            if (existingProductIndex !== -1) {

                updatedProducts = prevCart.products.map((product, index) => {
                    if (index === existingProductIndex) {
                        const updatedQuantities = { ...product.quantity };
                        for (const size in cartProduct.quantity) {
                            updatedQuantities[size] =
                                (updatedQuantities[size] || 0) + cartProduct.quantity[size];
                        }
                        return { ...product, quantity: updatedQuantities };
                    }
                    return product;
                });
            }
            
            // Add new product if it doesn't exist
            return {
                ...prevCart,
                products: updatedProducts || [...prevCart.products, cartProduct],
                totalPrice: prevCart.totalPrice + cartProduct.price,
                totalQuantity: prevCart.totalQuantity + Object.values(cartProduct.quantity).reduce((a, b) => a + b, 0),
            };
        });
    };

    const clearCart = () => {
        setCart({
            products: [],
            totalPrice: 0,
            totalQuantity: 0,
        });
    }


    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes={
    children: PropTypes.node.isRequired,
}

export default CartProvider;