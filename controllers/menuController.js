/**
 * This controller is for Data Service Class so that 
 * we can use same code for our API and HTML page
 */

const Menu = require('../models/menuModel');

class MenuService {

    // Create a menu item in DB
    static createAnItem(reqBody) {
        var menuitem = new Menu(reqBody);
        return menuitem.save()
            .then((item) => {
                console.log('Menu Item created successfully...........');
                console.log(item);
                return item;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // get all menu items form DB
    static getAllItems() {
        return Menu.find({})
            .then((menu) => {
                return menu;
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
            });
    }

    // Update an item

    // Delete an item

    static deleteAnItem(itemId) {
        return Menu.findByIdAndDelete({ _id: itemId })
            .then((obj) => {
                console.log('-- Deleted --');
                console.log(obj);
                return obj;
            })
    }

} // end of MenuService class

module.exports.MenuService = MenuService;