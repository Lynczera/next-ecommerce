import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const { productId } = router.query;
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    if (!productId) {
      return;
    } else {
      axios.get("/api/products?id=" + productId).then((response) => {
        setProductInfo(response.data);
      });
    }
  }, [productId]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct(){
    await axios.delete('/api/products?id='+productId);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">Delete product &nbsp;"{productInfo?.productName}"?</h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>CONFIRM</button>

        <button onClick={goBack} className="btn-default">
          CANCEL
        </button>
      </div>
    </Layout>
  );
}
