const Item = require('../models/item');

// Item index page GET
exports.itemIndex = (req, res) => {
  res.send('NOT IMPLEMENTED: Item index')
};

// Display list of all items.
exports.itemList = (req, res) => {
  res.send('NOT IMPLEMENTED: item list');
};

// Display detail page for a specific item.
exports.itemDetail = (req, res) => {
  res.send('NOT IMPLEMENTED: item detail: ' + req.params.id);
};

// Display item create form on GET.
exports.itemCreateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: item create GET');
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