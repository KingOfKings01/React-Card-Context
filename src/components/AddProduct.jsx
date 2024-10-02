import { useState } from "react";
import PropTypes from 'prop-types'

export default function AddProduct({ setProducts,setAddProductModal }) {
    const defaultData = {
        name: "",
        description: "",
        price: 0,
        quantity: {
            S: 0,
            M: 0,
            L: 0,
        },
    };

    const [newProduct, setNewProduct] = useState(defaultData);

    function handleChange(e) {
        const { name, value } = e.target;

        if (["S", "M", "L"].includes(name)) {
            const newQuantity = { ...newProduct.quantity, [name]: parseInt(value) };
            setNewProduct({ ...newProduct, quantity: newQuantity });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        const productToAdd = {
            id: Math.random() + Date.now(),
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
            quantity: newProduct.quantity,
        };

        setProducts((prevProducts) => [...prevProducts, productToAdd]);
        setNewProduct(defaultData);
    }

    return (
        <div className="Modal">
            <div className="modal-container">
                <button onClick={() => setAddProductModal(false)}>Close</button>
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="line-one">
                        <label>
                            Name: <input name="name" value={newProduct.name} onChange={handleChange} type="text" />
                        </label>
                        <label>
                            Price: <input name="price" onChange={handleChange} value={newProduct.price} min={0} type="number" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description: <input name="description" onChange={handleChange} value={newProduct.description} type="text" />
                        </label>
                    </div>
                        <label>
                            Quantity:
                        </label>
                    <div className="quantity-container">
                        <div>
                            <span>S:</span>
                            <input name="S" onChange={handleChange} value={newProduct.quantity.S} min={0} type="number" />
                        </div>
                        <div>
                            <span>M:</span>
                            <input name="M" onChange={handleChange} value={newProduct.quantity.M} min={0} type="number" />
                        </div>
                        <div>
                            <span>L:</span>
                            <input name="L" onChange={handleChange} value={newProduct.quantity.L} min={0} type="number" />
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

AddProduct.propTypes = {
    setProducts: PropTypes.func.isRequired,
    setAddProductModal: PropTypes.func.isRequired,
}
