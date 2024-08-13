const orderController=require('../controllers/orderController')
const express=require('express')
const router=express.Router();
const auth = require('../middleware/auth');


router.post('/orders' , auth ,orderController.createOrder)
router.get('/orders' , auth ,orderController.getOrders)


module.exports=router