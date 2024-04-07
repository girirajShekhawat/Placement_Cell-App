// requiring the library
const mongoose=require('mongoose');
const env=require('../config/environment');
// connecting to the mongodb
mongoose.connect(`mongodb+srv://giriraj3103:1234@cluster0.blnjoj9.mongodb.net/placement_cell`);
const db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function callback(){
    console.log('mongodb is connected to the server');
});

module.exports=db;