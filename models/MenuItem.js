// models/MenuItem.js
import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;