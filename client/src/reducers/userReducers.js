const intialState = {}

const userReducers = (state=intialState,action) =>{
    switch(action.type){
        case 'ADD_USER' : {
            return {...action.payload}
        }
        default : {
            return {...state}
        }
    }
}

export default userReducers