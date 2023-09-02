const express=require('express');
const router=express.Router();
const interviewController=require('../controllers/interviewController');

router.get('/interviews',interviewController.allocateInterview);
router.get('/company',interviewController.companyView);

router.post('/create-interview',interviewController.createInterview);
router.post('/update/:id',interviewController.updateResultStatus)



module.exports=router;