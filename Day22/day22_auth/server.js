// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.error(err));

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));


require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

function validateRegistration(data){
  const errors=[];
  if(!data.name||data.name.trim().length<2)errors.push('Name must be at least 2 characters.');
  if(!data.email||!/^\S+@\S+\.\S+$/.test(data.email))errors.push('Valid email required.');
  if(!data.password||data.password.length<6)errors.push('Password must be at least 6 characters.');
  return errors;
}

app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'public','register.html')));

app.post('/register',async(req,res)=>{
 try{
  const {name,email,password,role}=req.body;
  const errors=validateRegistration({name,email,password});
  if(errors.length)return res.status(400).json({ok:false,errors});
  const existing=await User.findOne({email:email.toLowerCase()});
  if(existing)return res.status(400).json({ok:false,errors:['Email already registered']});
  const salt=await bcrypt.genSalt(10);
  const passwordHash=await bcrypt.hash(password,salt);
  const user=new User({
    name:name.trim(),
    email:email.toLowerCase(),
    passwordHash,
    role: role==='admin'?'admin':'user'
  });
  await user.save();
  console.log('Saved user:',user.email);
  res.json({ok:true,message:`Registration successful for ${user.name}`});
 }catch(err){
  console.error(err);
  res.status(500).json({ok:false});
 }
});

app.post('/login',(req,res,next)=>{
 passport.authenticate('local',(err,user,info)=>{
  if(err)return next(err);
  if(!user)return res.status(401).json({ok:false,message:info?.message});
  req.logIn(user,err=>{
    if(err)return next(err);
    const safe={id:user._id,name:user.name,email:user.email,role:user.role};
    res.json({ok:true,user:safe});
  });
 })(req,res,next);
});

function ensureAdmin(req,res,next){
 if(req.isAuthenticated()&&req.user.role==='admin')return next();
 res.status(403).json({ok:false,message:'Access Denied'});
}

app.get('/admin',ensureAdmin,(req,res)=>res.send('Welcome, Admin!'));

app.listen(PORT,()=>console.log(`Running on ${PORT}`));
