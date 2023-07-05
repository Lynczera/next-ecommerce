import { mongooseConnect } from "@/lib/mongoose";
const { default: mongoose } = require("mongoose");
import { Category } from "@/models/Category";

export default async function handle(req, res) {
	const { method } = req;
	await mongooseConnect();

	if (method === "GET") {
		res.json(await Category.find().populate("parent"));
	}

	if (method === "POST") {
		const { name, parentCategory } = req.body;
		const categoryDoc = await Category.create({
			name,
			parent: parentCategory || undefined,
			properties,
		});
		res.json(categoryDoc);
	}

	if (method === "PUT") {
		const { name, parentCategory, _id } = req.body;

		if (!!parentCategory) {
			console.log("category exist : " + parentCategory);
			const categoryDoc = await Category.updateOne(
				{ _id },
				{ name, parent: parentCategory }
			);
			res.json(categoryDoc);
		} else {
			console.log("category doest not exist : " + parentCategory);

			const categoryDoc = await Category.updateOne(
				{ _id },
				// { name },
				{ $unset: { parent: 1 }, $set: { name } }
			);
			res.json(categoryDoc);
		}
	}

	if (method === "DELETE") {
		const { _id } = req.query;
		await Category.deleteOne({ _id });
		res.json("deleted");
	}
}
