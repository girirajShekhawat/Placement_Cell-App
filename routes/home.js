const express=require('express');
const router=express.Router();
const studentcontroller=require('../controllers/studentController')
const csv=require('../controllers/csvController');


router.get('/form',studentcontroller.studentForm);
router.post('/create-form',studentcontroller.create);
router.get('/',studentcontroller.view);
router.get('/destroy/:id',studentcontroller.destroy);
// to download the csv file
router.get('/download',csv.downloadCsv);

module.exports=router;