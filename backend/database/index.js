const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/SupplyNote')
        console.log('Database Connection Successfull...')
    } catch (error) {
        console.log('error in Connecting to Database')
    }
}

module.exports = connect