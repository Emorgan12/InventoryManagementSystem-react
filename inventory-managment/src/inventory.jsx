import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import BASE_URL from "../main";

console.log('Inventory component mounted');
function Inventory() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        console.log('Fetching data from API');
        fetch(BASE_URL)
            .then((response) => {
                console.log('Received response:', response);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
            });
    }, []);

    return (
        <div className="container">
            {error && <p className="error">{error}</p>}
            <table className="inventory">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Cost Price</th>
                        <th>Selling Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                {products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.cost_price}</td>
                            <td>{product.selling_price}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colspan="6">No products available</td>
                    </tr>
                )}
                </tbody>
            </table>
            <a href="index.html">Home</a>
        </div>
    );
}

ReactDOM.render(<Inventory />, document.getElementById('app'));