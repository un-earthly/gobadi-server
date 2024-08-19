// services/menuService.js
import MenuItem from '../models/MenuItem.js';
import Category from '../models/Category.js';

export const getMenuItems = async () => {
    return await MenuItem.find().select('-categories');
};

export const getMenuItemCategories = async (menuItemId) => {
    const menuItem = await MenuItem.findById(menuItemId).populate('categories');
    return menuItem ? menuItem.categories : null;
};