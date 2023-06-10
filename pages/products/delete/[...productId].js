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
      axios.get("/api/newProducts?id=" + productId).then((response) => {
        setProductInfo(response.data);
      });
    }
  }, [productId]);
  function goBack() {
    router.push("/products");
  }
  return (
    <Layout>
      <h1>Delete product &nbsp;"{productInfo?.productName}"?</h1>
      <div className="flex gap-2">
        <button className="btn-red">CONFIRM</button>

        <button onClick={goBack} className="btn-default">
          CANCEL
        </button>
      </div>
    </Layout>
  );
}
