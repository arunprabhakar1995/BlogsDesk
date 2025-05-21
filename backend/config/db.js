const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectToDb() {
  await client.connect();
  db = client.db("blogDB");
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };
