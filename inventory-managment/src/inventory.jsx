import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

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
        <div>
            {error && <p className="error">{error}</p>}
            <ul>
                {products.length > 0 ? (
                    products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </ul>
        </div>
    );
}

ReactDOM.render(<Inventory />, document.getElementById('app'));