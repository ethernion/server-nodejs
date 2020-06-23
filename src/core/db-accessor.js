// import { MongoClient } from 'mongodb';
const { MongoClient } = require('mongodb');
// import Environment from '@/env/environment';
const Environment = require('../env/environment');

class DBAccessor {
  static db() {
    return DBAccessor.client.db('absence-manager');
  }

  static init() {
    const uri = `mongodb+srv://${Environment.mongodbUser}:${Environment.mongodbPassword}@cluster0-oxkrf.mongodb.net/test?retryWrites=true&w=majority`;

    DBAccessor.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 100 });
    DBAccessor.client.connect();
  }
}

// export default DBAccessor;
module.exports = DBAccessor;
