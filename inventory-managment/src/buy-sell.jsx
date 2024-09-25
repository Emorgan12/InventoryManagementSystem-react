import React from "react";
import reactDOM from "react-dom";
import { useState } from "react";
import BASE_URL from "../main";

function BuySell() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [id, setId] = useState('');

    const handlePurchase = (e) => {
        e.preventDefault();
        fetch(`${BASE_URL}/${id}, ${quantity}/buy`, {
            method: 'PUT',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                alert('Purchase successful');
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
            });
    }

    const handleSell = (e) => {
        e.preventDefault();
        fetch(`${BASE_URL}/${id}, ${quantity}/sell`, {
            method: 'PUT',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                alert('Sale successful');
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
            });
    }


    return (
        <div className="container">
            <form>
            <div>
                <label htmlFor="id">Product ID:</label>
                <input type="text" id="id" value={id} onChange={(e) => setId((e.target.value))} required />
            </div>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
            </div>
            <div className="container">
                <button onClick={handlePurchase} className= "buy-sell-btn">Purchase</button>
                <button onClick={handleSell} className= "buy-sell-btn">Sell</button>
            </div>
            </form>
            <a href="index.html">Home</a>
        </div>


    )
}

reactDOM.render(<BuySell />, document.getElementById("app"));
