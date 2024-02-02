const express = require('express')
const authorization = require('../middleware/authorization')
const route = express()
const users = require("../schema")


route.get('/', authorization , async (req,res)=>{

    try{
        const user = await req.user
        res.json(user);
    }catch(err){
        console.log(err)
        return res.status(400).send(`Error ${err}`)

    }
})


module.exports = route