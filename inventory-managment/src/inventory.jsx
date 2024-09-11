import React from "react";
import { useState, useEffect } from "react";
import reactDOM from "react-dom";


function Inventory() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')

    const BASE_URL = 'https://127.0.0.1:5001/inventory'

    console.log('Inventory component')
    useEffect(() => {
        fetch(BASE_URL)
            .then((response) => {
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

    return(
        <div className="container">
            <h1>Inventory</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Cost</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.selling_price}</td>
                            <td>{product.cost_price}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

reactDOM.render(<Inventory />, document.getElementById('app'))