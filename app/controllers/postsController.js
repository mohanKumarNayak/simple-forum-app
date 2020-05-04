const Posts = require('../models/post')

module.exports.create = (req,res) => {
    const {user} = req
    const body = req.body
    const post = new Posts(body)
    post.user = user._id
    post.author = user.username
    post.date = new Date()
    post.save()
        .then((post)=>{
            res.json(post)
        })
        .catch((err)=>{
           res.json(err)
        })
    
}

module.exports.showAllPosts = (req,res) => {
    Posts.find()
        .then((response)=>{
            res.json(response)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.addLike = (req,res) => {
    const body = req.body
    const id = req.params.id
    Posts.findOneAndUpdate({_id:id},{$push : {likes : body.userId}},{new:true,runValidators:true})
        .then((post)=>{
            res.json(post)
        })
        .catch((err)=>{
            res.json(err)
        })
        
}

module.exports.removeLike = (req,res) => {
    const body = req.body
    const id = req.params.id
    Posts.findOneAndUpdate({_id:id},{$pull : {likes : body.userId}},{new:true,runValidators:true})
        .then((post)=>{
            res.json(post)
        })
        .catch((err)=>{
            res.json(err)
        })
        
}