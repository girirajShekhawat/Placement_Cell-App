const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../modals/users');


passport.use(new LocalStrategy(
  // this is important to define the what is the username field
  {usernameField:"email",
  passReqToCallback:true
},

    function( req,email, password, done) {
      User.findOne({ email: email }).then((user)=>{

        if (!user || user.password != password) { 
          req.flash('error',"username/password not match");
          console.log("username/password not match")
          return done(null, false); }
  
        
          return done(null,user);
      }).catch((err)=>{
      
          console.log('error :' ,err)
          return done(err); }
      )
       
    }
));



// serializing the user decide which key is to kept in the cookies
  passport.serializeUser(function(user, done ) {
    done(null,user.id);
  });
  
  // deserializing the user from the key in the cookie
  passport.deserializeUser(function(id, done) {
   User.findById(id).then((user)=>{
    return done(null, user);
   })
     
    
  });

  // check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/signin');
};

// set authenticated user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

  module.exports=passport;