const Student=require('../modals/student');
const Interview=require('../modals/interview');


// rendering the student 
module.exports.allocateInterview= async function(req,res){
let student= await Student.find({});
return res.render('interviewform',{
    tittle:'Interview',
    students:student
})
}
// rendering the company page
module.exports.companyView=async function(req,res){
   
    let students=await Student.find({});

    res.render('interviews',{
      tittle:"Company Page",
      students:students

    })
}




module.exports.createInterview= async function(req,res){
try{
       const{id, company, date}=req.body;

       let isCompanyExist=await Interview.findOne({company:company});

        let obj={
           student:id,
           date:date,
           result:'Pending'
          }
       
//if company  exist
        if(isCompanyExist){
           
             // check if company is already allocated to the student
             let isStudentAlreadyAllocated=isCompanyExist.students.some(student => student.student.toString() === id);

             if(isStudentAlreadyAllocated){
                req.flash('error',"company is already allocated to the student");
               return  res.redirect("back")
             }else{
                isCompanyExist.students.push(obj);
                isCompanyExist.save();
             }
            }
//if company not exist already        
         else{
               const newCompany=await Interview.create({
                company:company,
               });
            //pushing the details in the students of InterviewSchema
               newCompany.students.push(obj);
               newCompany.save();
             
         }

//updating the student schemas interview section 

           let student= await Student.findById(id);

           let interview={
            company:company,
            date:date,
            result:'Pending'
           }
  
           if(student){
            student.interviews.push(interview);
            student.save();
           }
           req.flash('success','Interview Scheduled Successfully')
           return res.redirect('/home');

}catch(err){
    console.log(err);
    return res.redirect('back');
} 
    }

 
    
// updating the result status of the interview

module.exports.updateResultStatus= async function(req,res){
    const { id } = req.params;
    const {companyName, companyResult}=req.body;

    try{
        const student = await Student.findById(id);
        if (student && student.interviews.length > 0) {
        for(let company of student.interviews){
            // finding the company name and updating that
            if(company.company===companyName){
                company.result=companyResult;
                student.save();
                break;
            }
        }
        }
        const company= await Interview.findOne({company:companyName});

        if(company){
            for(let student of company.students){

                if(student.student==id){
                    student.result=companyResult;
                    company.save();
                }
            }
        }
        req.flash('success','Interview Status Changed Successfully')
        return res.redirect('back');
    }catch(err){
        console.log(`error in updating the result ${err}`);
        return res.redirect('back');
    }

};



