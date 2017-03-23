var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var customerSchema = new mongoose.Schema({
  name : {
  	type: String,
  	required: [true, 'First name is required'],
  	minlength: [2, 'First name must be at least 2 characters'],
  	trim: true,
  },
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
  created_at: { type : Date, default: Date.now }
 });
mongoose.model('Customer', customerSchema);

var productSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Product name is required'],
      minlength: [2, 'Product name must be at least 2 characters'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [3, 'Product description must be at least 3 characters'],
      unique: false
    },
    quantity: {
      type: Number,
      required: [true, 'Initial quantity is required'],
    },
    photo: { data: Buffer, contentType: String },
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    created_at: { type : Date, default: Date.now },
    // img: { data: Buffer, contentType: String }
});

productSchema.methods.sufficientQuantity = function(quantity) {
  if(quantity > this.quantity) {
    return false
  } else {
    this.quantity -= quantity
    return true
  }
}
mongoose.model('Product', productSchema);

var orderSchema = new mongoose.Schema({
  quantity: {
      type: Number,
      required: [true, 'Initial quantity is required'],
    },
  _customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
  _product: {type: Schema.Types.ObjectId, ref: 'Product'},
  created_at: { type : Date, default: Date.now }
 });
mongoose.model('Order', orderSchema);
