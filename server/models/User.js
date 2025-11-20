const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
module.exports=mongoose.model("User",userSchema);

//"User" is the model name you give to Mongoose.
//1. Create a Model class from your schema
//eg User.find()
//User.create()
//User.findById()
