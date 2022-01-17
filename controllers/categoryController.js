const Category = require('../models/category');

// Display list of all categories.
exports.categoryList = (req, res) => {
  res.send('NOT IMPLEMENTED: category list');
};

// Display detail page for a specific category.
exports.categoryDetail = (req, res) => {
  res.send('NOT IMPLEMENTED: category detail: ' + req.params.id);
};
