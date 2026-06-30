import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form';

function Register() {
    const {signup} = useAuth();

    const {register }  = useForm();

  return (
    <div>
    <div>
        <h2>Create accout </h2>
        <p>Build your Beshilo identity profile</p>
    </div>
    <form >
 <div> 
    <label > Full Name </label>
    <input type="text" 
    placeholder='Enter Your name'  />
 </div>

    </form>
    </div>
  )
}

export default Register
