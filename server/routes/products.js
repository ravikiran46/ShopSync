const express = require('express')
const {MongoClient} = require('mongodb')
const dotenv = require('dotenv')
const router = express()
dotenv.config()


const dburl=process.env.DB_URI
const client = new MongoClient(dburl)

// console.log(dburl1) 

var db

//     async function main(){
//         await client.connect()
//         console.log('connected to database')
//         db = client.db('test') 
//     }
//     main().then()
// .catch(console.error)


router.get('/',async(req,res)=>{   
    await client.connect()
    db=client.db('test')
    const items= await db.collection('productdata').find({}).toArray()
    res.send(items)
})



module.exports = router