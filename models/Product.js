const { Schema, model, default: mongoose } = require("mongoose");

const ProductSchema = new Schema({
    productName : {type: String, required: true},
    description : String,
    price : {type: Number, required: true},
});

export const Product = mongoose.models.Product ||  model('Product', ProductSchema);

