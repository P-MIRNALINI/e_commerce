const Order =require("../models/orderModel")
const User =require("../models/userModel")
const Cart =require("../models/cartModel")
const Product =require("../models/productModel")

exports.createOrder=async(req,res)=>{

    const { user_id} = req.user;
    let user =await User.findOne({_id:user_id});
    const email=user.email
    const{name,address,phonenumber,orderdate,deliverydate}=req.body;
   
    try {
        const cart=await Cart.findOne({user_id});
        if(!cart){
            res.status(404).json({message:"Cart is Empty"})
        }
        cart.products.map(async(product)=>{
            const productDetails = await Product.findOne({id:product.product_id});
            const order=new Order({
        user_id,
        name,
        email,
        address,
        phonenumber,
        product_id:productDetails.id,
        title:productDetails.title,
        description:productDetails.description,
        price:productDetails.price,
        quantity:product.quantity,
        orderdate,
        deliverydate

        
    })
    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
})

   
} 
catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err });
}
};


exports.getOrders=async(req,res)=>{
        const { user_id} = req.user;
 
    try{
        const orders=await Order.find({user_id});
        res.send(orders);
    }
    catch(err){
        console.log(err);
    }
}