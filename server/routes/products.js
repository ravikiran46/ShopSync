const express = require('express')
const {MongoClient} = require('mongodb')
const dotenv = require('dotenv')
const router = express()
dotenv.config()


const dburl=process.env.DB_URI
const client = new MongoClient(dburl)

var db

router.get('/',async(req,res)=>{   
    await client.connect()
    db=client.db('test')
    const items= await db.collection('productdata').find({}).toArray()
    res.send(items)    
})

router.get('/:id',async(req,res)=>{
    await client.connect()
    db=client.db('test')
    var id= req.params.id;
    try{
        const item=await db.collection("productdata").findOne({id});
        console.log(item)
        if (!item) return res.status(404).send("No such product exists!");
        else
        return  res.send(item);
    }
    catch(e){
        res.status(500).send();
    }
})

module.exports = router