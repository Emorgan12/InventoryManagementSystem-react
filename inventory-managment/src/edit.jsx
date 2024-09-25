import React from "react";
import reactDOM from "react-dom";
import { useState, useEffect } from "react";
import BASE_URL from "../main";

function EditItem() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0.0)
    const [cost, setCost] = useState(0.0)
    const [nameChange, setNameChange] = useState(false)
    const [categoryChange, setCategoryChange] = useState(false)
    const [priceChange, setPriceChange] = useState(false)
    const [costChange, setCostChange] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [productsAvailable, setProductsAvailable] = useState(false)
    const [error, setError] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        console.log(products.length);
        console.log('Available' + productsAvailable);
        console.log('Name' + nameChange);
        console.log('Category' + categoryChange);
        console.log('Price' + priceChange);
        console.log('Cost' + costChange);
    });
    
    const handleSearch = (e) => {
        e.preventDefault();
        fetch(BASE_URL + `/${searchValue}` + '/search')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => {
            console.error('Error fetching data:', error);
            setError(error.message);
        });
        if (products.length > 0) {
            setProductsAvailable(true);
        }
    }


    
    const handleNameChange = (e) => {
        console.log('Name:', name);
        e.preventDefault();
        fetch(BASE_URL + '/' + encodeURIComponent(id) +', '+ encodeURIComponent(name)+ '/name', {
            method: 'PUT'
        })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log('Success:', data);
              alert('Name changed successfully');
            })
            .catch((error) => {
              console.error('Error:', error);
              setError(error.message);
            });
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        fetch(BASE_URL + '/' + encodeURIComponent(id) +', '+ encodeURIComponent(category)+ '/category', {
            method: 'PUT'
        })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log('Success:', data);
              alert('Category changed successfully');
            })
            .catch((error) => {
              console.error('Error:', error);
              setError(error.message);
            });
    }
    
    const handlePriceChange = (e) => {
        e.preventDefault();
        console.log('Id:', id);
        fetch(BASE_URL + '/' + encodeURIComponent(id) +', '+ encodeURIComponent(price)+ '/price', {
            method: 'PUT'
        })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log('Success:', data);
              alert('Price changed successfully');
            })
            .catch((error) => {
              console.error('Error:', error);
              setError(error.message);
            });
    }
    
    const handleCostChange = (e) => {
        e.preventDefault();
        fetch(BASE_URL + '/' + encodeURIComponent(id) +', '+ encodeURIComponent(cost)+ '/cost', {
            method: 'PUT'
        })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log('Success:', data);
              alert('Cost changed successfully');
            })
            .catch((error) => {
              console.error('Error:', error);
              setError(error.message);
            });
    }

    

    return(
       
        <div className="container">
            <form onSubmit={handleSearch}>
            <input type="text" id="name" onChange={(e) => setSearchValue(e.target.value)} required />
            <div className="container"><button className="search-btn" type='submit'>Search</button></div>

                {productsAvailable ? (
                <>
                <table className="editTable">
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
                            {products.map((products) => (

                            <tr className="editRow" key={products.id}>
                                <td className="editCell">{products.id}</td>
                                <td className="editCell">{products.name}</td>
                                <td className="editCell">{products.category}</td>
                                <td className="editCell">{products.cost_price}</td>
                                <td className="editCell">{products.selling_price}</td>
                                <td className="editCell">{products.quantity}</td>
                            </tr>


                            ))}

                        </tbody>
                    </table>
                    <div className="edit-btn">
                            <button onClick={() => { setProductsAvailable(false); setNameChange(true); } }>Change Name</button>
                            <button onClick={() => { setProductsAvailable(false); setNameChange(false); setCategoryChange(true); } }>Change Category</button>
                            <button onClick={() => { setProductsAvailable(false); setNameChange(false); setCategoryChange(false); setPriceChange(true); } }>Change Price</button>
                            <button onClick={() => { setProductsAvailable(false); setNameChange(false); setCategoryChange(false); setPriceChange(false); setCostChange(true); } }>Change Cost</button>
                        </div>
                        </>
        
    ) : nameChange ? (
        <>
                    <div className="container">
                    <form>
                        <label htmlFor="id">ID:</label>
                        <input type="text" id="id" onChange={(e) => setId(e.target.value)} required />
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <button className="edit-btn" type="submit" onClick = {handleNameChange}>Change Name</button>
                    </form>
                </div>
                    </> 
                ) : categoryChange ? (
                    <>
                    <div className="container">
                    <form>
                        <label htmlFor="id">ID:</label>
                        <input type="text" id="id" onChange={(e) => setId(e.target.value)} required />
                        <label htmlFor="category">Category:</label>
                        <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} required>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Food">Food</option>
                        </select>
                        <button className="edit-btn" onClick={handleCategoryChange}>Change Category</button>
                    </form>
                    </div>
                    </>
                ) : priceChange ? (
                    <>
                    <div className="container">
                    <form>
                        <label htmlFor="id">ID:</label>
                        <input type="text" id="id" onChange={(e) => setId(e.target.value)} required />
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
                        <button className="edit-btn"onClick={handlePriceChange} >Change Price</button>
                    </form>
                    </div>
                    </>
                ): costChange ? ( 
                    <>
                    <div className="container">
                    <form>
                        <label htmlFor="id">ID:</label>
                        <input type="number" id="id" onChange={(e) => setId(e.target.value)} required />
                        <label htmlFor="cost">Cost:</label>
                        <input type="number" id="cost" value={cost} onChange={(e) => setCost(parseFloat(e.target.value))} required />
                        <button className="edit-btn" onClick={handleCostChange}>Change Cost</button>
                    </form>
                    </div>
                    </>
                ): (
                    <>
                    <p>
                        <td id="noProduct">No products available {error} </td>
                    </p>
                    </>
                )}
                </form>
                <a href="index.html">Home</a>
            </div>
    )
}

reactDOM.render(<EditItem />, document.getElementById('app'));