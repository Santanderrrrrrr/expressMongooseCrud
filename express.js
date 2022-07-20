////////////////////////////////////////////////////////////////////////Express imports + express middleware
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const objectId = require('mongodb').ObjectId

////////////////////////////////////////////////////////////////////////Mongoose imports
const mongoose = require('./mongoose')
const Product = require('./models/productModel');
const { ObjectID } = require('bson');

////////////////////////////////////////////////////////////////////////Initializing express
const app = express()

////////////////////////////////////////////////////////////////////////Connecting mongoose to server
mongoose._connect()

////////////////////////////////////////////////////////////////////////Setting path to views and view template engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

////////////////////////////////////////////////////////////////////////setting express middleware
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

////////////////////////////////////////////////////////////////////////Creating sample test product to test module.export/import functionality
// const createProduct= async function(name){
//     try{
//         const product = await Product.create({...name})
//         console.log(`product saved successfully: ${product}`)
//     }catch(err){
//         console.log(`product save fail with error: ${err.message}`)
//     }
// }
// createProduct({name: "Leon"})

const categories=[ 'fruit', 'vegetable', 'dairy']


////////////////////////////////////////////////////////////////////////Setting restful routes using express


app.get('/index/new', (req, res) => {
    res.render('new', { categories })
})

app.get('/index', async(req, res) => {
    const { category } = req.query
    if(category){
        const products = await Product.find({ category })
        // console.log(products)
        res.render('index', {products, category})
    }else{
        const products = await Product.find({}) 
        res.render('index', {products, category:"All"})
    }
})

app.get('/index/:id', async(req, res) => {
    try{
        let { id } = req.params
        // const newId = new ObjectID(id)
        // id = objectId(id)
        // console.log(id) 
        const foundProduct = await Product.findById(id)
        // console.log(foundProduct)
        res.render('productDetailsPage', { foundProduct })
    }catch(err){
        console.log(`failed with error: ${err.message}`)
    }
})

//remember it's best to redirect from a post route as a simple refresh from a send results in multiple saves.

app.post('/index', async (req, res)=>{
    try{
        
        const newProduct = await Product.create(req.body)
        res.redirect(`/index/${newProduct._id}`)
        
    }catch(err){
        console.log(`Here's the error message: ${err.message}`)
    }
})

app.get('/index/:id/edit', async (req, res)=>{
    const {id} = req.params
    const product = await(Product.findById(id))
    res.render('edit', { product, categories})
})

app.put('/index/:id', async(req, res)=>{
    // console.log(req.body)
    try{
        const {id} = req.params
        const newProduct =  await Product.findByIdAndUpdate(id, req.body, {runValidators: true})
        console.log(newProduct)
        res.redirect(`/index/${newProduct._id}`)
    }catch(err){
        console.log(`put failed with error: ${err.message}`)
    }
})

app.delete('/index/:id', async (req, res)=>{
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect(`/index`)
})





////////////////////////////////////////////////////////////////////////getting expresss to listen
app.listen(3001, () => {
    console.log('app listening on port 3001')
})