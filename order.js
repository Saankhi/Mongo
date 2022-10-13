const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ProductId: String,
  Quantity: Number  
});

module.exports = mongoose.model('order', orderSchema);