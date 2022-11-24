//EXPRESS
const express =  require('express');
const app = express();
const PORT = 8080 || process.env.PORT;
const {routeCart, routeProducts} = require('./routes.js');

// MIDDLEWARES
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/products', routeProducts);
app.use('/cart', routeCart);

// RENDER INDEX
app.get('/', ( _ , res )=>{
    res.send(`<h1>Api RestFul</h1>`);
})

// LISTEN SERVER
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

