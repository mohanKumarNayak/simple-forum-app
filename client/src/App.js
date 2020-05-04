import React from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter, Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import {startLogoutUser} from './actions/usersActions'
import PostsShow from './components/Posts/PostsShow';
import AddPost from './components/Posts/AddPost';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }


  handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log-out from your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out!'
    }).then((result)=>{
        if(result.value){
         this.props.dispatch(startLogoutUser())
        }
    })
  }

  render() {
    const bgWhite = {backgroundColor: '#e3e8e6'}
    const textColor = {color : 'black'}
    return(
      <BrowserRouter>
      {
        Object.keys(this.props.user).length > 0 ? 
        <div>
          <header>
            <MDBNavbar style={bgWhite} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                  <strong style={textColor}>Simple-Forum</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={ this.onClick } />
              <MDBCollapse isOpen = { this.state.collapse } navbar>
                <MDBNavbarNav right>
                  <MDBNavItem>
                      <MDBNavLink style={textColor} to="/">Posts</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                      <MDBNavLink style={textColor} to="/add-posts">Add-Post</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                      <MDBNavLink style={textColor} onClick={this.handleLogout} to="/logout">logout</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            <br /><br /><br />
          </header>
        </div> : 
        <div>
          <header>
        <MDBNavbar style={bgWhite} dark expand="md" scrolling fixed="top">
          <MDBNavbarBrand href="/">
              <strong style={textColor}>Simple-Forum</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={ this.onClick } />
          <MDBCollapse isOpen = { this.state.collapse } navbar>
            <MDBNavbarNav right>
            <MDBNavItem>
                      <MDBNavLink style={textColor} to="/">Posts</MDBNavLink>
                  </MDBNavItem>
              <MDBNavItem>
                  <MDBNavLink style={textColor} to="/login">Login</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                  <MDBNavLink style={textColor} to="/register">Register</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <br /><br /><br />
      </header></div>
      }
        <div>
          
        </div>
        <Route path="/" component={PostsShow} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/login" component={Login} />

        <Route path="/add-posts" component={AddPost} />
        
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user
  }
}

export default connect(mapStateToProps)(App)