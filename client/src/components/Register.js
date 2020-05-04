import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import { startRegisterUser } from '../actions/usersActions';

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username : '',
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
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        if(this.state.username.length == 0 || this.state.email.length == 0 || this.state.password.length == 0){
            Swal.fire(
                'Error',
                `${this.state.username.length == 0 ? 'please enter valid user name. ' : ''}${this.state.email.length == 0 ? ' please enter valid email. ' : ''}${this.state.password.length == 0 ? 'please enter password. ' : ''}`,
                'error'
            )
        }
        else{
            const redirect = (address) => {
                return this.props.history.push(`${address}`)
            }
            this.props.dispatch(startRegisterUser({formData,redirect}))
        }
    }

    render(){
        return(
            <MDBContainer>
            <MDBRow center >
                <MDBCol md="5">
                <form onSubmit={this.hanleSubmit}>
                    <p className="h2 text-center mb-4">Sign up</p>
                    <div className="grey-text">
                    <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                        success="right" value={this.state.username} onChange={this.handleChange} name="username" />
                    <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                        success="right" value={this.state.email} onChange={this.handleChange} name="email" />
                    <MDBInput label="Your password" icon="lock" group type="password" validate value={this.state.password} onChange={this.handleChange} name="password" />
                    </div>
                    <div className="text-center">
                    <MDBBtn color="primary" type="submit" style={{borderRadius:"30px", width : "100%"}}>Register</MDBBtn>
                    </div>
                </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

        )
    }
}

export default connect()(Register)