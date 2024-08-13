const cartController=require('../controllers/cartController')
const express=require('express')
const router=express.Router();
const auth = require('../middleware/auth');


router.post('/carts' , auth , cartController.createCart)

router.get('/carts' , auth , cartController.getCart)

router.delete('/carts/:id' , auth , cartController.deletecart)


module.exports=router