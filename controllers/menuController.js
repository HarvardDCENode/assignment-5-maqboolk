/**
 * This controller is for Data Service Class so that 
 * we can use same code for our API and HTML page
 */

const Menu = require('../models/menuModel');

class MenuService {

    /**
     * C = Create
     * Following function Creates a menu item in DB. 
     * It receives an req.body as an arguemnt.
     */
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

    /**
     *  R = Read
     *  Following fucntion get all menu items form DB
     */

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

    /**
     * get one menu item form DB
     * Following function receives an one args and finds the doc with the id 
     * and return it.
     */
    static getAnItem(itemId) {
        return Menu.findById({ _id: itemId })
            .then((item) => {
                console.log(item);
                return item;
            });
    }

    /**
     * U = Update
     * Update an item
     * Following fuction receives two arguments 1. itemId and 2. reqBody.
     * newbody object is created using reqBody and additional field 'updatedAt'
     * for some reason after adding 'findOneAndUpdate' Schema.pre stopped adding updateAt field.
     * Also, added { new: true } to 'findOneAndUpdate' so the api receives updated data instead of old.
     */
    static updateAnItem(itemId, reqBody) {
        let newBody = {
            name: reqBody.name,
            price: reqBody.price,
            ingredients: reqBody.ingredients,
            available: reqBody.available,
            updatedAt: new Date()
        };
        return Menu.findOneAndUpdate({ '_id': itemId }, newBody, { new: true })
            .then((item) => {
                return item;
            })
            .catch((err) => {
                if (err) console.log(err);
            });
    }

    /** 
     * D = Delete
     * Delete an item
     * Following function receives one arguemnt and it calls 'findByIdAndDelete' method 
     * to find a record and delete it.
     * */
    static deleteAnItem(itemId) {
        return Menu.findByIdAndDelete({ _id: itemId })
            .then((item) => {
                console.log(item);
                return item;
            })
    }

} // end of MenuService class

module.exports.MenuService = MenuService;