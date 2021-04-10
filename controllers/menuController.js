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

    // get one menu item form DB
    static getAnItem(itemId) {
        return Menu.findById({ _id: itemId })
            .then((item) => {
                console.log(item);
                return item;
            });
    }

    // Update an item

    // Delete an item
    static deleteAnItem(itemId) {
        return Menu.findByIdAndDelete({ _id: itemId })
            .then((item) => {
                console.log(item);
                return item;
            })
    }

} // end of MenuService class

module.exports.MenuService = MenuService;