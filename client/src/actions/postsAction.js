import axios from '../config/axios'
import Swal from 'sweetalert2'

export const addPosts = (posts) => {
    return {type : 'ADD_POSTS' , payload : posts}
}

export const startGetAllPosts = () => {
    return(dispatch)=>{
        axios.get('/allPosts')
            .then((response)=>{
                dispatch(addPosts(response.data))
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}


export const updateLikes = (postId,id) => {
    return {type : 'UPDATE_LIKES',payload : {postId:postId,id:id} }
}

export const startAddLike = (obj) => {
    return(dispatch)=>{
        axios.put(`/posts/addLike/${obj.id}`,{userId:obj.userId},{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            dispatch(updateLikes(obj.id,obj.userId))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const updateRemoveLikes = (postId,id) => {
    return {type : 'UPDATE_REMOVE_LIKES',payload : {postId:postId,id:id} }
}

export const startRemoveLike = (obj) => {
    return(dispatch)=>{
        axios.put(`/posts/removeLike/${obj.id}`,{userId:obj.userId},{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            dispatch(updateRemoveLikes(obj.id,obj.userId))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const startAddPostByUser = (obj) => {
    return(dispatch)=>{
        axios.post('/posts',obj.formData,{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            Swal.fire(
                'Success',
                'Posted successfully',
                'success'
            )  
            dispatch(startGetAllPosts())
            obj.redirect('/')

        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

