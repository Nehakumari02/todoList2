import React, { Component, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LoginForm() { 
  const[email,setemail]=useState()
  const[password,setpassword]=useState()
  const navigate=useNavigate()
  async function handleSub(e){
    e.preventDefault()
    await axios.post('http://localhost:3001/login',{email,password},
    {
      withCredentials:true,
    }
    )
    .then(res=>{
      //console.log(res.cookies.jwt)
      if(res.data==="Sucess"){
  
      
        navigate('/todo')
      
      }
      else if(res.data=="incorrect password"){
        alert("Incorrect password");
      }
      else{
        alert("No record Exists")
      }
    })
    .catch(err=>console.log(err))

  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSub}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginForm;


