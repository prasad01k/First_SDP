const { MongoClient } = require("mongodb");
const cors = require('cors')
const http = require('http')
const express = require('express')
const app = express()

app.use(express.json())
app.use(cors())

var database, fc;
const uri ="mongodb+srv://prasad:1234@cluster0.hiqm7hx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    database = client.db("mswd");
    fc = database.collection("project");
  } finally {

  }
}
run().catch(console.dir);

app.get('/', (request, response) => {
  response.send('<h1>Finally back end done</h1>')
})

app.get('/display', (request, response) => {
  async function fun() {
    try{
    const result = await fc.find().toArray(function (err, docs) { 
      if (err) return res.status(500).send({error: err})
      response.send(docs);
      });
    } finally {

    }
  }
  fun().catch(console.dir)
})

app.post('/insert', (request, response) => {
async function run() {
    try {
      await client.connect();
      const database = client.db("mswd");
      const fc = database.collection("project");
      const doc = {firstname: request.body.fname, lastname: request.body.lname, email: request.body.email,
        PhoneNumber: request.body.phnum, FromAddress: request.body.faddress, ToAddress: request.body.taddress, Date: request.body.date, Persons: request.body.persons, Luggages: request.body.luggage};
      const result = await fc.insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
      response.send(result.insertedCount);
    } finally {
      
    }
  }
  run().catch(console.dir);
})

const PORT = 8081
app.listen(PORT)
console.log(`Server running on port ${PORT}`)