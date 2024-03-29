import { mongooseConnect } from "@/lib/mongoose";
const { default: mongoose } = require("mongoose");
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOps, isAdmReq } from "./auth/[...nextauth]";

export default async function handle(req, res) {
	const { method } = req;
	await mongooseConnect();
	await isAdmReq(req,res);

	if (method === "GET") {
		res.json(await Category.find().populate("parent"));
	}

	if (method === "POST") {
		const { name, parentCategory, properties } = req.body;
		const categoryDoc = await Category.create({
			name,
			parent: parentCategory || undefined,
			properties,
		});
		res.json(categoryDoc);
	}

	if (method === "PUT") {
		const { name, parentCategory, properties, _id } = req.body;

		const categoryDoc = await Category.updateOne(
			{ _id },
			{ name, parent: parentCategory || undefined, properties }
		);
		res.json(categoryDoc);
	}

	if (method === "DELETE") {
		const { _id } = req.query;
		await Category.deleteOne({ _id });
		res.json("deleted");
	}
}
