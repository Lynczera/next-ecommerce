import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
  productName: currTittle,
  description: currDescription,
  price: currPrice,
}) {
  const [productName, setProductName] = useState(currTittle || '');
  const [description, setDescription] = useState(currDescription || '');
  const [price, setPrice] = useState(currPrice || 0);
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();
  async function createProduct(e) {
    e.preventDefault();
    const data = { productName, description, price };
    await axios.post("/api/newProducts", data);
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }
  return (
    <form onSubmit={createProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={productName}
        onChange={(e) => {
          setProductName(e.target.value);
        }}
      />
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
      <label>Price</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
