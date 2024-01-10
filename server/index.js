const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

// cros 
app.use(cors())
app.use(express.json())



const dburl=process.env.DB_URI
const access_token = process.env.ACCESS_TOKEN

// connect to database
mongoose.connect(dburl).then(console.log("connected to database")).catch(console.error)

//definition of schema
require('./schema')




const users = mongoose.model("userData")
//sign up
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


// sign in
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


// items
app.use('/',require('./routes/products'))

app.listen(5000, ()=>{
    console.log("connected server")
})