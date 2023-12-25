const express = require('express')
const {MongoClient} = require('mongodb')
const router = express()
const dburl = "mongodb+srv://20jr1a4450:20jr1a4450@cluster0.sanptxk.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(dburl)


var db
async function main(){
    await client.connect()
    console.log('connected to database')
    db = client.db('test') 
}

main().then()
.catch(console.error)
router.get('/',async(req,res)=>{
    const items= await db.collection('productdata').find({}).toArray()
    res.send(items)
})



module.exports = router