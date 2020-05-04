import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBTypography } from 'mdbreact'
import { connect } from 'react-redux'
import { startAddPostByUser } from '../../actions/postsAction'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class AddPosts extends React.Component{
    constructor(){
        super()
        this.state = {
            title : '',
            data : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title : this.state.title,
            description : this.state.description
        }
        const redirect = (address) => {
            return this.props.history.push(`${address}`)
        }
        this.props.dispatch(startAddPostByUser({formData,redirect}))
    }

    handleChangeDescrition = (value) => {
        this.setState({
            description : value
        })
    }
    
    render(){
        return(
        <MDBContainer>
             <MDBRow>
                <MDBCol>
                    <form onSubmit={this.handleSubmit}>
                    <MDBTypography tag='h1' variant="h1" className="text-center">Add Post</MDBTypography>
                    <label htmlFor="defaultFormContactNameEx" className="grey-text">
                        Title
                        </label>
                        <input type="text" id="defaultFormContactNameEx" className="form-control" name="title" value={this.state.title} onChange={this.handleChange}  />
                        <br />          
                    <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.handleChangeDescrition(data)
                    } }
                />
                <br />
                <MDBBtn color="success" type="submit">Submit Post</MDBBtn>
                   </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        )
    }
}

export default connect()(AddPosts)