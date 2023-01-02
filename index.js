const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000 ;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

// use all the middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qulzvkz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
       const serviceCollection = client.db("doctors_portal");
       const allService = serviceCollection.collection("services");
       // get all the data
       app.get('/service' ,async(req, res) => {
        const query = {};
        const cursor = allService.find(query);
        const result = await cursor.toArray();
        res.send(result);
       })
    } finally {

    }
}
run().catch(console.dir)



app.get("/", (req,res) => {
    res.send("Hello Milstone 12 Server Side")
})

app.listen(port, () => {
    console.log(`Listening Server ${port} successfully`)
})
