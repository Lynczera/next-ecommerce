import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
function Categories({ swal }) {
	const [editedCategory, setEditedCategory] = useState(null);
	const [name, setName] = useState("");
	const [categories, setCategories] = useState([]);
	const [parentCategory, setParentCategory] = useState("");
	const [properties, setProperties] = useState([]);

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
		const data = {
			name,
			parentCategory,
			properties: properties.map((prop) => ({
				name: prop.name,
				values: prop.values.split(","),
			})),
		};

		if (editedCategory) {
			await axios.put("/api/categories", {
				...data,
				_id: editedCategory._id,
			});
			setEditedCategory(null);
		} else {
			await axios.post("/api/categories", { ...data });
		}
		setName("");
		setParentCategory("");
		setProperties([]);
		fetchCategories();
	}

	function editCategory(category) {
		setEditedCategory(category);
		setName(category.name);
		setParentCategory(category.parent?._id);
		setProperties(category.properties);
	}

	function deleteCategory(category) {
		swal
			.fire({
				title: "Delete?",
				text: `Delete ${category.name}?`,
				showCancelButton: true,
				confirmButtonText: "Confirm",
			})
			.then(async (result) => {
				if (result.isConfirmed) {
					await axios.delete("/api/categories?_id=" + category._id);
					fetchCategories();
				} else {
				}
			});
	}

	//We create an empty object so we can change later.
	function addProperty() {
		setProperties((prev) => {
			return [...prev, { name: "", values: "" }];
		});
	}

	function handlePropNameChanged(index, prop, newName) {
		setProperties((prev) => {
			const prevProps = [...prev];
			properties[index].name = newName;
			return prevProps;
		});
	}

	function handlePropValuesChanged(index, prop, newValues) {
		setProperties((prev) => {
			const prevProps = [...prev];
			properties[index].values = newValues;
			return prevProps;
		});
	}

	function removeProp(index) {
		setProperties((prev) => {
			return [...prev].filter((p, pIndex) => {
				return pIndex !== index;
			});
		});
	}

	return (
		<Layout>
			<h1>Categories</h1>
			<label>
				{editedCategory
					? `Editing category ${editedCategory.name}`
					: "Create new category"}
			</label>
			<form onSubmit={saveCategory}>
				<div className="flex gap-1">
					<input
						type="text"
						placeholder={"Category name"}
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<select
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
				</div>
				<div className="mb-2">
					<label className="block">Properties</label>
					<button
						type="button"
						className="btn-default text-sm mb-2"
						onClick={addProperty}>
						Add new property
					</button>
					{properties.length > 0 &&
						properties.map((prop, index) => (
							<div className="flex gap-1 mb-2">
								<input
									type="text"
									className="mb-0"
									value={prop.name}
									onChange={(ev) =>
										handlePropNameChanged(index, prop, ev.target.value)
									}
									placeholder="property name"
								/>
								<input
									onChange={(ev) =>
										handlePropValuesChanged(index, prop, ev.target.value)
									}
									className="mb-0"
									type="text"
									value={prop.value}
									placeholder="values, comma separated"
								/>
								<button
									className="btn-default"
									type="button"
									onClick={() => {
										removeProp(index);
									}}>
									Remove
								</button>
							</div>
						))}
				</div>
				<div className="flex gap-1">
					{editedCategory && (
						<button
							className="btn-default"
							type="button"
							onClick={() => {
								setEditedCategory(null);
								setName("");
								setParentCategory("");
							}}>
							Cancel
						</button>
					)}
					<button
						type="submit"
						className="btn-primary py-1">
						Save
					</button>
				</div>
			</form>

			{!editedCategory && (
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
											<button
												className="btn-primary"
												onClick={() => {
													deleteCategory(category);
												}}>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			)}
		</Layout>
	);
}

export default withSwal(({ swal }) => {
	return <Categories swal={swal} />;
});
