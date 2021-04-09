var express = require('express');
var router = express.Router();
var app = express();

const MenuController = require('../controllers/menuController');
//const MenuService = menuController.MenuService;


// CRUD API's for menu
// C = Creating a menu item.
router.post('/', (req, res, next) => {
    var menuitem = new Menu(req.body);
    menuitem.save()
        .then((item) => {
            console.log('Menu Item created successfully...........');
            console.log(item);
            res.status(201);
            res.json(item);
        })
        .catch((err) => {
            console.log(err);
        });

});


/**
 * R = Read - Retrieving all menu items from the DB.
 * using res.json insead of  res.send(JSON.stringify()), 
 *res.json sets the res code to 200 and content type to json
 * */
router.get('/', async (req, res, next) => {
    console.log('Read API-------------');
    MenuController.MenuService.getAllItems({})
        .then((menu) => {
            res.json(menu);
        });

    // Menu.find({})
    //     .then((menu) => {
    //         res.json(menu);
    //     })
    //     .catch((err) => {
    //         if (err) {
    //             console.log(err);
    //             res.end('ERROR!');
    //         }
    //     });

});

// U = Update

// D = Delete

module.exports = router;