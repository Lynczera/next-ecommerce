import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

///Page for editing product
export default function editProductPage() {
	const [productInfo, setProductInfo] = useState(null);
	const router = useRouter();
	const { productId } = router.query;

	useEffect(() => {
		if (productId) {
			axios.get("/api/products?id=" + productId).then((response) => {
				setProductInfo(response.data);
			});
		}
	}, [productId]);
	return (
		<Layout>
			<h1>Edit product</h1>
			{productInfo && <ProductForm {...productInfo} />}
		</Layout>
	);
}
