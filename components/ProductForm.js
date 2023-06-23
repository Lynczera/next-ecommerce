import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

//product form works for both editing and creating a new product

export default function ProductForm({
	_id,
	productName: currTittle,
	description: currDescription,
	price: currPrice,
	images: existingImages,
}) {
	const [productName, setProductName] = useState(currTittle || "");
	const [description, setDescription] = useState(currDescription || "");
	const [price, setPrice] = useState(currPrice || 0);
	const [goToProducts, setGoToProducts] = useState(false);
	const router = useRouter();
	const [images, setImages] = useState(existingImages || []);
	const [isUploading, setIsUploading] = useState(false);

	async function saveProduct(e) {
		e.preventDefault();
		const data = { productName, description, price, images };
		if (_id) {
			//update
			await axios.put("/api/products", { ...data, _id });
		} else {
			//create product
			await axios.post("/api/products", data);
		}
		setGoToProducts(true);
	}

	if (goToProducts) {
		router.push("/products");
	}

	async function uploadImages(e) {
		const files = e.target?.files;
		if (files?.length > 0) {
			setIsUploading(true);
			const data = new FormData();

			for (const file of files) {
				data.append("file", file);
			}

			const res = await axios.post("/api/upload", data, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setImages((oldImages) => {
				return [...oldImages, ...res.data.links];
			});
			setIsUploading(false);
		}
	}

	function updateImagesOrder(images) {
		setImages(images);
	}

	function cancelForm() {
		router.push("/products");
	}

	return (
		<form onSubmit={saveProduct}>
			<label>Product name</label>
			<input
				type="text"
				placeholder="product name"
				value={productName}
				onChange={(e) => {
					setProductName(e.target.value);
				}}
			/>

			<label>Photos</label>
			<div className="mb-2 flex flex-wrap gap-2">
				<ReactSortable
					list={images}
					setList={updateImagesOrder}
					className="flex flex-wrap gap-1">
					{!!images?.length &&
						images.map((link) => (
							<div
								key={link}
								className=" h-24">
								<img
									src={link}
									alt=""
									className="rounded-lg"
								/>
							</div>
						))}
				</ReactSortable>
				{isUploading && (
					<div className="h-24 flex items-center p-1 bg-gray-200  rounded-lg">
						<Spinner />
					</div>
				)}

				<label
					className=" w-24 h-24 flex items-center 
        justify-center text-sm gap-1 text-gray-500 rounded-lg
        bg-gray-200 cursor-pointer
        ">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
						/>
					</svg>
					<div>Upload</div>
					<input
						type="file"
						onChange={uploadImages}
						className="hidden"
					/>
				</label>
			</div>

			<label>Description</label>
			<textarea
				placeholder="description"
				value={description}
				onChange={(e) => {
					setDescription(e.target.value);
				}}></textarea>
			<label>Price</label>
			<input
				type="number"
				placeholder="price"
				value={price}
				onChange={(e) => {
					setPrice(e.target.value);
				}}
			/>

			<div className="flex gap-1">
				<button
					type="submit"
					className="btn-primary">
					Save
				</button>

				<button
        type="button"
					className="btn-primary"
					onClick={cancelForm}>
					Cancel
				</button>
			</div>
		</form>
	);
}
