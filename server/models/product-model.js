import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Product = new Schema({
  productName: {type: String, index: true},
  productImage: {type: String, index: true},
  productId: {type: String, index: true},
  productDescription: {type: String, index: true},
  price: {type: Number, index: true},
  rating: Number,
  sold: Number,
  inStock: Boolean,
  comments: [{
  	user: {type: Schema.ObjectId, ref: "User", index: true},
  	comment: {type: String, index: true} 
  }]
});

  // productOwner: {type: Schema.ObjectId, ref: "User", index: true},

export default mongoose.model("Product", Product);
