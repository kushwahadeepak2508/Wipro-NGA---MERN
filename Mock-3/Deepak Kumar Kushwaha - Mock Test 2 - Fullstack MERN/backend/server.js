const express = require('express')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
app.use(cors());
app.use(bodyParser.json())

app.use((req,res,next)=>{console.log(req.method, req.url); next();})

let products = [ { id:1, name:'Sneakers', price:120}, {id:2,name:'Boots',price:150}]

app.get('/products',(req,res)=>res.json(products))

app.post('/products',[
 body('name').isString().notEmpty(),
 body('price').isNumeric()
],(req,res)=>{
 const errors = validationResult(req)
 if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})
 const p={id:products.length+1, ...req.body}
 products.push(p)
 res.status(201).json(p)
})

const users=[{id:1,email:'admin@test.com',password:'12345',name:'Admin'}]
const SECRET='supersecret'

app.post('/login',(req,res)=>{
 const {email,password}=req.body
 const u=users.find(x=>x.email===email&&x.password===password)
 if(!u) return res.status(401).json({error:'Invalid'})
 const token=jwt.sign({userId:u.id},SECRET,{expiresIn:'1h'})
 res.json({token})
})

function auth(req,res,next){
 const header=req.headers.authorization
 if(!header) return res.status(401).json({error:'No token'})
 const token=header.replace('Bearer ','')
 try{
  req.user=jwt.verify(token,SECRET)
  next()
 }catch(e){return res.status(401).json({error:'Invalid token'})}
}

app.get('/dashboard', auth, (req,res)=>res.json({msg:'Welcome user '+req.user.userId}))

app.get('/users/:id',(req,res)=>{
 const u=users.find(x=>x.id==req.params.id)
 if(!u) return res.status(404).json(null)
 res.json(u)
})

app.listen(4000,()=>console.log("Backend running 4000"))
