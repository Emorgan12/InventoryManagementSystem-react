import React from "react";
import reactDOM from "react-dom";
import { useState } from "react";
import BASE_URL from "../main";

function CreateItem() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0.0)
    const [cost, setCost] = useState(0.0)
    const [purchased, setPurchased] = useState(0.0)

    const [error, setError] = useState('')

    const handleCreation = (e) => {
        e.preventDefault();
        fetch(BASE_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"name": name, "category": category, "cost_price": cost, "selling_price": price, "quantity": purchased}),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log('Success:', data);
              alert('Contact added successfully');
            })
            .catch((error) => {
              console.error('Error:', error);
              setError(error.message);
            });
    };

    return (
        <div className="container">
            <form onSubmit={handleCreation}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} required>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food">Food</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
                </div>
                <div>
                    <label htmlFor="cost">Cost:</label>
                    <input type="number" id="cost" value={cost} onChange={(e) => setCost(parseFloat(e.target.value))} required />
                </div>
                <div>
                    <label htmlFor="purchased">Purchased:</label>
                    <input type="number" id="purchased" value={purchased} onChange={(e) => setPurchased(parseInt(e.target.value))} required />
                </div>
                <button className="add-btn">Create Item</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

reactDOM.render(<CreateItem />, document.getElementById('app'))