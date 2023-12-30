const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

// cros 
app.use(cors())
app.use(express.json())



const dburl = "mongodb+srv://20jr1a4450:20jr1a4450@cluster0.sanptxk.mongodb.net/?retryWrites=true&w=majority"
const access_token = "bcfea7d7fcfb59aece02211df3a1cfab5a4b4166c88e562448688c1a01062aef3c38b83c8e68b3e5b749bbfd7be0f4508af55084fbb64752e2ce0613f01252ca"

// connect to database
mongoose.connect(dburl).then(console.log("connected to database")).catch(console.error)

//definition of schema
require('./schema')


// register api
const users = mongoose.model("userData")
app.post('/register',async(req,res)=>{
    const {name,email,password} = req.body
    const encryppassword = await bcrypt.hash(password,10)
    try {
        await users.create(
            {
                name,
                email,
                password : encryppassword
            }
        )
        res.send({status :"ok"})
        
    } catch (error) {
        res.send({status : "error"})
        
    }
})


// login api
app.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const user =  await users.findOne({email})
    if(!user){
      return   res.send({status:"no such user"})
    }
    else{
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign({email},access_token)
           return res.json({access_token : token})
        }
        else{
            return res.send({status:"invalid password"})
        }
    }

})


// items api
app.use('/product_details',require('./routes/products'))

app.listen(5000, ()=>{
    console.log("connected server")
})