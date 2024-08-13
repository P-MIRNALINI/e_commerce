const Cart =require("../models/cartModel")
const Product =require("../models/productModel")

exports.createCart=async(req,res)=>{
    const {user_id}=req.user;
    const {product_id,quantity}=req.body;
    let cart=await Cart.findOne({user_id});
    if(!cart)
    {
       cart=new Cart({
          user_id,
          products:[{
            product_id,
            quantity
          },]
       })
  
    }
    else{
        const productIndex=cart.products.findIndex((p)=>p.product_id===product_id)
        if(productIndex>-1)
            {
             
             cart.products[productIndex].quantity=quantity;
            }
            else{
                cart.products.push({product_id,quantity}) 
            }
    }
    await cart.save();
    res.status(200).json({message:"product added successfully"});
}

exports.getCart=async(req,res)=>{
    const {user_id} = req.user;
    
        const cart=await Cart.findOne({user_id});
        if(!cart){
            res.status(404).json({message:"Cart is Empty"})
        }
        try {
            let subTotal =0;
            const cartItem = await Promise.all(
                cart.products.map(async(product)=>{
                    const productDetails = await Product.findOne({id:product.product_id});
                    subTotal += productDetails.price * product.quantity;
                    return{
                        product_id:productDetails.id,
                        title:productDetails.title,
                        description:productDetails.description,
                        price:productDetails.price,
                        image:productDetails.image,
                        quantity:product.quantity
                    }
                })
            )
            res.status(200).json({cartItems: cartItem,subTotal})
        }catch(err){
            res.status(200).json({message: "server error",err})

        }
    }
    exports.deletecart = async (req, res) => {
        const { user_id } = req.user;
         const  product_id = req.params.id;
         const cart = await Cart.findOne({ user_id });
         if (!cart) {
             return res.status(404).json({ message: "Cart not  found" });
         }
         try{
         const isProductvalid=cart.products.find(
            (product)=>product_id===product.product_id
         );
         if(!isProductvalid){
            return res.status(200).json({ message: "product not found in cart" });
         }
         if(cart.products.length<=1){
            await Cart.deleteOne({ user_id });
                return res.status(200).json({ message: "Cart is deleted" });
         }else{
            cart.products=cart.products.filter((pro)=>pro.product_id!==product_id)
            cart.save();
            res.status(200).json({message:"product deleted successfully"})
         }
        }catch(err){
            res.status(500).json({ message: "Error", err });
        }
    }