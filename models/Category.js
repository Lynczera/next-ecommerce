const { Schema,model, default: mongoose } = require("mongoose");

const CategorySchema = new Schema({
name : {type : String, required : true},
});

export const Category = mongoose.models.Category || model('Category', CategorySchema);