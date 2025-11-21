const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());

//connect to mongodb

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

//routes
app.get("/",(req,res)=>{
    res.send("hello from server");
});

app.listen(4000,()=>console.log("server started at port 4000"));


const User=require('./models/User');

//SIGNUP 
app.post("/signup",async(req,res)=>{
    const {email,password}=req.body;

    try{
        const exists=await User.findOne({email});
        if(exists){
            return res.json({error:"user already exhists"});
        }
        const user=await User.create({email,password});
        res.json({message:"Signup successful",user});
    } catch(err){
        res.json({error :err.message});
    }
});

//LOGIN

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});  //return true or false
        if(!user){
            return res.json({error:"user not found"});
        }
        if(user.password!==password){
            return res.json({error:"invalid password"});
        }
        res.json({message:"login successful",user})
    } catch(err){
        res.json({error:err.message});
    }
});

app.post("/logout",async(req,res)=>{
    //logout logic here

   try {
    res.json({message: "logout successful"});
   }catch(err){
    res.json({error: err.message});
   }
   
})