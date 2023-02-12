import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const url = 'mongodb+srv://monkey:Qawsed!23@cluster0.nngr2ey.mongodb.net/twetter?retryWrites=true&w=majority'

mongoose.set('strictQuery', true).connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export {db, mongoose}

