const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

// Inventory home page route 
router.get('/', (req, res, next) => {
  res.render('index', { title: 'RoCorp Inventory Management'});
});

// Category routes 

// Category home page 
router.get('/category', categoryController.categoryIndex);

// GET request for one category.
router.get('/category/:id', categoryController.categoryDetail);


// Item routes 

// Item home page
router.get('/item', itemController.itemIndex);

// GET request for list of all item items.
router.get('/item/list', itemController.itemList);

// GET request for creating an item.
router.get('/item/create', itemController.itemCreateGet);

// POST request for creating item.
router.post('/item/create', itemController.itemCreatePost);

// GET request to delete item.
router.get('/item/:id/delete', itemController.itemDeleteGet);

// POST request to delete item.
router.post('/item/:id/delete', itemController.itemDeletePost);

// GET request to update item.
router.get('/item/:id/update', itemController.itemUpdateGet);

// POST request to update item.
router.post('/item/:id/update', itemController.itemUpdatePost);

// GET request for one item.
router.get('/item/:id', itemController.itemDetail);



module.exports = router;