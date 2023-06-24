const { Schema, model, default: mongoose } = require("mongoose");

const ProductSchema = new Schema({
    productName : {type: String, required: true},
    description : String,
    price : {type: Number, required: true},
    images: [{type : String}], 
    category : {type : mongoose.Types.ObjectId, ref:'Category'}
});

export const Product = mongoose.models.Product ||  model('Product', ProductSchema);

