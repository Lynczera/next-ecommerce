import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function NewProduct() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    async function createProduct(e) {
        e.preventDefault();
        const data = { productName, description, price };
        await axios.post('/api/newProducts', data);
   
    };
    return (

        <Layout>

            <form onSubmit={createProduct}>
                <h1>New Product</h1>
                <label>Product name</label>
                <input
                    type="text" placeholder="product name" value={productName}
                    onChange={(e) => { setProductName(e.target.value) }} />
                <label>Description</label>
                <textarea
                    placeholder="description" value={description}
                    onChange={(e) => { setDescription(e.target.value) }}></textarea>
                <label>Price</label>
                <input
                    type="number" placeholder="price" value={price}
                    onChange={(e) => { setPrice(e.target.value) }} />

                <button type="submit" className="btn-primary">Save</button>
            </form>

        </Layout>
    );
} 