const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        Unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamp:true
});


const User=mongoose.model('User',userSchema);

module.exports=User;