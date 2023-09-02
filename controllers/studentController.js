const Student=require('../modals/student');
const Interview= require('../modals/interview');


// rendering the student form
module.exports.studentForm=async function(req,res){
    return res.render('studentForm',{
        tittle:'form'
    })
};


// creating the new student
module.exports.create=async function(req,res){
    try{

 // find whether student with same email id is present or not
 let student=await Student.findOne({email:req.body.email});
 if(student){
   // to do send a flash massage that email is already present
   req.flash('error',"student is already present")
   console.log('student with this email id is already present');
   
  return res.redirect('back');
 }
 let createStudent= await Student.create(req.body);
 req.flash('success',"Your details is added successfully")
 return res.redirect('/home')

 
    }
    catch(err){
        // to do flash message
        req.flash('error',err);
     console.log('error from the creating the student ',err);
     return res.redirect('back');
    } 
}


// rendering the all the students on home page 
module.exports.view=async function(req,res){

let studentData= await Student.find({});

    res.render('home',{
        tittle:'home',
        students:studentData
    })
}


// deleting the student from db
module.exports.destroy=async function(req,res){
    try{
    let student= await Student.findById(req.params.id);
    
    // check whether the student has any company alloted or not

    if(student && student.interviews.length>0){

        for(let name of student.interviews){
            const company= await Interview.findOne({company:name.company});

           if(company){
            for(let i=0; i<company.students.length; i++){
                if(company.students[i].student==req.params.id){
                    company.students.splice(i,1);
                    company.save();
                    break;
                }
            }
           }
           if(company.students.length==0){
            await Interview.deleteOne({company:name.company});
           }
        }
    }

   

    let studentdelete=await Student.deleteOne(req.params._id);
    return res.redirect('back');
    }catch(err){
        console.log(err)
        return res.redirect('back');
    }

}

