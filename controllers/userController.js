const User=require('../modals/users')

// signup page 
module.exports.signup=function(req,res){
    return res.render('signUp',{
        tittle:'signup'
    })
};


// getting the data from sign up page
module.exports.create= async function(req,res){
              //if user typed diff password
              if(req.body.password !== req.body.confirm_password){
                req.flash('error','wrong password entered')
                console.log("wrong password entered")
            return    res.redirect('back');
            }
  
  try{
 
    //  Check whether user with same email id is present already or not
    let userEmail= await User.findOne({email:req.body.email});

    //   if user with same email id is present already
    if(userEmail){
        req.flash('error','user is present already with same email id')
        console.log('user is present already with same email id')
   return res.redirect('back')
    }
    // if user with same email id is not  present already
    let user=await User.create( req.body);
      req.flash('success','You have signed up successfully')
    return res.redirect('/signin');
           
  
}catch(err){
    console.log(err);
}
}


// sign in page 
module.exports.signin=function(req,res){
    
   return res.render('signIn',{
    tittle:this.signIn
   })
}

module.exports.createSession=function(req,res){
    req.flash('success',"You are successfully loged In");
    return res.redirect('/home');
}

// sign out
module.exports.destroysession=function(req,res,next){
     req.logout(function(err){
        if (err)
        {
          return next(err);
        }
        req.flash('success',"You are successfully loged Out");
        res.redirect("/signin");
      })

 
}