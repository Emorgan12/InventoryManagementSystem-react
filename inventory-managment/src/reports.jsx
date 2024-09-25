import BASE_URL from "../main";
import react from "react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Reports() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [totalProfit, setTotalProfit] = useState(0);

    useEffect(() => {
        fetch(BASE_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            let total_profit = 0;
            products.forEach((product) => {
                total_profit += product.total_profit;
            });
            console.log("Total Profit: ", total_profit);
            setTotalProfit(total_profit);
        }
    }, [products]);


    return (
        <div className="container">
            {error && <p className="error">{error}</p>}
            <table className="report">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Cost Price</th>
                        <th>Selling Price</th>
                        <th>Profit Per Item</th>
                        <th>Units Sold</th>
                        <th>Total Profit</th>
                    </tr>
                </thead>
                <tbody>
                {products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.cost_price}</td>
                            <td>{product.selling_price}</td>
                            <td>{product.profit_per_unit}</td>
                            <td>{product.sold}</td>
                            <td>{product.total_profit}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No products available</td>
                    </tr>
                )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">Total Profit</td>
                        <td colSpan="3">{totalProfit}</td>
                    </tr>
                </tfoot>
            </table>
            <a href="index.html">Home</a>
        </div>
    );
}

ReactDOM.render(<Reports />, document.getElementById('app'));