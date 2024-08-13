const userController=require('../controllers/userController')
const express=require('express')
const router=express.Router();
 
router.post('/users',userController.createUsers)
router.post('/users/login', userController.login)

module.exports=router