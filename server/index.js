const { Server }=require("socket.io");

 const io=new Server(8000,{
    cors:{
        origin:"*",
        credentials:true
    }
 });

 const emailToSocketMap = new Map();
 const socketidToEmailMap=new Map();
 
 io.on("connection",(socket)=>{
    console.log("user connected:",socket.id);  
    socket.on('room:join',data=>{
   
       const{email,room}=data
       emailToSocketMap.set(email,socket.id);
       socketidToEmailMap.set(socket.id,email);
              socket.join(room);
       io.to(room).emit("user:joined",{email,id:socket.id});

       io.to(socket.id).emit("room:joined",data);
    });

    socket.on('user:call',({to,offer})=>{
      io.to(to).emit('incoming:call',{from:socket.id , offer})
    })
     
    socket.on('call:accepted',({to,ans})=>{
      
       io.to(to).emit("call:accepted",{from:socket.id , ans})
    })

    socket.on('peer:nego:needed',({to,offer})=>{
      io.to(to).emit("peer:nego:needed",{from:socket.id,offer});
    }) 

    socket.on('peer:nego:done',({to,ans})=>{
      io.to(to).emit("peer:nego:final",{from:socket.id,ans});
    }) 
       
 });

 

















// const express=require('express');
// const mongoose=require('mongoose');
// const cors=require('cors');
// require('dotenv').config();

// const app=express();
// app.use(cors());
// app.use(express.json());

// //connect to mongodb

// mongoose.connect(process.env.MONGO_URL)
// .then(()=>console.log("MongoDB connected"))
// .catch(err=>console.log(err));

// //routes
// app.get("/",(req,res)=>{
//     res.send("hello from server");
// });

// app.listen(4000,()=>console.log("server started at port 4000"));


// const User=require('./models/User');

// //SIGNUP 
// app.post("/signup",async(req,res)=>{
//     const {email,password}=req.body;

//     try{
//         const exists=await User.findOne({email});
//         if(exists){
//             return res.json({error:"user already exhists"});
//         }
//         const user=await User.create({email,password});
//         res.json({message:"Signup successful",user});
//     } catch(err){
//         res.json({error :err.message});
//     }
// });

// //LOGIN

// app.post("/login",async(req,res)=>{
//     const {email,password}=req.body;
//     try{
//         const user=await User.findOne({email});  //return true or false
//         if(!user){
//             return res.json({error:"user not found"});
//         }
//         if(user.password!==password){
//             return res.json({error:"invalid password"});
//         }
//         res.json({message:"login successful",user})
//     } catch(err){
//         res.json({error:err.message});
//     }
// });

// app.post("/logout",async(req,res)=>{
//     //logout logic here

//    try {
//     res.json({message: "logout successful"});
//    }catch(err){
//     res.json({error: err.message});
//    }
   
// })