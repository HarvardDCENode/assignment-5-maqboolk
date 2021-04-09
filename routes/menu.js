var express = require('express');
var router = express.Router();
var app = express();

const Menu = require('../models/menuModel');

/* GET menu page. 
Route to list all menu items from database*/
router.get('/', (req, res, next) => {
    Menu.find({})
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
    var menuitem = new Menu(req.body);
    menuitem.save()
        .then(() => {
            res.redirect('/menu');
        })
        .catch((err) => {
            console.log(err);
        });
});

// Remove an item from database using its id
router.get('/delete/:id', (req, res, next) => {
    Menu.findByIdAndDelete(req.params.id)
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
    Menu.findOne({ '_id': req.params.id })
        .then((item) => {
            res.render('editItem', {
                item: item,
            });
            //res.redirect('/menu');
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST for edit
router.post('/edititem/:id', (req, res, next) => {
    var modifiedItem = {
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients,
        available: req.body.available
    };

    Menu.findOne({ '_id': req.params.id })
        .then((item) => {
            item.set(req.body);
            item.save().then(() => {
                res.redirect('/menu');
            });
        })
        .catch((err) => {
            if (err) console.log(err);
        });
});

// Error 
router.use((err, req, res, next) => {
    console.log('------------- - -- - - - - - - - - - ---' + err.stack);
    next(err);

});

module.exports = router;