// routes/fishCategories.js
const express = require('express');
const router = express.Router();
const FishCategory = require('../models/category');

// Create a new fish category
router.post('/', async (req, res) => {
    try {
        const category = new FishCategory(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all fish categories
router.get('/', async (req, res) => {
    try {
        const categories = await FishCategory.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a fish category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await FishCategory.findOne({ id: req.params.id });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a fish category by ID
router.put('/:id', async (req, res) => {
    try {
        const category = await FishCategory.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a fish category by ID
router.delete('/:id', async (req, res) => {
    try {
        const category = await FishCategory.findOneAndDelete({ id: req.params.id });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
