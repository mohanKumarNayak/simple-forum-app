import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCardHeader, MDBIcon, MDBMedia } from 'mdbreact'
import { connect } from 'react-redux'
import { startGetAllPosts, startAddLike, startRemoveLike } from '../../actions/postsAction'
import ReactHtmlParser from 'react-html-parser'

function PostsList(props){
    if(props.posts.length == 0){
        props.dispatch(startGetAllPosts())
    }
    const handleAddLike = (id) => {
        props.dispatch(startAddLike({id,userId:props.user._id}))
    }
    const handleRemoveLike = (id) => {
        props.dispatch(startRemoveLike({id,userId:props.user._id}))
    }
    return(
        <MDBContainer>
            <MDBRow>
                <MDBCol md="12">
                <h2 className="h1-responsive font-weight-bold my-5 text-center">Total Posts - {props.posts && props.posts.length} </h2>

                {
                    props.posts && props.posts.map((post,i)=>{
                        return (
                            <div key={i+'posts'}>
                                <MDBCardHeader className="border-0 font-weight-bold d-flex justify-content-between">
                                    <p className="mr-4 mb-0" style={{fontSize:"25px"}} >Title - {post.title} </p>
                                    <ul className="list-unstyled list-inline mb-0">
                                        <li className="list-inline-item mr-3">Posted On - {post.date.slice(0,10)} </li>
                                    </ul>
                                    </MDBCardHeader>
                                    <MDBMedia className="p-4 bg-white">
                                    <MDBMedia body>
                                        <h5 className="font-weight-bold mt-0">
                                        Author - {post.author}
                                        </h5>
                                        {ReactHtmlParser(post.description)}
                                        <br />
                                       {Object.keys(props.user).length > 0 ? post.likes.includes(props.user && props.user._id) ? <a onClick={()=>{handleRemoveLike(post._id)}}><MDBIcon icon="thumbs-up" /> {post.likes.length} </a> : <a onClick={()=>{handleAddLike(post._id)}}><MDBIcon far icon="thumbs-up" /> {post.likes.length} </a>  : <p><MDBIcon far icon="thumbs-up" /> {post.likes.length} </p> } 
                                    </MDBMedia>
                                    </MDBMedia>
                                    <hr />
                            </div>
                        )
                    })
                }

                
 
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        user : state.user,
        posts : state.posts
    }
}

export default connect(mapStateToProps)(PostsList)