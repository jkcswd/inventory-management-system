const { body, validationResult } = require('express-validator');

const Category = require('../models/category');
const Item = require('../models/item');

// Item index page GET
exports.itemIndex = (req, res) => {
  res.render('itemIndex')
};

// Display list of all items.
exports.itemList = (req, res, next) => {
  Item.find().sort({ name: 'asc' }).exec((err, items) =>{
    if (err) { return next(err); }

    if (items === null) {
      const err = new Error('No rocks found');
      err.status = 404;
      return next(err);
    }

    res.render('itemList', { title: 'Item List', items: items })
  })
};

// Display detail page for a specific item.
exports.itemDetail = (req, res, next) => {
  Item.findById(req.params.id).populate('category').exec((err, itemInstance) => {
    if (err) { return next(err); }

    if (itemInstance === null) {
      const err = new Error('Rock not found');
      err.status = 404;
      return next(err);
    }

    res.render('itemDetail', { 
      title: itemInstance.name, 
      description: itemInstance.description, 
      category: itemInstance.category.name, 
      price: itemInstance.price,
      numberInStock: itemInstance.numberInStock
    });
  });
};

// Display item create form on GET.
exports.itemCreateGet = (req, res) => {
  Category.find().exec((err, categories)=> {
    if (err) { return next(err); }

    if (categories === null) {
      const err = new Error('categories not found');
      err.status = 404;
      return next(err);
    }

    res.render('itemForm', { categories: categories, errors: null });
  }); 
};

// Handle item create on POST.
exports.itemCreatePost = [
  body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description must not be empty').trim().isLength({ min: 1 }).escape(),
  body('category').escape(),
  body('price', 'Price must have a numeric value greater than 0').trim().isNumeric({ min: 0 }).escape(),
  body('quantity', 'Number in stock must be a number greater than 0').trim().isNumeric({ min: 0 }).escape(),
  
  (req, res, next) => {
    Category.findOne({name:req.body.category}).exec((err, categoryInstance) => {
      if (err) { return next(err); }
      
      const errors = validationResult(req);
      const item = new Item(
        {
          name: req.body.name,
          description: req.body.description,
          category: categoryInstance.id,
          price: req.body.price,
          numberInStock: req.body.quantity
        }
      );

      if (!errors.isEmpty()) {
        res.render('itemForm',
          {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            errors: errors.array()
          }
        );
      } else {
        item.save((err) => {
          if (err) { return next(err); }
  
          res.redirect(item.url);
        })
      }
    });
  }
]

// Display item delete form on GET.
exports.itemDeleteGet = (req, res, next) => {
  Item.findById(req.params.id).exec((err, item) =>{
    if (err) { return next(err); }

    if (item === null) {
      const err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }

    res.render('itemDelete', { name: item.name, id: item.id });
  });
};

// Handle item delete on POST.
exports.itemDeletePost = [
  body('item').escape(),

  (req, res, next) => {
    Item.findByIdAndRemove(req.body.item, (err) => {
      if (err) { return next(err); }

      res.redirect('/inventory/item');
    });
  }
]
// Display item update form on GET.
exports.itemUpdateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: item update GET');
};

// Handle item update on POST.
exports.itemUpdatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: item update POST');
};