const mongoose=require('mongoose');

const interviewSchema=mongoose.Schema({
   
   company:{
    type:String,
    unique:true

   },
    students: [
        {
          student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
          },
          date: {
            type: String,
            required: true,
        },
          result: {
            type: String,
            enum: ['Selected','Not Selected','Not Attempted','Pending']
          },
        },
      ],
},{
    timestamps:true
});

const Interview=mongoose.model('Interview',interviewSchema);

module.exports=Interview;

