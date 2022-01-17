const Category = require('../models/category');

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

    res.render('categoryDetail', { title: categoryInstance.name, description:  categoryInstance.description});
  });
};
