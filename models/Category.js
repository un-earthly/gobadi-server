import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    title: { type: String, required: true }
});

const CategorySchema = new mongoose.Schema({
    icon: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    subCategories: [SubCategorySchema]
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
