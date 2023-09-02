const express=require('express');
const env=require('./config/environment');
const port=env.port;
//connecting the mongoose with the server
const db=require('./config/mongoose');
// use to make session cookie
const session=require('express-session');
const passport=require('passport');
const passport_local=require('./config/passport');
const flash=require("connect-flash");
const customMiddleware=require('./config/middleware');
const layout=require('express-ejs-layouts');
// it to download the csv file 
const fastCsv=require('fast-csv');
const fs=require('fs');

const app=express();


// app.use(expressLayouts);
//telling the express where is my static files
app.use(express.static(env.assests_path));
// use this to decode (req.body)
app.use(express.urlencoded());


// setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(layout);

// session 
app.use(session({
    name:'Placement_cell',
    // to do change the seceret before deployment
    secret: env.session_cookie_key,
    resave: false,
    saveUninitialized: false,
    // cookie validation age
   cookie:{
    maxAge:(1000*60*100)
   }
  }));

//   for authentication
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.setAuthenticatedUser);
// for the flash msg
app.use(flash()) ;
app.use(customMiddleware.setFlash);

// connecting to the router
app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`error in the starting of server ${err}`)
    }
    console.log(`Server is up and running on the port ${port}`);
})