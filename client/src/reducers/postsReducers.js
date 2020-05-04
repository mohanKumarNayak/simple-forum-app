const intialState = []

const postsReducers = (state=intialState,action) => {
    switch(action.type){
        case 'ADD_POSTS' : {
            return [...action.payload]
        }
        case 'UPDATE_LIKES' : {
            return state.map(post=>{
                    if(post._id == action.payload.postId){
                       return Object.assign({},post,{likes:post.likes.concat(action.payload.id)}) 
                    }
                    else{
                        return post
                    }

            })
        }
        case 'UPDATE_REMOVE_LIKES' : {
            return state.map(post=>{
                if(post._id == action.payload.postId){
                    return Object.assign({},post,{likes:post.likes.filter(like=>like != action.payload.id)})
                }
                else{
                    return post
                }
            })
        }
        default : {
            return [...state]
        }
    }
}

export default postsReducers