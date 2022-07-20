////////////////////////////////////////////////////////////////////////getting mongoose from node modules
const mongoose = require('mongoose')

////////////////////////////////////////////////////////////////////////assigning mongo server and database name to variables
const url = 'mongodb://127.0.0.1:27017'
const db = 'farmStand'

////////////////////////////////////////////////////////////////////////creating mongoose module.export for connect functionality
exports._connect = async()=>{
    await mongoose.connect(`${url}/${db}`)
    .then(()=>{
        console.log(console.log('database connection established'))
    })
    .catch((err) =>{
        console.log(`Connection failed with error: ${err.message}`)
    })
}


