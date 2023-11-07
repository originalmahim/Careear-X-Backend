const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000 ;
require('dotenv').config()
app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eqvmyxo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const jobsFile = client.db('JobsFile').collection('JobsCollection')
const appliedFile = client.db('appliedFile').collection('appliedCollection')

app.get('/alljobs', async(req,res) => {
    const jobs = await jobsFile.find().toArray();
    res.send(jobs)
})
app.get('/appliedJob', async(req,res) => {
  const jobs = await jobsFile.find().toArray();
    res.send(jobs)
})
app.get('/jobs', async(req,res) => {
    const jobs = await jobsFile.find().toArray();
    res.send(jobs)
})
app.post('/alljobs', async(req,res) => {
  const job = req.body;
  const result = await jobsFile.insertOne(job)
  res.send(result)
})
app.get('/alljobs/:postedPersonEmail', async(req,res) => {
  const email = req.params.postedPersonEmail;
  const result = await jobsFile.find({ postedPersonEmail: email }).toArray();
  res.send(result)
})
app.get('/alljobs/:postedPersonEmail/:id', async(req,res) => {
  const email = req.params.postedPersonEmail;
  const id = req.params.id
  const queary = {_id: new ObjectId(id), postedPersonEmail: email}
  const result = await jobsFile.findOne(queary)
  res.send(result)
})
app.get('/jobs/:id', async(req,res) => {
  const id = req.params.id
  const queary = {_id: new ObjectId(id)}
  const result = await jobsFile.findOne(queary)
  res.send(result)
})

app.delete('/alljobs/:postedPersonEmail/:id', async(req,res) => {
  const email = req.params.postedPersonEmail;
  const id = req.params.id
  const queary = {_id: new ObjectId(id), postedPersonEmail: email}
  const result = await jobsFile.deleteOne(queary)
  res.send(result)
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})