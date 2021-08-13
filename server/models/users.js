const mongoose = require("mongoose") //Importing mongoose
const Schema = mongoose.Schema

const RegisterSchema = new Schema({				//define the schema
	
	username: { type:String, required:true},
	email: { type:String, unique:true},
	password: { type:String, required:true},
	confirmpassword: {type:String, required:true}
	
})



module.exports = mongoose.model("users", RegisterSchema) //exporting the model, so that, it can be imported in controller handle