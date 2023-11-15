import React, { Component, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupForm(){
   
    const[user,setuser]=useState()
    const[email, setemail]=useState()
    const[password,setpassword]=useState()
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:3001/register",{user,email,password},{ withCredentials: true })
        .then(res=>{
            if(res.data=="email already registered"){
                alert("Email Already Exists")
            }
            else{
                navigate('/login')

            }
        }
        )
        
    }

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="user" onChange={(e)=>setuser(e.target.value)} required/>
                <br/><br/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={(e)=>setemail(e.target.value)} required/>
                <br/><br/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={(e)=>setpassword(e.target.value)} required/>
                <br/><br/>
                <input type="submit" value="Sign Up"/>
            </form>
            <div className="login-container">
                <h2>Login</h2>
                <Link to='/Login' className='login-button'>Login</Link>
            </div>
        </div>
    );
}
export default SignupForm;

