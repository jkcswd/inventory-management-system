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

    res.render('itemForm', {categories: categories});
  }); 
};

// Handle item create on POST.
exports.itemCreatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: item create POST');
};

// Display item delete form on GET.
exports.itemDeleteGet = (req, res) => {
  res.send('NOT IMPLEMENTED: item delete GET');
};

// Handle item delete on POST.
exports.itemDeletePost = (req, res) => {
  res.send('NOT IMPLEMENTED: item delete POST');
};

// Display item update form on GET.
exports.itemUpdateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: item update GET');
};

// Handle item update on POST.
exports.itemUpdatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: item update POST');
};