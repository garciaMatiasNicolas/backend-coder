// SETTING ROUTES
const { Router } = require('express');
const routeProducts = Router();
const routeCart = Router();

//CLASS
const products = [];
const cart = [];
const isAdmin = true; 

class Product{
    constructor(name, thumbnail, price, stock, description){
        this.name= name;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.timestamp = `product${Date.now()}`;
        products.push(this);
        this.id = products.length.toLocaleString();
    }
}

class Cart{
    constructor(name, thumbnail, price, stock, description){
        this.timestamp = `cart${Date.now()}`;
        this.product = {
            name : name,
            thumbnail: thumbnail,
            timestamp : `product${Date.now()}`,
            price : price, 
            stock: stock,
            description: description
        };
        cart.push(this.product);
    }
}

// ROUTES
routeProducts.post('/', (req, res)=>{
    new Product(req.body.name, req.body.thumbnail, req.body.price, req.body.stock, req.body.description);
    res.json(products);
})

routeProducts.get('/', ( _ , res )=>{
    new Product('Iphone 13', '', '1000usd', 8, 'Smartphone Apple, Iphone 13 124gb');
    new Product('Iphone 11', '', '600usd', 15, 'Smartphone Apple, Iphone 11 64gb');
    res.json(products);
})

routeProducts.get('/:id', (req, res)=>{
    let id = req.params.id;
    res.json(products.find(el => el.timestamp === id));
})

routeProducts.delete('/:id', (req, res)=>{
    let id = req.params.id;
    let item = products.find(el=> el.timestamp === id);
    let index = products.indexOf(item);
    products.splice(index, 1);
    res.json(products);
})

routeProducts.put('/:id', (req, res)=>{
    let id = req.params.id;
    let item = products.find(el=> el.timestamp === id);
    item.name = req.body.name
    item.price = req.body.price
    item.stock = req.body.stock
    item.thumbnail = req.body.thumbnail
    item.description = req.body.description
    res.json(item)
})

routeCart.post('/', (req, res)=>{
    new Cart(req.body.name, req.body.thumbnail, req.body.price, req.body.stock, req.body.description);
    res.json(cart);
})

routeCart.get('/', (_, res)=>{
    res.json(cart)
})

routeCart.get('/:id', (req, res)=>{
    let id = req.params.id;
    res.json(cart.find(el => el.timestamp === id));
})

module.exports = {routeCart, routeProducts}