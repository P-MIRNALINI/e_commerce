const express=require('express')
const app=express()
const cors = require('cors')
const mongoose=require('mongoose')
const productsRoutes= require('./routes/productRoutes')
const usersRoutes= require('./routes/userRoutes')
const cartRoutes= require('./routes/cartRoutes')
const ordersRoutes= require('./routes/orderRoutes')

mongoose.connect('mongodb+srv://Mirnalini:Mirna2005@cluster0.qk2f0eg.mongodb.net/e_commerce').then(()=>{
        console.log("connected to database");
});

// mongoose.connect('mongodb://localhost:27017/e_commerce').then(()=>{
//     console.log("connected to database");
// });

app.use(express.json())
app.use(cors())
app.use('/',productsRoutes)
app.use('/',usersRoutes)
app.use('/',cartRoutes)
app.use('/',ordersRoutes)


app.listen(3000,()=>{
    console.log("server is running on the port 3000")
})