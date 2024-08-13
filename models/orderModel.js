const mongoose = require('mongoose')

const orderSchema =  new mongoose.Schema({
    user_id :String,
   name : String,
   email :String,
   address : String,
   phonenumber : String,

   orderdate: {
    type: Date,
    default: Date.now 
},
deliverydate: {
    type: Date,
    default: function() {
        const orderDate = new Date();
        orderDate.setDate(orderDate.getDate() + 10);
        return orderDate; 
    }
},
product_id :String,
title:String,
description :String,
price : String,
quantity : String
})
const Order = new mongoose.model('Order' , orderSchema)

module.exports = Order;


























