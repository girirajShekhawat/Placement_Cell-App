const express=require('express');
const router=express.Router();
const passport=require('passport');
const usercontroller=require('../controllers/userController');

// rendering all the details on landing page
router.get('/',usercontroller.signup);
router.get('/signin',usercontroller.signin);
router.get('/signup',usercontroller.signup);
router.post('/create',usercontroller.create);
// using passport as a middleware for authentication
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/signup'}) ,usercontroller.createSession)
router.get('/signout',usercontroller.destroysession);


// sending the reqs to its appropriate router
router.use('/home',passport.checkAuthentication,require('./home'));
router.use('/interview',passport.checkAuthentication,require('./interview'));

module.exports=router;