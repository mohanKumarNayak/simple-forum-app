import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';
import { startAddUser } from './actions/usersActions';
import { startGetAllPosts } from './actions/postsAction';

const store = configureStore()

store.dispatch(startGetAllPosts())

if(localStorage.getItem('token')){
  store.dispatch(startAddUser())
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
    jsx,
  document.getElementById('root')
);
