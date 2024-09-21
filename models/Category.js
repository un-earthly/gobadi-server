import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true }
});

const CategorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true, unique: true
    },
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
