import mongoose from "mongoose";


const Schema = mongoose.Schema;

const User = new Schema({
	firstName: {type: String, index: true},
	lastName: {type: String, index: true}
});
