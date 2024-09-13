// models/FishCategory.js

import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true }
});

const FishCategorySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    icon: { type: String }, // You might store icon URLs or names
    title: { type: String, required: true },
    subCategories: [SubCategorySchema]
});

const Category = mongoose.model('Category', FishCategorySchema);

export default Category;
