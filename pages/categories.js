import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
	const [editedCategory, setEditedCategory] = useState(null);
	const [name, setName] = useState("");
	const [categories, setCategories] = useState([]);
	const [parentCategory, setParentCategory] = useState("");
	
	const data = { name, parentCategory };
	useEffect(() => {
		fetchCategories();
	}, []);

	function fetchCategories() {
		axios.get("/api/categories").then((result) => {
			setCategories(result.data);
		});
	}

	async function saveCategory(ev) {
		ev.preventDefault();
		if (editedCategory) {
			await axios.put("/api/categories", {
				...data,
				_id: editedCategory._id,
			});
			setEditedCategory(null);
		} else {
			await axios.post("/api/categories", { data });
		}
		setName("");
		fetchCategories();
	}

	function editCategory(category) {
		setEditedCategory(category);
		setName(category.name);
		setParentCategory(category.parent?._id);
	}
	return (
		<Layout>
			<h1>Categories</h1>
			<label>
				{editedCategory
					? `Editing category ${editedCategory.name}` 
					: "Create new category"}
			</label>
			<form
				className="flex gap-1"
				onSubmit={saveCategory}>
				<input
					className="mb-0"
					type="text"
					placeholder={"Category name"}
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<select
					className="mb-0"
					value={parentCategory}
					onChange={(ev) => {
						setParentCategory(ev.target.value);
					}}>
					<option value="">No parent category</option>
					{categories.length > 0 &&
						categories.map((category) => {
							return <option value={category._id}>{category.name}</option>;
						})}
				</select>
				<button
					type="submit"
					className="btn-primary py-1">
					Save
				</button>
			</form>

			<table className="basic mt-4">
				<thead>
					<tr>
						<td>Category name</td>
						<td>Parent category</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{categories.length > 0 &&
						categories.map((category) => {
							return (
								<tr>
									<td>{category.name}</td>
									<td>{category.parent?.name}</td>

									<td>
										<button
											className="btn-primary mr-1"
											onClick={() => {
												editCategory(category);
											}}>
											Edit
										</button>
										<button className="btn-primary">Delete</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</Layout>
	);
}
