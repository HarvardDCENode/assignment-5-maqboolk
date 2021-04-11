var express = require('express');
var router = express.Router();
var app = express();

const MenuController = require('../controllers/menuController');

/* GET menu page. 
Route to list all menu items from database*/
router.get('/', (req, res, next) => {
    MenuController.MenuService.getAllItems()
        .then((menu) => {
            //console.log(menu);
            res.render('menu', {
                menu: menu,
                title: 'Menu Page'
            })
        })
        .catch((err) => {
            if (err) {
                console.log(err);
                res.end('ERROR!');
            }
        });
});

// Add menu item to Database
// Route to create an item
router.post('/', (req, res, next) => {
    MenuController.MenuService.createAnItem(req.body)
        .then(() => {
            res.redirect('/menu');
        })
        .catch((err) => {
            console.log(err);
        });
});

// Remove an item from database using its id
router.get('/delete/:id', (req, res, next) => {
    MenuController.MenuService.deleteAnItem(req.params.id)
        .then(() => {
            console.log('Menu item with id "' + req.params.id + '" deleted successfully.');
            res.redirect('/menu');
        })
        .catch((err) => {
            console.log(err);
        });
});

// Edit an existing item and save to database
// GET for edit
router.get('/edititem/:id', (req, res, next) => {
    MenuController.MenuService.getAnItem(req.params.id)
        .then((item) => {
            console.log('Menu item with id "' + req.params.id + '" found.');
            res.render('editItem', {
                item: item,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST for edit
router.post('/edititem/:id', (req, res, next) => {
    console.log(req.body);
    MenuController.MenuService.updateAnItem(req.params.id, req.body)
        .then((item) => {
            res.redirect('/menu');
        })
        .catch((err) => {
            if (err) console.log(err);
        })
});

// Error 
router.use((err, req, res, next) => {
    console.log('------------- - -- - - - - - - - - - ---' + err.stack);
    next(err);

});

module.exports = router;