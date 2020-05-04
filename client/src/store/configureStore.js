import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducers from '../reducers/userReducers'
import postsReducers from '../reducers/postsReducers'

const configureStore = () => {
    const store = createStore(combineReducers({
        user : userReducers,
        posts : postsReducers
    }),applyMiddleware(thunk))
    return store
}

export default configureStore