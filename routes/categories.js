import express from 'express';
import Category from '../models/Category.js';  // Adjust the path as needed
import { isAdmin, protect } from '../middleware/authMiddleware.js';  // You'll need to implement these

const router = express.Router();

// @desc    Get all categories
// @route   GET /api/admin/categories
// @access  Private/Admin
router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

// @desc    Get category by ID
// @route   GET /api/admin/categories/:id
// @access  Private/Admin
router.get('/:id', async (req, res, next) => {
    try {
        const category = await Category.findOne({ id: req.params.id });
        if (category) {
            res.json(category);
        } else {
            res.status(404);
            throw new Error('Category not found');
        }
    } catch (error) {
        next(error);
    }
});

// @desc    Create a new category
// @route   POST /api/admin/categories
// @access  Private/Admin
router.post('/', async (req, res, next) => {
    try {
        const { id, icon, title, subCategories } = req.body;

        const categoryExists = await Category.findOne({ id });

        if (categoryExists) {
            res.status(400);
            throw new Error('Category with this ID already exists');
        }

        const category = await Category.create({
            id, icon, title, subCategories
        });

        if (category) {
            res.status(201).json(category);
        } else {
            res.status(400);
            throw new Error('Invalid category data');
        }
    } catch (error) {
        next(error);
    }
});
// 
// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Private/Admin
router.put('/:id', async (req, res, next) => {
    try {
        const category = await Category.findOne({ id: req.params.id });

        if (category) {
            category.icon = req.body.icon || category.icon;
            category.title = req.body.title || category.title;

            if (req.body.subCategories) {
                category.subCategories = req.body.subCategories;
            }

            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404);
            throw new Error('Category not found');
        }
    } catch (error) {
        next(error);
    }
});
// protect, isAdmin,
// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Private/Admin
router.delete('/:id', async (req, res, next) => {
    try {
        console.log('Deleting category, id: ' + req.params.id);
        const category = await Category.deleteOne({ _id: req.params.id });

        if (category) {
            res.json({ message: 'Category removed' });
        } else {
            res.status(404);
            throw new Error('Category not found');
        }
    } catch (error) {
        next(error);
    }
});

// @desc    Add subcategory to a category
// @route   POST /api/admin/categories/:id/subcategories
// @access  Private/Admin
router.post('/:id/subcategories', async (req, res, next) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });

        if (category) {
            const { id, title } = req.body;
            category.subCategories.push({ id, title });
            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404);
            throw new Error('Category not found');
        }
    } catch (error) {
        next(error);
    }
});

// @desc    Update subcategory
// @route   PUT /api/admin/categories/:categoryId/subcategories/:subcategoryId
// @access  Private/Admin
router.put('/:categoryId/subcategories/:subcategoryId', async (req, res, next) => {
    try {
        const category = await Category.findOne({ _id: req.params.categoryId });

        if (category) {
            const subcategory = category.subCategories.id(req.params.subcategoryId);
            if (subcategory) {
                subcategory.title = req.body.title || subcategory.title;
                const updatedCategory = await category.save();
                res.json(updatedCategory);
            } else {
                res.status(404);
                throw new Error('Subcategory not found');
            }
        } else {
            res.status(404);
            throw new Error('Category not found');
        }
    } catch (error) {
        next(error);
    }
});

// @desc    Delete subcategory
// @route   DELETE /api/admin/categories/:categoryId/subcategories/:subcategoryId
// @access  Private/Admin
router.delete('/:categoryId/subcategories/:subcategoryId', async (req, res, next) => {
    try {
        const category = await Category.findOne({ id: req.params.categoryId });

        if (category) {
            category.subCategories = category.subCategories.filter(
                sub => sub.id !== req.params.subcategoryId
            );
            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404);
            throw new Error('Category not found');
        }
    } catch (error) {
        next(error);
    }
});

export default router;