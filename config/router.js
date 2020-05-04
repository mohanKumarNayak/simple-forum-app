const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/userController')
const {authenticationUser} = require('../app/middlewares/authenticateUser')
const postsController = require('../app/controllers/postsController')

router.post('/users/register',userController.create)
router.post('/users/login',userController.login)
router.get('/users/account',authenticationUser,userController.account)
router.delete('/users/logout/',authenticationUser,userController.logout)

router.post('/posts',authenticationUser,postsController.create)
router.get('/allPosts',postsController.showAllPosts)
router.put('/posts/addLike/:id',postsController.addLike)
router.put('/posts/removeLike/:id',postsController.removeLike)


module.exports = router 