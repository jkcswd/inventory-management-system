const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ItemSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    price: {type: Number, required: true},
    numberInStock: {type: Number, required: true}
  }
);

ItemSchema.virtual('url').get(function() { // Not using arrow function as 'this' is not bound lexically
  return '/inventory/item/' + this._id;
});


module.exports = mongoose.model('Item', ItemSchema);