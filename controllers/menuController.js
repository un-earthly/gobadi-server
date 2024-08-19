// controllers/menuController.js
import * as menuService from '../services/menuService.js';

export const getMenuItems = async (req, res) => {
    try {
        const menuItems = await menuService.getMenuItems();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMenuItemCategories = async (req, res) => {
    try {
        const categories = await menuService.getMenuItemCategories(req.params.id);
        if (!categories) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};