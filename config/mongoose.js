// requiring the library
const mongoose=require('mongoose');
const env=require('../config/environment');
// connecting to the mongodb
mongoose.connect(`mongodb://127.0.0.1/${env.db}`);
const db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function callback(){
    console.log('mongodb is connected to the server');
});

module.exports=db;