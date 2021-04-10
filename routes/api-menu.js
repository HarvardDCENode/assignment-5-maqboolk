var express = require('express');
var router = express.Router();
var app = express();

const MenuController = require('../controllers/menuController');

/**
 * Following code is copied from lecture material.
 * Preflight support
 */
router.use((req, res, next) => {
    res.set({
        // Allow AJAX access from any domain
        'Access-Control-Allow-Origin': '*',
        // Allow methods and headers for 'preflight'
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    });
    // if this is a preflight, we're done and can send the response with our headers
    if (req.method == 'OPTIONS') {
        return res.status(200).end();
    }
    next();
})


// CRUD API's for menu * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/**  C = Creating a menu item in the DB
* using res.json insead of  res.send(JSON.stringify()), 
* res.json sets the res code to 200 and content type to json
*/
router.post('/', (req, res, next) => {

    MenuController.MenuService.createAnItem(req.body)
        .then((CreatedItem) => {
            res.status(201);
            res.json(CreatedItem);
        })
        .catch((err) => {
            console.log(err);
        });
});


/**
 * R = Read - Retrieving all menu items from the DB.
 * using res.json insead of  res.send(JSON.stringify()), 
 * res.json sets the res code to 200 and content type to json
 * */
router.get('/', async (req, res, next) => {
    console.log('Read API-------------');
    MenuController.MenuService.getAllItems()
        .then((menu) => {
            res.json(menu);
        });
});

// U = Update

// D = Delete

module.exports = router;