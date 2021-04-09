/**
 * This controller is for Data Service Class so that 
 * we can use same code for our API and HTML page
 */

const Menu = require('../models/menuModel');

class MenuService {

    // get all menu items
    static getAllItems() {
        return Menu.find({})
            .then((menu) => {
                // console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #');
                // console.log(menu);
                return menu;
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    res.end('ERROR!');
                }
            });
    }


} // end of MenuService class

module.exports.MenuService = MenuService;