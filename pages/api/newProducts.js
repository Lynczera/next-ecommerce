// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

 export default async function handler(req, res) {
    const {method}  = req;
    await mongooseConnect();
    if(method === "POST"){
        const {productName, description, price} = req.body;
        const productDoc = await Product.create({
            productName, description, price,
        })  
        res.json(productDoc);
    }
  }
  