const mongoose = require('mongoose')

const setUpDb = () => {
    mongoose.connect('mongodb+srv://user:mohan619@get-in-film-j7ept.mongodb.net/simple-forum?retryWrites=true&w=majority')
        .then(()=>{
            console.log('connected to database')
        })
        .catch((err)=>{
            console.log(err)
        })
}

//mongodb+srv://user:mohan619@get-in-film-j7ept.mongodb.net/simple-forum?retryWrites=true&w=majority

module.exports = setUpDb