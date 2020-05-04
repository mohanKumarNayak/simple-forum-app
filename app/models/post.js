const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId
    },
    author : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : Date
    },
    likes : [
         Schema.Types.ObjectId
    ]
})

const Posts = mongoose.model('Post',postSchema)

module.exports = Posts