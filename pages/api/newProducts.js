// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { productName, description, price } = req.body;
    const productDoc = await Product.create({
      productName,
      description,
      price,
    });

    res.json(productDoc);
  }

  if (method === "PUT") {
    const { productName, description, price, _id } = req.body;
    await Product.updateOne(
      { _id },
      { productName, description, price }
    );

    res.json(true);
  }
}
