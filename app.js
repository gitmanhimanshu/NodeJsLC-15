const express=require('express')
const userModel=require('./models/usermodel.js')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')
app.get("/",(req,res)=>{
  res.render('register')
})
app.get("/login",(req,res)=>{
  res.render('login')
})
app.post("/create",async (req,res)=>{
  console.log("hii")
  const {name,email,password,age}=req.body
  const token=jwt.sign("email","sjddc  dhd")
  const hash=await bcrypt.hash(password, 10)
    const user= await userModel.create({
      name,
      age,
      password:hash,
      email
    })
    res.cookie("token",token)
    console.log(token)
   res.send(user)
  
})
app.post('/login',async (req,res)=>{
 const {email,password}=req.body;

 const user=await userModel.findOne({email:email})
 if(!user){
  return res.send("no user found")
 }
 const r=await  bcrypt.compare(password,user.password)
 if(!r){
  return res.send("something wrong")
 }
 const token=jwt.sign("email","sjddc  dhd")
 res.cookie("token",token)
 res.send("hello")
})
app.listen(3000)