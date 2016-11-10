import {Product} from "../../models";


function* getOne(next) {
	console.log("oluwan ooooo", this.params.productId)
	let product = yield Product.find({productId: this.params.productId}).lean().exec();
	console.log(product);
  this.body = product;
}

function* getAll(next) {
  let products = yield Product.find({}).lean().exec();
  this.body = products;
}

export default { getOne, getAll };
