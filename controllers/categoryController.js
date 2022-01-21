const Category = require('../models/category');
const Item = require('../models/item')

// Category index page with list of categories
exports.categoryIndex = (req, res) => {
  res.render('categoryIndex');
};

// Display detail page for a specific category.
exports.categoryDetail = (req, res, next) => {
  Category.findById(req.params.id).exec( (err, categoryInstance) => {
    if (err) { return next(err); }

    if (categoryInstance === null) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }

    Item.find({ category: req.params.id }).exec((err, items) => {
      if (err) { return next(err); }

      // No error handling needed for items being empty as empty array is returned.

      res.render('categoryDetail', { 
        title: categoryInstance.name, 
        description: categoryInstance.description,
        items: items
      });
    })
  });
};
