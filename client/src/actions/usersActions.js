import axios from '../config/axios'
import Swal from 'sweetalert2'

export const startRegisterUser = (obj) => {
    return(dispatch)=>{
    axios.post('/users/register',obj.formData)
        .then((user)=>{
            if(user.data._id){
            Swal.fire(
                'success',
                'Account Registered Successfully',
                'success'
            )
            console.log(user.data)
            obj.redirect('/login')
            }
            else{
                console.log(user.data)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const addUser = (user) => {
    return {type : 'ADD_USER', payload : user }
}

export const startAddUser = () => {
    return(dispatch)=>{
        axios.get('/users/account',{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            dispatch(addUser(response.data))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const startLoginUser = (obj) => {
    return(dispatch)=>{
        axios.post('/users/login',obj.formData)
            .then((response)=>{
                if(response.data.token){
                    const token = response.data.token
                    localStorage.setItem('token',token)
                    axios.get('/users/account',{
                        headers : {
                            'x-auth' : token
                        }
                    })
                    .then((user)=>{
                        dispatch(addUser(user.data))
                        Swal.fire(
                            'Success',
                            'successfully logged in',
                            'success'
                        )
                        obj.redirect('/')
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
                else{
                    Swal.fire(
                        'Error',
                        'invalid email or password',
                        'error'
                    )
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startLogoutUser = () =>{
    return(dispatch)=>{
        axios.delete('/users/logout',
        {
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            localStorage.clear()
            Swal.fire(
                'Success',
                'Logout in successfully',
                'success'
            )     
            window.location.href = '/login'
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}



