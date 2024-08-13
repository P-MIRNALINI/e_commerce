const userController=require('../controllers/userController')
const express=require('express')
const router=express.Router();
 
router.post('/users',userController.createUsers)
router.get('/users', userController.login)

module.exports=router