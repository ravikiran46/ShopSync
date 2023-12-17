const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dburl = "mongodb+srv://20jr1a4450:20jr1a4450@cluster0.sanptxk.mongodb.net/?retryWrites=true&w=majority"

const access_token = "bcfea7d7fcfb59aece02211df3a1cfab5a4b4166c88e562448688c1a01062aef3c38b83c8e68b3e5b749bbfd7be0f4508af55084fbb64752e2ce0613f01252ca"

const refresh_token = "8058379f48c5a31847358e11e0eb775e8bc679d38a6d637ad4dcc0cd38f745f95e3991285b32420b92acfeb260836f7e988e1e4cc83447fd90d9c434f7f23087"

mongoose.connect(dburl).then(()=>{
    console.log("connected to database")
}).catch((e)=>console.log(e))

require('./schema')

const users = mongoose.model("userData")

app.use(express.json())
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



app.listen(5000, ()=>{
    console.log("server started")
})