const productController=require('../controllers/productController')
const express=require('express')
const router=express.Router();
// const auth = require('../middleware/auth');


// router.get('/products',auth ,productController.getProducts)
// router.post('/products',auth ,productController.createProducts)
// router.delete('/products/:id',auth ,productController.deleteProducts)

router.get('/products' ,productController.getProducts)
router.post('/products' ,productController.createProducts)
router.delete('/products/:id' ,productController.deleteProducts)

module.exports=router