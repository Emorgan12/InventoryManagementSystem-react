import React from "react";
import reactDOM from "react-dom";
import { useState } from "react";
import BASE_URL from "../main";

function EditItem() {
    const [product, setProduct] = useState([]);
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0.0)
    const [cost, setCost] = useState(0.0)
    const [nameChange, setNameChange] = useState(false)
    const [categoryChange, setCategoryChange] = useState(false)
    const [priceChange, setPriceChange] = useState(false)
    const [costChange, setCostChange] = useState(false)


    const [error, setError] = useState('')

    const GetProduct = (e) => {
        e.preventDefault();
        fetch(BASE_URL + 'searchName/' + encodeURIComponent(searchValue))
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => {
            console.error('Error fetching data:', error);
            setError(error.message);
        });
    }

    return(
        <>
        <div className="container">
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <button onClick={GetProduct}>Search</button>

            <div>
                {product.length > 0 ? (
                    product.map((product) => (
                        <>
                        <li key={product.id}>{product.name }</li>
                        <li key={product.id}>{product.category}</li>    
                        <li key={product.id}>{product.price}</li>
                        <li key={product.id}>{product.cost}</li>
                        <button onClick={() => { setNameChange(true); setProduct(product); }}>Change Name</button>
                        <button onClick={() => { setCategoryChange(true); setProduct(product); }}>Change Category</button>
                        <button onClick={() => { setPriceChange(true); setProduct(product); }}>Change Price</button>
                        <button onClick={() => { setCostChange(true); setProduct(product); }}>Change Cost</button>
                        </>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>

        </div>
        </>
    )
}