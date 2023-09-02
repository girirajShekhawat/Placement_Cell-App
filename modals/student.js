const { result } = require('lodash');
const mongoose=require('mongoose');

const studentSchema=mongoose.Schema({

    batch:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    college:{
        type:String,
        required:true
    },
    placementStatus:{
        type:String,
        required:true
    },
    dsa:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    webDev:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    react:{
        type:Number,
        min:0,
        max:100,
        required:true
    },
    interviews:[{
       company:{
        type:String,
        required:true
       },
       date:{
        type:String,
        required:true
       },
       result:{
        type:String,
        enum:['Selected','Not Selected','Not Attempted','Pending']

       },
    }]

},{
    timestamps:true
});

const Student=mongoose.model('Student',studentSchema);

module.exports=Student;