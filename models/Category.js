const { Schema,model, default: mongoose } = require("mongoose");

const CategorySchema = new Schema({
name : {type : String, required : true},
parent : {type : mongoose.Types.ObjectId, ref:'Category'},

});

export const Category = mongoose.models.Category || model('Category', CategorySchema);