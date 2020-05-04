import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { startLoginUser } from '../actions/usersActions';

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email : '',
            password : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    hanleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        if(this.state.email.length == 0 || this.state.password.length == 0){
            Swal.fire(
                'Error',
                `${this.state.email.length == 0 ? ' please enter valid email. ' : ''}${this.state.password.length == 0 ? 'please enter password. ' : ''}`,
                'error'
            )
        }
        else{
            const redirect = (address) => {
                return this.props.history.push(`${address}`)
            }
            this.props.dispatch(startLoginUser({formData,redirect}))
        }
    }

    render(){
        return(
            <MDBContainer>
            <MDBRow center >
                <MDBCol md="5">
                <form onSubmit={this.hanleSubmit}>
                    <p className="h2 text-center mb-4">Login</p>
                    <div className="grey-text">
                    <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                        success="right" value={this.state.email} onChange={this.handleChange} name="email" />
                    <MDBInput label="Your password" icon="lock" group type="password" validate value={this.state.password} onChange={this.handleChange} name="password" />
                    </div>
                    <div className="text-center">
                    <MDBBtn color="success" type="submit" style={{borderRadius:"30px", width : "100%"}} >Login</MDBBtn>
                    </div>
                    <p className="text-center">or</p>
                    <p className="text-center"><Link to="/register">Register Your Account Here</Link></p>
                </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

        )
    }
}

export default connect()(Login)