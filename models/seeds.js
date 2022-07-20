const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017'
const db = 'farmStand'

const theConnection = async function(){
    await mongoose.connect(`${url}/${db}`)
    .then(()=>{
        console.log(console.log('database connection established'))
    })
    .catch((err) =>{
        console.log(`Connection failed with error: ${err.message}`)
    })
}

theConnection()

const Product =  require('../models/productModel')

const seedProducts= async(object)=>{
    try{
        // console.log(object)
        await Product.insertMany([...object])
        console.log("they're in")
    }catch(e){
        console.log(`seeding failed with error: ${e}`)
    }
}

const listOfProds = [
    {
        name: 'Grapefruit',
        price: 1,
        category: "Fruit"
    },
    {
        name: 'Ice Cream',
        price: 4,
        category: 'dairy'

    },
    {
        name: 'Pineapple',
        price: 2,
        category: 'fruit'
    },
    {
        name: 'Spinach',
        price: 9,
        category: 'vegetable'
    },
    {
        name: 'Tomato',
        price: 5,
        category: 'vegetable'
    },

]
seedProducts(listOfProds)